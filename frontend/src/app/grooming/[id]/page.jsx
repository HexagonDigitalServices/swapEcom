// app/grooming/page.jsx (or wherever your Grooming page is located)
"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import { useCart } from "@/CartContext"; // <-- adjust path if needed

// Import styles from the centralized file
import { GroomingPageStyles } from "@/app/styles/dummyStyles";

/* -------------------- UTIL: flatten items from grouped structure -------------------- */
function flattenTypes(data) {
  return data.flatMap((type) => {
    const men = (type.men || []).map((it) => ({
      ...it,
      gender: "men",
      type: type.id,
    }));
    const women = (type.women || []).map((it) => ({
      ...it,
      gender: "women",
      type: type.id,
    }));
    return [...men, ...women];
  });
}

/* helper: normalize volume options into { label, price, value } */
function getVolumeOptions(product) {
  const opts = [];

  // Check for the new variants structure
  if (Array.isArray(product.variants)) {
    for (const variant of product.variants) {
      opts.push({
        label: variant.size,
        price: variant.price,
        value: variant.value || variant.size, // Use numeric value for sorting if available
      });
    }
    return opts;
  }

  // Fallback to old structure for backward compatibility
  if (Array.isArray(product.volume)) {
    for (const v of product.volume) {
      if (typeof v === "string") opts.push({ label: v, price: product.price });
      else if (v && typeof v === "object")
        opts.push({
          label: v.label ?? v.value ?? String(v),
          price: v.price ?? product.price,
        });
      else opts.push({ label: String(v), price: product.price });
    }
    return opts;
  }

  if (typeof product.volume === "string") {
    opts.push({ label: product.volume, price: product.price });
    return opts;
  }

  return opts;
}

function makeKey(id, volumeLabel) {
  return `${id}::${volumeLabel ?? ""}`;
}

function normalizeCategory(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/s$/, "");
}

function getGroomingBrand(product) {
  if (product.brand) return product.brand;
  const readableType = String(product.type || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return readableType ? `DDD ${readableType}` : "DDD Grooming";
}

/* -------------------- PAGE COMPONENT -------------------- */
export default function Page() {
  const pathname = usePathname();
  const openId = pathname?.split("/").filter(Boolean).pop() || null;

  const [apiProducts, setApiProducts] = useState([]);
  useEffect(() => {
    if (!openId) {
      setApiProducts([]);
      return;
    }
    api(`/products/category/grooming/${encodeURIComponent(openId)}`)
      .then((result) => setApiProducts(result.products || []))
      .catch(() => setApiProducts([]));
  }, [openId]);
  const allItems = useMemo(
    () =>
      apiProducts.map((p) => ({
        id: p._id,
        name: p.name,
        brand: p.brand,
        gender: p.gender,
        type: p.subCategory,
        category: p.subCategory,
        src: p.variants?.[0]?.images?.[0]?.url || "",
        variants: (p.variants || []).flatMap((v) =>
          (v.sizes || []).map((s) => ({ size: s.size, price: s.price })),
        ),
      })),
    [apiProducts],
  );
  const indexMap = useMemo(() => {
    const m = {};
    allItems.forEach((it, idx) => {
      if (it && it.id != null) m[it.id] = idx;
    });
    return m;
  }, [allItems]);

  const { addToCart, getItemQuantity, setItemQuantity, removeFromCart } =
    useCart();

  const [query, setQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("men"); // default to men as requested
  const [sort, setSort] = useState("featured"); // featured | price_asc | price_desc
  const [selectedVolumes, setSelectedVolumes] = useState({});

  // optimistic map to immediately show qty control after clicking "Add"
  // keys are `${id}::${volumeLabel}`
  const [optimisticAdded, setOptimisticAdded] = useState({});

  // Initialize selected volumes with first variant of each product
  React.useEffect(() => {
    const initialSelected = {};
    allItems.forEach((item) => {
      const volOptions = getVolumeOptions(item);
      if (volOptions.length > 0 && !selectedVolumes[item.id]) {
        initialSelected[item.id] = {
          value: volOptions[0].label,
          price: volOptions[0].price,
        };
      }
    });
    if (Object.keys(initialSelected).length > 0) {
      setSelectedVolumes((prev) => ({ ...prev, ...initialSelected }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allItems]);

  const filteredByOpenId = useMemo(() => {
    if (!openId) return allItems;

    const productMatch = allItems.find((p) => String(p.id) === String(openId));
    if (productMatch) return [productMatch];

    const typeMatches = allItems.filter(
      (p) => normalizeCategory(p.type) === normalizeCategory(openId),
    );
    if (typeMatches.length > 0) return typeMatches;

    return [];
  }, [allItems, openId]);

  const items = useMemo(() => {
    let filtered = filteredByOpenId.filter((p) => {
      if (genderFilter !== "all" && p.gender !== genderFilter) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        (p.name || "").toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.type || "").toLowerCase().includes(q)
      );
    });

    let sorted = [...filtered];

    if (sort === "price_asc") {
      sorted.sort((a, b) => {
        const aPrice = getVolumeOptions(a)[0]?.price || 0;
        const bPrice = getVolumeOptions(b)[0]?.price || 0;
        return aPrice - bPrice;
      });
    } else if (sort === "price_desc") {
      sorted.sort((a, b) => {
        const aPrice = getVolumeOptions(a)[0]?.price || 0;
        const bPrice = getVolumeOptions(b)[0]?.price || 0;
        return bPrice - aPrice;
      });
    } else {
      sorted.sort((a, b) => {
        const ia = indexMap[a.id] ?? 0;
        const ib = indexMap[b.id] ?? 0;
        return ia - ib;
      });
    }

    return sorted;
  }, [filteredByOpenId, query, genderFilter, sort, indexMap]);

  const leftTitle = useMemo(() => {
    if (!openId) return "Grooming";
    const prod = allItems.find((p) => String(p.id) === String(openId));
    if (prod) return prod.name || `${openId}`;
    return `${openId}`;
  }, [openId, allItems]);

  return (
    <main className={GroomingPageStyles.mainContainer}>
      <Navbar />
      <div className={GroomingPageStyles.contentContainer}>
        {/* Header */}
        <header className={GroomingPageStyles.header}>
          {/* LEFT: Title (larger) and Gender filter (moved to left) */}
          <div className={GroomingPageStyles.headerLeft}>
            {/* Title - increased size */}
            <h2 className={GroomingPageStyles.headerTitle}>{leftTitle}</h2>

            {/* Gender filter moved here (left side) */}
            <div className={GroomingPageStyles.genderFilterContainer}>
              {["men", "women"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGenderFilter(g)}
                  className={GroomingPageStyles.getGenderButtonClass(
                    genderFilter === g,
                  )}
                >
                  {g === "men" ? "Men" : "Women"}
                </button>
              ))}
            </div>
          </div>

          {/* CENTER: Search bar (kept centered) */}
          <div className={GroomingPageStyles.searchSection}>
            <div className={GroomingPageStyles.searchWrapper}>
              <div className={GroomingPageStyles.searchInputContainer}>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search product, type or category (e.g. 'facewash', 'serum')"
                  className={GroomingPageStyles.searchInput}
                />
                <Search className={GroomingPageStyles.searchIcon} />

                {/* Clear button: type="button" and uses setQuery("") */}
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className={GroomingPageStyles.clearSearchButton}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT-side sort */}
          <div className={GroomingPageStyles.sortContainer}>
            <label className={GroomingPageStyles.sortLabel}>Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={GroomingPageStyles.sortSelect}
            >
              <option
                value="featured"
                className={GroomingPageStyles.sortOption}
              >
                Featured
              </option>
              <option
                value="price_asc"
                className={GroomingPageStyles.sortOption}
              >
                Price: Low → High
              </option>
              <option
                value="price_desc"
                className={GroomingPageStyles.sortOption}
              >
                Price: High → Low
              </option>
            </select>
          </div>
        </header>

        {/* Grid */}
        <section>
          <AnimatePresence mode="popLayout">
            <motion.div layout className={GroomingPageStyles.productsGrid}>
              {items.map((p) => {
                const volOptions = getVolumeOptions(p);
                const selected = selectedVolumes[p.id];
                // selected volume label (null if none)
                const selectedVolumeLabel = selected?.value ?? null;
                const key = makeKey(p.id, selectedVolumeLabel);

                // read authoritative quantity from cart context
                const qtyInCart = getItemQuantity(p.id, selectedVolumeLabel);

                // optimistic display logic: if context not updated yet but we optimistically flagged it
                const displayQty =
                  qtyInCart > 0 ? qtyInCart : optimisticAdded[key] ? 1 : 0;

                const displayedPrice =
                  selected?.price ?? (volOptions[0]?.price || 0);

                return (
                  <motion.article
                    layout
                    key={p.id}
                    whileHover={{ y: -6 }}
                    className={GroomingPageStyles.productCard}
                  >
                    {/* Fixed-height image area so all cards match */}
                    <div className={GroomingPageStyles.productImageContainer}>
                      <Image
                        src={p.src}
                        alt={p.alt || p.name}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                        className={GroomingPageStyles.productImage}
                      />
                    </div>

                    {/* Make content fill remaining space so controls sit at bottom */}
                    <div className={GroomingPageStyles.productContent}>
                      <div className={GroomingPageStyles.productHeader}>
                        <div
                          className={GroomingPageStyles.productNameContainer}
                        >
                          <h3 className={GroomingPageStyles.productName}>
                            {p.name}
                          </h3>

                          <p className={GroomingPageStyles.productBrand}>
                            <span className={GroomingPageStyles.brandLabel}>
                              Brand:
                            </span>{" "}
                            {getGroomingBrand(p)}
                          </p>

                          <div className={GroomingPageStyles.productPrice}>
                            ₹{displayedPrice}
                          </div>
                        </div>

                        <div className={GroomingPageStyles.textRight} />
                      </div>

                      <p className={GroomingPageStyles.productDescription}>
                        {p.description}
                      </p>

                      {volOptions.length > 0 && (
                        <div
                          className={GroomingPageStyles.volumeOptionsContainer}
                        >
                          <div
                            className={GroomingPageStyles.volumeOptionsLabel}
                          >
                            <span>Select volume</span>
                          </div>

                          <div
                            role="list"
                            aria-label={`Volume options for ${p.name}`}
                            className={GroomingPageStyles.volumeOptionsGrid}
                          >
                            {volOptions.map((opt) => {
                              const isSelected =
                                selectedVolumes[p.id]?.value === opt.label;

                              return (
                                <button
                                  key={opt.label}
                                  className={GroomingPageStyles.getVolumeButtonClass(
                                    isSelected,
                                  )}
                                  onClick={() =>
                                    setSelectedVolumes((prev) => {
                                      const cur = prev[p.id];
                                      if (cur?.value === opt.label) {
                                        const next = { ...prev };
                                        delete next[p.id];
                                        return next;
                                      }
                                      return {
                                        ...prev,
                                        [p.id]: {
                                          value: opt.label,
                                          price: opt.price,
                                        },
                                      };
                                    })
                                  }
                                  aria-pressed={isSelected}
                                  title={`₹${opt.price}`}
                                >
                                  <span
                                    className={
                                      GroomingPageStyles.volumeButtonText
                                    }
                                  >
                                    {opt.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className={GroomingPageStyles.cartControlsContainer}>
                        {/* If there's a quantity in cart for this product+selected volume, show qty controls */}
                        {displayQty > 0 ? (
                          <div
                            className={
                              GroomingPageStyles.quantityControlsContainer
                            }
                          >
                            <button
                              aria-label="decrease quantity"
                              className={GroomingPageStyles.quantityButton}
                              onClick={() => {
                                if (qtyInCart > 0) {
                                  const next = qtyInCart - 1;
                                  if (next <= 0) {
                                    removeFromCart(p.id, selectedVolumeLabel);
                                    setOptimisticAdded((prev) => {
                                      const copy = { ...prev };
                                      delete copy[key];
                                      return copy;
                                    });
                                  } else {
                                    setItemQuantity(
                                      p.id,
                                      selectedVolumeLabel,
                                      next,
                                    );
                                  }
                                } else if (optimisticAdded[key]) {
                                  setOptimisticAdded((prev) => {
                                    const copy = { ...prev };
                                    delete copy[key];
                                    return copy;
                                  });
                                }
                              }}
                            >
                              <Minus size={14} />
                            </button>

                            <div className={GroomingPageStyles.quantityDisplay}>
                              {displayQty}
                            </div>

                            <button
                              aria-label="increase quantity"
                              className={GroomingPageStyles.quantityButton}
                              onClick={() => {
                                if (qtyInCart > 0) {
                                  setItemQuantity(
                                    p.id,
                                    selectedVolumeLabel,
                                    qtyInCart + 1,
                                  );
                                } else if (optimisticAdded[key]) {
                                  addToCart(
                                    { ...p, brand: getGroomingBrand(p) },
                                    {
                                      volumeLabel: selectedVolumeLabel,
                                      price: selected?.price,
                                    },
                                    1,
                                  );
                                } else {
                                  addToCart(
                                    { ...p, brand: getGroomingBrand(p) },
                                    {
                                      volumeLabel: selectedVolumeLabel,
                                      price: selected?.price,
                                    },
                                    1,
                                  );
                                  setOptimisticAdded((prev) => ({
                                    ...prev,
                                    [key]: true,
                                  }));
                                }
                              }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            className={GroomingPageStyles.getAddToCartButtonClass(
                              volOptions.length > 0 && !selected,
                            )}
                            disabled={volOptions.length > 0 && !selected}
                            onClick={() => {
                              addToCart(
                                { ...p, brand: getGroomingBrand(p) },
                                {
                                  volumeLabel: selected?.value ?? null,
                                  price: selected?.price,
                                },
                                1,
                              );
                              setOptimisticAdded((prev) => ({
                                ...prev,
                                [key]: true,
                              }));
                            }}
                          >
                            Add to cart
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}

              {items.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={GroomingPageStyles.noProductsContainer}
                >
                  No products found for your search/filter.
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
