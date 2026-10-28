export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} });
  const [userId, setUserId] = useState(null);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Reload (or clear) the cart whenever the signed-in account changes.
  // This prevents the previous account's in-memory cart from appearing for a
  // newly signed-in user.
  useEffect(() => {
    const syncUser = () => setUserId(getCurrentUser()?.id ?? null);
    syncUser();
    window.addEventListener("fashion-auth", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("fashion-auth", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  useEffect(() => {
    if (!userId) {
      dispatch({ type: "CLEAR" });
      return;
    }

    let cancelled = false;
    dispatch({ type: "CLEAR" });
    api("/cart")
      .then(({ cart }) => {
        if (cancelled) return;
        const items = {};
        cart
          .filter((entry) => entry.product)
          .forEach((entry) => {
            const variant =
              entry.product.variants?.find((v) => v.color === entry.color) ||
              entry.product.variants?.[0] ||
              {};
            const size = variant.sizes?.find((s) => s.size === entry.size) ||
              variant.sizes?.[0] || { price: 0 };
            const image = variant.images?.[0]?.url || "";
            const label = normalizeVariantLabel(
              `${entry.size || ""}||${entry.color || ""}`,
            );
            items[makeKey(entry.product._id, label)] = {
              id: entry.product._id,
              cartId: entry._id,
              name: entry.product.name,
              brand: entry.product.brand,
              price: size.price,
              qty: entry.quantity,
              variantLabel: label,
              volumeLabel: label,
              src: image,
              alt: entry.product.name,
              color: entry.color,
            };
          });
        dispatch({ type: "HYDRATE", payload: { items } });
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "CLEAR" });
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Helper to try several common color keys on product
  const extractColorFromProduct = (product) => {
    if (!product) return null;
    return (
      product.color ??
      product.colour ??
      product.selectedColor ??
      product.selectedColour ??
      product.colorName ??
      null
    );
  };

  // Actions (backwards-compatible params)
  const addToCart = (product, opts = {}, qty = 1) => {
    // opts may be { variantLabel }, { volumeLabel }, or { volume }
    const variantLabelFromOpts = resolveLabel(opts);
    const variantLabelFromProduct = resolveLabel(
      product.variantLabel ?? product.volumeLabel ?? product.volume,
    );

    // final label preference: explicit opts > product fields > null
    let label = variantLabelFromOpts || variantLabelFromProduct || "";

    // if product includes a color, append it to the variantLabel using the same
    // separator your cart page already expects ("||"). This keeps backward compatibility
    // and lets the cart page parse "size||color".
    const colorFromProduct = extractColorFromProduct(product);
    if (colorFromProduct) {
      // only append if label doesn't already include a color part
      if (!label.includes("||")) {
        label = label
          ? `${label}||${colorFromProduct}`
          : `||${colorFromProduct}`;
      }
    }

    // Build the stored item; include color explicitly so other code can read it directly
    const item = {
      id: product.id, // should be a stable id (e.g. uid)
      name: product.name,
      brand: product.brand ?? product.brandName ?? "",
      price: opts.price ?? product.price ?? 0,
      variantLabel: label,
      volumeLabel: product.volumeLabel ?? label,
      src:
        product.src ?? product.image ?? product.imageUrl ?? product.img ?? "",
      alt: product.alt ?? product.name,
      description: product.description ?? "",
      gender: product.gender ?? product.__gender ?? null,
      type: product.type ?? null,
      // preserve explicit color field for convenience
      color: colorFromProduct ?? null,
      // preserve any extra metadata you passed (like _variants) without overwriting canonical fields
      ...product,
      brand: product.brand ?? product.brandName ?? "",
    };

    dispatch({ type: "ADD", payload: { item, qty } });
    const user = getCurrentUser();
    if (user && product.id) {
      const [size, color] = label.split("||");
      api("/cart/add", {
        method: "POST",
        body: JSON.stringify({
          user: user.id,
          product: product.id,
          size: size || "Default",
          color: color || "",
          quantity: qty,
        }),
      })
        .then(({ cartItem }) => {
          const latestItem = stateRef.current.items[makeKey(product.id, label)];

          dispatch({
            type: "SET_CART_ID",
            payload: {
              id: product.id,
              variantLabel: label,
              cartId: cartItem?._id,
            },
          });

          // Persist any + click made before the initial add request returned.
          if (
            cartItem?._id &&
            latestItem?.qty > 0 &&
            latestItem.qty !== cartItem.quantity
          ) {
            api(`/cart/update/${cartItem._id}`, {
              method: "PUT",
              body: JSON.stringify({ quantity: latestItem.qty }),
            }).catch(() => {});
          }
        })
        .catch(() => {});
    }
  };

  const setItemQuantity = (id, variantLabelOrVolumeLabel, qty, extras = {}) => {
    dispatch({
      type: "SET_QTY",
      payload: { id, variantLabel: variantLabelOrVolumeLabel, qty, extras },
    });
    const existing = getItem(id, variantLabelOrVolumeLabel);
    if (existing?.cartId)
      api(`/cart/update/${existing.cartId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity: qty }),
      }).catch(() => {});
  };

  const removeFromCart = (id, variantLabelOrVolumeLabel) => {
    const existing = getItem(id, variantLabelOrVolumeLabel);
    dispatch({
      type: "REMOVE",
      payload: { id, variantLabel: variantLabelOrVolumeLabel },
    });
    if (existing?.cartId)
      api(`/cart/remove/${existing.cartId}`, { method: "DELETE" }).catch(
        () => {},
      );
  };

  const clearCart = () => {
    Object.values(state.items).forEach((item) => {
      if (item.cartId)
        api(`/cart/remove/${item.cartId}`, { method: "DELETE" }).catch(
          () => {},
        );
    });
    dispatch({ type: "CLEAR" });
  };

  // Selectors
  const getItem = (id, variantLabelOrVolumeLabel) => {
    const label = variantLabelOrVolumeLabel ?? "";
    const key = makeKey(id, label);
    return state.items[key] ?? null;
  };

  const getItemQuantity = (id, variantLabelOrVolumeLabel) => {
    const it = getItem(id, variantLabelOrVolumeLabel);
    return it?.qty ?? 0;
  };

  const getAllItems = () => Object.values(state.items);

  const getCartTotals = () => {
    const items = getAllItems();
    const subtotal = items.reduce(
      (s, it) => s + (it.price ?? 0) * (it.qty ?? 0),
      0,
    );
    const totalItems = items.reduce((s, it) => s + (it.qty ?? 0), 0);
    return { subtotal, totalItems, items };
  };

  return (
    <CartContext.Provider
      value={{
        cartState: state,
        addToCart,
        setItemQuantity,
        removeFromCart,
        clearCart,
        getItem,
        getItemQuantity,
        getAllItems,
        getCartTotals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}