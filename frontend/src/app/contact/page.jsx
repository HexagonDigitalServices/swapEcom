"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  ShoppingBag,
  Instagram,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { contactPageStyles } from "@/app/styles/dummyStyles";

export default function ContactPage() {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    orderId: "",
    product: "",
    size: "",
    color: "",
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const whatsappNumber = "918299431275";
  const phonePrefixes = ["6", "7", "8", "9"];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hh = now.getHours();
      const mm = now.getMinutes();
      const ampm = hh >= 12 ? "PM" : "AM";
      const hours = hh % 12 || 12;
      const mins = mm.toString().padStart(2, "0");
      setCurrentTime(`${hours}:${mins} ${ampm}`);
    };
    updateTime();
    const id = setInterval(updateTime, 60_000);
    return () => clearInterval(id);
  }, []);

  const validatePhone = (phone) => {
    const cleaned = (phone || "").replace(/\D/g, "");
    if (cleaned.length > 10) return "Phone number must be 10 digits";
    if (cleaned.length < 10 && cleaned.length > 0)
      return "Phone number must be 10 digits";
    if (cleaned.length === 10 && !/^[6-9]\d{9}$/.test(cleaned))
      return "Please enter a valid Indian mobile number";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      const truncated = digitsOnly.slice(0, 10);
      setForm((s) => ({ ...s, phone: truncated }));
      setPhoneError(validatePhone(truncated));
      return;
    }

    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleBlur = (e) => {
    if (e.target.name === "phone") {
      setPhoneError(validatePhone(e.target.value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneValidation = validatePhone(form.phone);
    if (phoneValidation) {
      setPhoneError(phoneValidation);
      return;
    }

    setIsLoading(true);

    const formattedPhone = form.phone
      ? `+91 ${form.phone.slice(0, 5)} ${form.phone.slice(5)}`
      : "-";

    const lines = [
      " *SWAP Contact Form*",
      "────────────────────────",
      "",
      "👤 *Personal Details*",
      `• Name   : ${form.name || "-"}`,
      `• Email  : ${form.email || "-"}`,
      `• Phone  : ${form.phone ? formattedPhone : "-"}`,
      "",
      " *Order Details*",
      `• Order ID : ${form.orderId || "-"}`,
      `• Product  : ${form.product || "-"}`,
      `• Size     : ${form.size || "-"}`,
      `• Color    : ${form.color || "-"}`,
      "",
      " *Customer Message*",
      `${form.message || "No message provided"}`,
      "",
      "────────────────────────",
      "_Sent via SWAP Website_",
      ` ${new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}`,
      ` ${currentTime}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines)}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setIsLoading(false);
      setIsSubmitted(true);
      setForm(initialForm);
      setPhoneError("");

      setTimeout(() => setIsSubmitted(false), 4000);
    }, 800);
  };

  return (
    <main className={contactPageStyles.page}>
      <Navbar />

      {isSubmitted && (
        <div className={contactPageStyles.successToast}>
          <div className={contactPageStyles.successToastContainer}>
            <CheckCircle className={contactPageStyles.successIcon} />
            <div>
              <div className={contactPageStyles.successTitle}>
                Message Sent!
              </div>
              <div className={contactPageStyles.successMessage}>
                Opening WhatsApp...
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={contactPageStyles.container}>
        <div className={contactPageStyles.headerContainer}>
          <div className={contactPageStyles.headerBadge}>
            <MessageCircle className={contactPageStyles.headerIcon} />
            <span className={contactPageStyles.headerBadgeText}>
              SWAP Support
            </span>
          </div>

          <h1 className={contactPageStyles.headerTitle}>
            <span style={contactPageStyles.headerGradient}>
              Style Assistance
            </span>
            <br />
            <span className={contactPageStyles.headerWhiteText}>
              Via WhatsApp
            </span>
          </h1>

          <p className={contactPageStyles.headerDescription}>
            Get instant help with orders, sizing, returns, or custom requests.
            Our team is just a message away.
          </p>
        </div>

        <div className={contactPageStyles.mainCard}>
          <div className={contactPageStyles.mainGrid}>
            <section className={contactPageStyles.leftSection}>
              <div className={contactPageStyles.formHeaderContainer}>
                <div className={contactPageStyles.formIconContainer}>
                  <ShoppingBag className={contactPageStyles.formIcon} />
                </div>
                <div>
                  <h2
                    className={contactPageStyles.formTitle}
                    style={contactPageStyles.formTitleGradient}
                  >
                    Contact Us
                  </h2>
                  <p className={contactPageStyles.formSubtitle}>
                    Questions about an order or product? Send it to WhatsApp.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className={contactPageStyles.form}>
                <div className={contactPageStyles.formGrid}>
                  <label className={contactPageStyles.fieldLabel}>
                    Full name
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      placeholder="Enter your name"
                      className={contactPageStyles.formInput}
                    />
                  </label>

                  <label className={contactPageStyles.fieldLabel}>
                    Email address
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      className={contactPageStyles.formInput}
                    />
                  </label>
                </div>

                <div className={contactPageStyles.formGrid}>
                  <label className={contactPageStyles.fieldLabel}>
                    Mobile number
                    <div className={contactPageStyles.phoneContainer}>
                    <span className={contactPageStyles.phonePrefix}>
                      <Phone className={contactPageStyles.phonePrefixIcon} />
                      <span className={contactPageStyles.phonePrefixText}>
                        +91
                      </span>
                    </span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel-national"
                      aria-label="10 digit mobile number"
                      placeholder="10 digit mobile number"
                      className={contactPageStyles.phoneInput}
                      required
                    />
                    </div>
                  </label>

                  <label className={contactPageStyles.fieldLabel}>
                    Order ID (optional)
                    <input
                      name="orderId"
                      value={form.orderId}
                      onChange={handleChange}
                      placeholder="Enter order ID"
                      className={contactPageStyles.formInput}
                    />
                  </label>
                </div>

                <div className={contactPageStyles.formGridThree}>
                  <label className={contactPageStyles.wideFieldLabel}>
                    Product name
                    <input
                      name="product"
                      value={form.product}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      className={contactPageStyles.formInput}
                    />
                  </label>

                  <label className={contactPageStyles.fieldLabel}>
                  Size
                  <select
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    className={contactPageStyles.formSelect}
                  >
                    <option className={contactPageStyles.selectOption}>
                      Size
                    </option>
                    <option className={contactPageStyles.selectOption}>
                      XS
                    </option>
                    <option className={contactPageStyles.selectOption}>
                      S
                    </option>
                    <option className={contactPageStyles.selectOption}>
                      M
                    </option>
                    <option className={contactPageStyles.selectOption}>
                      L
                    </option>
                    <option className={contactPageStyles.selectOption}>
                      XL
                    </option>
                  </select>
                  </label>
                </div>

                <div className={contactPageStyles.formGrid}>
                  <label className={contactPageStyles.fieldLabel}>
                    Color or variant
                    <input
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      placeholder="Enter color or variant"
                      className={contactPageStyles.formInput}
                    />
                  </label>

                  <label className={contactPageStyles.fieldLabel}>
                    Message
                    <input
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className={contactPageStyles.formInput}
                    />
                  </label>
                </div>

                <div className={contactPageStyles.formActions}>
                  <div className={contactPageStyles.formActionLeft}>
                    <Mail className={contactPageStyles.formActionIcon} />
                    <span>Responses via WhatsApp</span>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isLoading || !!phoneError || form.phone.length !== 10
                    }
                    className={contactPageStyles.formActionButton}
                  >
                    {isLoading ? (
                      <>
                        <div
                          style={contactPageStyles.loadingIndicatorStyle}
                        />
                        <span className={contactPageStyles.loadingText}>
                          Preparing...
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className={contactPageStyles.buttonIcon} />
                        <span className={contactPageStyles.buttonText}>
                          Send to WhatsApp
                        </span>
                        <ChevronRight
                          className={contactPageStyles.buttonIcon}
                        />
                      </>
                    )}
                  </button>
                </div>

                <div>
                  {phoneError && (
                    <div className={contactPageStyles.errorContainer}>
                      <AlertCircle className={contactPageStyles.errorIcon} />
                      <span>{phoneError}</span>
                    </div>
                  )}
                  {!phoneError && form.phone.length === 10 && (
                    <div className={contactPageStyles.successContainer}>
                      <CheckCircle
                        className={contactPageStyles.successIconSmall}
                      />
                      <span>Valid Indian mobile number</span>
                    </div>
                  )}
                </div>
              </form>
            </section>

            <aside className={contactPageStyles.rightSection}>
              <div>
                <div className={contactPageStyles.previewCard}>
                  <div
                    className={contactPageStyles.previewCardInner}
                    style={contactPageStyles.previewCardGradient}
                  >
                    <div className={contactPageStyles.previewCardContent}>
                      <div className={contactPageStyles.previewPlaceholder}>
                        <div className={contactPageStyles.hidden}>
                          📱
                        </div>
                        <div className={contactPageStyles.previewCardTitle}>
                          Live WhatsApp Preview
                        </div>
                        <div className={contactPageStyles.previewCardSubtitle}>
                          Message will be sent to
                        </div>
                      </div>
                    </div>

                    <div
                      className={contactPageStyles.previewCardBadgeContainer}
                    >
                      <div className={contactPageStyles.previewCardBadge}>
                        <Phone
                          className={contactPageStyles.previewCardBadgeIcon}
                        />
                        <span
                          className={contactPageStyles.previewCardBadgeText}
                        >
                          +91 8299431275
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3
                  className={contactPageStyles.contactTitle}
                  style={contactPageStyles.formTitleGradient}
                >
                  Contact & Support Info
                </h3>

                <div className={contactPageStyles.stackedFields}>
                  <div className={contactPageStyles.contactItem}>
                    <div
                      className={contactPageStyles.contactIconContainer}
                      style={contactPageStyles.whatsappIconBg}
                    >
                      <Phone
                        className={contactPageStyles.contactIcon}
                        style={contactPageStyles.whatsappIconColor}
                      />
                    </div>
                    <div>
                      <div className={contactPageStyles.contactLabel}>
                        WhatsApp Business
                      </div>
                      <div className={contactPageStyles.contactValue}>
                        +91 8299431275
                      </div>
                      <div className={contactPageStyles.contactDescription}>
                        Instant response
                      </div>
                    </div>
                  </div>

                  <div className={contactPageStyles.contactItem}>
                    <div
                      className={contactPageStyles.contactIconContainer}
                      style={contactPageStyles.instagramIconBg}
                    >
                      <Instagram
                        className={contactPageStyles.contactIcon}
                        style={contactPageStyles.instagramIconColor}
                      />
                    </div>
                    <div>
                      <div className={contactPageStyles.contactLabel}>
                        Instagram Store
                      </div>
                      <div className={contactPageStyles.bodyText}>
                        @HexagonDigitalServices
                      </div>
                      <div className={contactPageStyles.contactDescription}>
                        Latest collections
                      </div>
                    </div>
                  </div>

                  <div className={contactPageStyles.contactItem}>
                    <div
                      className={contactPageStyles.contactIconContainer}
                      style={contactPageStyles.emailIconBg}
                    >
                      <Mail
                        className={contactPageStyles.contactIcon}
                        style={contactPageStyles.emailIconColor}
                      />
                    </div>
                    <div>
                      <div className={contactPageStyles.contactLabel}>
                        Email Support
                      </div>
                      <div className={contactPageStyles.captionText}>
                        support@hexagonsservices.com
                      </div>
                      <div className={contactPageStyles.contactDescription}>
                        Response within 24h
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={contactPageStyles.orderPreviewContainer}>
                <div className={contactPageStyles.orderPreview}>
                  <div className={contactPageStyles.orderPreviewHeader}>
                    <div className={contactPageStyles.orderPreviewTitle}>
                      Order Preview
                    </div>
                    <div className={contactPageStyles.orderPreviewTime}>
                      {currentTime}
                    </div>
                  </div>

                  <div className={contactPageStyles.compactStack}>
                    <div className={contactPageStyles.orderPreviewRow}>
                      <span className={contactPageStyles.orderPreviewLabel}>
                        Product
                      </span>
                      <span className={contactPageStyles.orderPreviewValue}>
                        {form.product || "—"}
                      </span>
                    </div>
                    <div className={contactPageStyles.orderPreviewRow}>
                      <span className={contactPageStyles.orderPreviewLabel}>
                        Size
                      </span>
                      <span className={contactPageStyles.orderPreviewValue}>
                        {form.size || "—"}
                      </span>
                    </div>
                    <div className={contactPageStyles.orderPreviewRow}>
                      <span className={contactPageStyles.orderPreviewLabel}>
                        Color
                      </span>
                      <span className={contactPageStyles.orderPreviewValue}>
                        {form.color || "—"}
                      </span>
                    </div>
                    <div className={contactPageStyles.orderPreviewDivider}>
                      <div
                        className={contactPageStyles.orderPreviewMessageLabel}
                      >
                        Message
                      </div>
                      <div className={contactPageStyles.orderPreviewMessage}>
                        {form.message || "No message yet"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className={contactPageStyles.footer}>
          <div className={contactPageStyles.footerBadge}>
            <MapPin className={contactPageStyles.footerIcon} />
            <span className={contactPageStyles.footerText}>
              Based in Lucknow, Uttar Pradesh | Shipping across India
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
