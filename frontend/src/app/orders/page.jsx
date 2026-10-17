"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  CheckCircle,
  Truck,
  XCircle,
  Package as PackageIcon,
  CreditCard,
  Eye,
  EyeOff,
} from "lucide-react";

// Import styles from the centralized file
import { OrdersPageStyles } from "@/app/styles/dummyStyles";
import { api, getCurrentUser } from "@/lib/api";

/* ---------------------- StatusBadge (clean + small) --------------------- */
function StatusBadge({ status }) {
  const normalized = (status || "").toLowerCase();
  const map = {
    "order placed": { label: "Order Placed", Icon: PackageIcon },
    "order confirmed": { label: "Order Confirmed", Icon: CheckCircle },
    "processing / being prepared": {
      label: "Processing / Being Prepared",
      Icon: PackageIcon,
    },
    "ready for pickup": { label: "Ready for Pickup", Icon: PackageIcon },
    "shipped / dispatched": {
      label: "Shipped / Dispatched",
      Icon: Truck,
    },
    "out for delivery": { label: "Out for Delivery", Icon: Truck },
    confirmed: { label: "Order Confirmed", Icon: CheckCircle },
    shipped: { label: "Shipped / Dispatched", Icon: Truck },
    delivered: { label: "Delivered", Icon: CheckCircle },
    cancelled: { label: "Cancelled", Icon: XCircle },
  };

  const entry = map[normalized] || {
    label: status || "Processing",
    Icon: PackageIcon,
  };
  const { Icon } = entry;
  return (
    <div
      aria-live="polite"
      className={`${OrdersPageStyles.statusBadgeBase} ${OrdersPageStyles.getStatusBadgeClass(status)}`}
    >
      <Icon className={OrdersPageStyles.statusBadgeIcon} />
      <span>{entry.label}</span>
    </div>
  );
}

/* --------------------------- helpers ---------------------------------- */
function parsePrice(price) {
  if (typeof price === "number") return price;
  if (!price) return 0;
  const num = Number(String(price).replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(num) ? num : 0;
}

function formatINR(amount) {
  const n = typeof amount === "number" ? amount : Number(amount) || 0;
  return n.toLocaleString("en-IN");
}

/* --------------------------- OrderCard -------------------------------- */
function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  const orderTotal = (order.items || []).reduce((acc, item) => {
    return acc + parsePrice(item.price) * (item.quantity || 0);
  }, 0);

  const allItems = order.items || [];
  const visibleItems = expanded ? allItems : [];

  return (
    <article className={OrdersPageStyles.orderCard}>
      <div className={OrdersPageStyles.orderStrip}>
        <div>
          <div className={OrdersPageStyles.orderStripLabel}>Order ID</div>
          <div className={OrdersPageStyles.orderStripValue}>
            #ORD-{order.orderNumber || String(order.id).slice(-4)}
          </div>
        </div>
        <div>
          <div className={OrdersPageStyles.orderStripLabel}>Items</div>
          <div className={OrdersPageStyles.orderStripValue}>
            {allItems.length} item{allItems.length === 1 ? "" : "s"}
          </div>
        </div>
        <div>
          <div className={OrdersPageStyles.orderStripLabel}>Total Payment</div>
          <div className={OrdersPageStyles.orderStripTotal}>
            Rs {formatINR(orderTotal)}
          </div>
        </div>
        <div className={OrdersPageStyles.orderStripStatus}>
          <StatusBadge status={order.status} />

          <div style={OrdersPageStyles.paymentMethodInnerContainerStyle}>
            <CreditCard
              size={16}
              color={
                order.paymentMethod?.toLowerCase().includes("online")
                  ? OrdersPageStyles.onlinePaymentIconColor
                  : OrdersPageStyles.cashPaymentIconColor
              }
            />

            <span
              style={OrdersPageStyles.getPaymentMethodStyle(
                order.paymentMethod?.toLowerCase().includes("online"),
              )}
            >
              {order.paymentMethod}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((s) => !s)}
          aria-expanded={expanded}
          className={OrdersPageStyles.viewButtonStyle}
        >
          {expanded ? <EyeOff size={16} /> : <Eye size={16} />}
          <span>{expanded ? "Hide items" : "View items"}</span>
        </button>
      </div>

      <div className={OrdersPageStyles.detailsContainer}>
        <div className={OrdersPageStyles.variantList}>
          {visibleItems.map((item, idx) => {
            const thumb = item.image || "/images/placeholder.png";
            const itemBrand = item.brand || order.brand;

            const dimensionLabel = item.size
              ? "Size"
              : item.volume
                ? "Vol"
                : "Size/Vol";
            const dimensionValue = item.size || item.volume || "—";

            return (
              <div
                key={`${item.id || "item"}-${item.size || item.volume || "default"}-${item.color || "default"}-${idx}`}
                className={OrdersPageStyles.variantRow}
              >
                {/* Thumbnail */}
                <div style={OrdersPageStyles.thumbnailContainerStyle}>
                  <Image
                    src={thumb}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1536px) 170px, (min-width: 1024px) 150px, (min-width: 640px) 190px, 100vw"
                    className={OrdersPageStyles.productImage}
                  />
                </div>

                {/* Details + Price container */}
                <div style={OrdersPageStyles.detailsFlexContainerStyle}>
                  {/* Left details block */}
                  <div style={OrdersPageStyles.leftDetailsBlockStyle}>
                    {/* Title */}
                    <div style={OrdersPageStyles.itemTitleStyle}>
                      {item.title}
                    </div>
                    {/* Brand */}
                    <div style={OrdersPageStyles.itemBrandStyle}>
                      {itemBrand}
                    </div>
                    {/* Details with lighter colors */}
                    <div style={OrdersPageStyles.itemDetailsRowStyle}>
                      <div>
                        <span
                          className={OrdersPageStyles.smallLabel}
                          style={OrdersPageStyles.smallLabelStyle}
                        >
                          {dimensionLabel}
                        </span>
                        <div
                          className={OrdersPageStyles.detailValue}
                          style={OrdersPageStyles.detailValueStyle}
                        >
                          {dimensionValue}
                        </div>
                      </div>
                      {item.color?.trim() && (
                        <div>
                          <span
                            className={OrdersPageStyles.smallLabel}
                            style={OrdersPageStyles.smallLabelStyle}
                          >
                            Color
                          </span>
                          <div
                            className={OrdersPageStyles.detailValue}
                            style={OrdersPageStyles.detailValueStyle}
                          >
                            {item.color || "—"}
                          </div>
                        </div>
                      )}
                      <div>
                        <span
                          className={OrdersPageStyles.smallLabel}
                          style={OrdersPageStyles.smallLabelStyle}
                        >
                          Qty
                        </span>
                        <div
                          className={OrdersPageStyles.detailValue}
                          style={OrdersPageStyles.detailValueStyle}
                        >
                          {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={OrdersPageStyles.itemPriceContainerStyle}>
                    <div style={OrdersPageStyles.itemPriceTextStyle}>
                      Rs {formatINR(parsePrice(item.price))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {expanded && (
            <div style={OrdersPageStyles.totalPaymentContainerStyle}>
              <div style={OrdersPageStyles.totalPaymentInnerStyle}>
                <div style={OrdersPageStyles.totalLabelStyle}>Total</div>
                <div style={OrdersPageStyles.totalAmountStyle}>
                  Rs {formatINR(orderTotal)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* --------------------------- OrdersPage -------------------------------- */
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return;
    api(`/orders/my-orders?user=${user.id}`)
      .then(({ orders: result }) => {
        setOrders(
          result.map((o) => ({
            id: o._id,
            orderNumber: o.orderNumber,
            status: o.orderStatus,
            paymentMethod:
              o.paymentMethod === "Stripe" ? "Online" : o.paymentMethod,
            items: (o.items || []).map((i) => {
              const product =
                i.product && typeof i.product === "object" ? i.product : null;
              const selectedColor = String(i.color || "")
                .trim()
                .toLowerCase();
              const variant =
                product?.variants?.find(
                  (v) =>
                    String(v.color || "")
                      .trim()
                      .toLowerCase() === selectedColor,
                ) || product?.variants?.[0];
              return {
                id: product?._id || i.product || "item",
                // Snapshot fields keep historic orders readable even if a product
                // is later edited or removed.
                title: product?.name || i.productName || "Product",
                brand: product?.brand || i.brand || "",
                image:
                  variant?.images?.[0]?.url || i.imageUrl || "/favicon.ico",
                price: i.price,
                quantity: i.quantity,
                size: i.size || "",
                color: i.color || "",
              };
            }),
          })),
        );
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className={OrdersPageStyles.mainContainer}>
      <Navbar />

      <main className={OrdersPageStyles.contentContainer}>
        <header className={OrdersPageStyles.header}>
          <div>
            <h1 className={OrdersPageStyles.headerTitle}>My Orders</h1>
          </div>
        </header>

        <section>
          <div className={OrdersPageStyles.ordersGrid}>
            {isLoading ? (
              Array.from({ length: 2 }, (_, index) => (
                <div
                  key={index}
                  aria-hidden="true"
                  className={OrdersPageStyles.loadingSkeleton}
                />
              ))
            ) : hasError ? (
              <div className={OrdersPageStyles.errorState}>
                <p className={OrdersPageStyles.errorTitle}>Your orders could not load.</p>
                <p className={OrdersPageStyles.errorText}>Refresh the page to try again.</p>
              </div>
            ) : orders.length ? (
              orders.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <div className={OrdersPageStyles.emptyState}>
                <p className={OrdersPageStyles.emptyTitle}>
                  No orders yet
                </p>
                <p className={OrdersPageStyles.emptyText}>
                  Start shopping to see your orders here.
                </p>
                <Link
                  href="/#clothing"
                  className={OrdersPageStyles.retryButton}
                >
                  Shop Clothing
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
