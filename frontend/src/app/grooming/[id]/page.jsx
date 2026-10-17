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