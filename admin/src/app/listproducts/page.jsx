"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash,
  Loader2,
  ImageOff,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import AdminPageBackground from "@/components/AdminPageBackground";
import { productGalleryStyles, AdminRemainingStyles } from "@/app/styles/dummyStyles";
import { api } from "@/lib/api";
import {
  createId,
  filterCatalogProducts,
  getAvailableTypeOptions,
  getColorImage,
  getColorName,
  getProductGroupLabel,
  getTypeOptionsForGroup,
  toCatalogProduct,
} from "@/lib/product-catalog";

// --- Toast ---
function Toast({ message, type, onClose }) {
  return (
    <div className={productGalleryStyles.toastContainer(type)} role="status" aria-live="polite">
      <div className={productGalleryStyles.toastInner}>
        {type === "success" ? (
          <CheckCircle className={productGalleryStyles.toastIconSuccess} />
        ) : (
          <AlertCircle className={productGalleryStyles.toastIconError} />
        )}
        <span className={productGalleryStyles.toastMessage}>{message}</span>
        <button
          onClick={onClose}
          className={productGalleryStyles.toastCloseButton}
          aria-label="Close notification"
        >
          <X className={AdminRemainingStyles.listProducts.icon4} />
        </button>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function Page() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [primaryFilter, setPrimaryFilter] = useState("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [toast, setToast] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await api("/products");
      setProducts(result.products.map(toCatalogProduct));
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  const currentSubOptions = useMemo(() => {
    return getAvailableTypeOptions(products, primaryFilter);
  }, [primaryFilter, products]);

  const filtered = useMemo(() => {
    return filterCatalogProducts(products, {
      group: primaryFilter,
      type: subCategoryFilter,
      gender: genderFilter,
      query,
    });
  }, [products, primaryFilter, subCategoryFilter, genderFilter, query]);

  const editTypeOptions = useMemo(() => {
    return getTypeOptionsForGroup(editing?.group);
  }, [editing?.group]);

  const handleEdit = (product) => {
    // deep clone product so we can mutate safely in modal
    setEditing(JSON.parse(JSON.stringify(product)));
    setImagePreview(product.image);
    setImageFile(null);
    setShowModal(true);
  };

  const handleMainImageChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!editing.name || !editing.category) {
      showToast("Please fill required fields", "error");
      return;
    }

    setIsSaving(true);
    try {
      const variantEntries =
        editing.group === "grooming"
          ? editing.volumes || []
          : editing.sizes || [];
      if (
        !editing.brand?.trim() ||
        !editing.gender ||
        variantEntries.length === 0
      ) {
        showToast(
          "Please complete the product details and add at least one price.",
          "error",
        );
        return;
      }
      let uploaded = null;
      if (imageFile) {
        const form = new FormData();
        form.append("image", imageFile);
        uploaded = await api("/upload", { method: "POST", body: form });
      }
      const imageUrl = uploaded?.imageUrl || imagePreview || editing.image;
      const publicId =
        uploaded?.publicId || editing.colors?.[0]?.publicId || "";
      const colors = await Promise.all(
        (editing.colors || [{ color: "" }]).map(async (c) => {
          if (!c.file) return c;
          const form = new FormData();
          form.append("image", c.file);
          const result = await api("/upload", { method: "POST", body: form });
          return { ...c, image: result.imageUrl, publicId: result.publicId };
        }),
      );
      const colorsToSave = colors.length
        ? colors
        : [{ color: "", image: imageUrl, publicId }];
      await api(`/products/${editing.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: editing.name,
          brand: editing.brand,
          category: editing.group,
          subCategory: editing.category,
          gender: editing.gender,
          variants: colorsToSave.map((c) => ({
            color: getColorName(c),
            images: [
              {
                // Grooming has one main image. Accessories and clothing retain
                // their separate image for each colour.
                url:
                  editing.group === "grooming" ? imageUrl : c.image || imageUrl,
                publicId:
                  editing.group === "grooming"
                    ? publicId
                    : c.publicId || publicId,
              },
            ],
            sizes: variantEntries.map((entry) => ({
              size: entry.size || entry.label,
              price: Number(entry.price),
            })),
          })),
        }),
      });
      setShowModal(false);
      setEditing(null);
      setImagePreview(null);
      setImageFile(null);
      await loadProducts();
      showToast("Product updated successfully!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await api(`/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted successfully!");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setDeletingId(null);
    }
  };

  // Variant helpers used inside modal (stock removed)
  const addVariant = (type) => {
    if (!editing) return;
    if (type === "volume") {
      const arr = editing.volumes || [];
      const entry = { id: createId("v"), label: "", price: "" };
      setEditing({ ...editing, volumes: [...arr, entry] });
      return;
    }
    if (type === "size") {
      const arr = editing.sizes || [];
      const entry = { id: createId("s"), size: "", price: 0 };
      setEditing({ ...editing, sizes: [...arr, entry] });
      return;
    }
    if (type === "color") {
      const arr = editing.colors || [];
      setEditing({ ...editing, colors: [...arr, { color: "" }] });
      return;
    }
  };

  const updateVariant = (type, idOrIndex, field, value) => {
    if (!editing) return;
    if (type === "volume") {
      const arr = (editing.volumes || []).map((v) =>
        v.id === idOrIndex ? { ...v, [field]: value } : v,
      );
      setEditing({ ...editing, volumes: arr });
      return;
    }
    if (type === "size") {
      const arr = (editing.sizes || []).map((s) =>
        s.id === idOrIndex ? { ...s, [field]: value } : s,
      );
      setEditing({ ...editing, sizes: arr });
      return;
    }
    if (type === "color") {
      const arr = (editing.colors || []).map((c, idx) =>
        idx === idOrIndex
          ? { ...(typeof c === "object" ? c : { color: c }), color: value }
          : c,
      );
      setEditing({ ...editing, colors: arr });
      return;
    }
  };

  const updateColorImage = (index, file) => {
    if (!editing || !file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setEditing((prev) => ({
        ...prev,
        colors: (prev.colors || []).map((c, i) =>
          i === index
            ? {
                ...(typeof c === "object" ? c : { color: c }),
                file,
                image: reader.result,
                imagePreview: reader.result,
              }
            : c,
        ),
      }));
    reader.readAsDataURL(file);
  };

  const removeVariant = (type, idOrIndex) => {
    if (!editing) return;
    if (type === "volume") {
      setEditing({
        ...editing,
        volumes: (editing.volumes || []).filter((v) => v.id !== idOrIndex),
      });
      return;
    }
    if (type === "size") {
      setEditing({
        ...editing,
        sizes: (editing.sizes || []).filter((s) => s.id !== idOrIndex),
      });
      return;
    }
    if (type === "color") {
      setEditing({
        ...editing,
        colors: (editing.colors || []).filter((_, i) => i !== idOrIndex),
      });
      return;
    }
  };

  return (
    <>
      <Navbar />
      <AdminPageBackground />
      <div className={productGalleryStyles.mainContainer}>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        {deleteTarget && (
          <div className={AdminRemainingStyles.listProducts.deleteToast}>
            <p className={AdminRemainingStyles.listProducts.deleteTitle}>Delete this product?</p>
            <p className={AdminRemainingStyles.listProducts.mutedSmallText}>
              The product and its Cloudinary images will be removed.
            </p>
            <div className={AdminRemainingStyles.listProducts.deleteActions}>
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deletingId === deleteTarget}
                className={AdminRemainingStyles.listProducts.cancelDelete}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleDelete(deleteTarget);
                  setDeleteTarget(null);
                }}
                disabled={deletingId === deleteTarget}
                className={AdminRemainingStyles.listProducts.confirmDelete}
              >
                {deletingId === deleteTarget ? (
                  <>
                    <Loader2 className={AdminRemainingStyles.listProducts.inlineSpinner} />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        )}
        <div className={productGalleryStyles.contentContainer}>
          <header className={productGalleryStyles.headerContainer}>
            <div className={productGalleryStyles.headerTitleContainer}>
              <div>
                <h1 className={productGalleryStyles.headerTitle}>
                  Product List
                </h1>
                <p className={productGalleryStyles.headerSubtitle}>
                  Manage grooming, accessories and clothing with variants
                </p>
              </div>

              <div className={productGalleryStyles.searchContainer}>
                <div className={productGalleryStyles.searchInputContainer}>
                  <div className={productGalleryStyles.searchIconContainer}>
                    <Search className={productGalleryStyles.searchIcon} />
                  </div>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className={productGalleryStyles.searchInput}
                  />
                </div>
              </div>
            </div>

            <div className={productGalleryStyles.filterContainer}>
              <div className={productGalleryStyles.primaryFilterContainer}>
                <div
                  className={productGalleryStyles.primaryFilterButtonsContainer}
                >
                  {[
                    { key: "all", label: "All" },
                    { key: "grooming", label: "Grooming" },
                    { key: "accessories", label: "Accessories" },
                    { key: "clothing", label: "Clothing" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setPrimaryFilter(opt.key);
                        setSubCategoryFilter("all");
                      }}
                      className={productGalleryStyles.primaryFilterButton(
                        primaryFilter === opt.key,
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={productGalleryStyles.categoryFilterContainer}>
                <select
                  value={subCategoryFilter}
                  onChange={(e) => setSubCategoryFilter(e.target.value)}
                  className={productGalleryStyles.categorySelect}
                >
                  {currentSubOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className={productGalleryStyles.selectOption}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={productGalleryStyles.genderFilterContainer}>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className={productGalleryStyles.genderSelect}
                >
                  <option
                    value="all"
                    className={productGalleryStyles.selectOption}
                  >
                    Genders
                  </option>
                  <option
                    value="men"
                    className={productGalleryStyles.selectOption}
                  >
                    Men
                  </option>
                  <option
                    value="women"
                    className={productGalleryStyles.selectOption}
                  >
                    Women
                  </option>
                </select>
              </div>
            </div>
          </header>

          <section>
            {isLoading ? (
              <div className={productGalleryStyles.emptyStateContainer}>
                <Loader2 className={AdminRemainingStyles.listProducts.loadingSpinner} />
                <div className={productGalleryStyles.emptyStateText}>
                  Loading products...
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className={productGalleryStyles.emptyStateContainer}>
                <div className={productGalleryStyles.emptyStateText}>
                  No products found matching your criteria
                </div>
                <button
                  onClick={() => {
                    setPrimaryFilter("all");
                    setSubCategoryFilter("all");
                    setGenderFilter("all");
                    setQuery("");
                  }}
                  className={productGalleryStyles.clearFiltersButton}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={productGalleryStyles.productGrid}>
                {filtered.map((product) => (
                  <article
                    key={product.id}
                    className={productGalleryStyles.productCard}
                  >
                    <div className={productGalleryStyles.productImageContainer}>
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          width="600"
                          height="800"
                          loading="lazy"
                          className={productGalleryStyles.productImage}
                          onError={(event) => {
                            event.currentTarget.hidden = true;
                            event.currentTarget.parentElement.querySelector("[data-image-empty]").hidden = false;
                          }}
                        />
                      )}
                      <div data-image-empty hidden={Boolean(product.image)} className={productGalleryStyles.missingImage}>
                        <ImageOff aria-hidden="true" className={AdminRemainingStyles.listProducts.emptyImageIcon} />
                        <span>No image uploaded</span>
                      </div>
                      <div
                        className={productGalleryStyles.productCategoryBadge}
                      >
                        <span
                          className={productGalleryStyles.productCategoryLabel}
                        >
                          {getProductGroupLabel(product.group)}
                        </span>
                      </div>
                    </div>

                    <div className={productGalleryStyles.productInfoContainer}>
                      <div className={AdminRemainingStyles.listProducts.variantCard}>
                        <p className={AdminRemainingStyles.listProducts.sectionLabel}>
                          Product name
                        </p>
                        <h3 className={productGalleryStyles.productName}>
                          {product.name}
                        </h3>
                        <p className={AdminRemainingStyles.listProducts.sectionLabel}>
                          Brand
                        </p>
                        <p className={productGalleryStyles.productBrand}>
                          {product.brand || "Not specified"}
                        </p>
                      </div>

                      <div className={productGalleryStyles.variantSection}>
                        {product.group === "grooming" && (
                          <div className={AdminRemainingStyles.listProducts.column}>
                            <div className={productGalleryStyles.variantTitle}>
                              Volume & price
                            </div>
                            <ul className={productGalleryStyles.volumeList}>
                              {(product.volumes || []).map((v) => (
                                <li
                                  key={v.id}
                                  className={productGalleryStyles.volumeItem}
                                >
                                  <div>
                                    <div
                                      className={
                                        productGalleryStyles.volumeLabel
                                      }
                                    >
                                      {v.label}
                                    </div>
                                  </div>
                                  <div
                                    className={productGalleryStyles.volumePrice}
                                  >
                                    ₹{v.price}
                                  </div>
                                </li>
                              ))}
                            </ul>
                            {(product.colors || []).some((c) =>
                              getColorName(c).trim(),
                            ) && (
                              <div
                                className={productGalleryStyles.colorsContainer}
                              >
                                {(product.colors || [])
                                  .filter((c) => getColorName(c).trim())
                                  .map((c, i) => (
                                    <div
                                      key={i}
                                      className={AdminRemainingStyles.listProducts.variantBadge}
                                    >
                                      {getColorImage(c) && (
                                        <img
                                          src={getColorImage(c)}
                                          alt={getColorName(c)}
                                          className={AdminRemainingStyles.listProducts.thumbnail}
                                        />
                                      )}
                                      <span>
                                        {getColorName(c) || "Default"}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        )}

                        {product.group === "accessories" && (
                          <div className={AdminRemainingStyles.listProducts.column}>
                            <div className={productGalleryStyles.variantTitle}>
                              Size, price & colour
                            </div>
                            <div
                              className={productGalleryStyles.sizesContainer}
                            >
                              {(product.sizes || []).map((s) => (
                                <div
                                  key={`${s.size}-${s.price}`}
                                  className={productGalleryStyles.sizeBadge}
                                >
                                  <span className={AdminRemainingStyles.listProducts.sizeLabel}>Size:</span>
                                  <span className={AdminRemainingStyles.listProducts.sizeValue}>
                                    {s.size}
                                  </span>
                                  <span className={AdminRemainingStyles.listProducts.separator}>•</span>
                                  <span className={AdminRemainingStyles.listProducts.sizeLabel}>Price:</span>
                                  <span className={AdminRemainingStyles.listProducts.priceValue}>
                                    ₹{s.price}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div
                              className={productGalleryStyles.colorsContainer}
                            >
                              {(product.colors || []).map((c, i) => (
                                <div
                                  key={i}
                                  className={AdminRemainingStyles.listProducts.variantBadge}
                                >
                                  {getColorImage(c) && (
                                    <img
                                      src={getColorImage(c)}
                                      alt={getColorName(c)}
                                      className={AdminRemainingStyles.listProducts.thumbnail}
                                    />
                                  )}
                                  <span>{getColorName(c) || "Default"}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {product.group === "clothing" && (
                          <div className={AdminRemainingStyles.listProducts.column}>
                            <div className={productGalleryStyles.variantTitle}>
                              Size & price
                            </div>
                            <div
                              className={productGalleryStyles.sizesContainer}
                            >
                              {(product.sizes || []).map((s) => (
                                <div
                                  key={`${s.size}-${s.price}`}
                                  className={productGalleryStyles.sizeBadge}
                                >
                                  <span className={AdminRemainingStyles.listProducts.sizeLabel}>Size:</span>
                                  <span className={AdminRemainingStyles.listProducts.sizeValue}>
                                    {s.size}
                                  </span>
                                  <span className={AdminRemainingStyles.listProducts.separator}>•</span>
                                  <span className={AdminRemainingStyles.listProducts.sizeLabel}>Price:</span>
                                  <span className={AdminRemainingStyles.listProducts.priceValue}>
                                    ₹{s.price}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className={AdminRemainingStyles.listProducts.marginTop}>
                              <div
                                className={productGalleryStyles.variantTitle}
                              >
                                Colours
                              </div>
                              <div className={AdminRemainingStyles.listProducts.wrappingRow}>
                                {(product.colors || []).length > 0 ? (
                                  (product.colors || []).map((c, i) => (
                                    <div
                                      key={i}
                                      className={AdminRemainingStyles.listProducts.variantBadge}
                                    >
                                      {getColorImage(c) && (
                                        <img
                                          src={getColorImage(c)}
                                          alt={getColorName(c)}
                                          className={AdminRemainingStyles.listProducts.thumbnail}
                                        />
                                      )}
                                      <span>{getColorName(c)}</span>
                                    </div>
                                  ))
                                ) : (
                                  <div className={AdminRemainingStyles.listProducts.mutedText}>
                                    No colours set
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className={productGalleryStyles.productFooter}>
                        <div className={productGalleryStyles.productGender}>
                          {product.gender}
                        </div>

                        <div className={productGalleryStyles.productActions}>
                          <button
                            onClick={() => handleEdit(product)}
                            className={productGalleryStyles.editButton}
                          >
                            <Edit className={AdminRemainingStyles.listProducts.icon4} />{" "}
                            <span className={AdminRemainingStyles.listProducts.desktopOnly}>Edit</span>
                            <span className={AdminRemainingStyles.listProducts.mobileOnly}>Edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteTarget(product.id)}
                            disabled={deletingId === product.id}
                            className={productGalleryStyles.deleteButton}
                          >
                            <Trash2 className={AdminRemainingStyles.listProducts.icon4} />{" "}
                            <span className={AdminRemainingStyles.listProducts.desktopOnly}>
                              {deletingId === product.id
                                ? "Deleting..."
                                : "Delete"}
                            </span>
                            <span className={AdminRemainingStyles.listProducts.mobileOnly}>
                              {deletingId === product.id ? "..." : "Del"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Modal */}
        {showModal && editing && (
          <div className={productGalleryStyles.modalOverlay}>
            <div
              className={productGalleryStyles.modalBackdrop}
              onClick={() => {
                setShowModal(false);
                setEditing(null);
                setImagePreview(null);
              }}
            />

            <div className={productGalleryStyles.modalContainer}>
              <div className={productGalleryStyles.modalContent}>
                <div className={productGalleryStyles.modalHeader}>
                  <h2 className={productGalleryStyles.modalTitle}>
                    Edit Product
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditing(null);
                      setImagePreview(null);
                    }}
                    className={productGalleryStyles.modalCloseButton}
                  >
                    <X className={AdminRemainingStyles.listProducts.icon5} />
                  </button>
                </div>

                <div className={productGalleryStyles.formGrid}>
                  {editing.group === "grooming" && (
                    <div>
                      <label className={productGalleryStyles.imageUploadLabel}>
                        Main Product Image
                      </label>
                      <div className={AdminRemainingStyles.listProducts.flexGap}>
                        <div
                          className={productGalleryStyles.imagePreviewContainer}
                        >
                          {imagePreview || editing.image ? (
                            <img
                              src={imagePreview || editing.image}
                              alt="Main product preview"
                              className={productGalleryStyles.imagePreview}
                            />
                          ) : (
                            <div className={AdminRemainingStyles.listProducts.emptyState}>
                              No image selected
                            </div>
                          )}
                        </div>
                        <label className={AdminRemainingStyles.listProducts.imageUploadLabel}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleMainImageChange(e.target.files?.[0])
                            }
                            className={AdminRemainingStyles.addAccessories.hidden}
                          />
                          Replace main image
                        </label>
                      </div>
                    </div>
                  )}

                  <div className={productGalleryStyles.formField}>
                    <div>
                      <label className={productGalleryStyles.inputLabel}>
                        Product Name{" "}
                        <span className={productGalleryStyles.requiredStar}>
                          *
                        </span>
                      </label>
                      <input
                        value={editing.name}
                        onChange={(e) =>
                          setEditing({ ...editing, name: e.target.value })
                        }
                        className={productGalleryStyles.textInput}
                        placeholder="Enter product name"
                      />
                    </div>

                    <div className={productGalleryStyles.grid2}>
                      <div>
                        <label className={productGalleryStyles.inputLabel}>
                          Brand{" "}
                          <span className={productGalleryStyles.requiredStar}>
                            *
                          </span>
                        </label>
                        <input
                          value={editing.brand}
                          onChange={(e) =>
                            setEditing({ ...editing, brand: e.target.value })
                          }
                          className={AdminRemainingStyles.listProducts.input}
                          placeholder="Brand name"
                        />
                      </div>

                      <div>
                        <label className={productGalleryStyles.inputLabel}>
                          Type{" "}
                          <span className={productGalleryStyles.requiredStar}>
                            *
                          </span>
                        </label>
                        <select
                          value={editing.category}
                          onChange={(e) =>
                            setEditing({ ...editing, category: e.target.value })
                          }
                          className={AdminRemainingStyles.listProducts.input}
                        >
                          <option value="">Select type</option>
                          {editTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={productGalleryStyles.grid1sm2}>
                      <div>
                        <label className={productGalleryStyles.inputLabel}>
                          Gender
                        </label>
                        <select
                          value={editing.gender}
                          onChange={(e) =>
                            setEditing({ ...editing, gender: e.target.value })
                          }
                          className={AdminRemainingStyles.listProducts.input}
                        >
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Variant editors - responsive grids so on mobile inputs stack */}
                <div className={productGalleryStyles.variantEditorContainer}>
                  {editing.group === "grooming" && (
                    <div
                      className={productGalleryStyles.variantSectionContainer}
                    >
                      <div
                        className={productGalleryStyles.variantSectionHeader}
                      >
                        <h3
                          className={productGalleryStyles.variantSectionTitle}
                        >
                          Volumes (ml) & Prices
                        </h3>
                        <div className={AdminRemainingStyles.listProducts.addButtonRow}>
                          <button
                            onClick={() => addVariant("volume")}
                            className={productGalleryStyles.addVariantButton}
                          >
                            <Plus className={AdminRemainingStyles.listProducts.icon4} /> Add Volume
                          </button>
                        </div>
                      </div>

                      <div className={AdminRemainingStyles.listProducts.variantsGrid}>
                        {(editing.volumes || []).map((v) => (
                          <div
                            key={v.id}
                            className={productGalleryStyles.volumeItemGrid}
                          >
                            <input
                              aria-label="Volume"
                              className={productGalleryStyles.volumeInput}
                              value={v.label}
                              placeholder="Volume"
                              onChange={(e) =>
                                updateVariant(
                                  "volume",
                                  v.id,
                                  "label",
                                  e.target.value,
                                )
                              }
                            />
                            <input
                              type="number"
                              inputMode="numeric"
                              aria-label="Price"
                              placeholder="Price"
                              className={`${productGalleryStyles.volumePriceInput} ${AdminRemainingStyles.shared.schemeDark}`}
                              value={v.price}
                              onChange={(e) =>
                                updateVariant(
                                  "volume",
                                  v.id,
                                  "price",
                                  e.target.value,
                                )
                              }
                            />
                            <div
                              className={
                                productGalleryStyles.volumeRemoveButton
                              }
                            >
                              <button
                                onClick={() => removeVariant("volume", v.id)}
                                className={productGalleryStyles.removeButton}
                                title="Remove volume"
                              >
                                <Trash2 className={AdminRemainingStyles.listProducts.smallDeleteIcon} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {(editing.volumes || []).length === 0 && (
                        <div className={AdminRemainingStyles.listProducts.mutedTextSmall}>
                          No volumes yet — add one to set specific prices.
                        </div>
                      )}
                    </div>
                  )}

                  {editing.group === "accessories" && (
                    <div
                      className={productGalleryStyles.variantSectionContainer}
                    >
                      <div
                        className={productGalleryStyles.variantSectionHeader}
                      >
                        <h3
                          className={productGalleryStyles.variantSectionTitle}
                        >
                          Sizes & Prices
                        </h3>
                        <div className={AdminRemainingStyles.listProducts.addButtonRow}>
                          <button
                            onClick={() => addVariant("size")}
                            className={productGalleryStyles.addVariantButton}
                          >
                            <Plus className={AdminRemainingStyles.listProducts.icon4} /> Add Size
                          </button>
                        </div>
                      </div>

                      <div className={AdminRemainingStyles.listProducts.variantsGrid}>
                        {(editing.sizes || []).map((s) => (
                          <div
                            key={s.id}
                            className={productGalleryStyles.sizeItemGrid}
                          >
                            <input
                              className={productGalleryStyles.sizeInput}
                              value={s.size}
                              onChange={(e) =>
                                updateVariant(
                                  "size",
                                  s.id,
                                  "size",
                                  e.target.value,
                                )
                              }
                            />
                            <input
                              type="number"
                              inputMode="numeric"
                              className={`${productGalleryStyles.sizePriceInput} ${AdminRemainingStyles.shared.schemeDark}`}
                              value={s.price}
                              onChange={(e) =>
                                updateVariant(
                                  "size",
                                  s.id,
                                  "price",
                                  e.target.value,
                                )
                              }
                            />
                            <div className={AdminRemainingStyles.listProducts.sizeRemoveRow}>
                              <button
                                onClick={() => removeVariant("size", s.id)}
                                className={productGalleryStyles.removeButton}
                                title="Remove size"
                              >
                                <Trash className={AdminRemainingStyles.listProducts.smallDeleteIcon} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className={AdminRemainingStyles.listProducts.marginTop}>
                        <div className={AdminRemainingStyles.listProducts.colorGrid}>
                          <h4 className={AdminRemainingStyles.listProducts.availableColors}>Available Colours</h4>
                          <button
                            onClick={() => addVariant("color")}
                            className={productGalleryStyles.addVariantButton}
                          >
                            <Plus className={AdminRemainingStyles.listProducts.icon4} /> Add Colour
                          </button>
                        </div>

                        <div className={AdminRemainingStyles.listProducts.colorList}>
                          {(editing.colors || []).map((c, i) => (
                            <div
                              key={i}
                              className={`${productGalleryStyles.colorItemContainer} ${AdminRemainingStyles.shared.flexWrap}`}
                            >
                              <input
                                value={getColorName(c)}
                                onChange={(e) =>
                                  updateVariant(
                                    "color",
                                    i,
                                    null,
                                    e.target.value,
                                  )
                                }
                                className={productGalleryStyles.colorInput}
                              />
                              {getColorImage(c) && (
                                <img
                                  src={getColorImage(c)}
                                  alt={`${getColorName(c) || "Colour"} preview`}
                                  className={AdminRemainingStyles.listProducts.colorImage}
                                />
                              )}
                              <label className={AdminRemainingStyles.listProducts.colorUploadLabel}>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    updateColorImage(i, e.target.files?.[0])
                                  }
                                  className={AdminRemainingStyles.addAccessories.hidden}
                                />
                                {getColorImage(c)
                                  ? "Replace image"
                                  : "Upload image"}
                              </label>

                              <button
                                onClick={() => removeVariant("color", i)}
                                className={productGalleryStyles.removeButton}
                                title="Remove colour"
                              >
                                <Trash className={AdminRemainingStyles.listProducts.smallDeleteIcon} />
                              </button>
                            </div>
                          ))}

                          {(editing.colors || []).length === 0 && (
                            <div className={AdminRemainingStyles.listProducts.mutedTextSmall}>
                              No colours — add some.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {editing.group === "clothing" && (
                    <div
                      className={productGalleryStyles.variantSectionContainer}
                    >
                      <div
                        className={productGalleryStyles.variantSectionHeader}
                      >
                        <h3
                          className={productGalleryStyles.variantSectionTitle}
                        >
                          Sizes & Prices
                        </h3>
                        <div className={AdminRemainingStyles.listProducts.addButtonRow}>
                          <button
                            onClick={() => addVariant("size")}
                            className={productGalleryStyles.addVariantButton}
                          >
                            <Plus className={AdminRemainingStyles.listProducts.icon4} /> Add Size
                          </button>
                        </div>
                      </div>

                      <div className={AdminRemainingStyles.listProducts.variantsGrid}>
                        {(editing.sizes || []).map((s) => (
                          <div
                            key={s.id}
                            className={productGalleryStyles.sizeItemGrid}
                          >
                            <input
                              className={AdminRemainingStyles.listProducts.sizeInput}
                              value={s.size}
                              placeholder="Size (S, M, L, 42...)"
                              onChange={(e) =>
                                updateVariant(
                                  "size",
                                  s.id,
                                  "size",
                                  e.target.value,
                                )
                              }
                            />

                            <input
                              type="number"
                              inputMode="numeric"
                              className={AdminRemainingStyles.listProducts.priceInput}
                              placeholder="₹"
                              value={s.price}
                              onChange={(e) =>
                                updateVariant(
                                  "size",
                                  s.id,
                                  "price",
                                  e.target.value,
                                )
                              }
                            />

                            <div className={AdminRemainingStyles.listProducts.colorRemoveRow}>
                              <button
                                onClick={() => removeVariant("size", s.id)}
                                className={AdminRemainingStyles.listProducts.removeVariant}
                                title="Delete size"
                              >
                                <Trash className={AdminRemainingStyles.listProducts.tinyImageDeleteIcon} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {(editing.sizes || []).length === 0 && (
                        <div className={AdminRemainingStyles.listProducts.mutedTextSmall}>
                          No sizes — add some.
                        </div>
                      )}

                      <div className={AdminRemainingStyles.listProducts.marginTop}>
                        <div className={AdminRemainingStyles.listProducts.colorGrid}>
                          <h4 className={AdminRemainingStyles.listProducts.availableColors}>Available Colours</h4>
                          <button
                            onClick={() => addVariant("color")}
                            className={productGalleryStyles.addVariantButton}
                          >
                            <Plus className={AdminRemainingStyles.listProducts.icon4} /> Add Colour
                          </button>
                        </div>

                        <div className={AdminRemainingStyles.listProducts.colorList}>
                          {(editing.colors || []).map((c, i) => (
                            <div
                              key={i}
                              className={`${productGalleryStyles.colorItemContainer} ${AdminRemainingStyles.shared.flexWrap}`}
                            >
                              <input
                                value={getColorName(c)}
                                onChange={(e) =>
                                  updateVariant(
                                    "color",
                                    i,
                                    null,
                                    e.target.value,
                                  )
                                }
                                className={productGalleryStyles.colorInput}
                              />
                              {getColorImage(c) && (
                                <img
                                  src={getColorImage(c)}
                                  alt={`${getColorName(c) || "Colour"} preview`}
                                  className={AdminRemainingStyles.listProducts.colorImage}
                                />
                              )}
                              <label className={AdminRemainingStyles.listProducts.colorUploadLabel}>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    updateColorImage(i, e.target.files?.[0])
                                  }
                                  className={AdminRemainingStyles.addAccessories.hidden}
                                />
                                {getColorImage(c)
                                  ? "Replace image"
                                  : "Upload image"}
                              </label>

                              <button
                                onClick={() => removeVariant("color", i)}
                                className={productGalleryStyles.removeButton}
                                title="Remove colour"
                              >
                                <Trash className={AdminRemainingStyles.listProducts.smallDeleteIcon} />
                              </button>
                            </div>
                          ))}

                          {(editing.colors || []).length === 0 && (
                            <div className={AdminRemainingStyles.listProducts.mutedTextSmall}>
                              No colours — add some.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={productGalleryStyles.modalFooter}>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditing(null);
                      setImagePreview(null);
                    }}
                    className={productGalleryStyles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={productGalleryStyles.saveButton}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className={AdminRemainingStyles.listProducts.smallSpinner} />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx global>{`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
          .line-clamp-1 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          .line-clamp-2 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }

          .animated-border {
            border: 1px solid rgba(255, 255, 255, 0.03);
            transition:
              box-shadow 300ms ease,
              border-color 300ms ease,
              transform 200ms ease;
          }
          .animated-border:hover {
            border-color: rgba(255, 255, 255, 0.16);
            box-shadow:
              0 6px 18px rgba(255, 255, 255, 0.03),
              0 0 30px rgba(255, 255, 255, 0.02) inset;
            transform: translateY(-3px);
          }
          @keyframes borderPulse {
            0% {
              box-shadow: 0 0 0 rgba(255, 255, 255, 0);
            }
            50% {
              box-shadow: 0 0 12px rgba(255, 255, 255, 0.02);
            }
            100% {
              box-shadow: 0 0 0 rgba(255, 255, 255, 0);
            }
          }
          .animated-border:focus-within,
          .animated-border[aria-expanded="true"] {
            animation: borderPulse 3s ease-in-out infinite;
            border-color: rgba(255, 255, 255, 0.12);
          }

          /* Amount fields are edited as plain text/numeric inputs, without browser steppers. */
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
            appearance: textfield;
          }

          .bg-linear-to-br {
            background-image: linear-gradient(
              135deg,
              rgba(17, 17, 17, 1) 0%,
              rgba(7, 7, 7, 1) 100%
            );
          }

          button:focus {
            outline: 2px solid rgba(255, 255, 255, 0.06);
            outline-offset: 2px;
          }

          .transform-gpu {
            transform: translateZ(0);
          }
        `}</style>
      </div>
    </>
  );
}
