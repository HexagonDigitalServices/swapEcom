// app/cart/page.jsx (or wherever your Cart page is located)
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Minus,
  Trash2,
  BadgeIndianRupee,
  BaggageClaim,
  Home,
  User,
  Phone,
  MapPin,
  CheckCircle,
  CreditCard,
  Wallet,
} from "lucide-react";
import { useCart } from "@/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { api, getCurrentUser } from "@/lib/api";

// Import styles from the centralized file
import { CartPageStyles } from "@/app/styles/dummyStyles";

const createOrderMetadata = () => ({
  orderId: `ORD-${Date.now()}`,
  timestamp: new Date().toISOString(),
});

export default function CartPage() {
  const router = useRouter();
  const { getCartTotals, setItemQuantity, removeFromCart, clearCart } =
    useCart();
  const { items: cartItems, subtotal, totalItems } = getCartTotals();

  // Address form state
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(null);

  useEffect(() => {
    const loadSavedAddress = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem("checkout_address");
        if (saved) setAddress(JSON.parse(saved));
      } catch (error) {
        console.warn("Failed to load saved address:", error);
      }
    }, 0);

    return () => window.clearTimeout(loadSavedAddress);
  }, []);

  // Save address to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("checkout_address", JSON.stringify(address));
    } catch (e) {
      console.warn("Failed to save address:", e);
    }
  }, [address]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (showPaymentOptions) setShowPaymentOptions(false);
  };

  // Validate phone number (10 digits only)
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // Validate pincode (6 digits)
  const validatePincode = (pincode) => {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
      address: "",
      pincode: "",
    };

    let isValid = true;

    if (!address.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!address.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(address.phone)) {
      newErrors.phone = "Phone must be 10 digits";
      isValid = false;
    }

    if (!address.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (!address.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
      isValid = false;
    } else if (!validatePincode(address.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Animated custom toast using framer-motion
  const showAnimatedOrderToast = (orderData) => {
    toast.custom(
      (t) => (
        <AnimatePresence>
          {t.visible && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              className={CartPageStyles.toastContainer}
            >
              <div className={CartPageStyles.remainingItemHeader}>
                <div className={CartPageStyles.toastIconContainer}>
                  <CheckCircle className={CartPageStyles.toastIcon} size={22} />
                </div>

                <div className={CartPageStyles.toastContent}>
                  <div className={CartPageStyles.toastHeader}>
                    <div>
                      <div className={CartPageStyles.toastTitle}>
                        Order placed
                      </div>
                      <div className={CartPageStyles.toastSubtitle}>
                        {orderData.customer.name} — {orderData.customer.phone}
                      </div>
                    </div>

                    <div className={CartPageStyles.remainingTextRight}>
                      <div className={CartPageStyles.toastTotalLabel}>
                        Total
                      </div>
                      <div className={CartPageStyles.toastTotalValue}>
                        ₹{orderData.summary.grandTotal.toFixed(0)}
                      </div>
                    </div>
                  </div>

                  <div className={CartPageStyles.toastFooter}>
                    <div className={CartPageStyles.toastOrderId}>
                      Order ID:{" "}
                      <span className={CartPageStyles.toastOrderIdValue}>
                        {orderData.orderId}
                      </span>
                    </div>

                    <div className={CartPageStyles.remainingItemActions}>
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className={CartPageStyles.toastCloseButton}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ),
      {
        duration: 2000,
        position: "top-right",
      },
    );
  };

  const placeOrder = async (paymentMode) => {
    if (isPlacingOrder) return;
    const user = getCurrentUser();
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("fashionToken")
        : null;
    if (!user || !token) {
      router.push("/login?redirect=%2Fcart");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Please add items before checkout", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly", {
        duration: 3500,
        position: "top-right",
      });
      return;
    }

    // Prepare order data
    const orderData = {
      ...createOrderMetadata(),
      customer: {
        name: address.name,
        phone: address.phone,
        address: address.address,
        pincode: address.pincode,
      },
      payment: paymentMode,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand || "",
        variantLabel: item.variantLabel,
        price: item.price,
        quantity: item.qty,
        subtotal: item.price * item.qty,
      })),
      summary: {
        totalItems: totalItems,
        subtotal: subtotal,
        shipping: 0,
        tax: 0,
        grandTotal: subtotal,
      },
    };

    setIsPlacingOrder(true);
    setProcessingPayment(paymentMode);
    try {
      const order = await api("/orders/create", {
        method: "POST",
        body: JSON.stringify({
          items: cartItems.map((item) => {
            const [size, color] = (item.variantLabel || "").split("||");
            return {
              product: item.id,
              size: size || "Default",
              color: color || "",
              quantity: item.qty,
              price: item.price,
            };
          }),
          shippingAddress: {
            fullName: address.name,
            mobileNumber: address.phone,
            completeAddress: address.address,
            pincode: address.pincode,
          },
          totalAmount: subtotal,
          paymentMethod: paymentMode === "Online" ? "Stripe" : "COD",
        }),
      });
      if (paymentMode === "Online") {
        const payment = await api("/payment/checkout", {
          method: "POST",
          body: JSON.stringify({
            orderId: order.order._id,
            items: cartItems.map((i) => ({
              name: i.name,
              price: i.price,
              quantity: i.qty,
            })),
          }),
        });
        window.location.assign(payment.url);
        return;
      }
    } catch (err) {
      setIsPlacingOrder(false);
      setProcessingPayment(null);
      if (err.status === 401) {
        localStorage.removeItem("fashionToken");
        localStorage.removeItem("fashionUser");
        localStorage.removeItem("fashionLoggedIn");
        toast.error("Your session has expired. Please log in again.", {
          duration: 1400,
          position: "top-right",
        });
        window.setTimeout(() => router.push("/login?redirect=%2Fcart"), 500);
        return;
      }
      toast.error(err.message);
      return;
    }

    // Clear cart
    clearCart();

    // Clear saved address from localStorage (order placed -> don't keep details)
    try {
      localStorage.removeItem("checkout_address");
    } catch (e) {
      console.warn("Failed to remove saved address:", e);
    }

    // Clear form
    setAddress({
      name: "",
      phone: "",
      address: "",
      pincode: "",
    });
    setShowPaymentOptions(false);

    // Show animated custom toast
    showAnimatedOrderToast(orderData);
    setIsPlacingOrder(false);
    setProcessingPayment(null);
    // COD orders are created immediately, so take the customer straight to
    // their order history instead of leaving them on an emptied cart.
    if (paymentMode === "COD") {
      router.replace("/orders?payment=cod");
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    const user = getCurrentUser();
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("fashionToken")
        : null;
    if (!user || !token) {
      router.push("/login?redirect=%2Fcart");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Please add items before checkout", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly", {
        duration: 3500,
        position: "top-right",
      });
      return;
    }

    setShowPaymentOptions(true);
  };

  return (
    <>
      {/* added overflow-x-hidden to prevent navbar/content horizontal overflow */}
      <main className={CartPageStyles.mainContainer}>
        <div className={CartPageStyles.contentContainer}>
          <div className={CartPageStyles.headerContainer}>
            <div className={CartPageStyles.headerIconContainer}>
              <BaggageClaim className={CartPageStyles.headerIcon} size={24} />
            </div>
            <h1 className={CartPageStyles.headerTitle}>
              Your Cart ({totalItems})
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className={CartPageStyles.emptyCartContainer}>
              <div className={CartPageStyles.emptyCartContent}>
                <div className={CartPageStyles.emptyCartIconContainer}>
                  <BaggageClaim
                    className={CartPageStyles.headerIcon}
                    size={32}
                  />
                </div>
                <p className={CartPageStyles.emptyCartText}>
                  Your cart is empty.
                </p>
                <p className={CartPageStyles.emptyCartSubtext}>
                  Add some items to get started
                </p>
                <Link
                  href="/clothing/shirts"
                  className={CartPageStyles.emptyCartButton}
                >
                  Browse collection
                </Link>
              </div>
            </div>
          ) : (
            <div className={CartPageStyles.cartItemsGrid}>
              <div className={CartPageStyles.itemsGrid}>
                {cartItems.map((it, idx) => {
                  const [sizeLabel, colorLabel] = (it.variantLabel ?? "").split(
                    "||",
                  );
                  return (
                    <div
                      key={`${it.id}::${it.variantLabel}`}
                      className={CartPageStyles.cartItemContainer}
                      style={CartPageStyles.cartItemAnimationStyle(idx)}
                    >
                      <div className={CartPageStyles.cartItemCard}>
                        {/* Product Image with shimmer effect */}
                        <div className={CartPageStyles.productImageContainer}>
                          <Image
                            src={it.src}
                            alt={it.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 20vw"
                            className={CartPageStyles.productImage}
                          />
                        </div>

                        <div className={CartPageStyles.productInfoContainer}>
                          <div className={CartPageStyles.productHeader}>
                            <div className={CartPageStyles.remainingFlexChild}>
                              <div className={CartPageStyles.productName}>
                                {it.name}
                              </div>
                              {it.brand && (
                                <div className={CartPageStyles.productBrand}>
                                  Brand: {it.brand}
                                </div>
                              )}
                              <div
                                className={CartPageStyles.variantTagsContainer}
                              >
                                {sizeLabel && (
                                  <span className={CartPageStyles.variantTag}>
                                    Size: {sizeLabel}
                                  </span>
                                )}
                                {colorLabel && (
                                  <span className={CartPageStyles.variantTag}>
                                    Color: {colorLabel}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className={CartPageStyles.priceContainer}>
                              <div className={CartPageStyles.productPrice}>
                                ₹{it.price}
                              </div>
                              <div className={CartPageStyles.priceLabel}>
                                each
                              </div>
                            </div>
                          </div>

                          <div className={CartPageStyles.controlsContainer}>
                            {/* Quantity Controls */}
                            <div className={CartPageStyles.quantityContainer}>
                              <div className={CartPageStyles.quantityWrapper}>
                                <button
                                  aria-label="decrease quantity"
                                  className={CartPageStyles.quantityButton}
                                  onClick={() => {
                                    const next = it.qty - 1;
                                    if (next <= 0)
                                      removeFromCart(it.id, it.variantLabel);
                                    else
                                      setItemQuantity(
                                        it.id,
                                        it.variantLabel,
                                        next,
                                      );
                                  }}
                                >
                                  <Minus size={16} />
                                </button>

                                <div className={CartPageStyles.quantityDisplay}>
                                  {it.qty}
                                </div>

                                <button
                                  aria-label="increase quantity"
                                  className={CartPageStyles.quantityButton}
                                  onClick={() =>
                                    setItemQuantity(
                                      it.id,
                                      it.variantLabel,
                                      it.qty + 1,
                                    )
                                  }
                                >
                                  <Plus size={16} />
                                </button>
                              </div>

                              {/* Delete Button */}
                              <button
                                onClick={() =>
                                  removeFromCart(it.id, it.variantLabel)
                                }
                                className={CartPageStyles.deleteButton}
                                aria-label="Remove item"
                              >
                                <Trash2
                                  size={18}
                                  className={CartPageStyles.deleteIcon}
                                />
                              </button>
                            </div>

                            <div className={CartPageStyles.remainingTextRight}>
                              <div className={CartPageStyles.itemSubtotalLabel}>
                                Subtotal
                              </div>
                              <div className={CartPageStyles.itemSubtotalValue}>
                                ₹{(it.price * it.qty).toFixed(0)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Address Section */}
              <div className={CartPageStyles.addressSection}>
                <div className={CartPageStyles.addressCard}>
                  <div className={CartPageStyles.addressHeader}>
                    <div className={CartPageStyles.addressIconContainer}>
                      <Home className={CartPageStyles.addressIcon} size={20} />
                    </div>
                    <h2 className={CartPageStyles.addressTitle}>
                      Shipping Address
                    </h2>
                  </div>

                  <div className={CartPageStyles.addressFormGrid}>
                    {/* Name Field */}
                    <div className={CartPageStyles.formField}>
                      <div className={CartPageStyles.formLabelContainer}>
                        <User
                          size={16}
                          className={CartPageStyles.formLabelIcon}
                        />
                        <label
                          htmlFor="checkout-name"
                          className={CartPageStyles.formLabel}
                        >
                          Full Name *
                        </label>
                      </div>
                      <input
                        type="text"
                        id="checkout-name"
                        name="name"
                        value={address.name}
                        onChange={handleInputChange}
                        className={CartPageStyles.formInput(errors.name)}
                        autoComplete="name"
                        required
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className={CartPageStyles.errorMessage}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className={CartPageStyles.formField}>
                      <div className={CartPageStyles.formLabelContainer}>
                        <Phone
                          size={16}
                          className={CartPageStyles.formLabelIcon}
                        />
                        <label
                          htmlFor="checkout-phone"
                          className={CartPageStyles.formLabel}
                        >
                          Phone Number *
                        </label>
                      </div>
                      <input
                        type="tel"
                        id="checkout-phone"
                        name="phone"
                        value={address.phone}
                        onChange={handleInputChange}
                        maxLength={10}
                        className={CartPageStyles.formInput(errors.phone)}
                        autoComplete="tel"
                        inputMode="numeric"
                        required
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && (
                        <p className={CartPageStyles.errorMessage}>
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Address Field */}
                    <div className={CartPageStyles.remainingAddressField}>
                      <div className={CartPageStyles.formLabelContainer}>
                        <MapPin
                          size={16}
                          className={CartPageStyles.formLabelIcon}
                        />
                        <label
                          htmlFor="checkout-address"
                          className={CartPageStyles.formLabel}
                        >
                          Complete Address *
                        </label>
                      </div>
                      <textarea
                        id="checkout-address"
                        name="address"
                        value={address.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={CartPageStyles.formTextarea(errors.address)}
                        autoComplete="street-address"
                        required
                        placeholder="House no, Building, Street, Area"
                      />
                      {errors.address && (
                        <p className={CartPageStyles.errorMessage}>
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Pincode Field */}
                    <div className={CartPageStyles.formField}>
                      <div className={CartPageStyles.formLabelContainer}>
                        <MapPin
                          size={16}
                          className={CartPageStyles.formLabelIcon}
                        />
                        <label
                          htmlFor="checkout-pincode"
                          className={CartPageStyles.formLabel}
                        >
                          Pincode *
                        </label>
                      </div>
                      <input
                        type="text"
                        id="checkout-pincode"
                        name="pincode"
                        value={address.pincode}
                        onChange={handleInputChange}
                        maxLength={6}
                        className={CartPageStyles.formInput(errors.pincode)}
                        autoComplete="postal-code"
                        inputMode="numeric"
                        required
                        placeholder="6-digit pincode"
                      />
                      {errors.pincode && (
                        <p className={CartPageStyles.errorMessage}>
                          {errors.pincode}
                        </p>
                      )}
                    </div>

                    {/* Note about required fields */}
                    <div className={CartPageStyles.formNote}>
                      <p className={CartPageStyles.formNoteText}>
                        * All fields are required. Phone must be 10 digits and
                        pincode 6 digits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className={CartPageStyles.summarySection}>
                <div className={CartPageStyles.summaryCard}>
                  <div className={CartPageStyles.remainingPaymentField}>
                    <div className={CartPageStyles.summaryLabel}>
                      Cart Total
                    </div>
                    <div className={CartPageStyles.totalContainer}>
                      <div className={CartPageStyles.totalValue}>
                        ₹{subtotal.toFixed(0)}
                      </div>
                    </div>
                  </div>

                  {showPaymentOptions && (
                    <div className={CartPageStyles.paymentContainer}>
                      <div className={CartPageStyles.paymentTitle}>
                        Select payment mode
                      </div>
                      <div className={CartPageStyles.paymentOptions}>
                        <button
                          type="button"
                          onClick={() => placeOrder("COD")}
                          disabled={isPlacingOrder}
                          className={CartPageStyles.paymentOptionButton}
                        >
                          <Wallet
                            size={18}
                            className={CartPageStyles.paymentOptionIcon}
                          />
                          {processingPayment === "COD"
                            ? "Processing..."
                            : "COD"}
                        </button>
                        <button
                          type="button"
                          onClick={() => placeOrder("Online")}
                          disabled={isPlacingOrder}
                          className={CartPageStyles.paymentOptionButton}
                        >
                          <CreditCard
                            size={18}
                            className={CartPageStyles.paymentOptionIcon}
                          />
                          {processingPayment === "Online"
                            ? "Processing..."
                            : "Online"}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className={CartPageStyles.buttonsContainer}>
                    <button
                      onClick={() => clearCart()}
                      className={CartPageStyles.clearButton}
                    >
                      <Trash2 size={18} />
                      Clear cart
                    </button>

                    <button
                      onClick={handleCheckout}
                      className={CartPageStyles.checkoutButton}
                    >
                      Checkout
                      <BadgeIndianRupee
                        size={18}
                        className={CartPageStyles.checkoutIcon}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toaster (react-hot-toast) */}
        <Toaster
          position="top-right"
          toastOptions={{
            // keep default for non-custom toasts
            style: {
              fontFamily: "inherit",
            },
          }}
        />
      </main>
    </>
  );
}
