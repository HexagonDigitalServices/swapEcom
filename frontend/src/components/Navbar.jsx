// components/NavbarRoundedCenter.jsx
"use client";
import logo from "../../public/logo.png";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, LogIn, LogOut, ShoppingCart } from "lucide-react";
import { useCart } from "@/CartContext"; // <-- uses your CartContext

// Import styles from the centralized file
import { NavbarStyles } from "@/app/styles/dummyStyles";
import { navItems } from "@/dummyData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverLogin, setHoverLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const reduceMotion = useReducedMotion();

  const pathname = usePathname();

  // Refs for click-outside detection
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Cart totals from context
  let totalItems = 0;
  try {
    // useCart must be used inside CartProvider; try/catch to avoid thrown error during dev if provider missing
    const cart = useCart();
    const totals = cart?.getCartTotals?.() ?? { totalItems: 0 };
    totalItems = totals.totalItems ?? 0;
  } catch (err) {
    // If CartProvider isn't mounted yet, ignore — totalItems remains 0
    totalItems = 0;
  }

  // close mobile menu when route changes (keeps UX tidy)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const syncAuth = () =>
      setIsLoggedIn(localStorage.getItem("fashionLoggedIn") === "true");
    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("fashion-auth", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("fashion-auth", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fashionLoggedIn");
    localStorage.removeItem("fashionToken");
    localStorage.removeItem("fashionUser");
    window.dispatchEvent(new Event("fashion-auth"));
    setIsOpen(false);
  };

  // prevent body scroll/overflow when the mobile menu is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    const body = document.body;
    if (isOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
    // cleanup when component unmounts
    return () => body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // close the mobile menu when clicking/tapping outside of it (or the toggle button)
  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(e) {
      const target = e.target;
      // If click was inside the menu or on the toggle button, ignore
      if (menuRef.current && menuRef.current.contains(target)) return;
      if (toggleRef.current && toggleRef.current.contains(target)) return;
      // otherwise close menu
      setIsOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const menuToggle = toggleRef.current;
    const focusableSelector = 'a[href], button:not([disabled])';
    const focusable = menuRef.current?.querySelectorAll(focusableSelector) ?? [];
    focusable[0]?.focus();

    const containFocus = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", containFocus);
    return () => {
      document.removeEventListener("keydown", containFocus);
      menuToggle?.focus();
    };
  }, [isOpen]);

  return (
    <header className={NavbarStyles.header}>
      <motion.nav className={NavbarStyles.nav}>
        <div className={NavbarStyles.navContainer}>
          <Link href="/" className={NavbarStyles.logoContainer}>
            <Image
              src={logo}
              alt="SWAP"
              width={logo.width}
              height={logo.height}
              priority
              className={NavbarStyles.logoImage}
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className={NavbarStyles.desktopMenu}>
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link key={item.id} href={item.path}>
                  <div
                    className={`${NavbarStyles.navItemContainer} ${
                      isActive
                        ? NavbarStyles.navItemActive
                        : NavbarStyles.navItemInactive
                    }`}
                  >
                    {item.icon}
                    <span className={NavbarStyles.navItemText}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className={NavbarStyles.rightActions}>
            {/* CART ICON (wrapped in Link to /cart) */}
            <Link
              href="/cart"
              aria-label={`Cart (${totalItems})`}
              className={NavbarStyles.cartButton}
            >
              <motion.span
                aria-hidden="true"
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <ShoppingCart size={16} className={NavbarStyles.cartIcon} />
              </motion.span>
              {totalItems > 0 && (
                <span className={NavbarStyles.cartBadge} aria-hidden="true">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* LOGIN / LOGOUT (desktop) */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={NavbarStyles.desktopLoginButton}
                type="button"
              >
                <div className={NavbarStyles.loginButtonContent}>
                  <LogOut size={16} aria-hidden="true" />
                  <span className={NavbarStyles.loginButtonText}>Logout</span>
                </div>
              </button>
            ) : (
              <Link href="/login" className={NavbarStyles.desktopLoginButton}>
                <span className={NavbarStyles.loginButtonContent}>
                  <LogIn size={16} aria-hidden="true" />
                  <span className={NavbarStyles.loginButtonText}>Login</span>
                </span>
              </Link>
            )}

            {/* MOBILE MENU BUTTON (toggleRef used for click-outside check) */}
            <button
              ref={toggleRef}
              onClick={() => setIsOpen((v) => !v)}
              className={NavbarStyles.mobileMenuButton}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="storefront-mobile-menu"
              type="button"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE: overlay (closes menu when clicked) and the mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* overlay sits under the menu; clicking it closes the menu */}
              <motion.div
                key="nav-overlay"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.15 }}
                className={NavbarStyles.mobileOverlay}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />

              {/* MOBILE MENU - absolutely positioned so it doesn't change page layout */}
              <motion.div
                key="nav-menu"
                ref={menuRef}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className={NavbarStyles.mobileMenuContainer}
                id="storefront-mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Main menu"
              >
                <div className={NavbarStyles.mobileMenuInner}>
                  <div className={NavbarStyles.mobileMenuHeader}>
                    <span className={NavbarStyles.mobileMenuTitle}>Menu</span>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className={NavbarStyles.mobileMenuButton}
                      aria-label="Close menu"
                    >
                      <X size={20} aria-hidden="true" />
                    </button>
                  </div>
                  {/* Login/logout button shown inside the mobile menu */}
                  {isLoggedIn ? (
                    <motion.button
                      onClick={handleLogout}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      onHoverStart={() => setHoverLogin(true)}
                      onHoverEnd={() => setHoverLogin(false)}
                      className={NavbarStyles.mobileLoginButton}
                      aria-label="Logout"
                    >
                      <span className={NavbarStyles.loginButtonGradient} />
                      <motion.div animate={{ rotate: hoverLogin ? -15 : 0 }}>
                        <LogOut size={14} />
                      </motion.div>
                      <span className={NavbarStyles.mobileNavItemText}>
                        Logout
                      </span>
                    </motion.button>
                  ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <span className={NavbarStyles.mobileLoginButton}>
                        <LogIn size={16} aria-hidden="true" />
                        <span className={NavbarStyles.mobileNavItemText}>Login</span>
                      </span>
                    </Link>
                  )}

                  {/* nav links */}
                  {navItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                      <Link
                        key={item.id}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`${NavbarStyles.mobileNavItemContainer} ${
                          isActive
                            ? NavbarStyles.mobileNavItemActive
                            : NavbarStyles.mobileNavItemInactive
                        }`}
                      >
                        {item.icon}
                        <span className={NavbarStyles.mobileNavItemText}>
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

    </header>
  );
}
