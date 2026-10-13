 <div className={addProductStyles.pageContainer}>
        <div className={addProductStyles.contentContainer}>
          {/* Header */}
          <div className={addProductStyles.headerContainer}>
            <h1
              className={addProductStyles.headerTitle}
              style={addProductStyles.headerTitleGradient}
            >
              Add New Clothing
            </h1>
            <p className={addProductStyles.headerSubtitle}>
              Fill in all required fields to add clothing to your store
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={addProductStyles.formContainer}
          >
            {/* Image Upload Section */}
            <div className={`${addProductStyles.sectionContainer} ${AdminRemainingStyles.shared.hidden}`}>
              <div className={addProductStyles.sectionHeader}>
                <div className={addProductStyles.sectionIconContainer}>
                  <Upload className={addProductStyles.sectionIcon} />
                </div>
                <div>
                  <h2 className={addProductStyles.sectionTitle}>
                    Clothing Image
                  </h2>
                  <p className={addProductStyles.sectionSubtitle}>
                    Upload a high-quality clothing image
                  </p>
                </div>
              </div>

              <div className={addProductStyles.imageUploadPreviewContainer}>
                {/* Image Preview (clickable) */}
                <div className={AdminRemainingStyles.addCategories.flexibleFullWidth}>
                  <div
                    onClick={openFileDialog}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openFileDialog();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload or select clothing image"
                    className={addProductStyles.imagePreviewWrapper(
                      product.imagePreview,
                    )}
                    style={addProductStyles.imagePreviewWrapperInlineStyle}
                  >
                    <div className={addProductStyles.imagePreview}>
                      {product.imagePreview ? (
                        <img
                          src={product.imagePreview}
                          alt="Preview"
                          className={addProductStyles.imagePreviewImg}
                        />
                      ) : (
                        <div
                          className={addProductStyles.imageUploadPlaceholder}
                        >
                          <Upload
                            className={addProductStyles.placeholderIcon}
                          />
                          <p className={addProductStyles.placeholderText}>
                            Tap to upload image
                          </p>
                          <p className={addProductStyles.placeholderSubtext}>
                            PNG, JPG, WEBP
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Small overlay for very small screens */}
                    <div className={addProductStyles.imageUploadOverlay} />
                  </div>
                </div>

                {/* Upload Button and Hidden Input */}
                <div className={addProductStyles.uploadButtonContainer}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={addProductStyles.fileInput}
                    aria-hidden="false"
                  />
                  <div
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        fileInputRef.current && fileInputRef.current.click();
                    }}
                    role="button"
                    tabIndex={0}
                    className={addProductStyles.uploadButton}
                  >
                    <div className={addProductStyles.uploadButtonIconContainer}>
                      <Upload className={addProductStyles.uploadButtonIcon} />
                    </div>
                    <p className={addProductStyles.uploadButtonTitle}>
                      Click to upload
                    </p>
                    <p className={addProductStyles.uploadButtonSubtitle}>
                      Drag & drop or click to browse
                    </p>
                    <p className={addProductStyles.uploadButtonTip}>
                      Tip: Use a clear, properly lit photo for best results
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clothing Details */}
            <div className={addProductStyles.sectionContainer}>
              <div className={addProductStyles.sectionHeader}>
                <div className={addProductStyles.sectionIconContainer}>
                  <Tag className={addProductStyles.sectionIcon} />
                </div>
                <div>
                  <h2 className={addProductStyles.sectionTitle}>
                    Clothing Details
                  </h2>
                  <p className={addProductStyles.sectionSubtitle}>
                    Enter clothing name and brand
                  </p>
                </div>
              </div>

              <div className={addProductStyles.detailsGrid}>
                {/* Item Name */}
                <div>
                  <label className={addProductStyles.inputLabel}>
                    <div className={addProductStyles.labelIconContainer}>
                      <Tag className={addProductStyles.labelIcon} />
                      Item Name
                    </div>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className={addProductStyles.inputField}
                    placeholder="Enter clothing name"
                    required
                  />
                </div>

                {/* Brand Name */}
                <div>
                  <label className={addProductStyles.inputLabel}>
                    <div className={addProductStyles.labelIconContainer}>
                      <ShoppingBag className={addProductStyles.labelIcon} />
                      Brand Name
                    </div>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={product.brand}
                    onChange={handleChange}
                    className={addProductStyles.inputField}
                    placeholder="Enter brand name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Gender & Clothing Type */}
            <div className={addProductStyles.sectionContainer}>
              <div className={addProductStyles.sectionHeader}>
                <div className={addProductStyles.sectionIconContainer}>
                  <User className={addProductStyles.sectionIcon} />
                </div>
                <div>
                  <h2 className={AdminRemainingStyles.addCategories.sectionTitle}>Clothing Type</h2>
                  <p className={addProductStyles.sectionSubtitle}>
                    Select gender and clothing type
                  </p>
                </div>
              </div>

              <div className={addProductStyles.detailsGrid}>
                {/* Gender */}
                <div>
                  <label className={addProductStyles.inputLabel}>
                    <div className={addProductStyles.labelIconContainer}>
                      <User className={addProductStyles.labelIcon} />
                      Gender
                    </div>
                  </label>
                  <div className={addProductStyles.selectContainer}>
                    <select
                      name="gender"
                      value={product.gender}
                      onChange={handleChange}
                      className={addProductStyles.selectField}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                    </select>
                    <ChevronDown
                      className={addProductStyles.selectDropdownIcon}
                    />
                  </div>
                </div>

                {/* Clothing Type */}
                <div>
                  <label className={addProductStyles.inputLabel}>
                    <div className={addProductStyles.labelIconContainer}>
                      <Tag className={addProductStyles.labelIcon} />
                      Clothing Type
                    </div>
                  </label>
                  <div className={addProductStyles.selectContainer}>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className={addProductStyles.selectField}
                      required
                      disabled={!product.gender}
                    >
                      <option value="">Select Clothing Type</option>
                      {product.gender &&
                        addProductCategories[product.gender]?.map((cat) => (
                          <option key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </option>
                        ))}
                    </select>
                    <ChevronDown
                      className={addProductStyles.selectDropdownIcon}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className={addProductStyles.sectionContainer}>
              <div className={addProductStyles.colorsSectionHeader}>
                <div className={addProductStyles.colorsSectionLeft}>
                  <div className={addProductStyles.sectionIconContainer}>
                    <Tag className={addProductStyles.sectionIcon} />
                  </div>
                  <div>
                    <h2 className={AdminRemainingStyles.addCategories.sectionTitleResponsive}>Colors</h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addColor}
                  className={addProductStyles.colorsAddButton}
                >
                  <Plus className={addProductStyles.addButtonIcon} />
                  Add Color
                </button>
              </div>

              {/* Grid: show up to 3 color inputs per row on md+, single column on small */}
              <div className={addProductStyles.colorsGrid}>
                {product.colors.map((colorItem, index) => (
                  <div key={index} className={addProductStyles.colorItem}>
                    <div className={AdminRemainingStyles.addCategories.flexible}>
                      <label className={addProductStyles.colorInputLabel}>
                        Color Name
                      </label>
                      <input
                        type="text"
                        value={colorItem.color}
                        onChange={(e) =>
                          handleColorChange(index, e.target.value)
                        }
                        className={addProductStyles.colorInput}
                        placeholder="e.g., Red, Navy, Olive"
                      />
                      <label className={AdminRemainingStyles.addCategories.uploadLabel}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleColorImageChange(index, e.target.files?.[0])
                          }
                          className={AdminRemainingStyles.addCategories.hidden}
                        />
                        {colorItem.imagePreview
                          ? "Change colour image"
                          : "Add colour image"}
                      </label>
                      {colorItem.imagePreview && (
                        <div className={AdminRemainingStyles.addCategories.previewWrap}>
                          <img
                            src={colorItem.imagePreview}
                            alt={colorItem.color || "Colour preview"}
                            className={AdminRemainingStyles.addCategories.image}
                          />
                          <button
                            type="button"
                            onClick={() => removeColorImage(index)}
                            aria-label={`Remove ${colorItem.color || "colour"} image`}
                            className={AdminRemainingStyles.addCategories.removeImage}
                          >
                            <Trash2 className={AdminRemainingStyles.addCategories.removeIcon} />
                          </button>
                        </div>
                      )}
                    </div>

                    {product.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className={addProductStyles.removeColorButton}
                        aria-label={`Remove color ${index + 1}`}
                      >
                        <Trash2 className={addProductStyles.removeColorIcon} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes & Pricing */}
            <div className={addProductStyles.sectionContainer}>
              <div className={addProductStyles.sizesHeader}>
                <div className={addProductStyles.colorsSectionLeft}>
                  <div className={addProductStyles.sectionIconContainer}>
                    <Hash className={addProductStyles.sectionIcon} />
                  </div>
                  <div>
                    <h2 className={AdminRemainingStyles.addCategories.sectionTitleResponsive}>
                      Sizes & Pricing
                    </h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addSize}
                  className={addProductStyles.sizesAddButton}
                >
                  <Plus className={addProductStyles.addButtonIcon} />
                  Add Size
                </button>
              </div>

              <div className={addProductStyles.sizeItemsContainer}>
                {product.sizes.map((sizeItem, index) => (
                  <div key={index} className={addProductStyles.sizeItem}>
                    <div className={addProductStyles.sizeInputContainer}>
                      <label className={addProductStyles.sizeInputLabel}>
                        Size
                      </label>
                      <input
                        type="text"
                        value={sizeItem.size}
                        onChange={(e) =>
                          handleSizeChange(index, "size", e.target.value)
                        }
                        className={addProductStyles.sizeInput}
                        placeholder="e.g., S, M, L, 38, 40"
                        required
                      />
                    </div>
                    <div className={addProductStyles.sizeInputContainer}>
                      <label className={addProductStyles.sizeInputLabel}>
                        <div className={addProductStyles.priceLabelContainer}>
                          <BadgeIndianRupee
                            className={addProductStyles.priceLabelIcon}
                          />
                          Price
                        </div>
                      </label>
                      <input
                        type="number"
                        value={sizeItem.price}
                        onChange={(e) =>
                          handleSizeChange(index, "price", e.target.value)
                        }
                        className={`${addProductStyles.priceInput} ${AdminRemainingStyles.shared.schemeDark}`}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    {product.sizes.length > 1 && (
                      <div className={AdminRemainingStyles.addCategories.marginTopResponsive}>
                        <button
                          type="button"
                          onClick={() => removeSize(index)}
                          className={addProductStyles.removeSizeButton}
                          aria-label={`Remove size ${index + 1}`}
                        >
                          <Trash2 className={addProductStyles.removeSizeIcon} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className={addProductStyles.submitButtonContainer}>
              <button type="submit" disabled={isSubmitting} className={addProductStyles.submitButton}>
                <div className={addProductStyles.submitButtonOverlay} />
                <span className={addProductStyles.submitButtonContent}>
                  <Plus className={addProductStyles.submitButtonIcon} />
                  {isSubmitting ? "Adding..." : "Add Clothing"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>