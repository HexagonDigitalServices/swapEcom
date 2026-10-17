// app/clothing/[slug]/page.jsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api";
import {
  buildVariantLabel,
  getColorImage,
  getColorName,
  getColorOptions,
  getProductBrand,
} from "@/lib/catalog-utils";
import Navbar from "@/components/Navbar";
import { useCart } from "@/CartContext";

// Import styles from the centralized file
import { CategoryPageStyles } from "@/app/styles/dummyStyles";

const ALL_GENDER = "all";

/* Helper: get variant options for a product */
function getVariantOptions(product) {
  const opts = [];

  // Check for variants array first
  if (Array.isArray(product.variants)) {
    return product.variants.map((variant) => ({
      size: variant.size,
      price: variant.price,
      value: variant.value || variant.size,
    }));
  }

  // Fallback to old structure for backward compatibility
  if (Array.isArray(product.sizes)) {
    for (const size of product.sizes) {
      opts.push({
        size: size,
        price: product.price,
        value: size,
      });
    }
    return opts;
  }

  if (Array.isArray(product.jeanNumbers)) {
    for (const size of product.jeanNumbers) {
      opts.push({
        size: size,
        price: product.price,
        value: size,
      });
    }
    return opts;
  }

  return opts;
}

/* Helper: get product price based on selected size */
function getProductPrice(product, selectedSize) {
  const variants = getVariantOptions(product);

  if (selectedSize) {
    const selectedVariant = variants.find((v) => v.size === selectedSize);
    if (selectedVariant) {
      return selectedVariant.price;
    }
  }

  // Return first variant's price or fallback
  return variants[0]?.price || product.price || 0;
}

export default function ClothingPage() {
  const pathname = usePathname() || "";
  const match = pathname.match(/\/clothing\/([^\/]+)/i);
  const clothingKey = match ? match[1].toLowerCase() : "shirts";
  const clothingLabel = clothingKey.toString().replace(/-/g, " ");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [genderFilter, setGenderFilter] = useState("men");
  const [sizeFilters, setSizeFilters] = useState([]);
  const [selectedSizesMap, setSelectedSizesMap] = useState({});
  const [selectedColorsMap, setSelectedColorsMap] = useState({});
  const [apiProducts, setApiProducts] = useState([]);
  useEffect(() => {
    api(`/products/category/clothing/${encodeURIComponent(clothingKey)}`)
      .then((r) => setApiProducts(r.products || []))
      .catch(() => setApiProducts([]));
  }, [clothingKey]);
  const rawByGender = useMemo(
    () =>
      apiProducts.reduce(
        (groups, p) => {
          const item = {
            id: p._id,
            name: p.name,
            brand: p.brand,
            image: p.variants?.[0]?.images?.[0]?.url || "",
            colors: (p.variants || []).map((v) => ({
              color: v.color,
              image: v.images?.[0]?.url,
            })),
            variants: Array.from(
              new Map(
                (p.variants || []).flatMap((v) =>
                  (v.sizes || []).map((s) => [
                    s.size,
                    { size: s.size, price: s.price },
                  ]),
                ),
              ).values(),
            ),
          };
          (groups[p.gender] ||= []).push(item);
          return groups;
        },
        { men: [], women: [] },
      ),
    [apiProducts],
  );

  const { addToCart, getItemQuantity, setItemQuantity, removeFromCart } =
    useCart();

  // Initialize selected sizes and colors with first variant of each product
  React.useEffect(() => {
    const initialSelectedSizes = {};
    const initialSelectedColors = {};
    if (rawByGender) {
      ["men", "women"].forEach((gender) => {
        const products = rawByGender[gender] || [];
        products.forEach((product) => {
          const pKey = `${gender}-${product.id}`;
          const variants = getVariantOptions(product);
          if (variants.length > 0 && !selectedSizesMap[pKey]) {
            initialSelectedSizes[pKey] = variants[0].size;
          }

          // initialize color to the first available color if present
          const colorOptions = getColorOptions(product);
          if (
            Array.isArray(colorOptions) &&
            colorOptions.length > 0 &&
            !selectedColorsMap[pKey]
          ) {
            initialSelectedColors[pKey] = getColorName(colorOptions[0]);
          }
        });
      });
    }

    if (Object.keys(initialSelectedSizes).length > 0) {
      setSelectedSizesMap((prev) => ({ ...prev, ...initialSelectedSizes }));
    }
    if (Object.keys(initialSelectedColors).length > 0) {
      setSelectedColorsMap((prev) => ({ ...prev, ...initialSelectedColors }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clothingKey, rawByGender]);

  const normalizeSizes = (p) => {
    const variants = getVariantOptions(p);
    return variants.map((v) => String(v.size).toUpperCase());
  };

  const renderSpecs = (specs) => {
    if (!specs || typeof specs !== "object") return null;

    return Object.entries(specs)
      .filter(([key, value]) => value !== undefined && value !== null)
      .filter(([key]) => key !== "extra_features")
      .map(([key, value]) => {
        const label = key
          .replace(/_/g, " ")
          .replace(/([A-Z])/g, " $1")
          .toLowerCase();
        const displayValue =
          typeof value === "boolean"
            ? value
              ? "yes"
              : "no"
            : Array.isArray(value)
              ? value.join(", ")
              : String(value);

        return (
          <span key={key} className={CategoryPageStyles.specsTag}>
            {`${label}: ${displayValue}`}
          </span>
        );
      });
  };

  const mergedProducts = useMemo(() => {
    if (!rawByGender) return [];
    const res = [];
    Object.entries(rawByGender).forEach(([g, items]) => {
      if (Array.isArray(items)) {
        items.forEach((p) =>
          res.push({
            ...p,
            __gender: g,
            _sizes: normalizeSizes(p),
            _variants: getVariantOptions(p),
          }),
        );
      }
    });
    return res;
  }, [rawByGender]);

  const availableSizes = useMemo(() => {
    const set = new Set();
    mergedProducts.forEach((p) => {
      if (Array.isArray(p._sizes)) p._sizes.forEach((s) => set.add(s));
    });
    ["S", "M", "L", "28", "29", "30"].forEach((s) => set.add(s));
    return Array.from(set);
  }, [mergedProducts]);

  const filteredProducts = useMemo(() => {
    let list = [...mergedProducts];

    if (genderFilter !== ALL_GENDER)
      list = list.filter((p) => p.__gender === genderFilter);

    if (searchQuery) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)),
      );
    }

    if (sizeFilters.length > 0) {
      list = list.filter((p) => {
        if (!Array.isArray(p._sizes) || p._sizes.length === 0) return false;
        return sizeFilters.some((sf) =>
          p._sizes.includes(String(sf).toUpperCase()),
        );
      });
    }

    if (sortBy === "price-low") {
      list.sort((a, b) => {
        const aPrice = getProductPrice(a, null);
        const bPrice = getProductPrice(b, null);
        return aPrice - bPrice;
      });
    } else if (sortBy === "price-high") {
      list.sort((a, b) => {
        const aPrice = getProductPrice(a, null);
        const bPrice = getProductPrice(b, null);
        return bPrice - aPrice;
      });
    }

    return list;
  }, [mergedProducts, genderFilter, searchQuery, sizeFilters, sortBy]);

  const toggleProductSize = (productKey, size) =>
    setSelectedSizesMap((prev) => ({
      ...prev,
      [productKey]: size,
    }));

  const toggleProductColor = (productKey, color) => {
    const colorName = getColorName(color);
    setSelectedColorsMap((prev) => ({
      ...prev,
      [productKey]: colorName,
    }));
  };

  /* New: add handlers that build & use variantLabel (size||color) so cart lookups are consistent */
  const handleAddToCart = (product) => {
    const pKey = `${product.__gender}-${product.id}`;
    const chosenSize = selectedSizesMap[pKey] ?? null;
    const chosenColor = selectedColorsMap[pKey] ?? null;
    const currentPrice = getProductPrice(product, chosenSize);

    // require explicit size if sizes exist
    if (
      Array.isArray(product._sizes) &&
      product._sizes.length > 0 &&
      !chosenSize
    ) {
      // if no size chosen, auto-select the first size
      const firstSize = product._sizes[0];
      setSelectedSizesMap((prev) => ({ ...prev, [pKey]: firstSize }));
      return;
    }

    const variantLabel = buildVariantLabel(chosenSize, chosenColor);

    // build minimal product for cart (so id is unique)
    const selectedImage = getColorImage(product, chosenColor);
    const productForCart = {
      id: product.id,
      name: product.name,
      brand: getProductBrand(product),
      price: currentPrice,
      src:
        selectedImage ||
        product.image ||
        product.imageUrl ||
        product.img ||
        product.src ||
        "",
      alt: product.name,
      description: product.description,
      gender: product.__gender,
      type: clothingKey,
      variants: product._variants,
      // keep color in meta so cart can show it; doesn't change existing cart API calls
      color: chosenColor,
      selectedColorImage: selectedImage,
    };

    addToCart(
      productForCart,
      { volumeLabel: variantLabel, price: currentPrice },
      1,
    );
  };

  const handleIncrease = (product) => {
    const pKey = `${product.__gender}-${product.id}`;
    // read current selected size & color
    let chosenSize = selectedSizesMap[pKey] ?? null;
    const chosenColor = selectedColorsMap[pKey] ?? null;

    // If sizes exist and none selected, auto-select first and add 1
    if (
      Array.isArray(product._sizes) &&
      product._sizes.length > 0 &&
      !chosenSize
    ) {
      const firstSize = product._sizes[0];
      chosenSize = firstSize;
      setSelectedSizesMap((prev) => ({ ...prev, [pKey]: firstSize }));

      const variantLabel = buildVariantLabel(firstSize, chosenColor);
      const currentPrice = getProductPrice(product, firstSize);

      const selectedImage = getColorImage(product, chosenColor);
      const productForCart = {
        id: product.id,
        name: product.name,
        brand: getProductBrand(product),
        price: currentPrice,
        src:
          selectedImage ||
          product.image ||
          product.imageUrl ||
          product.img ||
          product.src ||
          "",
        alt: product.name,
        description: product.description,
        gender: product.__gender,
        type: clothingKey,
        variants: product._variants,
        color: chosenColor,
        selectedColorImage: selectedImage,
      };

      addToCart(
        productForCart,
        { volumeLabel: variantLabel, price: currentPrice },
        1,
      );
      return;
    }

    const variantLabel = buildVariantLabel(chosenSize, chosenColor);
    const curQty = getItemQuantity(product.id, variantLabel);

    if (curQty > 0) {
      setItemQuantity(product.id, variantLabel, curQty + 1);
    } else {
      // not in cart yet — similar to handleAddToCart but ensuring variantLabel
      const currentPrice = getProductPrice(product, chosenSize);
      const selectedImage = getColorImage(product, chosenColor);
      const productForCart = {
        id: product.id,
        name: product.name,
        brand: getProductBrand(product),
        price: currentPrice,
        src:
          selectedImage ||
          product.image ||
          product.imageUrl ||
          product.img ||
          product.src ||
          "",
        alt: product.name,
        description: product.description,
        gender: product.__gender,
        type: clothingKey,
        variants: product._variants,
        color: chosenColor,
        selectedColorImage: selectedImage,
      };

      addToCart(
        productForCart,
        { volumeLabel: variantLabel, price: currentPrice },
        1,
      );
    }
  };

  const handleDecrease = (product) => {
    const pKey = `${product.__gender}-${product.id}`;
    const chosenSize = selectedSizesMap[pKey] ?? null;
    const chosenColor = selectedColorsMap[pKey] ?? null;

    const variantLabel = buildVariantLabel(chosenSize, chosenColor);
    const curQty = getItemQuantity(product.id, variantLabel);

    if (curQty > 1) {
      setItemQuantity(product.id, variantLabel, curQty - 1);
    } else if (curQty === 1) {
      removeFromCart(product.id, variantLabel);
    }
  };

  const getQtyForProduct = (product) => {
    const pKey = `${product.__gender}-${product.id}`;
    const chosenSize = selectedSizesMap[pKey] ?? null;
    const chosenColor = selectedColorsMap[pKey] ?? null;
    const variantLabel = buildVariantLabel(chosenSize, chosenColor);
    return getItemQuantity(product.id, variantLabel);
  };

  return (
    <div className={CategoryPageStyles.mainContainer}>
      <Navbar />
      <header className={CategoryPageStyles.header}>
        <div className={CategoryPageStyles.headerContainer}>
          {/* TITLE: shown on all sizes, centered on mobile, left-aligned on md+ */}
          <div className={CategoryPageStyles.titleContainer}>
            <h1 className={CategoryPageStyles.title}>{clothingLabel}</h1>
          </div>

          {/* SEARCH: centered and placed on its own line on small screens */}
          <div className={CategoryPageStyles.searchContainer}>
            <div className={CategoryPageStyles.searchWrapper}>
              <Search className={CategoryPageStyles.searchIcon} size={18} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${clothingLabel.toLowerCase()} clothing products - name, brand...`}
                className={CategoryPageStyles.searchInput}
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className={CategoryPageStyles.clearSearchButton}
                >
                  <X size={18} />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main className={CategoryPageStyles.mainContent}>
        <section className={CategoryPageStyles.filtersSection}>
          <div className={CategoryPageStyles.filtersContainer}>
            <div className={CategoryPageStyles.genderButtonsContainer}>
              <button
                onClick={() => setGenderFilter("men")}
                className={`${CategoryPageStyles.genderButtonBase} ${
                  genderFilter === "men"
                    ? CategoryPageStyles.genderButtonActive
                    : CategoryPageStyles.genderButtonInactive
                }`}
              >
                Men
              </button>
              <button
                onClick={() => setGenderFilter("women")}
                className={`${CategoryPageStyles.genderButtonBase} ${
                  genderFilter === "women"
                    ? CategoryPageStyles.genderButtonActive
                    : CategoryPageStyles.genderButtonInactive
                }`}
              >
                Women
              </button>
            </div>

            <div className={CategoryPageStyles.sortContainer}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={CategoryPageStyles.sortSelect}
              >
                <option
                  value="featured"
                  className={CategoryPageStyles.sortOption}
                >
                  Featured
                </option>
                <option
                  value="price-low"
                  className={CategoryPageStyles.sortOption}
                >
                  Price: Low → High
                </option>
                <option
                  value="price-high"
                  className={CategoryPageStyles.sortOption}
                >
                  Price: High → Low
                </option>
              </select>
            </div>
          </div>
        </section>

        <section>
          {!rawByGender ? (
            <div className={CategoryPageStyles.notFoundContainer}>
              Clothing product list not found.
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={CategoryPageStyles.notFoundContainer}>
              No clothing products found
            </div>
          ) : (
            <motion.div
              variants={CategoryPageStyles.listVariants}
              initial="hidden"
              animate="visible"
              className={CategoryPageStyles.productsGrid(clothingKey)}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const pKey = `${product.__gender}-${product.id}`;
                  const chosenSize = selectedSizesMap[pKey];
                  const chosenColor = selectedColorsMap[pKey];
                  const currentPrice = getProductPrice(product, chosenSize);
                  const displayedQty = getQtyForProduct(product);

                  // safe image fallback
                  const imageSrc =
                    getColorImage(product, chosenColor) ||
                    product.image ||
                    product.imageUrl ||
                    product.img ||
                    product.src ||
                    "/images/placeholder.png";

                  return (
                    <motion.article
                      key={pKey}
                      variants={CategoryPageStyles.cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -8 }}
                      whileHover={{ scale: 1.02, translateY: -4 }}
                      className={CategoryPageStyles.productCard}
                    >
                      {/* IMAGE - make image container centered so all cards align visually */}
                      <div className={CategoryPageStyles.productImageContainer}>
                        <Image
                          src={imageSrc}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 160px, (max-width: 1024px) 420px, 480px"
                          className={CategoryPageStyles.productImage}
                        />
                      </div>

                      {/* DETAILS */}
                      <div
                        className={CategoryPageStyles.productDetailsContainer}
                      >
                        <div>
                          <h3 className={CategoryPageStyles.productName}>
                            {product.name}
                          </h3>
                          {getProductBrand(product) && (
                            <p className={CategoryPageStyles.productBrand}>
                              <span className={CategoryPageStyles.brandLabel}>
                                Brand :
                              </span>{" "}
                              {getProductBrand(product)}
                            </p>
                          )}

                          {/* COLOR NAMES: show available color names as selectable chips */}
                          {Array.isArray(getColorOptions(product)) &&
                            getColorOptions(product).length > 0 && (
                              <div
                                className={
                                  CategoryPageStyles.colorSelectionContainer
                                }
                              >
                                <div
                                  className={
                                    CategoryPageStyles.colorSelectionLabel
                                  }
                                >
                                  Select colour:
                                </div>
                                <div
                                  className={
                                    CategoryPageStyles.colorButtonsContainer
                                  }
                                >
                                  {getColorOptions(product).map((color) => {
                                    const colorName = getColorName(color);
                                    const isSelected =
                                      chosenColor === colorName;
                                    return (
                                      <button
                                        key={String(colorName)}
                                        onClick={() =>
                                          toggleProductColor(pKey, color)
                                        }
                                        className={`${CategoryPageStyles.colorButtonBase} ${
                                          isSelected
                                            ? CategoryPageStyles.colorButtonActive
                                            : CategoryPageStyles.colorButtonInactive
                                        }`}
                                      >
                                        {colorName}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                        </div>

                        {/* SIZE CHIPS with prices */}
                        {product._sizes && product._sizes.length > 0 && (
                          <div
                            className={
                              CategoryPageStyles.sizeSelectionContainer
                            }
                          >
                            <div
                              className={CategoryPageStyles.sizeSelectionLabel}
                            >
                              Select Size:
                            </div>
                            <div className={CategoryPageStyles.sizeButtonsGrid}>
                              {product._variants.map((variant, index) => {
                                const isSelected =
                                  selectedSizesMap[pKey] === variant.size;

                                return (
                                  <button
                                    key={`${variant.size}-${index}`}
                                    onClick={() =>
                                      toggleProductSize(pKey, variant.size)
                                    }
                                    className={`${CategoryPageStyles.sizeButtonBase} ${
                                      isSelected
                                        ? CategoryPageStyles.sizeButtonActive
                                        : CategoryPageStyles.sizeButtonInactive
                                    }`}
                                  >
                                    <div
                                      className={
                                        CategoryPageStyles.sizeButtonText
                                      }
                                    >
                                      {variant.size}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        <div
                          className={CategoryPageStyles.priceAndCartContainer}
                        >
                          <div>
                            <p className={CategoryPageStyles.priceText}>
                              ₹{currentPrice}
                            </p>
                          </div>

                          <div
                            className={CategoryPageStyles.cartControlsContainer}
                          >
                            {displayedQty > 0 ? (
                              <div
                                className={
                                  CategoryPageStyles.quantityControlsContainer
                                }
                              >
                                <button
                                  aria-label="decrease quantity"
                                  className={CategoryPageStyles.quantityButton}
                                  onClick={() => handleDecrease(product)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={CategoryPageStyles.quantityIcon}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>

                                <div
                                  className={CategoryPageStyles.quantityDisplay}
                                >
                                  {displayedQty}
                                </div>

                                <button
                                  aria-label="increase quantity"
                                  className={CategoryPageStyles.quantityButton}
                                  onClick={() => handleIncrease(product)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={CategoryPageStyles.quantityIcon}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleAddToCart(product)}
                                disabled={
                                  Array.isArray(product._sizes) &&
                                  product._sizes.length > 0 &&
                                  !chosenSize
                                }
                                className={`${CategoryPageStyles.addToCartButtonBase} ${
                                  Array.isArray(product._sizes) &&
                                  product._sizes.length > 0 &&
                                  !chosenSize
                                    ? CategoryPageStyles.addToCartButtonDisabled
                                    : CategoryPageStyles.addToCartButtonEnabled
                                }`}
                              >
                                Add to cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}
