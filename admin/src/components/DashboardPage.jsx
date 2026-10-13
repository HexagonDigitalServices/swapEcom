<div className={dashboardStyles.pageContainer}>
        {deleteTarget && (
          <div className={dashboardStyles.deleteConfirmContainer}>
            <div className={dashboardStyles.deleteConfirmCard}>
              <span className={dashboardStyles.deleteConfirmIconWrap}>
                <Trash2 className={AdminRemainingStyles.dashboard.icon5} />
              </span>
              <div className={AdminRemainingStyles.dashboard.flexibleContent}>
                <div className={dashboardStyles.deleteConfirmTitle}>
                  Delete order {deleteTarget.displayId || deleteTarget.id}?
                </div>
                <div className={dashboardStyles.deleteConfirmText}>
                  This removes {deleteTarget.customer.name}&apos;s order from the
                  list.
                </div>
                <div className={dashboardStyles.deleteConfirmActions}>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(null)}
                    className={dashboardStyles.deleteCancelButton}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDeleteOrder}
                    disabled={pendingAction === `delete-${deleteTarget.id}`}
                    className={dashboardStyles.deleteConfirmButton}
                  >
                    {pendingAction === `delete-${deleteTarget.id}` && (
                      <Loader2 className={AdminRemainingStyles.dashboard.smallSpinner} />
                    )}
                    {pendingAction === `delete-${deleteTarget.id}`
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className={dashboardStyles.deleteConfirmClose}
                aria-label="Close delete confirmation"
              >
                <X className={AdminRemainingStyles.dashboard.icon4} />
              </button>
            </div>
          </div>
        )}
        {cancelTarget && (
          <div className={dashboardStyles.deleteConfirmContainer}>
            <div className={dashboardStyles.deleteConfirmCard}>
              <span className={dashboardStyles.deleteConfirmIconWrap}>
                <XCircle className={AdminRemainingStyles.dashboard.icon5} />
              </span>
              <div className={AdminRemainingStyles.dashboard.flexibleContent}>
                <div className={dashboardStyles.deleteConfirmTitle}>
                  Cancel order {cancelTarget.displayId || cancelTarget.id}?
                </div>
                <div className={dashboardStyles.deleteConfirmText}>
                  This action changes the order status to cancelled.
                </div>
                <div className={dashboardStyles.deleteConfirmActions}>
                  <button
                    type="button"
                    onClick={() => setCancelTarget(null)}
                    className={dashboardStyles.deleteCancelButton}
                  >
                    Keep order
                  </button>
                  <button
                    type="button"
                    disabled={pendingAction === `status-${cancelTarget.id}`}
                    onClick={async () => {
                      await handleStatusChange(
                        cancelTarget.id,
                        "Cancelled",
                        true,
                      );
                      setCancelTarget(null);
                    }}
                    className={dashboardStyles.deleteConfirmButton}
                  >
                    {pendingAction === `status-${cancelTarget.id}` && (
                      <Loader2 className={AdminRemainingStyles.dashboard.smallSpinner} />
                    )}
                    {pendingAction === `status-${cancelTarget.id}`
                      ? "Cancelling..."
                      : "Confirm cancel"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Details Modal */}
        {selectedOrder && (
          <div className={dashboardStyles.modalOverlay}>
            <div className={dashboardStyles.modalContainer}>
              <div className={dashboardStyles.modalHeader}>
                <div className={dashboardStyles.modalTitleContainer}>
                  <h2 className={dashboardStyles.modalTitle}>
                    Customer Details
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className={dashboardStyles.modalCloseButton}
                    aria-label="Close modal"
                  >
                    <X className={dashboardStyles.modalCloseIcon} />
                  </button>
                </div>

                <div className={dashboardStyles.modalSection}>
                  {/* Order Info */}
                  <div className={dashboardStyles.modalInfoCard}>
                    <h3 className={dashboardStyles.modalInfoTitle}>
                      Order Information
                    </h3>
                    <div className={dashboardStyles.modalGrid}>
                      <div>
                        <p className={dashboardStyles.modalInfoLabel}>
                          Payment Status
                        </p>
                        <div
                          className={dashboardStyles.paymentBadge(
                            selectedOrder.paymentStatus,
                          )}
                        >
                          {selectedOrder.paymentStatus === "Online" ? (
                            <CreditCard
                              className={dashboardStyles.paymentIcon}
                            />
                          ) : (
                            <Wallet className={dashboardStyles.paymentIcon} />
                          )}
                          <span className={dashboardStyles.paymentText}>
                            {selectedOrder.paymentStatus}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className={dashboardStyles.modalInfoLabel}>
                          Order ID
                        </p>
                        <p className={dashboardStyles.modalInfoValue}>
                          {selectedOrder.displayId}
                        </p>
                      </div>
                      <div>
                        <p className={dashboardStyles.modalInfoLabel}>Status</p>
                        <span
                          className={`${dashboardStyles.statusIconContainer} ${dashboardStyles.getStatusColor(selectedOrder.orderStatus)}`}
                        >
                          {getStatusIcon(selectedOrder.orderStatus)}
                          {getOrderStatusLabel(selectedOrder.orderStatus)}
                        </span>
                      </div>
                      <div>
                        <p className={dashboardStyles.modalInfoLabel}>
                          Total Amount
                        </p>
                        <p className={dashboardStyles.modalInfoValue}>
                          Rs {formatPrice(getOrderTotal(selectedOrder, false))}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className={dashboardStyles.modalInfoCard}>
                    <h3 className={dashboardStyles.modalInfoTitle}>
                      Customer Information
                    </h3>
                    <div className={AdminRemainingStyles.dashboard.detailsStack}>
                      <div className={dashboardStyles.customerInfoItem}>
                        <div className={dashboardStyles.customerIconContainer}>
                          <User
                            className={dashboardStyles.customerIcon}
                            style={dashboardStyles.customerNameIcon}
                          />
                        </div>
                        <div>
                          <p className={dashboardStyles.modalInfoLabel}>
                            Full Name
                          </p>
                          <p className={dashboardStyles.modalInfoValue}>
                            {selectedOrder.customer.name}
                          </p>
                        </div>
                      </div>

                      <div className={dashboardStyles.customerInfoItem}>
                        <div className={dashboardStyles.customerIconContainer}>
                          <Phone
                            className={dashboardStyles.customerIcon}
                            style={dashboardStyles.customerPhoneIcon}
                          />
                        </div>
                        <div>
                          <p className={dashboardStyles.modalInfoLabel}>
                            Mobile Number
                          </p>
                          <p className={dashboardStyles.modalInfoValue}>
                            {selectedOrder.customer.mobile}
                          </p>
                        </div>
                      </div>

                      <div className={dashboardStyles.customerInfoItem}>
                        <div className={dashboardStyles.customerIconContainer}>
                          <MapPin
                            className={dashboardStyles.customerIcon}
                            style={dashboardStyles.customerAddressIcon}
                          />
                        </div>
                        <div>
                          <p className={dashboardStyles.modalInfoLabel}>
                            Address
                          </p>
                          <p className={dashboardStyles.modalInfoValue}>
                            {selectedOrder.customer.address}
                          </p>
                          <p className={AdminRemainingStyles.dashboard.mutedSubtext}>
                            Pincode: {selectedOrder.customer.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className={dashboardStyles.productDetailsCard}>
                    <h3
                      className={dashboardStyles.modalInfoTitle}
                    >
                      Product Details
                    </h3>
                    <div className={AdminRemainingStyles.dashboard.productGrid}>
                      {(selectedOrder.items || []).map((item, index) => (
                        <div
                          key={`${item.name}-${index}`}
                          className={AdminRemainingStyles.dashboard.productCard}
                        >
                          {item.image && (
                            <div
                              className={dashboardStyles.productImageContainer}
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className={dashboardStyles.productImage}
                              />
                            </div>
                          )}
                          <div className={AdminRemainingStyles.dashboard.productContent}>
                            <p className={AdminRemainingStyles.dashboard.productName}>
                              {item.name}
                            </p>
                            {item.brand && (
                              <p className={AdminRemainingStyles.dashboard.productBrand}>
                                Brand: {item.brand}
                              </p>
                            )}
                            <div className={AdminRemainingStyles.dashboard.productMeta}>
                              {item.size && (
                                <span>
                                  <span className={AdminRemainingStyles.dashboard.mutedValue}>Size:</span>{" "}
                                  {item.size}
                                </span>
                              )}
                              {item.color && (
                                <span>
                                  <span className={AdminRemainingStyles.dashboard.mutedValue}>
                                    Colour:
                                  </span>{" "}
                                  {item.color}
                                </span>
                              )}
                              <span>
                                <span className={AdminRemainingStyles.dashboard.mutedValue}>Qty:</span>{" "}
                                {item.quantity}
                              </span>
                              <span className={AdminRemainingStyles.dashboard.successValue}>
                                Price: Rs {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>
                          <div className={AdminRemainingStyles.dashboard.screenReaderOnly}>
                            {item.name} — {item.quantity} × Rs{" "}
                            {formatPrice(item.price)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={dashboardStyles.modalButtonsContainer}>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className={dashboardStyles.modalCloseBtn}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full-width header */}
        <div className={dashboardStyles.headerContainer}>
          <div className={AdminRemainingStyles.dashboard.sectionHeader}>
            <div>
              <h1 className={dashboardStyles.headerTitle}>
                Dashboard Overview
              </h1>
              <p className={dashboardStyles.headerSubtitle}>
                Welcome back! Here&apos;s what&apos;s happening with your store today.
              </p>
            </div>
          </div>

          {/* Upper cards */}
          <div className={dashboardStyles.statsGrid}>
            {smallStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.id} className={dashboardStyles.statCard}>
                  <div className={AdminRemainingStyles.dashboard.toolbar}>
                    <div>
                      <div className={dashboardStyles.statTitle}>{s.title}</div>
                      <div className={dashboardStyles.statValue}>{s.value}</div>
                    </div>
                    <div className={dashboardStyles.statIconContainer}>
                      <Icon className={dashboardStyles.statIcon} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest Orders Section */}
        <div className={dashboardStyles.ordersContainer}>
          {/* Header */}
          <div className={dashboardStyles.ordersHeader}>
            <div>
              <h2 className={dashboardStyles.ordersTitle}>Latest Orders</h2>
              <p className={dashboardStyles.ordersSubtitle}>
                Manage and track all customer orders
              </p>
            </div>

            <div className={dashboardStyles.filterContainer}>
              <label className={dashboardStyles.filterLabel}>Filter:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={dashboardStyles.filterSelect}
                aria-label="Filter orders by status"
              >
                <option value="All">All</option>
                {statusFlow.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ===== Mobile: card/list view (visible on small screens) ===== */}
          <div className={dashboardStyles.mobileOrdersContainer}>
            {ordersLoading && <div className={dashboardStyles.orderState} role="status" aria-live="polite">Loading orders…</div>}
            {!ordersLoading && ordersError && <div className={dashboardStyles.orderState} role="alert"><h3 className={dashboardStyles.orderStateTitle}>Orders did not load</h3><p className={dashboardStyles.orderStateText}>{ordersError}</p><button type="button" onClick={loadOrders} className={dashboardStyles.orderRetryButton}>Try again</button></div>}
            {!ordersLoading && !ordersError && displayedOrders.length === 0 && <div className={dashboardStyles.orderState} role="status" aria-live="polite"><h3 className={dashboardStyles.orderStateTitle}>No orders yet</h3><p className={dashboardStyles.orderStateText}>Customer orders will appear here after checkout.</p></div>}
            {displayedOrders.map((order) => {
              const availableStatusOptions = getAvailableStatusOptions(
                order.orderStatus,
              );
              const isDisabled =
                order.orderStatus === "Delivered" ||
                order.orderStatus === "Cancelled";

              return (
                <div key={order.id} className={dashboardStyles.mobileOrderItem}>
                  <div className={AdminRemainingStyles.dashboard.row}>
                    <div className={dashboardStyles.mobileOrderImageContainer}>
                      <img
                        src={order.image}
                        alt={order.name}
                        className={dashboardStyles.mobileOrderImage}
                      />
                    </div>

                    <div className={AdminRemainingStyles.dashboard.flexibleRowContent}>
                      <div className={dashboardStyles.mobileOrderGrid}>
                        <div className={AdminRemainingStyles.dashboard.minWidth}>
                          <h4 className={dashboardStyles.mobileProductName}>
                            {order.customer.name}
                          </h4>
                          <p className={dashboardStyles.mobileProductBrand}>
                            Order {order.displayId || order.id}
                          </p>
                        </div>

                        <div className={AdminRemainingStyles.dashboard.detailGrid}>
                          <div
                            className={dashboardStyles.paymentStatus(
                              order.paymentStatus,
                            )}
                          >
                            {order.paymentStatus}
                          </div>

                          {/* native select for status change on mobile */}
                          <select
                            value={""}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              if (newStatus)
                                handleStatusChange(order.id, newStatus);
                            }}
                            disabled={
                              isDisabled || availableStatusOptions.length === 0
                            }
                            className={dashboardStyles.mobileStatusSelect}
                            aria-label={`Change status for order ${order.id}`}
                          >
                            <option value="">Change status</option>
                            {availableStatusOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* compact grid with labels and values to avoid horizontal overflow */}
                      <div className={dashboardStyles.mobileDetailsGrid}>
                        <div className={AdminRemainingStyles.dashboard.column}>
                          <span className={dashboardStyles.mobileDetailLabel}>
                            Total Payment
                          </span>
                          <span className={dashboardStyles.mobileDetailValue}>
                            Rs {formatPrice(getOrderTotal(order, false))}
                          </span>
                        </div>

                        <div className={AdminRemainingStyles.dashboard.column}>
                          <span className={dashboardStyles.mobileDetailLabel}>
                            Payment
                          </span>
                          <span className={dashboardStyles.mobileDetailValue}>
                            {order.paymentStatus}
                          </span>
                        </div>

                        <div className={AdminRemainingStyles.dashboard.column}>
                          <span className={dashboardStyles.mobileDetailLabel}>
                            Customer
                          </span>
                          <span className={dashboardStyles.mobileDetailValue}>
                            {order.customer.mobile}
                          </span>
                        </div>

                        <div className={AdminRemainingStyles.dashboard.column}>
                          <span className={dashboardStyles.mobileDetailLabel}>
                            Status
                          </span>
                          <span
                            className={`${AdminRemainingStyles.shared.statusBadgePrefix} ${dashboardStyles.getStatusColor(order.orderStatus)} ${AdminRemainingStyles.shared.statusBadgeSuffix}`}
                          >
                            {getOrderStatusLabel(order.orderStatus)}
                          </span>
                        </div>

                        <div className={AdminRemainingStyles.dashboard.column}>
                          <span className={dashboardStyles.mobileDetailLabel}>
                            Order ID
                          </span>
                          <span className={dashboardStyles.mobileDetailValue}>
                            {order.displayId || order.id}
                          </span>
                        </div>
                      </div>

                      <div className={dashboardStyles.mobileActions}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className={dashboardStyles.mobileViewButton}
                          aria-label={`View customer details for order ${order.id}`}
                        >
                          View
                        </button>
                        <button
                          onClick={() => removeOrder(order.id)}
                          className={dashboardStyles.mobileDeleteButton}
                          aria-label={`Delete order ${order.id}`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===== Desktop/table view (md and up) ===== */}
          <div className={dashboardStyles.desktopTable}>
            <table className={dashboardStyles.table}>
              <thead>
                <tr className={dashboardStyles.tableHeader}>
                  <th className={dashboardStyles.tableHeaderCell}>CUSTOMER</th>
                  <th className={dashboardStyles.tableHeaderCell}>ORDER ID</th>
                  <th className={dashboardStyles.tableHeaderCell}>
                    TOTAL PAYMENT
                  </th>
                  <th className={dashboardStyles.tableHeaderCell}>PAYMENT</th>
                  <th className={dashboardStyles.tableHeaderCell}>STATUS</th>
                  <th className={dashboardStyles.tableHeaderCell}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {ordersLoading && <tr><td colSpan="6" className={dashboardStyles.orderState} role="status" aria-live="polite">Loading orders…</td></tr>}
                {!ordersLoading && ordersError && <tr><td colSpan="6" className={dashboardStyles.orderState} role="alert"><h3 className={dashboardStyles.orderStateTitle}>Orders did not load</h3><p className={dashboardStyles.orderStateText}>{ordersError}</p><button type="button" onClick={loadOrders} className={dashboardStyles.orderRetryButton}>Try again</button></td></tr>}
                {!ordersLoading && !ordersError && displayedOrders.length === 0 && <tr><td colSpan="6" className={dashboardStyles.orderState} role="status" aria-live="polite"><h3 className={dashboardStyles.orderStateTitle}>No orders yet</h3><p className={dashboardStyles.orderStateText}>Customer orders will appear here after checkout.</p></td></tr>}
                {displayedOrders.map((order) => {
                  const availableStatusOptions = getAvailableStatusOptions(
                    order.orderStatus,
                  );
                  const isDisabled =
                    order.orderStatus === "Delivered" ||
                    order.orderStatus === "Cancelled";

                  return (
                    <tr
                      key={order.id}
                      className={dashboardStyles.tableRow}
                      data-order-row
                    >
                      {/* Customer Column */}
                      <td className={dashboardStyles.productCell}>
                        <div>
                          <h4 className={dashboardStyles.productName}>
                            {order.customer.name}
                          </h4>
                          <p className={dashboardStyles.productBrand}>
                            {order.customer.mobile}
                          </p>
                        </div>
                      </td>

                      {/* Order ID Column */}
                      <td className={dashboardStyles.pricingCell}>
                        <div className={dashboardStyles.orderIdValue}>
                          {order.displayId || order.id}
                        </div>
                      </td>

                      {/* Total Payment Column */}
                      <td className={dashboardStyles.pricingCell}>
                        <div className={dashboardStyles.pricingValue}>
                          Rs {formatPrice(getOrderTotal(order, false))}
                        </div>
                      </td>

                      {/* Color Column */}
                      <td className={AdminRemainingStyles.dashboard.hidden}>
                        <span className={dashboardStyles.colorBadge}>
                          {order.color ?? "—"}
                        </span>
                      </td>

                      {/* Payment Status Column */}
                      <td className={dashboardStyles.paymentCell}>
                        <div
                          className={dashboardStyles.paymentBadge(
                            order.paymentStatus,
                          )}
                        >
                          {order.paymentStatus === "Online" ? (
                            <CreditCard
                              className={dashboardStyles.paymentIcon}
                            />
                          ) : (
                            <Wallet className={dashboardStyles.paymentIcon} />
                          )}
                          <span className={dashboardStyles.paymentText}>
                            {order.paymentStatus}
                          </span>
                        </div>
                      </td>

                      {/* Order Status Column */}
                      <td className={dashboardStyles.statusCell}>
                        <select
                          value={order.orderStatus}
                          onChange={(event) =>
                            handleStatusChange(order.id, event.target.value)
                          }
                          disabled={
                            isDisabled ||
                            pendingAction === `status-${order.id}`
                          }
                          className={`${dashboardStyles.desktopStatusSelect} ${dashboardStyles.getStatusColor(order.orderStatus)}`}
                          aria-label={`Change status for order ${order.displayId}`}
                        >
                          <option value={order.orderStatus}>
                            {getOrderStatusLabel(order.orderStatus)}
                          </option>
                          {availableStatusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions Column */}
                      <td className={dashboardStyles.actionsCell}>
                        <div className={dashboardStyles.actionsContainer}>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className={dashboardStyles.viewButton}
                            title="View customer details"
                            aria-label={`View customer details for order ${order.id}`}
                          >
                            <Eye className={dashboardStyles.viewIcon} />
                          </button>
                          <button
                            onClick={() => removeOrder(order.id)}
                            className={dashboardStyles.deleteButton}
                            title="Delete order"
                            aria-label={`Delete order ${order.id}`}
                          >
                            <Trash2 className={dashboardStyles.deleteIcon} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className={dashboardStyles.tableFooter}>
            <Link
              href="/managebookings"
              className={dashboardStyles.viewAllLink}
            >
              <span>View All Orders</span>
              <CircleArrowOutUpRight className={dashboardStyles.viewAllIcon} />
            </Link>
          </div>
        </div>
      </div>