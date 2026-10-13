// app/admin/addaccessories/page.jsx (or wherever your Admin AddAccessories page is located)
"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import AdminPageBackground from "@/components/AdminPageBackground";
import {
  Upload,
  Plus,
  Trash2,
  Tag,
  User,
  Package,
  Ruler,
  IndianRupee,
  Camera,
  Hash,
  ChevronDown,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Import styles from the centralized file
import { AddAccessoriesPageStyles, AdminRemainingStyles } from "@/app/styles/dummyStyles";
import { api } from "@/lib/api";
import { createCatalogProduct, revokeObjectUrl } from "@/lib/product-form";

const AddAccessoriesPage = () => {
  const [product, setProduct] = useState(createCatalogProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // refs to handle file input and prevent memory leaks from object URLs
  const fileInputRef = useRef(null);
  const prevImageUrlRef = useRef(null);

  // Keep these values aligned with the public Accessories category routes.
  const accessoryTypes = {
    men: [
      "Belt",
      "Socks",
      "Cap",
      "Perfume",
      "Handbags",
      "Chain Necklace",
      "Goggles",
      "Tie Set",
    ],
    women: [
      "Belt",
      "Socks",
      "Cap",
      "Perfume",
      "Handbags",
      "Chain Necklace",
      "Goggles",
      "Tie Set",
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "gender" && { category: "" }),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // revoke previous URL if present
      if (prevImageUrlRef.current) {
        revokeObjectUrl(prevImageUrlRef.current);
        prevImageUrlRef.current = null;
      }

      const url = URL.createObjectURL(file);
      prevImageUrlRef.current = url;

      setProduct((prev) => ({
        ...prev,
        image: file,
        imagePreview: url,
      }));
    }
  };

  const handleColorChange = (index, value) => {
    const newColors = [...product.colors];
    newColors[index] = { ...newColors[index], color: value };
    setProduct((prev) => ({ ...prev, colors: newColors }));
  };

  const handleColorImageChange = (index, file) => {
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return toast.error("Please select an image file");
    const reader = new FileReader();
    reader.onloadend = () =>
      setProduct((prev) => ({
        ...prev,
        image: prev.image || file,
        colors: prev.colors.map((c, i) =>
          i === index
            ? { ...c, file, image: reader.result, imagePreview: reader.result }
            : c,
        ),
      }));
    reader.readAsDataURL(file);
  };

  const removeColorImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      colors: prev.colors.map((color, i) =>
        i === index
          ? { ...color, file: undefined, image: undefined, imagePreview: undefined }
          : color,
      ),
    }));
  };

  const addColor = () =>
    setProduct((prev) => ({
      ...prev,
      colors: [...prev.colors, { color: "" }],
    }));
  const removeColor = (index) => {
    if (product.colors.length > 1) {
      setProduct((prev) => ({
        ...prev,
        colors: prev.colors.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...product.sizes];
    newSizes[index][field] = value;
    setProduct((prev) => ({ ...prev, sizes: newSizes }));
  };

  const addSize = () =>
    setProduct((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", price: "" }],
    }));
  const removeSize = (index) => {
    if (product.sizes.length > 1) {
      setProduct((prev) => ({
        ...prev,
        sizes: prev.sizes.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    if (!product.name.trim()) return toast.error("✗ Item name is required");
    if (!product.brand.trim()) return toast.error("✗ Brand name is required");
    if (!product.gender) return toast.error("✗ Please select gender");
    if (!product.category) return toast.error("✗ Please select accessory type");
    if (!product.image) return toast.error("✗ Product image is required");

    for (const color of product.colors) {
      if (!color.color.trim())
        return toast.error("✗ Please fill all color fields");
    }

    for (const size of product.sizes) {
      if (!size.size.trim() || !String(size.price).trim())
        return toast.error("✗ Please fill all size and price fields");
      if (isNaN(parseFloat(size.price)))
        return toast.error("✗ Price must be a valid number");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const variants = await Promise.all(
        product.colors.map(async (c) => {
          if (!c.file)
            throw new Error(`Please upload an image for ${c.color}.`);
          const form = new FormData();
          form.append("image", c.file);
          const colourImage = await api("/upload", {
            method: "POST",
            body: form,
          });
          return {
            color: c.color,
            images: [
              { url: colourImage.imageUrl, publicId: colourImage.publicId },
            ],
            sizes: product.sizes.map((s) => ({
              size: s.size,
              price: Number(s.price),
            })),
          };
        }),
      );
      await api("/products/add", {
        method: "POST",
        body: JSON.stringify({
          name: product.name,
          brand: product.brand,
          category: "accessories",
          subCategory: product.category,
          gender: product.gender,
          variants,
        }),
      });
    } catch (err) {
      toast.error(err.message);
      return;
    } finally {
      setIsSubmitting(false);
    }

    // Clear any existing toasts then show only one success toast
    toast.dismiss();
    toast.success("✨ Accessory added successfully!", {
      duration: 3000,
      style: AddAccessoriesPageStyles.toastStyle,
    });

    // cleanup previous preview url
    if (prevImageUrlRef.current) {
      revokeObjectUrl(prevImageUrlRef.current);
      prevImageUrlRef.current = null;
    }

    setProduct(createCatalogProduct());

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (prevImageUrlRef.current) {
        revokeObjectUrl(prevImageUrlRef.current);
        prevImageUrlRef.current = null;
      }
    };
  }, []);

  // open file dialog (used by clickable preview)
  const openFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <>
      <Navbar />
      <AdminPageBackground />
      <Toaster
        position="top-right"
        containerStyle={{ top: 128 }}
        limit={1} // ensure only one toast is visible at a time
        toastOptions={{
          style: AddAccessoriesPageStyles.toastStyle,
        }}
      />

      <div className={AddAccessoriesPageStyles.mainContainer}>
        <div className={AddAccessoriesPageStyles.contentContainer}>
          {/* Header */}
          <div className={AddAccessoriesPageStyles.headerContainer}>
            <h1 className={AddAccessoriesPageStyles.headerTitle}>
              Add{" "}
              <span className={AddAccessoriesPageStyles.titleGradient}>
                Accessory
              </span>
            </h1>
            <p className={AddAccessoriesPageStyles.headerDescription}>
              Add exquisite accessories to elevate your collection
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className={AddAccessoriesPageStyles.formContainer}
          >
            {/* Image Upload */}
            <div
              className={`${AddAccessoriesPageStyles.sectionContainer} ${AdminRemainingStyles.addAccessories.hidden}`}
            >
              <div className={AddAccessoriesPageStyles.sectionGlow}></div>
              <div
                className={`${AddAccessoriesPageStyles.sectionInner} ${AddAccessoriesPageStyles.getSectionBorder()}`}
              >
                <div className={AddAccessoriesPageStyles.sectionHeader}>
                  <div
                    className={`${AddAccessoriesPageStyles.sectionIconContainer} ${AddAccessoriesPageStyles.getSectionBorder()}`}
                  >
                    <Camera className={AddAccessoriesPageStyles.sectionIcon} />
                  </div>
                  <div>
                    <h2 className={AddAccessoriesPageStyles.sectionTitle}>
                      Product Image
                    </h2>
                  </div>
                </div>

                <div className={AddAccessoriesPageStyles.imageUploadGrid}>
                  {/* Preview (clickable & keyboard accessible) */}
                  <div
                    className={AddAccessoriesPageStyles.imagePreviewContainer}
                    onClick={openFileDialog}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openFileDialog();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload or select accessory image"
                  >
                    {product.imagePreview ? (
                      <img
                        src={product.imagePreview}
                        alt="Preview"
                        className={AddAccessoriesPageStyles.imagePreviewImage}
                      />
                    ) : (
                      <div
                        className={
                          AddAccessoriesPageStyles.imagePreviewPlaceholder
                        }
                      >
                        <div
                          className={
                            AddAccessoriesPageStyles.imagePreviewIconContainer
                          }
                        >
                          <Upload
                            className={
                              AddAccessoriesPageStyles.imagePreviewIcon
                            }
                          />
                        </div>
                        <p
                          className={AddAccessoriesPageStyles.imagePreviewText}
                        >
                          Click to upload accessory image
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Upload */}
                  <div className={AdminRemainingStyles.addAccessories.centeredColumn}>
                    <div className={AdminRemainingStyles.addAccessories.clickable}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={AdminRemainingStyles.addAccessories.hidden}
                      />
                      <div
                        onClick={() =>
                          fileInputRef.current && fileInputRef.current.click()
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            fileInputRef.current &&
                              fileInputRef.current.click();
                        }}
                        role="button"
                        tabIndex={0}
                        className={AddAccessoriesPageStyles.uploadArea}
                      >
                        <div className={AddAccessoriesPageStyles.uploadContent}>
                          <div
                            className={
                              AddAccessoriesPageStyles.uploadIconContainer
                            }
                          >
                            <Upload
                              className={AddAccessoriesPageStyles.uploadIcon}
                            />
                          </div>
                          <p className={AddAccessoriesPageStyles.uploadTitle}>
                            Upload Image
                          </p>
                          <p
                            className={AddAccessoriesPageStyles.uploadSubtitle}
                          >
                            PNG, JPG, WEBP
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className={AddAccessoriesPageStyles.sectionContainer}>
              <div className={AddAccessoriesPageStyles.sectionGlow}></div>
              <div
                className={`${AddAccessoriesPageStyles.sectionInner} ${AddAccessoriesPageStyles.getSectionBorder()}`}
              >
                <div className={AddAccessoriesPageStyles.sectionHeader}>
                  <div
                    className={`${AddAccessoriesPageStyles.sectionIconContainer} ${AddAccessoriesPageStyles.getSectionBorder()}`}
                  >
                    <Tag className={AddAccessoriesPageStyles.sectionIcon} />
                  </div>
                  <div>
                    <h2 className={AddAccessoriesPageStyles.sectionTitle}>
                      Basic Information
                    </h2>
                  </div>
                </div>

                <div className={AddAccessoriesPageStyles.basicInfoGrid}>
                  {/* Item Name */}
                  <div className={AddAccessoriesPageStyles.formField}>
                    <label className={AddAccessoriesPageStyles.fieldLabel}>
                      <div className={AddAccessoriesPageStyles.labelContainer}>
                        <div
                          className={AddAccessoriesPageStyles.getLabelIconClass(
                            "blue",
                          )}
                        >
                          <Tag className={AddAccessoriesPageStyles.labelIcon} />
                        </div>
                        Item Name
                      </div>
                    </label>
                    <div className={AdminRemainingStyles.addAccessories.relative}>
                      <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className={AddAccessoriesPageStyles.inputField}
                        placeholder="Enter accessory name"
                        required
                      />
                    </div>
                  </div>

                  {/* Brand Name */}
                  <div className={AddAccessoriesPageStyles.formField}>
                    <label className={AddAccessoriesPageStyles.fieldLabel}>
                      <div className={AddAccessoriesPageStyles.labelContainer}>
                        <div
                          className={AddAccessoriesPageStyles.getLabelIconClass(
                            "purple",
                          )}
                        >
                          <Hash
                            className={AddAccessoriesPageStyles.labelIcon}
                          />
                        </div>
                        Brand Name
                      </div>
                    </label>
                    <div className={AdminRemainingStyles.addAccessories.relative}>
                      <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        className={AddAccessoriesPageStyles.inputField}
                        placeholder="Enter brand name"
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className={AddAccessoriesPageStyles.formField}>
                    <label className={AddAccessoriesPageStyles.fieldLabel}>
                      <div className={AddAccessoriesPageStyles.labelContainer}>
                        <div
                          className={AddAccessoriesPageStyles.getLabelIconClass(
                            "green",
                          )}
                        >
                          <User
                            className={AddAccessoriesPageStyles.labelIcon}
                          />
                        </div>
                        Gender
                      </div>
                    </label>
                    <div className={AddAccessoriesPageStyles.selectContainer}>
                      <select
                        name="gender"
                        value={product.gender}
                        onChange={handleChange}
                        className={AddAccessoriesPageStyles.selectField}
                        required
                      >
                        <option value="" className={AdminRemainingStyles.addAccessories.option}>
                          Select Gender
                        </option>
                        <option value="men" className={AdminRemainingStyles.addAccessories.option}>
                          Men
                        </option>
                        <option value="women" className={AdminRemainingStyles.addAccessories.option}>
                          Women
                        </option>
                      </select>
                      <div className={AddAccessoriesPageStyles.selectIcon}>
                        <ChevronDown
                          className={AddAccessoriesPageStyles.selectChevron}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Accessory Type */}
                  <div className={AddAccessoriesPageStyles.formField}>
                    <label className={AddAccessoriesPageStyles.fieldLabel}>
                      <div className={AddAccessoriesPageStyles.labelContainer}>
                        <div
                          className={AddAccessoriesPageStyles.getLabelIconClass(
                            "amber",
                          )}
                        >
                          <Package
                            className={AddAccessoriesPageStyles.labelIcon}
                          />
                        </div>
                        Accessory Type
                      </div>
                    </label>
                    <div className={AddAccessoriesPageStyles.selectContainer}>
                      <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className={`${AddAccessoriesPageStyles.selectField} ${AddAccessoriesPageStyles.selectDisabled}`}
                        required
                        disabled={!product.gender}
                      >
                        <option value="" className={AdminRemainingStyles.addAccessories.option}>
                          Select Accessory Type
                        </option>
                        {product.gender &&
                          accessoryTypes[product.gender]?.map((cat) => (
                            <option
                              key={cat}
                              value={cat.toLowerCase()}
                              className={AdminRemainingStyles.addAccessories.option}
                            >
                              {cat}
                            </option>
                          ))}
                      </select>
                      <div className={AddAccessoriesPageStyles.selectIcon}>
                        <ChevronDown
                          className={AddAccessoriesPageStyles.selectChevron}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colors Section */}
            <div className={AddAccessoriesPageStyles.sectionContainer}>
              <div className={AddAccessoriesPageStyles.sectionGlow}></div>
              <div
                className={`${AddAccessoriesPageStyles.sectionInner} ${AddAccessoriesPageStyles.getSectionBorder(true)}`}
              >
                <div className={AddAccessoriesPageStyles.colorsHeader}>
                  <div className={AdminRemainingStyles.addAccessories.featureRow}>
                    <div>
                      <h2
                        className={AddAccessoriesPageStyles.smallSectionTitle}
                      >
                        Available Colors
                      </h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addColor}
                    className={AddAccessoriesPageStyles.getAddButtonClass("sm")}
                  >
                    <div
                      className={AddAccessoriesPageStyles.getIconContainerClass(
                        "pink",
                      )}
                    >
                      <Plus
                        className={AddAccessoriesPageStyles.addButtonIcon}
                      />
                    </div>
                    Add Color
                  </button>
                </div>

                <div className={AddAccessoriesPageStyles.colorsGrid}>
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={AddAccessoriesPageStyles.colorItem}
                    >
                      <div
                        className={AddAccessoriesPageStyles.colorInputContainer}
                      >
                        <div
                          className={AddAccessoriesPageStyles.colorInputWrapper}
                        >
                          <label
                            className={AddAccessoriesPageStyles.colorInputLabel}
                          >
                            Color {index + 1}
                          </label>
                          <div className={AdminRemainingStyles.addAccessories.relative}>
                            <input
                              type="text"
                              value={color.color}
                              onChange={(e) =>
                                handleColorChange(index, e.target.value)
                              }
                              className={AddAccessoriesPageStyles.colorInput}
                              placeholder="e.g., Gold, Silver, Black"
                              required
                            />
                          </div>
                          <label className={AdminRemainingStyles.addAccessories.uploadLabel}>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleColorImageChange(
                                  index,
                                  e.target.files?.[0],
                                )
                              }
                              className={AdminRemainingStyles.addAccessories.hidden}
                            />
                            {color.imagePreview
                              ? "Change colour image"
                              : "Add colour image"}
                          </label>
                      {color.imagePreview && (
                            <div className={AdminRemainingStyles.addAccessories.previewWrap}>
                              <img
                                src={color.imagePreview}
                                alt={color.color || "Colour preview"}
                                className={AdminRemainingStyles.addAccessories.image}
                              />
                              <button
                                type="button"
                                onClick={() => removeColorImage(index)}
                                aria-label={`Remove ${color.color || "colour"} image`}
                                className={AdminRemainingStyles.addAccessories.removeImage}
                              >
                                <Trash2 className={AdminRemainingStyles.addAccessories.removeIcon} />
                              </button>
                            </div>
                          )}
                        </div>
                        {product.colors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeColor(index)}
                            className={
                              AddAccessoriesPageStyles.colorRemoveButton
                            }
                          >
                            <Trash2
                              className={
                                AddAccessoriesPageStyles.colorRemoveIcon
                              }
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sizes & Pricing */}
            <div className={AddAccessoriesPageStyles.sectionContainer}>
              <div className={AddAccessoriesPageStyles.sectionGlow}></div>
              <div
                className={`${AddAccessoriesPageStyles.sectionInner} ${AddAccessoriesPageStyles.getSectionBorder()}`}
              >
                <div className={AddAccessoriesPageStyles.sizesHeader}>
                  <div className={AdminRemainingStyles.addAccessories.row}>
                    <div
                      className={`${AddAccessoriesPageStyles.sectionIconContainer} ${AddAccessoriesPageStyles.getSectionBorder(true)}`}
                    >
                      <Ruler className={AddAccessoriesPageStyles.sectionIcon} />
                    </div>
                    <div>
                      <h2
                        className={AddAccessoriesPageStyles.smallSectionTitle}
                      >
                        Sizes & Pricing
                      </h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addSize}
                    className={AddAccessoriesPageStyles.getAddButtonClass("xs")}
                  >
                    <div
                      className={AddAccessoriesPageStyles.getIconContainerClass(
                        "emerald",
                      )}
                    >
                      <Plus
                        className={AddAccessoriesPageStyles.addButtonIcon}
                      />
                    </div>
                    Add Size
                  </button>
                </div>

                <div className={AddAccessoriesPageStyles.sizesGrid}>
                  {product.sizes.map((sizeItem, index) => (
                    <div
                      key={index}
                      className={AddAccessoriesPageStyles.sizeItem}
                    >
                      <div className={AddAccessoriesPageStyles.sizeInnerGrid}>
                        <div>
                          <label className={AddAccessoriesPageStyles.sizeLabel}>
                            <div
                              className={AddAccessoriesPageStyles.sizeLabelRow}
                            >
                              <div
                                className={AddAccessoriesPageStyles.getLabelIconClass(
                                  "amber",
                                )}
                              >
                                <Ruler
                                  className={AddAccessoriesPageStyles.labelIcon}
                                />
                              </div>
                              Size
                            </div>
                          </label>
                          <div
                            className={
                              AddAccessoriesPageStyles.sizeInputContainer
                            }
                          >
                            <input
                              type="text"
                              value={sizeItem.size}
                              onChange={(e) =>
                                handleSizeChange(index, "size", e.target.value)
                              }
                              className={AddAccessoriesPageStyles.sizeInput}
                              placeholder="e.g., Small, Medium, 16 inches"
                              required
                            />
                            <div
                              className={AddAccessoriesPageStyles.sizeInputIcon}
                            >
                              <Ruler
                                className={AddAccessoriesPageStyles.labelIcon}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className={AddAccessoriesPageStyles.sizeLabel}>
                            <div
                              className={AddAccessoriesPageStyles.sizeLabelRow}
                            >
                              <div
                                className={AddAccessoriesPageStyles.getLabelIconClass(
                                  "emerald",
                                )}
                              >
                                <IndianRupee
                                  className={AddAccessoriesPageStyles.labelIcon}
                                />
                              </div>
                              Price (₹)
                            </div>
                          </label>
                          <div
                            className={
                              AddAccessoriesPageStyles.sizeInputContainer
                            }
                          >
                            <input
                              type="number"
                              value={sizeItem.price}
                              onChange={(e) =>
                                handleSizeChange(index, "price", e.target.value)
                              }
                              className={`${AddAccessoriesPageStyles.sizePriceInput} ${AdminRemainingStyles.shared.schemeDark}`}
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              required
                            />
                            <div
                              className={AddAccessoriesPageStyles.sizeInputIcon}
                            >
                              ₹
                            </div>
                          </div>
                        </div>

                        <div className={AdminRemainingStyles.addAccessories.rightAlignedRow}>
                          {product.sizes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSize(index)}
                              className={
                                AddAccessoriesPageStyles.sizeRemoveButton
                              }
                            >
                              <Trash2
                                className={
                                  AddAccessoriesPageStyles.sizeRemoveIcon
                                }
                              />
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className={AddAccessoriesPageStyles.submitButtonContainer}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={AddAccessoriesPageStyles.submitButton}
              >
                <div
                  className={AddAccessoriesPageStyles.submitButtonShimmer}
                ></div>
                <span className={AddAccessoriesPageStyles.submitButtonText}>
                  {isSubmitting ? "Adding..." : "Add Accessory"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAccessoriesPage;
