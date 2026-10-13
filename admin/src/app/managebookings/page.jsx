 <div className={dashboardStyles.pageContainer}>
        {toast && <div className={dashboardStyles.toastContainer}>        <div className={dashboardStyles.toast(toast.type)} role="status" aria-live="polite"><span className={dashboardStyles.toastIconWrap(toast.type)} aria-hidden="true">{toast.type === "delete" ? <Trash2 className={AdminRemainingStyles.dashboard.icon5} /> : <CheckCircle className={AdminRemainingStyles.dashboard.icon5} />}</span><div className={AdminRemainingStyles.orders.inlineMessage}>{toast.message}</div><button onClick={() => setToast(null)} className={dashboardStyles.toastCloseButton} aria-label="Close notification">×</button></div></div>}
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
                    className={dashboardStyles.deleteConfirmButton}
                  >
                    Delete
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
              <span className={dashboardStyles.deleteConfirmIconWrap}><XCircle className={AdminRemainingStyles.dashboard.icon5} /></span>
              <div className={AdminRemainingStyles.dashboard.flexibleContent}>
                <div className={dashboardStyles.deleteConfirmTitle}>Cancel order {cancelTarget.displayId || cancelTarget.id}?</div>
                <div className={dashboardStyles.deleteConfirmText}>This action changes the order status to cancelled.</div>
                <div className={dashboardStyles.deleteConfirmActions}>
                  <button type="button" onClick={() => setCancelTarget(null)} className={dashboardStyles.deleteCancelButton}>Keep order</button>
                  <button type="button" onClick={() => { handleStatusChange(cancelTarget.id, "Cancelled", true); setCancelTarget(null); }} className={dashboardStyles.deleteConfirmButton}>Confirm cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                          Rs {formatPrice(getOrderTotal(selectedOrder))}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={dashboardStyles.modalInfoCard}>
                    <h3 className={dashboardStyles.modalInfoTitle}>
                      Customer Information
                    </h3>
                    <div className={AdminRemainingStyles.orders.detailsStack}>
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

                  <div className={dashboardStyles.productDetailsCard}>
                    <h3 className={dashboardStyles.modalInfoTitle}>
                      Product Details
                    </h3>
                    <div className={AdminRemainingStyles.orders.productGrid}>
                    {(selectedOrder.items || []).map((item, index) => (
                      <div key={`${item.name}-${index}`} className={AdminRemainingStyles.orders.itemDetails}>
                        {item.image && <div className={dashboardStyles.productImageContainer}><img src={item.image} alt={item.name} className={dashboardStyles.productImage} /></div>}
                        <div className={AdminRemainingStyles.orders.productContent}><p className={AdminRemainingStyles.orders.productName}>{item.name}</p>{item.brand && <p className={AdminRemainingStyles.orders.productBrand}>Brand: {item.brand}</p>}<div className={AdminRemainingStyles.orders.productMeta}>{item.size && <span><span className={AdminRemainingStyles.orders.mutedLabel}>Size:</span> {item.size}</span>}{item.color && <span><span className={AdminRemainingStyles.orders.mutedLabel}>Colour:</span> {item.color}</span>}<span><span className={AdminRemainingStyles.orders.mutedLabel}>Qty:</span> {item.quantity}</span><span className={AdminRemainingStyles.orders.successValue}>Price: Rs {formatPrice(item.price)}</span></div></div>
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

        <div className={dashboardStyles.headerContainer}>
          <h1 className={dashboardStyles.headerTitle}>Manage Orders</h1>
          <p className={dashboardStyles.headerSubtitle}>
            View and update all customer orders
          </p>
        </div>

        <div className={dashboardStyles.ordersContainer}>
          <div className={dashboardStyles.ordersHeader}>
            <div>
              <h2 className={dashboardStyles.ordersTitle}>All Orders</h2>
              <p className={dashboardStyles.ordersSubtitle}>
                Same order controls as dashboard with the full order list
              </p>
            </div>
            <div className={AdminRemainingStyles.orders.searchToolbar}>
              <div className={AdminRemainingStyles.orders.searchWrap}>
                <Search className={AdminRemainingStyles.orders.searchIcon} />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search name or order id"
                  className={AdminRemainingStyles.orders.searchInput}
                  aria-label="Search orders by customer name, order id, or mobile"
                />
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
          </div>

          {ordersLoading && (
            <div className={dashboardStyles.orderState} role="status" aria-live="polite">
              <div className={dashboardStyles.orderSkeleton} />
              <p className={AdminRemainingStyles.orders.loadingText}>Loading orders…</p>
            </div>
          )}
          {!ordersLoading && ordersError && (
            <div className={dashboardStyles.orderState} role="alert">
              <h3 className={dashboardStyles.orderStateTitle}>Orders did not load</h3>
              <p className={dashboardStyles.orderStateText}>{ordersError}</p>
              <button type="button" onClick={loadOrders} className={dashboardStyles.orderRetryButton}>Try again</button>
            </div>
          )}
          {!ordersLoading && !ordersError && displayedOrders.length === 0 && (
            <div className={dashboardStyles.orderState} role="status" aria-live="polite">
              <h3 className={dashboardStyles.orderStateTitle}>No orders found</h3>
              <p className={dashboardStyles.orderStateText}>New orders will appear here. Adjust the search or status filter to see other results.</p>
            </div>
          )}

          <div className={`${dashboardStyles.mobileOrdersContainer} ${ordersLoading || ordersError || displayedOrders.length === 0 ? AdminRemainingStyles.shared.hidden : ""}`}>
            {displayedOrders.map((order) => {
              const availableStatusOptions = getAvailableStatusOptions(
                order.orderStatus,
              );
              const isDisabled =
                order.orderStatus === "Delivered" ||
                order.orderStatus === "Cancelled";

              return (
                <div key={order.id} className={dashboardStyles.mobileOrderItem}>
                  <div className={AdminRemainingStyles.orders.row}>
                    <div className={dashboardStyles.mobileOrderImageContainer}>
                      <img
                        src={order.image}
                        alt={order.name}
                        className={dashboardStyles.mobileOrderImage}
                      />
                    </div>
                    <div className={AdminRemainingStyles.orders.flexibleContent}>
                      <div className={dashboardStyles.mobileOrderGrid}>
                        <div className={AdminRemainingStyles.orders.minWidth}>
                          <h4 className={dashboardStyles.mobileProductName}>
                            {order.customer.name}
                          </h4>
                          <p className={dashboardStyles.mobileProductBrand}>
                            Order {order.displayId || order.id}
                          </p>
                        </div>
                        <div className={AdminRemainingStyles.orders.detailGrid}>
                          <div
                            className={dashboardStyles.paymentStatus(
                              order.paymentStatus,
                            )}
                          >
                            {order.paymentStatus}
                          </div>
                          <select
                            value=""
                            onChange={(e) => {
                              if (e.target.value) {
                                handleStatusChange(order.id, e.target.value);
                              }
                            }}
                            disabled={
                              isDisabled || availableStatusOptions.length === 0
                            }
                            className={dashboardStyles.mobileStatusSelect}
                            aria-label={`Change status for order ${order.id}`}
                          >
                            <option value="">Change status</option>
                            {availableStatusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className={dashboardStyles.mobileDetailsGrid}>
                        <div className={AdminRemainingStyles.orders.column}>
                          <span className={dashboardStyles.mobileDetailLabel}>
                            Total Payment
                          </span>
                          <span className={dashboardStyles.mobileDetailValue}>
                            Rs {formatPrice(getOrderTotal(order))}
                          </span>
                        </div>
                        <div className={AdminRemainingStyles.orders.column}>
                          <span className={dashboardStyles.mobileDetailLabel}>
                            Payment
                          </span>
                          <span className={dashboardStyles.mobileDetailValue}>
                            {order.paymentStatus}
                          </span>
                        </div>
                        <div className={AdminRemainingStyles.orders.column}>
                          <span className={dashboardStyles.mobileDetailLabel}>
                            Customer
                          </span>
                          <span className={dashboardStyles.mobileDetailValue}>
                            {order.customer.mobile}
                          </span>
                        </div>
                        <div className={AdminRemainingStyles.orders.column}>
                          <span className={dashboardStyles.mobileDetailLabel}>
                            Status
                          </span>
                          <span
                            className={`${AdminRemainingStyles.shared.statusBadgePrefix} ${dashboardStyles.getStatusColor(order.orderStatus)} ${AdminRemainingStyles.shared.statusBadgeSuffix}`}
                          >
                            {getOrderStatusLabel(order.orderStatus)}
                          </span>
                        </div>
                      </div>

                      <div className={dashboardStyles.mobileActions}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className={dashboardStyles.mobileViewButton}
                        >
                          View
                        </button>
                        <button
                          onClick={() => removeOrder(order.id)}
                          className={dashboardStyles.mobileDeleteButton}
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

          <div className={`${dashboardStyles.desktopTable} ${ordersLoading || ordersError || displayedOrders.length === 0 ? AdminRemainingStyles.shared.hidden : ""}`}>
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
                      <td className={dashboardStyles.pricingCell}>
                        <div className={dashboardStyles.orderIdValue}>
                          {order.displayId || order.id}
                        </div>
                      </td>
                      <td className={dashboardStyles.pricingCell}>
                        <div className={dashboardStyles.pricingValue}>
                          Rs {formatPrice(getOrderTotal(order))}
                        </div>
                      </td>
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
                      <td className={dashboardStyles.statusCell}>
                        <select
                          value={order.orderStatus}
                          onChange={(event) =>
                            handleStatusChange(order.id, event.target.value)
                          }
                          disabled={isDisabled}
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
        </div>
      </div>