  <div className={addGroomingPageStyles.mainContainer}>
        <div className={addGroomingPageStyles.contentContainer}>
          {/* Header */}
          <div className={addGroomingPageStyles.headerContainer}>
            <h1 className={addGroomingPageStyles.headerTitle}>
              Add{" "}
              <span className={addGroomingPageStyles.headerTitleGradient}>
                Grooming Product
              </span>
            </h1>
            <p className={addGroomingPageStyles.headerSubtitle}>
              Add premium grooming essentials to elevate your collection
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className={addGroomingPageStyles.formContainer}
          >
            {/* Image Upload */}
            <div className={addGroomingPageStyles.sectionContainer}>
              <div className={addGroomingPageStyles.sectionGlow}></div>
              <div className={addGroomingPageStyles.sectionInner}>
                <div className={addGroomingPageStyles.sectionHeader}>
                  <div className={addGroomingPageStyles.sectionIconContainer}>
                    <Camera className={addGroomingPageStyles.sectionIcon} />
                  </div>
                  <div>
                    <h2 className={addGroomingPageStyles.sectionTitle}>
                      Product Visual
                    </h2>
                  </div>
                </div>

                <div className={AdminRemainingStyles.addGrooming.formContainer}>
                  {/* Preview */}
                  <div
                    className={addGroomingPageStyles.imagePreviewContainer}
                    onClick={openFileDialog}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openFileDialog();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload or select product image"
                  >
                    <div className={addGroomingPageStyles.imagePreview}>
                      {product.imagePreview ? (
                        <>
                          <img
                            src={product.imagePreview}
                            alt="Preview"
                            className={addGroomingPageStyles.imagePreviewImg}
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            aria-label="Remove product image"
                            className={AdminRemainingStyles.addGrooming.removeImage}
                          >
                            <X className={AdminRemainingStyles.addGrooming.icon4} />
                          </button>
                        </>
                      ) : (
                        <div
                          className={
                            addGroomingPageStyles.imagePreviewPlaceholder
                          }
                        >
                          <div
                            className={
                              addGroomingPageStyles.imagePlaceholderIconContainer
                            }
                          >
                            <Upload
                              className={
                                addGroomingPageStyles.imagePlaceholderIcon
                              }
                            />
                          </div>
                          <p
                            className={
                              addGroomingPageStyles.imagePlaceholderText
                            }
                          >
                            Drag & drop or tap to upload
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={AdminRemainingStyles.addGrooming.hidden}
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className={addGroomingPageStyles.sectionContainer}>
              <div className={addGroomingPageStyles.sectionGlow}></div>
              <div className={addGroomingPageStyles.sectionInner}>
                <div className={addGroomingPageStyles.sectionHeader}>
                  <div className={addGroomingPageStyles.sectionIconContainer}>
                    <Tag className={addGroomingPageStyles.sectionIcon} />
                  </div>
                  <div>
                    <h2 className={addGroomingPageStyles.sectionTitle}>
                      Product Information
                    </h2>
                  </div>
                </div>

                <div className={addGroomingPageStyles.productDetailsSpace}>
                  {/* Product Name */}
                  <div className={addGroomingPageStyles.productNameContainer}>
                    <label className={addGroomingPageStyles.productNameLabel}>
                      <div
                        className={
                          addGroomingPageStyles.productNameLabelContainer
                        }
                      >
                        <div
                          className={
                            addGroomingPageStyles.productNameIconContainer
                          }
                        >
                          <Pencil size={14} />
                        </div>
                        Product Name
                      </div>
                    </label>
                    <div
                      className={
                        addGroomingPageStyles.productNameInputContainer
                      }
                    >
                      <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className={addGroomingPageStyles.productNameInput}
                        placeholder="Enter product name"
                        required
                      />
                      <div
                        className={addGroomingPageStyles.productNameInputIcon}
                      >
                        <Tag className={AdminRemainingStyles.addGrooming.icon5} />
                      </div>
                    </div>
                  </div>

                  {/* Brand Name */}
                  <div className={addGroomingPageStyles.productNameContainer}>
                    <label className={addGroomingPageStyles.productNameLabel}>
                      <div
                        className={
                          addGroomingPageStyles.productNameLabelContainer
                        }
                      >
                        <div
                          className={
                            addGroomingPageStyles.productNameIconContainer
                          }
                        >
                          <Package size={14} />
                        </div>
                        Brand Name
                      </div>
                    </label>
                    <div
                      className={
                        addGroomingPageStyles.productNameInputContainer
                      }
                    >
                      <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        className={addGroomingPageStyles.productNameInput}
                        placeholder="Enter brand name"
                        required
                      />
                      <div
                        className={addGroomingPageStyles.productNameInputIcon}
                      >
                        <Tag className={AdminRemainingStyles.addGrooming.icon5} />
                      </div>
                    </div>
                  </div>

                  {/* Gender & Grooming Type */}
                  <div className={addGroomingPageStyles.genderCategoryGrid}>
                    {/* Gender */}
                    <div className={addGroomingPageStyles.genderContainer}>
                      <label className={addGroomingPageStyles.genderLabel}>
                        <div
                          className={addGroomingPageStyles.genderLabelContainer}
                        >
                          <div
                            className={
                              addGroomingPageStyles.genderIconContainer
                            }
                          >
                            <User
                              className={addGroomingPageStyles.genderIcon}
                            />
                          </div>
                          Gender
                        </div>
                      </label>
                      <div
                        className={addGroomingPageStyles.genderSelectContainer}
                      >
                        <select
                          name="gender"
                          value={product.gender}
                          onChange={handleChange}
                          className={addGroomingPageStyles.genderSelect}
                          required
                        >
                          <option
                            value=""
                            className={addGroomingPageStyles.selectOption}
                          >
                            Select Gender
                          </option>
                          <option
                            value="men"
                            className={addGroomingPageStyles.selectOption}
                          >
                            👨 Men
                          </option>
                          <option
                            value="women"
                            className={addGroomingPageStyles.selectOption}
                          >
                            👩 Women
                          </option>
                        </select>
                        <div className={addGroomingPageStyles.genderSelectIcon}>
                          <EyeClosed className={AdminRemainingStyles.addGrooming.icon5} />
                        </div>
                      </div>
                    </div>

                    {/* Grooming Type */}
                    <div className={addGroomingPageStyles.categoryContainer}>
                      <label className={addGroomingPageStyles.categoryLabel}>
                        <div
                          className={
                            addGroomingPageStyles.categoryLabelContainer
                          }
                        >
                          <div
                            className={
                              addGroomingPageStyles.categoryIconContainer
                            }
                          >
                            <Package
                              className={addGroomingPageStyles.categoryIcon}
                            />
                          </div>
                          Grooming Type
                        </div>
                      </label>
                      <div
                        className={
                          addGroomingPageStyles.categorySelectContainer
                        }
                      >
                        <select
                          name="category"
                          value={product.category}
                          onChange={handleChange}
                          className={addGroomingPageStyles.categorySelect}
                          required
                          disabled={!product.gender}
                        >
                          <option
                            value=""
                            className={addGroomingPageStyles.selectOption}
                          >
                            Select Grooming Type
                          </option>
                          {product.gender &&
                            groomingTypes[product.gender]?.map((cat) => (
                              <option
                                key={cat}
                                value={cat.toLowerCase()}
                                className={addGroomingPageStyles.selectOption}
                              >
                                {cat}
                              </option>
                            ))}
                        </select>
                        <div
                          className={addGroomingPageStyles.categorySelectIcon}
                        >
                          <EyeClosed className={AdminRemainingStyles.addGrooming.icon5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Volumes & Pricing */}
            <div className={addGroomingPageStyles.sectionContainer}>
              <div className={addGroomingPageStyles.sectionGlow}></div>
              <div className={addGroomingPageStyles.sectionInner}>
                <div className={addGroomingPageStyles.volumesHeader}>
                  <div className={addGroomingPageStyles.volumesLeft}>
                    <div className={addGroomingPageStyles.sectionIconContainer}>
                      <Droplets className={addGroomingPageStyles.sectionIcon} />
                    </div>
                    <div>
                      <h2 className={addGroomingPageStyles.sectionTitle}>
                        Volumes & Pricing
                      </h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addVolume}
                    className={addGroomingPageStyles.volumesAddButton}
                  >
                    <div
                      className={
                        addGroomingPageStyles.volumesAddButtonIconContainer
                      }
                    >
                      <Plus
                        className={addGroomingPageStyles.volumesAddButtonIcon}
                      />
                    </div>
                    Add Volume
                  </button>
                </div>

                <div className={addGroomingPageStyles.volumesList}>
                  {product.volumes.map((volumeItem, index) => (
                    <div
                      key={index}
                      className={addGroomingPageStyles.volumeItem}
                    >
                      <div className={addGroomingPageStyles.volumeItemGrid}>
                        {/* Volume */}
                        <div
                          className={addGroomingPageStyles.volumeInputContainer}
                        >
                          <label className={addGroomingPageStyles.volumeLabel}>
                            <div
                              className={
                                addGroomingPageStyles.volumeLabelContainer
                              }
                            >
                              <div
                                className={
                                  addGroomingPageStyles.volumeIconContainer
                                }
                              >
                                <Scale
                                  className={addGroomingPageStyles.volumeIcon}
                                />
                              </div>
                              Volume Size
                            </div>
                          </label>
                          <div
                            className={addGroomingPageStyles.volumeInputWrapper}
                          >
                            <input
                              type="text"
                              value={volumeItem.volume}
                              onChange={(e) =>
                                handleVolumeChange(
                                  index,
                                  "volume",
                                  e.target.value,
                                )
                              }
                              className={addGroomingPageStyles.volumeInput}
                              placeholder="e.g., 50ml, 100ml"
                              required
                            />
                            <div
                              className={
                                addGroomingPageStyles.volumeInputIconContainer
                              }
                            >
                              <Droplets
                                className={
                                  addGroomingPageStyles.volumeInputIcon
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div
                          className={addGroomingPageStyles.priceInputContainer}
                        >
                          <label className={addGroomingPageStyles.priceLabel}>
                            <div
                              className={
                                addGroomingPageStyles.priceLabelContainer
                              }
                            >
                              <div
                                className={
                                  addGroomingPageStyles.priceIconContainer
                                }
                              >
                                <IndianRupee
                                  className={addGroomingPageStyles.priceIcon}
                                />
                              </div>
                              Price (₹)
                            </div>
                          </label>
                          <div
                            className={addGroomingPageStyles.priceInputWrapper}
                          >
                            <input
                              type="number"
                              value={volumeItem.price}
                              onChange={(e) =>
                                handleVolumeChange(
                                  index,
                                  "price",
                                  e.target.value,
                                )
                              }
                              className={`${addGroomingPageStyles.priceInput} ${AdminRemainingStyles.shared.schemeDark}`}
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              required
                            />
                            <div
                              className={
                                addGroomingPageStyles.priceInputIconContainer
                              }
                            >
                              <BadgeIndianRupee
                                className={addGroomingPageStyles.priceInputIcon}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <div
                          className={
                            addGroomingPageStyles.removeButtonContainer
                          }
                        >
                          {product.volumes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeVolume(index)}
                              className={addGroomingPageStyles.removeButton}
                            >
                              <Trash2
                                className={
                                  addGroomingPageStyles.removeButtonIcon
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
            <div className={addGroomingPageStyles.submitButtonContainer}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={addGroomingPageStyles.submitButton}
              >
                <div
                  className={addGroomingPageStyles.submitButtonShimmer}
                ></div>
                <span className={addGroomingPageStyles.submitButtonText}>
                  {isSubmitting ? "Adding..." : "Add Grooming Product"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>