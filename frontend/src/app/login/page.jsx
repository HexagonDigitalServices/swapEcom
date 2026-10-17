  <main className={styles.page}>
      <Navbar />
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 40, y: -12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className={styles.toast}
          >
            <CheckCircle className={styles.toastIcon} />
            {signup ? "Account created successfully" : "Login successful"}
          </motion.div>
        )}
      </AnimatePresence>
      <section className={styles.section}>
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className={styles.panel}
        >
          <div className={styles.imagePanel}>
            <Image
              src="/Banner1.jpeg"
              alt="Fashion collection"
              fill
              priority
              className={styles.image}
            />
            <div className={styles.imageOverlay} />
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className={styles.imageCopy}
            >
              <span className={styles.brand}>SWAP</span>
              <h1 className={styles.imageTitle}>
                Dress sharp. Checkout faster.
              </h1>
              <p className={styles.imageDescription}>
                Save your cart, track orders, and unlock new drops from your
                personal style account.
              </p>
            </motion.div>
          </div>

          <div className={styles.formPanel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={signup ? "signup" : "login"}
                initial={{ opacity: 0, x: signup ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: signup ? -24 : 24 }}
                transition={{ duration: 0.28 }}
              >
                <p className={styles.modeContent}>
                  {signup ? "New here" : "Welcome back"}
                </p>
                <h2 className={styles.title}>
                  {signup ? "Create account" : "Sign in"}
                </h2>
                <p className={styles.description}>
                  {signup
                    ? "Start your style journey with quick checkout and fresh drop alerts."
                    : "Access your saved styles, cart, and order history."}
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                  {fields.map(([label, type, Icon]) => (
                    <label key={label} className={styles.label}>
                      <span>{label}</span>
                      <span className={styles.inputIconWrap}>
                        <Icon className={styles.inputIcon} />
                        <input
                          name={
                            label === "Full name"
                              ? "name"
                              : type === "email"
                                ? "email"
                                : "password"
                          }
                          type={
                            type === "password" && showPassword ? "text" : type
                          }
                          placeholder={label}
                          autoComplete={
                            type === "password"
                              ? signup
                                ? "new-password"
                                : "current-password"
                              : "email"
                          }
                          className={
                            type === "password"
                              ? styles.passwordInput
                              : styles.input
                          }
                          required
                        />
                        {type === "password" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className={styles.passwordToggle}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <>
                                <EyeOff size={17} />
                                <span className={styles.screenReaderOnly}>
                                  Hide password
                                </span>
                              </>
                            ) : (
                              <>
                                <Eye size={17} />
                                <span className={styles.screenReaderOnly}>
                                  Show password
                                </span>
                              </>
                            )}
                          </button>
                        )}
                      </span>
                    </label>
                  ))}

                  {!signup && (
                    <div className={styles.forgotRow}>
                      <button
                        type="button"
                        onClick={() => router.push("/forgot-password")}
                        className={styles.forgotButton}
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitButton}
                  >
                    {loading ? (
                      <>
                        <Loader2 className={styles.spinner} /> Please wait...
                      </>
                    ) : (
                      <>{signup ? "Create account" : "Sign in"}</>
                    )}
                  </button>
                </form>
                {error && (
                  <p className={styles.error} role="alert">
                    {error}
                  </p>
                )}

                <p className={styles.footer}>
                  {signup ? "Already have an account?" : "New user?"}{" "}
                  <button
                    onClick={handleModeChange}
                    className={styles.modeToggle}
                  >
                    {signup ? "Sign in" : "Create account"}
                  </button>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </main>