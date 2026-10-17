"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Search, X, ShoppingBag, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ACCESSORIES_LIST } from "@/dummyaccesorieslist";
import { api } from "@/lib/api";
import {
  getColorImage,
  getColorName,
  getColorOptions,
  getProductBrand,
  slugify,
} from "@/lib/catalog-utils";
import Navbar from "@/components/Navbar";
import { useCart } from "@/CartContext";
import toast from "react-hot-toast";
import { categoryPageStyles } from "@/app/styles/dummyStyles";

const normalizeSizes = (product) => {
  const variants = product?.variants;
  if (!variants) return [];

  const seen = new Set();
  return variants
    .map((v) => String(v.size).trim())
    .filter((s) => {
      if (!s) return false;
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });
};

const getPriceForSize = (product, selectedSize) => {
  if (!product?.variants) return 0;

  if (!selectedSize) {
    const prices = product.variants.map((v) => v.price || 0);
    return Math.min(...prices);
  }

  const variant = product.variants.find(
    (v) => String(v.size).trim() === selectedSize,
  );
  return variant ? variant.price || 0 : 0;
};


export default function CategoryPage() {
  const pathname = usePathname() || "";
  const parts = pathname.split("/").filter(Boolean);
  const slug = parts[1] ?? parts[0] ?? "";

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [genderFilter, setGenderFilter] = useState("men");

  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});

  const { addToCart, getItemQuantity, setItemQuantity, removeFromCart } =
    useCart();

  // Existing homepage links use a few legacy slugs. Convert them to the
  // canonical category stored by the admin form before calling the API.
  const legacyCategorySlugs = {
    belts: "belt",
    "cotton-socks": "socks",
    "dad-cap": "cap",
    "eau-de-parfum": "perfume",
    chain: "necklace",
    "chain-necklace": "necklace",
    necklaces: "necklace",
    sunglasses: "goggles",
    ties: "tie-set",
    "ties-and-scarves": "tie-set",
  };
  const categoryKey =
    legacyCategorySlugs[slug] ??
    ACCESSORIES_LIST.find((c) => c.key === slug)?.key ??
    (ACCESSORIES_LIST[0] && ACCESSORIES_LIST[0].key) ??
    "belts";

  const [apiProducts, setApiProducts] = useState([]);
  useEffect(() => {
    api(`/products/category/accessories/${encodeURIComponent(categoryKey)}`)
      .then((r) => setApiProducts(r.products || []))
      .catch(() => setApiProducts([]));
  }, [categoryKey]);
  const categoryData = useMemo(
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
            variants: (p.variants || []).flatMap((v) =>
              (v.sizes || []).map((s) => ({ size: s.size, price: s.price })),
            ),
          };
          (groups[p.gender] ||= []).push(item);
          return groups;
        },
        { men: [], women: [] },
      ),
    [apiProducts],
  );

  useEffect(() => {
    setSearchQuery("");
    setSortBy("featured");
    setGenderFilter("men");
    setSelectedSizes({});
    setSelectedColors({});
  }, [categoryKey]);

  const mergedProducts = useMemo(() => {
    if (!categoryData) return [];
    const result = [];
    ["men", "women"].forEach((gender) => {
      const arr = categoryData[gender];
      if (!Array.isArray(arr)) return;
      arr.forEach((product) => {
        const productSlug = slugify(product.name);
        const uid = `${gender}-${String(product.id)}`;
        result.push({
          ...product,
          uid,
          __gender: gender,
          _sizes: normalizeSizes(product),
          _slug: productSlug,
        });
      });
    });
    return result;
  }, [categoryData]);

  // Every product has a usable default variant as soon as it loads.
  useEffect(() => {
    if (!mergedProducts.length) return;
    setSelectedSizes((previous) => {
      const next = { ...previous };
      mergedProducts.forEach((product) => {
        if (!next[product.uid] && product._sizes?.[0])
          next[product.uid] = product._sizes[0];
      });
      return next;
    });
    setSelectedColors((previous) => {
      const next = { ...previous };
      mergedProducts.forEach((product) => {
        const first = getColorOptions(product, true)[0];
        if (!next[product.uid] && first)
          next[product.uid] = getColorName(first);
      });
      return next;
    });
  }, [mergedProducts]);

  const filteredProducts = useMemo(() => {
    let list = [...mergedProducts];
    list = list.filter((p) => p.__gender === genderFilter);

    const q = String(searchQuery || "")
      .trim()
      .toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const name = String(p.name ?? "").toLowerCase();
        const brand = String(getProductBrand(p)).toLowerCase();
        const desc = String(p.description ?? "").toLowerCase();
        return name.includes(q) || brand.includes(q) || desc.includes(q);
      });
    }

    if (sortBy === "price-low") {
      list.sort((a, b) => {
        const priceA = getPriceForSize(a, selectedSizes[a.uid]);
        const priceB = getPriceForSize(b, selectedSizes[b.uid]);
        return priceA - priceB;
      });
    } else if (sortBy === "price-high") {
      list.sort((a, b) => {
        const priceA = getPriceForSize(a, selectedSizes[a.uid]);
        const priceB = getPriceForSize(b, selectedSizes[b.uid]);
        return priceB - priceA;
      });
    } else {
      list.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    }

    return list;
  }, [mergedProducts, genderFilter, searchQuery, sortBy, selectedSizes]);

  const handleSizeSelect = (uid, size) => {
    setSelectedSizes((prev) => ({ ...prev, [uid]: size }));
  };

  const handleColorSelect = (uid, color) => {
    setSelectedColors((prev) => ({ ...prev, [uid]: color }));
  };

  const buildVariantLabel = (uid) => {
    const size = selectedSizes[uid] ?? "";
    const color = selectedColors[uid] ?? "";
    return `${size}||${color}`;
  };

  const handleAddToCart = (product) => {
    if (!product) return;

    const uid = product.uid;
    const selectedSize = selectedSizes[uid];

    if (product._sizes && product._sizes.length > 0) {
      if (!selectedSize) {
        toast.error("Please select a size", {
          icon: "⚠️",
        });
        return;
      }
    }

    const selectedColor = selectedColors[uid] || "";
    const selectedImage = getColorImage(product, selectedColor, true);
    const variantLabel = buildVariantLabel(uid);
    const price = getPriceForSize(product, selectedSize);

    const productForCart = {
      id: product.id,
      name: product.name,
      price: price,
      src: selectedImage || product.image || product.src || "",
      alt: product.name,
      description: product.description ?? "",
      gender: product.__gender,
      type: categoryKey,
      brand: getProductBrand(product),
      selectedSize: selectedSize,
      selectedColor,
      selectedColorImage: selectedImage,
    };

    addToCart(
      productForCart,
      {
        variantLabel,
        price: price,
        size: selectedSize,
        color: selectedColor,
      },
      1,
    );
  };

  return (
    <div className={categoryPageStyles.pageContainer}>
      <Navbar />
      <header className={categoryPageStyles.headerContainer}>
        <div className={categoryPageStyles.titleContainer}>
          <h1 className={categoryPageStyles.title}>
            {(categoryData?.label || categoryKey).toUpperCase()}
          </h1>
        </div>

        <div className={categoryPageStyles.searchContainer}>
          <div className={categoryPageStyles.searchWrapper}>
            <Search size={20} className={categoryPageStyles.searchIcon} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${categoryData?.label || ""}...`}
              className={categoryPageStyles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={categoryPageStyles.clearSearchButton}
                aria-label="Clear search"
              >
                <X size={20} className={categoryPageStyles.clearSearchIcon} />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className={categoryPageStyles.mainContainer}>
        {/* Separate control panel, matching the clothing page layout. */}
        <div className={categoryPageStyles.filtersContainer}>
          <div className={categoryPageStyles.genderButtonsContainer}>
            {["men", "women"].map((g) => (
              <button
                key={g}
                onClick={() => {
                  if (g !== genderFilter) {
                    setGenderFilter(g);
                    setSelectedSizes({});
                    setSelectedColors({});
                  }
                }}
                className={categoryPageStyles.genderButton(genderFilter === g)}
              >
                {g.toUpperCase()}
              </button>
            ))}
          </div>

          <div className={categoryPageStyles.sortContainer}>
            <span className={categoryPageStyles.sortLabel}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={categoryPageStyles.sortSelect}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
          </div>
        </div>

        {!filteredProducts.length ? (
          <div className={categoryPageStyles.noProductsContainer}>
            <Search size={48} className={categoryPageStyles.noProductsIcon} />
            <p className={categoryPageStyles.noProductsMessage}>
              No products found
            </p>
            <p className={categoryPageStyles.noProductsSubMessage}>
              {mergedProducts.length
                ? `No ${genderFilter} products in this category.`
                : "No products available in this category."}
            </p>
          </div>
        ) : (
          <motion.div
            variants={categoryPageStyles.listVariants}
            initial="hidden"
            animate="visible"
            className={categoryPageStyles.productsGrid}
          >
            <AnimatePresence>
              {filteredProducts.map((product) => {
                const uid = product.uid;
                const chosenSize = selectedSizes[uid];
                const chosenColor = selectedColors[uid];
                const variantLabel = `${chosenSize ?? ""}||${chosenColor ?? ""}`;
                const displayedQty = getItemQuantity(product.id, variantLabel);
                const currentPrice = getPriceForSize(product, chosenSize);
                const imageSrc =
                  getColorImage(product, chosenColor, true) ||
                  product.image ||
                  product.imageUrl ||
                  product.img ||
                  product.src ||
                  "";

                return (
                  <motion.article
                    key={uid}
                    variants={categoryPageStyles.cardVariants}
                    whileHover={categoryPageStyles.productCardWhileHover}
                    className={categoryPageStyles.productCard}
                  >
                    <div className={categoryPageStyles.imageContainer}>
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={product.name}
                          fill
                          className={categoryPageStyles.productImage}
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                        />
                      ) : (
                        <div className={categoryPageStyles.noImagePlaceholder}>
                          No image available
                        </div>
                      )}
                    </div>

                    <div className={categoryPageStyles.contentContainer}>
                      <div className={categoryPageStyles.headerSection}>
                        <div className={categoryPageStyles.titleSection}>
                          <h3 className={categoryPageStyles.productTitle}>
                            {product.name}
                          </h3>

                          <p className={categoryPageStyles.brandText}>
                            <span className={categoryPageStyles.brandLabel}>
                              Brand:
                            </span>{" "}
                            {getProductBrand(product)}
                          </p>
                        </div>
                      </div>

                      <div className={categoryPageStyles.priceContainer}>
                        <span className={categoryPageStyles.priceText}>
                          ₹{currentPrice.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className={categoryPageStyles.colorsContainer}>
                        {product.colors && product.colors.length > 0 ? (
                          <>
                            <p className={categoryPageStyles.colorsLabel}>
                              Available colors
                            </p>
                            <div className={categoryPageStyles.colorsWrapper}>
                              {product.colors.map((color, idx) => {
                                const colorName = getColorName(color);
                                const chosen =
                                  selectedColors[product.uid] === colorName;
                                return (
                                  <button
                                    key={idx}
                                    onClick={() =>
                                      handleColorSelect(product.uid, colorName)
                                    }
                                    className={categoryPageStyles.colorButton(
                                      chosen,
                                    )}
                                    aria-pressed={chosen}
                                    title={colorName}
                                  >
                                    {colorName}
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <div />
                        )}
                      </div>

                      <div className={categoryPageStyles.sizesContainer}>
                        {product._sizes && product._sizes.length > 0 ? (
                          <>
                            <p className={categoryPageStyles.sizesLabel}>
                              Sizes
                            </p>
                            <div className={categoryPageStyles.sizesWrapper}>
                              {product._sizes.map((size, idx) => {
                                const chosen =
                                  selectedSizes[product.uid] === size;
                                const variant = product.variants?.find(
                                  (v) => String(v.size).trim() === size,
                                );
                                const sizePrice = variant?.price || 0;

                                return (
                                  <button
                                    key={idx}
                                    onClick={() =>
                                      handleSizeSelect(product.uid, size)
                                    }
                                    className={categoryPageStyles.sizeButton(
                                      chosen,
                                    )}
                                    aria-pressed={chosen}
                                    title={`₹${sizePrice.toLocaleString("en-IN")}`}
                                  >
                                    <span className={categoryPageStyles.noWrap}>
                                      {size}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <div />
                        )}
                      </div>

                      <div className={categoryPageStyles.actionContainer}>
                        {displayedQty > 0 ? (
                          <div className={categoryPageStyles.quantitySelector}>
                            <button
                              aria-label="decrease quantity"
                              className={categoryPageStyles.quantityButton}
                              onClick={() => {
                                const cur = getItemQuantity(
                                  product.id,
                                  variantLabel,
                                );
                                if (cur > 1)
                                  setItemQuantity(
                                    product.id,
                                    variantLabel,
                                    cur - 1,
                                  );
                                else removeFromCart(product.id, variantLabel);
                              }}
                            >
                              <Minus size={12} />
                            </button>

                            <div className={categoryPageStyles.quantityDisplay}>
                              {displayedQty}
                            </div>

                            <button
                              aria-label="increase quantity"
                              className={categoryPageStyles.quantityButton}
                              onClick={() => {
                                const cur = getItemQuantity(
                                  product.id,
                                  variantLabel,
                                );
                                if (cur > 0)
                                  setItemQuantity(
                                    product.id,
                                    variantLabel,
                                    cur + 1,
                                  );
                                else
                                  addToCart(
                                    {
                                      id: product.id,
                                      name: product.name,
                                      price: currentPrice,
                                      src: imageSrc,
                                      brand: getProductBrand(product),
                                      selectedSize: chosenSize,
                                      selectedColor: chosenColor || "",
                                      selectedColorImage: getColorImage(
                                        product,
                                        chosenColor,
                                        true,
                                      ),
                                    },
                                    {
                                      variantLabel: variantLabel,
                                      price: currentPrice,
                                      size: chosenSize,
                                      color: chosenColor || "",
                                    },
                                    1,
                                  );
                              }}
                            >
                              <Plus size={12} strokeWidth={2} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={categoryPageStyles.addToCartButton}
                          >
                            <span>Add to Cart</span>
                            <ShoppingBag size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}
