// DashboardPage Styles
export const dashboardStyles = {
  // Main layout
  pageContainer:
    "relative z-10 min-h-screen w-full bg-ink px-4 pb-12 pt-24 font-interface text-bone sm:px-6 lg:px-8",

  // Toast container
  toastContainer:
    "fixed bottom-4 right-4 z-[60] flex flex-col gap-3 sm:bottom-6 sm:right-6",

  // Toast component
  toast: (type) =>
    `max-w-xs w-full border border-hairline px-4 py-3 flex items-start gap-3 bg-graphite ${
      type === "success"
        ? "text-success"
        : type === "delete"
          ? "text-danger"
          : "text-bone"
    }`,
  toastIconWrap: (type) =>
    `flex h-9 w-9 shrink-0 items-center justify-center ${type === "delete" ? "text-danger" : "text-success"}`,
  toastTitle: "font-medium text-bone",
  toastMessage: "mt-0.5 text-xs text-fog",
  toastCloseButton: "ml-auto min-h-11 min-w-11 cursor-pointer text-fog hover:text-bone",
  deleteConfirmContainer:
    "fixed right-4 top-20 z-50 w-[min(92vw,360px)] sm:right-6 sm:top-24",
  deleteConfirmCard:
    "flex items-start gap-3 border border-danger bg-graphite p-4 text-bone",
  deleteConfirmIconWrap:
    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-danger",
  deleteConfirmTitle: "text-sm font-medium text-bone",
  deleteConfirmText: "mt-1 text-xs text-fog",
  deleteConfirmActions: "mt-4 flex items-center gap-2",
  deleteCancelButton:
    "min-h-11 rounded-sm border border-hairline bg-transparent px-4 py-2 text-xs font-medium text-bone hover:bg-slate",
  deleteConfirmButton:
    "min-h-11 rounded-sm bg-danger px-4 py-2 text-xs font-medium text-ink hover:brightness-95",
  deleteConfirmClose:
    "flex min-h-11 min-w-11 items-center justify-center text-fog hover:text-bone",

  // Modal styles
  modalOverlay:
    "fixed inset-0 z-50 flex items-start justify-center overflow-hidden bg-[var(--scrim)] p-4 pt-20 sm:pt-24",
  modalContainer:
    "dashboard-scroll w-full max-w-lg max-h-[calc(100dvh-6rem)] overscroll-contain overflow-y-auto rounded-md border border-hairline bg-graphite",
  modalHeader: "p-6",
  modalTitleContainer: "flex justify-between items-center mb-6",
  modalTitle: "font-display text-2xl font-normal text-bone",
  modalCloseButton: "flex min-h-11 min-w-11 items-center justify-center text-fog transition-colors hover:bg-slate hover:text-bone",
  modalCloseIcon: "w-5 h-5",

  // Modal content sections
  modalSection: "space-y-6",
  modalInfoCard: "rounded-sm border border-hairline bg-ink p-4",
  modalInfoTitle: "mb-3 text-lg font-medium text-bone",
  modalGrid: "grid grid-cols-2 gap-4",
  modalInfoLabel: "text-sm text-fog",
  modalInfoValue: "font-normal text-bone",

  // Status colors
  getStatusColor: (status) => {
    switch (status) {
      case "Order Placed":
        return "border-hairline bg-slate text-fog";
      case "Order Confirmed":
      case "Processing / Being Prepared":
        return "border-info/20 bg-info/10 text-info";
      case "Delivered":
        return "border-success/20 bg-success/10 text-success";
      case "Cancelled":
        return "border-danger/20 bg-danger/10 text-danger";
      case "Confirmed":
        return "border-info/20 bg-info/10 text-info";
      case "Ready for Pickup":
        return "border-warning/20 bg-warning/10 text-warning";
      case "Shipped":
      case "Shipped / Dispatched":
      case "Out for Delivery":
        return "border-info/20 bg-info/10 text-info";
      default:
        return "border-hairline bg-slate text-fog";
    }
  },

  // Status icon container
  statusIconContainer:
    "inline-flex min-h-11 items-center gap-1 rounded-full px-3 py-1 text-xs",
  statusIcon: "w-4 h-4",
  desktopStatusSelect:
    "min-h-11 w-full min-w-0 border px-2 py-2 text-xs sm:text-sm",

  // Customer info items
  customerInfoItem: "flex items-start gap-3",
  customerIconContainer: "flex h-9 w-9 items-center justify-center border border-hairline bg-slate text-brass",
  customerIcon: "w-5 h-5",
  customerNameIcon: { color: "var(--info)" },
  customerPhoneIcon: { color: "var(--success)" },
  customerAddressIcon: { color: "var(--warning)" },

  // Product details in modal
  productDetailsCard: "border border-hairline bg-ink p-4",
  productImageContainer:
    "relative h-20 w-20 shrink-0 overflow-hidden bg-photo-well",
  productImage: "w-full h-full object-contain",
  productInfoGrid: "grid grid-cols-3 gap-2 text-sm",

  // Modal buttons
  modalButtonsContainer: "mt-8 flex gap-3 border-t border-hairline pt-6",
  modalCloseBtn:
    "min-h-11 flex-1 border border-hairline px-4 py-3 font-medium text-bone transition-colors hover:bg-slate",

  // Header section
  headerContainer: "w-full mb-6",
  headerTitle: "font-display text-3xl font-normal text-bone",
  headerSubtitle: "mt-2 text-sm text-fog",

  // Stats cards
  statsGrid: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 w-full",
  statCard:
    "min-w-0 border border-hairline bg-graphite p-5",
  statTitle: "text-sm font-normal text-fog",
  statValue: "mt-2 text-2xl font-normal tabular-nums text-bone",
  statIconContainer: "flex h-11 w-11 items-center justify-center bg-slate",
  statIcon: "h-5 w-5 text-brass",

  // Main orders section
  ordersContainer:
    "w-full overflow-hidden border border-hairline bg-graphite",
  ordersHeader:
    "flex flex-col justify-between gap-3 border-b border-hairline px-4 py-4 sm:flex-row sm:items-center sm:px-6",
  ordersTitle: "font-display text-xl font-normal text-bone",
  ordersSubtitle: "text-sm text-fog",
  orderState: "border-b border-hairline px-5 py-10 text-center sm:py-14",
  orderStateTitle: "font-display text-xl font-normal text-bone",
  orderStateText: "mx-auto mt-2 max-w-md text-sm text-fog",
  orderRetryButton: "mt-4 min-h-11 border border-hairline px-4 py-2 text-sm text-bone transition-colors hover:border-brass hover:bg-slate",
  orderSkeleton: "mx-auto h-3 w-full max-w-sm animate-pulse bg-slate",

  // Filter controls
  filterContainer: "flex items-center gap-3",
  filterLabel: "text-sm text-fog",
  filterSelect:
    "min-h-11 rounded-sm border border-hairline bg-slate px-3 py-2 text-sm text-bone",

  // Mobile orders view
  mobileOrdersContainer: "block divide-y divide-hairline md:hidden",
  mobileOrderItem: "p-4 sm:p-5",
  mobileOrderImageContainer:
    "h-20 w-20 shrink-0 overflow-hidden bg-photo-well",
  mobileOrderImage: "w-full h-full object-contain",
  mobileOrderGrid:
    "items-start grid grid-cols-2 gap-x-3 gap-y-2 justify-between gap-2",
  mobileProductName: "text-xs font-medium text-bone",
  mobileProductBrand: "text-xs text-fog",

  // Payment status colors
  paymentStatus: (status) =>
    `border px-2 py-1 text-xs ${
      status === "Online"
        ? "border-success/20 bg-success/10 text-success"
        : "border-warning/20 bg-warning/10 text-warning"
    }`,

  // Mobile status select
  mobileStatusSelect:
    "min-h-11 min-w-0 border border-hairline bg-slate px-3 py-2 text-sm text-bone",

  // Mobile details grid
  mobileDetailsGrid:
    "mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-fog",
  mobileDetailLabel: "text-xs text-fog",
  mobileDetailValue: "font-medium text-bone",
  mobileColorValue: "break-words font-medium text-bone",

  // Mobile action buttons
  mobileActions: "mt-3 flex items-center gap-3",
  mobileViewButton:
    "min-h-11 border border-hairline px-3 py-2 text-sm text-bone transition-colors hover:bg-slate",
  mobileDeleteButton:
    "min-h-11 border border-danger/30 px-3 py-2 text-sm text-danger transition-colors hover:bg-danger/10",

  // Desktop table
  desktopTable: "dashboard-scroll hidden md:block overflow-x-auto",
  table: "w-full",
  tableHeader: "sticky top-0 border-b border-hairline bg-graphite",
  tableHeaderCell: "px-4 py-4 text-left text-xs font-medium tracking-wide text-fog lg:px-6",
  tableRow: "border-b border-hairline transition-colors hover:bg-slate",

  // Desktop table cells
  productCell: "py-4 px-6 w-2/7",
  productImageSmall: "relative h-12 w-12 shrink-0 overflow-hidden bg-photo-well",
  productImageSmallImg: "w-full h-full object-cover opacity-95",
  productImageBorder: "absolute inset-0 border border-hairline",
  productInfo: "",
  productName: "font-medium text-bone",
  productBrand: "text-sm text-fog",

  pricingCell: "py-4 px-6 w-1/6",
  pricingValue:
    "inline-flex min-w-15 items-center justify-center border border-hairline px-3 py-2 font-medium tabular-nums text-bone xl:ml-3",
  orderIdValue:
    "inline-flex min-w-28 items-center justify-center border border-hairline bg-ink px-3 py-2 font-medium text-info",
  quantityCell: "py-4 px-6 w-1/8",
  quantityContainer: "flex items-center ml-6 gap-2",
  quantityBadge:
    "flex h-8 w-8 items-center justify-center border border-hairline bg-slate font-medium tabular-nums text-bone",

  sizeCell: "py-4 px-6 w-1/8",
  sizeBadge:
    "border border-hairline bg-slate px-3 py-1.5 text-sm font-medium text-bone xl:ml-5",

  colorCell: "py-4 px-6 w-1/7",
  colorBadge:
    "border border-hairline bg-slate px-3 py-1.5 text-xs font-medium text-bone",

  paymentCell: "py-4 px-6 w-1/8",
  paymentBadge: (status) =>
    `flex min-h-11 w-fit items-center gap-2 border px-3 py-1.5 ${
      status === "Online"
        ? "border-success/20 bg-success/10 text-success"
        : "border-warning/20 bg-warning/10 text-warning"
    }`,
  paymentIcon: "w-4 h-4",
  paymentText: "text-sm font-medium",

  statusCell: "py-4 px-3 w-1/6 lg:px-6",

  actionsCell: "py-4 px-6 w-1/12",
  actionsContainer: "flex items-center gap-2",
  viewButton:
    "flex min-h-11 min-w-11 items-center justify-center text-info transition-colors hover:bg-slate",
  viewIcon: "h-4 w-4",
  deleteButton:
    "flex min-h-11 min-w-11 items-center justify-center border border-danger/20 text-danger transition-colors hover:bg-danger/10",
  deleteIcon: "w-4 h-4",

  // Footer
  tableFooter:
    "flex w-full justify-center border-t border-hairline px-4 py-4 sm:px-6",
  viewAllLink: "flex min-h-11 items-center gap-2 text-sm text-fog hover:text-bone",
  viewAllIcon: "w-4 h-4 transform transition-transform",
};

// public/dummyStyles.js

// ... existing styles ...

export const AdminNavbarStyles = {
  // Main navbar
  navbarBase: "fixed inset-x-0 top-0 z-50 font-interface transition-colors duration-300",
  navbarScrolled: "border-b border-hairline bg-ink/95 py-2 backdrop-blur-lg",
  navbarDefault: "py-3",

  // Container
  container: "mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10",
  innerContainer: "border border-hairline bg-graphite px-4 py-3 sm:px-5",

  // Layout
  flexContainer: "flex items-center justify-between",

  // Logo section
  logoLink: "flex items-center gap-3",
  logoImageContainer: "relative w-28 sm:w-36 aspect-[2.63]",
  logoImage: "object-contain",

  // Desktop navigation
  desktopNav: "hidden items-center gap-1 xl:flex",
  desktopNavItemBase:
    "flex min-h-11 items-center gap-2 whitespace-nowrap border-b px-3 py-2 text-sm transition-colors",
  desktopNavItemActive: "border-brass text-bone",
  desktopNavItemInactive: "border-transparent text-fog hover:text-bone",
  desktopNavIcon: "h-4 w-4",

  // Mobile menu button
  mobileMenuButton:
    "flex min-h-11 min-w-11 items-center justify-center border border-hairline bg-slate text-bone transition-colors hover:border-brass xl:hidden",
  mobileMenuIcon: "h-6 w-6",

  // Mobile menu container
  mobileMenuContainer: "mt-3 border-t border-hairline pt-3 xl:hidden",
  mobileMenuItemBase: "flex min-h-11 items-center gap-3 px-3 py-3 text-sm transition-colors",
  mobileMenuItemActive: "bg-slate text-bone",
  mobileMenuItemInactive: "text-fog hover:bg-slate hover:text-bone",
  mobileMenuIcon: "h-5 w-5",

  // Spacer
  spacer: "h-20",

  // Helper functions
  getNavbarClass: (isScrolled) =>
    `${AdminNavbarStyles.navbarBase} ${isScrolled ? AdminNavbarStyles.navbarScrolled : AdminNavbarStyles.navbarDefault}`,

  getDesktopNavItemClass: (isActive) =>
    `${AdminNavbarStyles.desktopNavItemBase} ${isActive ? AdminNavbarStyles.desktopNavItemActive : AdminNavbarStyles.desktopNavItemInactive}`,

  getMobileMenuItemClass: (isActive) =>
    `${AdminNavbarStyles.mobileMenuItemBase} ${isActive ? AdminNavbarStyles.mobileMenuItemActive : AdminNavbarStyles.mobileMenuItemInactive}`,
};

// AddProductPage Styles
export const addProductStyles = {
  // Main container
  pageContainer: "relative z-10 min-h-screen bg-ink px-4 pb-12 pt-24 font-interface text-bone sm:px-6 lg:px-10",
  contentContainer: "mx-auto max-w-screen-2xl",

  // Header
  headerContainer: "mb-8 text-left",
  headerTitle: "mb-3 font-display text-4xl font-normal tracking-tight text-bone md:text-5xl",
  headerTitleGradient: { color: "var(--bone)" },
  headerSubtitle: "max-w-2xl text-sm text-fog sm:text-base",

  // Form
  formContainer: "space-y-8",

  // Section containers
  sectionContainer:
    "min-h-64 border border-hairline bg-graphite p-5 sm:p-7 md:p-8",
  sectionHeader: "flex items-center mb-6",
  sectionIconContainer: "mr-4 flex h-11 w-11 items-center justify-center border border-hairline bg-slate text-brass",
  sectionIcon: "h-5 w-5",
  sectionTitle: "text-lg font-medium text-bone xl:text-xl",
  sectionSubtitle: "text-sm text-fog",

  // Image Upload Section
  imageUploadPreviewContainer:
    "flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8",
  imagePreviewWrapper: (hasPreview) =>
    `relative overflow-hidden border border-dashed ${hasPreview ? "border-brass" : "border-hairline"} transition-colors cursor-pointer`,
  imagePreviewWrapperInlineStyle: { minHeight: 0 },
  imagePreview:
    "flex min-h-40 items-center justify-center bg-graphite md:min-h-48",
  imagePreviewImg: "h-full w-full object-contain bg-photo-well p-4",
  imageUploadPlaceholder: "flex flex-col items-center justify-center p-6",
  placeholderIcon: "mb-4 h-12 w-12 text-fog",
  placeholderText: "text-fog",
  placeholderSubtext: "text-sm text-fog",
  imageUploadOverlay: "absolute inset-0 pointer-events-none",

  // Upload button section
  uploadButtonContainer: "flex-1 w-full",
  fileInput: "hidden",
  uploadButton:
    "cursor-pointer border border-dashed border-hairline bg-slate p-6 transition-colors hover:border-brass group",
  uploadButtonIconContainer:
    "mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-hairline bg-graphite text-brass transition-colors",
  uploadButtonIcon: "h-6 w-6",
  uploadButtonTitle: "mb-2 text-center font-medium text-bone",
  uploadButtonSubtitle: "text-center text-sm text-fog",
  uploadButtonTip: "mt-2 text-center text-xs text-fog",

  // Product Details
  detailsGrid: "grid grid-cols-1 md:grid-cols-2 gap-5",
  inputLabel: "mb-2 block text-sm font-normal text-bone",
  labelIconContainer: "flex items-center mb-2",
  labelIcon: "w-4 h-4 mr-2",
  inputField:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone placeholder:text-fog focus:border-brass focus:outline-none",

  // Gender & Category
  selectContainer: "relative",
  selectField:
    "min-h-12 w-full appearance-none rounded-sm border border-hairline bg-slate px-4 py-3 text-bone focus:border-brass focus:outline-none",
  selectDropdownIcon:
    "pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fog",

  // Colors Section
  colorsSectionHeader: "flex items-center justify-between mb-6",
  colorsSectionLeft: "flex items-center",
  colorsAddButton:
    "flex min-h-11 cursor-pointer items-center rounded-sm border border-hairline bg-slate px-3 py-2 text-sm text-bone transition-colors hover:border-brass md:px-4",
  addButtonIcon: "w-5 h-5 mr-2",

  // Colors Grid
  colorsGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
  colorItem:
    "flex items-end gap-3 border border-hairline bg-ink p-4 transition-colors hover:border-fog",
  colorInputLabel: "mb-2 block text-sm text-fog",
  colorInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone focus:border-brass focus:outline-none",
  removeColorButton:
    "mb-1 flex min-h-11 min-w-11 items-center justify-center border border-danger/20 text-danger transition-colors hover:bg-danger/10",
  removeColorIcon: "h-5 w-5",

  // Sizes & Pricing
  sizesHeader: "flex items-center justify-between mb-6",
  sizesAddButton:
    "flex min-h-11 cursor-pointer items-center rounded-sm border border-hairline bg-slate px-3 py-2 text-sm text-bone transition-colors hover:border-brass",

  // Size items
  sizeItemsContainer: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
  sizeItem:
    "relative flex flex-col gap-3 border border-hairline bg-ink p-4 transition-colors hover:border-fog",
  sizeInputContainer: "flex-1 w-full",
  sizeInputLabel: "block mb-2 text-sm font-semibold text-gray-300",
  priceLabelContainer: "flex items-center",
  priceLabelIcon: "w-4 h-4 mr-1",
  sizeInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone focus:border-brass focus:outline-none",
  priceInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone focus:border-brass focus:outline-none",
  removeSizeButton:
    "absolute right-2 top-2 flex min-h-11 min-w-11 items-center justify-center text-danger hover:bg-danger/10",
  removeSizeIcon: "h-5 w-5",

  // Submit Button
  submitButtonContainer: "flex justify-center pt-6",
  submitButton:
    "group relative min-h-12 rounded-sm border border-brass bg-brass px-8 py-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95 md:px-12",
  submitButtonOverlay: "hidden",
  submitButtonContent: "relative flex items-center justify-center",
  submitButtonIcon: "w-5 h-5 mr-3",
};

// public/dummyStyles.js

// ... existing styles ...

export const AddAccessoriesPageStyles = {
  // Main container
  mainContainer: "relative z-10 min-h-screen bg-ink px-4 pb-12 pt-24 font-interface text-bone sm:px-6 lg:px-10",
  contentContainer: "mx-auto max-w-screen-2xl",

  // Header
  headerContainer: "mb-8 text-left",
  headerTitle: "mb-3 font-display text-4xl font-normal tracking-tight text-bone md:text-5xl",
  titleGradient: "text-bone",
  headerDescription: "max-w-2xl text-sm text-fog sm:text-base",

  // Form container
  formContainer: "space-y-8",

  // Common section styles
  sectionContainer: "relative",
  sectionGlow: "hidden",
  sectionInner: "relative min-h-56 border border-hairline bg-graphite p-5 sm:p-7 lg:p-8",
  sectionBorder: "border-hairline",
  sectionAccentBorder: "border-brass",

  // Section header
  sectionHeader: "mb-6 flex items-center",
  sectionIconContainer: "mr-4 flex h-11 w-11 items-center justify-center border bg-slate text-brass",
  sectionIconBorder: "border-hairline",
  sectionIcon: "h-5 w-5",
  sectionTitle: "text-lg font-medium text-bone xl:text-xl",
  smallSectionTitle: "text-lg font-medium text-bone",

  // Image upload section
  imageUploadGrid: "grid grid-cols-1 lg:grid-cols-2 gap-6",
  imagePreviewContainer:
    "relative flex aspect-[3/4] min-h-44 cursor-pointer items-center justify-center overflow-hidden border border-dashed border-hairline bg-slate group/image hover:border-brass sm:min-h-48 md:min-h-52",
  imagePreviewImage: "h-full w-full bg-photo-well object-contain p-4",
  imagePreviewPlaceholder:
    "absolute inset-0 flex flex-col items-center justify-center p-8 text-fog",
  imagePreviewIconContainer: "mb-5 flex h-14 w-14 items-center justify-center border border-hairline bg-graphite",
  imagePreviewIcon: "h-7 w-7 text-brass",
  imagePreviewText: "text-center text-fog",

  // Upload area
  uploadArea:
    "min-h-44 rounded-sm border border-dashed border-hairline bg-graphite p-6 transition-colors hover:border-brass focus-visible:outline-brass",
  uploadContent: "text-center",
  uploadIconContainer:
    "mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-hairline bg-slate text-brass",
  uploadIcon: "h-6 w-6",
  uploadTitle: "mb-2 font-medium text-bone",
  uploadSubtitle: "text-sm text-fog",

  // Basic information grid
  basicInfoGrid: "grid grid-cols-1 md:grid-cols-2 gap-5",

  // Form field
  formField: "",
  fieldLabel: "mb-3 block text-sm font-normal text-bone",
  labelContainer: "flex items-center mb-2",
  labelIconContainer:
    "w-6 h-6 mr-3 flex items-center justify-center rounded-lg",
  labelIcon: "w-4 h-4",

  // Color icon gradients
  blueGradient: "bg-slate text-brass",
  purpleGradient: "bg-slate text-brass",
  greenGradient: "bg-slate text-brass",
  amberGradient: "bg-slate text-brass",
  pinkGradient: "bg-slate text-brass",
  emeraldGradient: "bg-slate text-brass",

  // Input field
  inputField:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone placeholder:text-fog focus:border-brass focus:outline-none",
  inputFieldSmall:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone placeholder:text-fog focus:border-brass focus:outline-none",

  // Select field
  selectContainer: "relative",
  selectField:
    "min-h-12 w-full appearance-none cursor-pointer rounded-sm border border-hairline bg-slate px-4 py-3 text-bone focus:border-brass focus:outline-none disabled:opacity-40",
  selectDisabled: "disabled:opacity-50",
  selectIcon:
    "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fog",
  selectChevron: "w-5 h-5",

  // Colors section
  colorsHeader: "flex items-center justify-between mb-8",
  addButtonBase:
    "flex min-h-11 items-center rounded-sm border border-hairline bg-slate px-4 py-2 text-sm text-bone transition-colors hover:border-brass",
  addButtonTextSmall: "text-sm xl:text-md",
  addButtonTextExtraSmall: "text-xs xl:text-lg",
  addButtonIconContainer:
    "mr-3 flex h-8 w-8 items-center justify-center border border-hairline bg-graphite text-brass",
  addButtonIcon: "w-4 h-4",

  // Colors grid
  colorsGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  colorItem:
    "group/color border border-hairline bg-ink p-4 transition-colors hover:border-fog",
  colorInputContainer: "flex items-center",
  colorInputWrapper: "flex-1",
  colorInputLabel: "mb-2 block text-sm text-fog",
  colorInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone placeholder:text-fog focus:border-brass focus:outline-none",
  colorRemoveButton:
    "ml-4 mt-6 flex min-h-11 min-w-11 cursor-pointer items-center justify-center border border-danger/20 text-danger transition-colors hover:bg-danger/10 xl:mt-6",
  colorRemoveIcon: "h-4 w-4",

  // Sizes & Pricing
  sizesHeader: "flex items-center justify-between mb-8",
  sizesGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
  sizeItem:
    "group/size relative border border-hairline bg-ink p-4 transition-colors hover:border-fog",
  sizeInnerGrid: "grid grid-cols-1 gap-3 items-center",
  sizeLabel: "mb-3 block text-sm text-bone",
  sizeLabelRow: "flex items-center",
  sizeInputContainer: "relative",
  sizeInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-5 py-3 pl-12 text-bone placeholder:text-fog focus:border-brass focus:outline-none",
  sizePriceInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-5 py-3 pl-12 text-bone placeholder:text-fog focus:border-brass focus:outline-none",
  sizeInputIcon: "absolute left-4 top-1/2 -translate-y-1/2 text-fog",
  sizeRemoveButton:
    "flex min-h-11 cursor-pointer items-center justify-center border border-danger/20 px-3 py-2 text-danger transition-colors hover:bg-danger/10",
  sizeRemoveIcon: "mr-2 h-4 w-4",

  // Submit button
  submitButtonContainer: "pt-8",
  submitButton:
    "group mx-auto block min-h-12 w-full max-w-md cursor-pointer rounded-sm bg-brass px-8 py-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95",
  submitButtonShimmer: "hidden",
  submitButtonText: "relative flex items-center justify-center",

  // Toast options
  toastStyle: {
    background: "var(--graphite)",
    color: "var(--bone)",
    border: "1px solid var(--hairline)",
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-hanken)",
    padding: "10px 14px",
    fontSize: "13px",
  },

  // Helper functions
  getSectionBorder: (isAccent = false) =>
    isAccent
      ? AddAccessoriesPageStyles.sectionAccentBorder
      : AddAccessoriesPageStyles.sectionBorder,

  getAddButtonClass: (size = "md") =>
    `${AddAccessoriesPageStyles.addButtonBase} ${size === "sm" ? AddAccessoriesPageStyles.addButtonTextSmall : AddAccessoriesPageStyles.addButtonTextExtraSmall}`,

  getLabelIconClass: (color = "blue") =>
    `${AddAccessoriesPageStyles.labelIconContainer} ${AddAccessoriesPageStyles[`${color}Gradient`]}`,

  getIconContainerClass: (color = "pink") =>
    `${AddAccessoriesPageStyles.addButtonIconContainer} ${AddAccessoriesPageStyles[`${color}Gradient`]}`,
};

// AddGroomingPage Styles
export const addGroomingPageStyles = {
  // Main container
  mainContainer: "relative z-10 min-h-screen bg-ink px-4 pb-12 pt-24 font-interface text-bone sm:px-6 lg:px-10",
  contentContainer: "mx-auto max-w-screen-2xl",

  // Header
  headerContainer: "mb-8 text-left",
  headerTitle: "mb-3 font-display text-4xl font-normal tracking-tight text-bone md:text-5xl",
  headerTitleGradient: "text-bone",
  headerSubtitle: "max-w-2xl text-sm text-fog sm:text-base",

  // Form container
  formContainer: "space-y-8",

  // Section container (common for all sections)
  sectionContainer: "relative",
  sectionGlow: "hidden",
  sectionInner: "relative min-h-56 border border-hairline bg-graphite p-5 sm:p-7 lg:p-8",

  // Section header
  sectionHeader: "mb-6 flex items-center",
  sectionIconContainer: "mr-4 flex h-11 w-11 items-center justify-center border border-hairline bg-slate text-brass",
  sectionIcon: "h-5 w-5",
  sectionTitle: "text-lg font-medium text-bone xl:text-xl",

  // Image Upload Section
  imageUploadGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  imagePreviewContainer:
    "relative flex min-h-44 cursor-pointer items-center justify-center overflow-hidden border border-dashed border-hairline bg-slate group/image hover:border-brass",
  imagePreview:
    "w-full h-44 sm:h-48 md:h-52 flex items-center justify-center",
  imagePreviewImg:
    "h-full w-full bg-photo-well object-contain p-4",
  imagePreviewPlaceholder:
    "absolute inset-0 flex flex-col items-center justify-center p-8 text-fog",
  imagePlaceholderIconContainer: "mb-5 flex h-14 w-14 items-center justify-center border border-hairline bg-graphite",
  imagePlaceholderIcon: "h-7 w-7 text-brass",
  imagePlaceholderText: "text-center text-fog",

  // Upload area
  uploadArea: "flex flex-col justify-center",
  uploadInput: "hidden",
  uploadButton:
    "min-h-44 cursor-pointer rounded-sm border border-dashed border-hairline bg-graphite p-6 transition-colors hover:border-brass focus-visible:outline-brass sm:p-8",
  uploadContent: "text-center",
  uploadIconContainer:
    "mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-hairline bg-slate text-brass",
  uploadIcon: "h-6 w-6",
  uploadTitle: "mb-2 font-medium text-bone",
  uploadSubtitle: "text-sm text-fog",
  uploadTip: "mt-3 text-xs text-fog",

  // Product Details
  productDetailsSpace: "grid grid-cols-1 md:grid-cols-2 gap-6",
  productNameContainer: "",
  productNameLabel: "mb-3 block text-sm font-normal text-bone",
  productNameLabelContainer: "flex items-center mb-2",
  productNameIconContainer:
    "mr-3 flex h-8 w-8 items-center justify-center border border-hairline bg-slate text-brass",
  productNameIcon: "h-4 w-4",
  productNameInputContainer: "relative",
  productNameInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone placeholder:text-fog focus:border-brass focus:outline-none",
  productNameInputIcon:
    "absolute right-4 top-1/2 -translate-y-1/2 text-fog",

  // Gender & Category Grid
  genderCategoryGrid: "col-span-full grid grid-cols-1 md:grid-cols-2 gap-6",

  // Gender
  genderContainer: "",
  genderLabel: "mb-3 block text-sm font-normal text-bone",
  genderLabelContainer: "flex items-center mb-2",
  genderIconContainer:
    "mr-3 flex h-8 w-8 items-center justify-center border border-hairline bg-slate text-brass",
  genderIcon: "w-4 h-4",
  genderSelectContainer: "relative",
  genderSelect:
    "min-h-12 w-full appearance-none rounded-sm border border-hairline bg-slate px-4 py-3 text-bone focus:border-brass focus:outline-none",
  genderSelectIcon:
    "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fog",

  // Category
  categoryContainer: "",
  categoryLabel: "mb-3 block text-sm font-normal text-bone",
  categoryLabelContainer: "flex items-center mb-2",
  categoryIconContainer:
    "mr-3 flex h-8 w-8 items-center justify-center border border-hairline bg-slate text-brass",
  categoryIcon: "w-4 h-4",
  categorySelectContainer: "relative",
  categorySelect:
    "min-h-12 w-full appearance-none rounded-sm border border-hairline bg-slate px-4 py-3 text-bone focus:border-brass focus:outline-none disabled:opacity-40",
  categorySelectIcon:
    "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fog",

  // Select option
  selectOption: "bg-graphite text-bone",

  // Volumes & Pricing
  volumesHeader:
    "flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4",
  volumesLeft: "flex items-center",
  volumesAddButton:
    "flex min-h-11 items-center border border-hairline bg-slate px-4 py-2 text-sm text-bone transition-colors hover:border-brass group/button",
  volumesAddButtonIconContainer: "mr-3 flex h-8 w-8 items-center justify-center border border-hairline bg-graphite text-brass",
  volumesAddButtonIcon: "w-4 h-4",

  // Volumes list
  volumesList: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
  volumeItem:
    "group/volume relative border border-hairline bg-ink p-4 transition-colors hover:border-fog",
  volumeItemGrid:
    "grid grid-cols-1 gap-3 items-center",

  // Volume input
  volumeInputContainer: "",
  volumeLabel: "mb-3 block text-sm text-bone",
  volumeLabelContainer: "flex items-center",
  volumeIconContainer:
    "mr-3 flex h-8 w-8 items-center justify-center border border-hairline bg-slate text-brass",
  volumeIcon: "w-4 h-4",
  volumeInputWrapper: "relative",
  volumeInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-5 py-3 pl-12 text-bone placeholder:text-fog focus:border-brass focus:outline-none",
  volumeInputIconContainer:
    "absolute left-4 top-1/2 -translate-y-1/2 text-fog",
  volumeInputIcon: "w-4 h-4",

  // Price input
  priceInputContainer: "",
  priceLabel: "mb-3 block text-sm font-normal text-bone",
  priceLabelContainer: "flex items-center",
  priceIconContainer:
    "mr-3 flex h-8 w-8 items-center justify-center border border-hairline bg-slate text-brass",
  priceIcon: "w-4 h-4",
  priceInputWrapper: "relative",
  priceInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-5 py-3 pl-12 text-bone placeholder:text-fog focus:border-brass focus:outline-none",
  priceInputIconContainer:
    "absolute left-4 top-1/2 -translate-y-1/2 text-fog",
  priceInputIcon: "w-4 h-4",

  // Remove button
  removeButtonContainer: "flex items-center justify-end",
  removeButton:
    "flex min-h-11 items-center border border-danger/20 px-3 py-2 text-danger transition-colors hover:bg-danger/10 md:mt-8",
  removeButtonIcon: "mr-2 h-4 w-4",

  // Submit Button
  submitButtonContainer: "pt-8",
  submitButton:
    "group relative mx-auto block min-h-12 w-full max-w-md cursor-pointer rounded-sm border border-brass bg-brass px-8 py-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95",
  submitButtonShimmer: "hidden",
  submitButtonText: "relative flex items-center justify-center",

  // Toast styles (for Toaster component)
  toastStyle: {
    background: "var(--graphite)",
    color: "var(--bone)",
    border: "1px solid var(--hairline)",
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-hanken)",
    padding: "10px 14px",
    fontSize: "13px",
    boxShadow: "none",
  },
  toasterOptions: {
    background: "var(--graphite)",
    color: "var(--bone)",
    border: "1px solid var(--hairline)",
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-hanken)",
    padding: "10px 14px",
    fontSize: "13px",
  },
};

// styles/dummyStyles.js
// styles/dummyStyles.js - Adding product gallery styles
export const productGalleryStyles = {
  // Main container
  mainContainer:
    "relative z-10 min-h-screen bg-ink px-4 pb-12 pt-24 font-interface text-bone sm:px-6 lg:px-10",
  contentContainer: "mx-auto max-w-screen-2xl",

  // Header
  headerContainer: "mb-6 md:mb-10",
  headerTitleContainer:
    "flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4",
  headerTitle: "font-display text-3xl font-normal tracking-tight text-bone sm:text-4xl",
  headerSubtitle: "mt-2 text-sm text-fog sm:text-base",

  // Search
  searchContainer: "w-full md:w-80 mt-2 md:mt-0",
  searchInputContainer: "relative w-full",
  searchIconContainer:
    "absolute inset-y-0 left-3 flex items-center pointer-events-none",
  searchIcon: "w-5 h-5 text-gray-400",
  searchInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate py-3 pl-10 pr-4 text-sm text-bone placeholder:text-fog focus:border-brass focus:outline-none sm:text-base",

  // Filters
  filterContainer:
    "flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center",
  primaryFilterContainer:
    "flex items-center gap-2 border-b border-hairline px-2 py-2",
  primaryFilterButtonsContainer: "flex flex-wrap gap-2 px-2",
  primaryFilterButton: (isActive) =>
    `min-h-11 cursor-pointer border-b-2 px-3 py-2 text-sm transition-colors ${isActive ? "border-brass text-bone" : "border-transparent text-fog hover:text-bone"}`,

  categoryFilterContainer:
    "flex min-h-11 items-center gap-2 border-b border-hairline px-3 py-2",
  categorySelect:
    "min-w-35 cursor-pointer bg-transparent text-sm text-bone outline-none",

  genderFilterContainer:
    "flex min-h-11 items-center gap-2 border-b border-hairline px-3 py-2",
  genderSelect:
    "min-w-27.5 cursor-pointer bg-transparent text-sm text-bone outline-none",

  // Product Grid
  productGrid: "grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4",

  // Product Card
  productCard:
    "group flex h-full min-h-[20rem] flex-col overflow-hidden border border-hairline bg-graphite",
  productImageContainer:
    "relative aspect-[3/4] shrink-0 overflow-hidden bg-photo-well",
  productImage: "h-full w-full bg-photo-well object-contain p-3",
  missingImage: "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-graphite text-center text-xs text-fog",
  productCategoryBadge: "absolute top-3 left-3 flex gap-2",
  productCategoryLabel:
    "border border-hairline bg-ink px-2 py-1 text-xs text-bone",

  // Product Info
  productInfoContainer: "flex flex-1 flex-col justify-between p-3 sm:p-4",
  productName: "mt-1 line-clamp-2 text-sm font-medium leading-5 text-bone sm:text-base",
  productBrand: "mt-0.5 text-xs text-fog sm:text-sm",

  // Variants
  variantSection: "mt-2 text-sm flex-1 flex flex-col",
  variantTitle: "mb-2 text-xs font-normal tracking-wide text-fog",
  volumeList: "product-list-scroll space-y-2 max-h-28 sm:max-h-36 overflow-auto pr-1",
  volumeItem:
    "flex items-center justify-between border border-hairline bg-ink px-3 py-2 text-xs text-bone sm:text-sm",
  volumeLabel: "font-medium",
  volumePrice: "text-sm tabular-nums text-bone",

  sizesContainer: "product-list-scroll flex gap-2 flex-wrap mb-2 max-h-20 overflow-auto pr-1",
  sizeBadge:
    "flex min-h-11 items-center gap-2 border border-hairline bg-ink px-3 py-2 text-xs text-bone",
  colorsContainer: "flex max-h-auto flex-wrap gap-2",
  colorBadge: "border border-hairline bg-slate px-2 py-1 text-xs text-bone",

  // Product Footer
  productFooter: "mt-3 flex flex-wrap items-center justify-between gap-2",
  productGender: "text-xs capitalize text-fog",
  productActions: "flex shrink-0 items-center gap-2",
  editButton:
    "inline-flex min-h-11 items-center gap-2 whitespace-nowrap border border-hairline px-2 py-1 text-sm text-bone transition-colors hover:bg-slate sm:px-3 sm:py-2",
  deleteButton:
    "inline-flex min-h-11 items-center gap-2 border border-danger/20 px-2 py-1 text-sm text-danger transition-colors hover:bg-danger/10 sm:px-3 sm:py-2",

  // Empty State
  emptyStateContainer: "text-center py-12 sm:py-16",
  emptyStateText: "text-base text-fog",
  clearFiltersButton:
    "mt-4 min-h-11 rounded-sm border border-hairline px-6 py-2 text-sm text-bone transition-colors hover:bg-slate",

  // Modal
  modalOverlay:
    "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[var(--scrim)] p-0 pt-16 sm:p-5 sm:pt-20",
  modalBackdrop: "absolute inset-0 bg-[var(--scrim)]",
  modalContainer:
    "product-edit-modal relative z-10 min-h-[calc(100dvh-4rem)] w-full max-w-4xl overflow-y-auto border border-hairline bg-graphite sm:min-h-0 sm:max-h-[calc(100dvh-5rem)]",
  modalContent: "mx-auto max-w-3xl p-4 sm:p-7",
  modalHeader: "flex items-center justify-between mb-4",
  modalTitle: "font-display text-xl font-normal text-bone sm:text-2xl",
  modalCloseButton: "flex min-h-11 min-w-11 items-center justify-center text-fog hover:bg-slate hover:text-bone",

  // Modal Image Upload
  imageUploadLabel: "mb-2 block text-sm text-bone",
  imagePreviewContainer:
    "relative aspect-[3/4] overflow-hidden border border-dashed border-hairline bg-photo-well sm:aspect-video",
  imagePreview: "h-full w-full bg-photo-well object-contain p-4",
  uploadButtonContainer: "flex gap-3",
  uploadButton: "flex-1 cursor-pointer",
  uploadButtonInner:
    "flex min-h-11 items-center justify-center gap-2 border border-hairline bg-slate px-4 py-2 text-sm text-bone transition-colors hover:border-brass",

  // Modal Form
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  formField: "space-y-3",
  inputLabel: "mb-2 block text-sm font-normal text-bone",
  requiredStar: "text-danger",
  textInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-3 py-3 text-sm text-bone outline-none transition-colors placeholder:text-fog focus:border-brass sm:px-4 sm:text-base",
  grid2: "grid grid-cols-2 gap-3",
  grid1sm2: "grid grid-cols-1 sm:grid-cols-2 gap-3",

  // Variant Editors in Modal
  variantEditorContainer: "mt-4 space-y-4",
  variantSectionContainer: "border border-hairline bg-ink p-3 sm:p-4",
  variantSectionHeader: "flex items-center justify-between mb-3",
  variantSectionTitle: "font-semibold",
  addVariantButton:
    "inline-flex min-h-11 items-center gap-2 border border-hairline px-3 py-1 text-sm text-bone transition-colors hover:bg-slate",

  // Volume Variant in Modal
  volumeItemGrid:
    "grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-2 border border-hairline bg-slate p-2",
  volumeInput:
    "min-h-11 min-w-0 rounded-sm border border-hairline bg-graphite px-3 py-2 text-sm text-bone",
  volumePriceInput:
    "min-h-11 min-w-0 rounded-sm border border-hairline bg-graphite px-3 py-2 text-sm text-bone",
  volumeRemoveButton: "flex justify-end",
  removeButton: "flex min-h-11 min-w-11 items-center justify-center text-danger transition-colors hover:bg-danger/10",

  // Size Variant in Modal
  sizeItemGrid: "grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-2 border border-hairline bg-slate p-2",
  sizeInput:
    "min-h-11 min-w-0 rounded-sm border border-hairline bg-graphite px-3 py-2 text-sm text-bone",
  sizePriceInput:
    "min-h-11 min-w-0 rounded-sm border border-hairline bg-graphite px-3 py-2 text-sm text-bone",

  // Color Variant in Modal
  colorItemContainer:
    "flex min-h-11 items-center gap-2 border border-hairline bg-slate px-2 py-1",
  colorInput: "min-w-0 bg-transparent px-2 py-1 text-sm text-bone outline-none",

  // Modal Footer
  modalFooter: "mt-6 flex justify-end gap-3 border-t border-hairline pt-4",
  cancelButton:
    "min-h-11 cursor-pointer rounded-sm border border-hairline px-4 py-2 text-sm text-bone hover:bg-slate",
  saveButton:
    "min-h-11 cursor-pointer rounded-sm bg-brass px-4 py-2 text-sm font-medium text-brass-ink hover:brightness-95",

  // Toast
  toastContainer: (type) =>
    `fixed bottom-4 right-4 z-[70] border border-hairline bg-graphite px-4 py-3 text-bone sm:bottom-6 sm:right-6 ${type === "success" ? "text-success" : "text-danger"}`,
  toastInner: "flex items-center gap-3",
  toastIconSuccess: "h-5 w-5 text-success",
  toastIconError: "h-5 w-5 text-danger",
  toastMessage: "font-medium text-bone",
  toastCloseButton: "ml-4 min-h-11 min-w-11 text-fog hover:text-bone",

  // Option styles for selects
  selectOption: "bg-graphite text-bone",
};

export const AdminLoginStyles = {
  main: "grid min-h-[100dvh] place-items-center bg-ink px-4 py-10 font-interface text-bone",
  section: "w-full max-w-md border border-hairline bg-graphite p-6 sm:p-10",
  content: "mx-auto max-w-sm",
  brandRow: "mb-9 flex items-center justify-between",
  brand: "text-sm font-medium tracking-[.12em]",
  brandIcon: "flex h-11 w-11 items-center justify-center border border-hairline bg-slate text-brass",
  eyebrow: "text-xs tracking-[.12em] text-fog",
  title: "mt-3 font-display text-4xl font-normal tracking-tight text-bone",
  description: "mt-3 text-sm leading-6 text-fog",
  form: "mt-9 space-y-4",
  label: "group relative block space-y-2 text-sm text-bone",
  input: "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-sm text-bone outline-none placeholder:text-fog focus:border-brass disabled:opacity-40",
  passwordInput: "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 pr-12 text-sm text-bone outline-none placeholder:text-fog focus:border-brass disabled:opacity-40",
  passwordToggle: "absolute right-2 top-[calc(50%+1rem)] flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-fog hover:text-bone",
  submitButton: "mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-brass px-4 py-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95 disabled:opacity-40",
  spinner: "animate-spin",
  error: "mt-4 text-center text-sm text-danger",
  footer: "mt-6 text-center text-xs text-fog",
};

export const AdminShellStyles = {
  background: "pointer-events-none fixed inset-0 z-0 bg-ink",
  emptyPage: "min-h-screen bg-ink",
  body: "min-h-screen antialiased",
};

export const AdminRemainingStyles = {
  shared: {
    hidden: "hidden",
    schemeDark: "scheme-dark",
    flexWrap: "flex-wrap",
    statusBadgePrefix: "inline-flex items-center gap-2 px-2 py-1 rounded-full",
    statusBadgeSuffix: "text-xs",
  },
  navbar: {
    desktopLogin: "hidden min-h-11 items-center gap-2 border border-hairline bg-ink px-4 py-2 text-sm font-medium text-bone transition-colors hover:border-brass hover:bg-slate xl:inline-flex",
    desktopLogout: "hidden min-h-11 items-center gap-2 border border-hairline bg-slate px-4 py-2 text-sm font-medium text-bone transition-colors hover:border-brass xl:inline-flex",
  },
  dashboard: {
    icon5: "h-5 w-5",
    icon4: "h-4 w-4",
    smallSpinner: "mr-2 inline h-4 w-4 animate-spin",
    flexibleText: "min-w-0 text-sm",
    flexibleContent: "min-w-0 flex-1",
    detailsStack: "space-y-4",
    mutedSubtext: "text-sm text-gray-400 mt-1",
    productGrid: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3",
    productCard: "min-h-62 border border-hairline bg-ink p-3",
    productContent: "flex-1 pt-3",
    productName: "wrap-break-word font-semibold leading-6 text-bone",
    productBrand: "mt-1 wrap-break-word text-sm text-slate-400",
    productMeta: "mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-hairline pt-2 text-sm text-fog",
    mutedValue: "text-slate-500",
    successValue: "font-semibold text-emerald-300",
    screenReaderOnly: "sr-only",
    sectionHeader: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 w-full",
    toolbar: "flex items-center justify-between",
    row: "flex gap-3 items-start",
    flexibleRowContent: "flex-1 min-w-0",
    minWidth: "min-w-0",
    detailGrid: "grid grid-cols-1 items-end gap-2",
    column: "flex flex-col",
    hidden: "hidden",
  },
  orders: {
    inlineMessage: "text-sm font-medium",
    itemDetails: "min-h-62 border border-hairline bg-ink p-3",
    detailsStack: "space-y-4",
    productGrid: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3",
    productContent: "flex-1 pt-3",
    productName: "wrap-break-word font-semibold leading-6 text-bone",
    productBrand: "mt-1 wrap-break-word text-sm text-fog",
    productMeta: "mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-hairline pt-2 text-sm text-fog",
    mutedLabel: "text-fog",
    successValue: "font-semibold text-success",
    searchToolbar: "flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center",
    searchWrap: "relative w-full sm:w-64",
    searchIcon: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400",
    searchInput: "min-h-11 w-full border border-hairline bg-ink py-2 pl-9 pr-3 text-sm text-bone placeholder:text-fog focus:border-brass focus:outline-none",
    loadingText: "mt-3 text-sm text-fog",
    row: "flex gap-3 items-start",
    flexibleContent: "flex-1 min-w-0",
    minWidth: "min-w-0",
    detailGrid: "grid grid-cols-1 items-end gap-2",
    column: "flex flex-col",
  },
  addAccessories: {
    centeredColumn: "flex flex-col justify-center",
    clickable: "block cursor-pointer",
    hidden: "hidden",
    relative: "relative",
    option: "bg-graphite text-bone",
    featureRow: "flex items-center gap-4",
    uploadLabel: "mt-3 flex min-h-11 cursor-pointer items-center justify-center border border-hairline bg-ink px-3 py-2 text-xs text-fog hover:border-brass",
    previewWrap: "relative mt-3",
    image: "h-20 w-full bg-ink object-contain",
    removeImage: "absolute right-1 top-1 flex min-h-11 min-w-11 items-center justify-center bg-ink p-1 text-bone hover:bg-danger",
    removeIcon: "h-3.5 w-3.5",
    row: "flex items-center",
    rightAlignedRow: "flex items-center md:justify-end",
    schemeDark: "scheme-dark",
  },
  addCategories: {
    inlineActions: "flex items-center space-x-3",
    mutedText: "font-serif text-gray-300 text-sm",
    flexibleFullWidth: "flex-1 w-full",
    sectionTitle: "text-2xl font-bold",
    sectionTitleResponsive: "text-lg xl:text-2xl font-bold",
    flexible: "flex-1",
    uploadLabel: "mt-3 flex cursor-pointer items-center justify-center rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-xs text-gray-300 hover:bg-gray-700",
    hidden: "hidden",
    previewWrap: "relative mt-3",
    image: "h-20 w-full bg-ink object-contain",
    removeImage: "absolute right-1 top-1 flex min-h-11 min-w-11 items-center justify-center bg-ink p-1 text-bone hover:bg-danger",
    removeIcon: "h-3.5 w-3.5",
    marginTopResponsive: "mt-2 md:mt-0",
    schemeDark: "scheme-dark",
  },
  addGrooming: {
    formContainer: "mx-auto w-full max-w-md",
    removeImage: "absolute right-2 top-2 z-10 flex min-h-11 min-w-11 items-center justify-center bg-ink p-1.5 text-bone hover:bg-danger",
    icon4: "h-4 w-4",
    hidden: "hidden",
    icon5: "w-5 h-5",
    schemeDark: "scheme-dark",
  },
  listProducts: {
    icon4: "w-4 h-4",
    icon5: "w-5 h-5",
    deleteToast: "fixed right-5 top-20 z-100 w-[min(92vw,340px)] border border-hairline bg-graphite p-4 text-bone shadow-2xl",
    deleteTitle: "text-sm font-semibold",
    mutedSmallText: "mt-1 text-xs text-gray-400",
    deleteActions: "mt-4 flex justify-end gap-2 text-sm",
    cancelDelete: "min-h-11 border border-hairline px-3 py-1.5",
    confirmDelete: "min-h-11 bg-brass px-3 py-1.5 font-semibold text-brass-ink",
    inlineSpinner: "mr-1 inline h-3.5 w-3.5 animate-spin",
    smallSpinner: "mr-2 inline h-4 w-4 animate-spin",
    loadingSpinner: "mx-auto mb-3 h-7 w-7 animate-spin text-brass",
    emptyImageIcon: "h-6 w-6",
    variantCard: "mb-3 border border-hairline bg-ink p-3",
    sectionLabel: "text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500",
    column: "flex flex-col",
    variantBadge: "flex items-center gap-1 border border-hairline bg-ink px-1 py-1 text-xs",
    thumbnail: "h-7 w-7 rounded object-cover",
    sizeLabel: "text-slate-400",
    sizeValue: "font-medium text-slate-100",
    separator: "text-slate-500",
    priceValue: "font-semibold text-emerald-300",
    marginTop: "mt-3",
    wrappingRow: "flex gap-2 flex-wrap",
    mutedText: "text-gray-400 text-xs",
    desktopOnly: "hidden sm:inline",
    mobileOnly: "sm:hidden text-xs",
    flexGap: "space-y-3",
    emptyState: "flex h-full items-center justify-center text-sm text-gray-400",
    imageUploadLabel: "inline-flex cursor-pointer rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-200 hover:bg-gray-800",
    input: "w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm",
    addButtonRow: "flex gap-2",
    variantsGrid: "grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 xl:grid-cols-3",
    smallDeleteIcon: "w-3 h-3 text-bone",
    tinyImageDeleteIcon: "w-3.5 h-3.5 text-bone",
    mutedTextSmall: "text-gray-400 text-sm",
    sizeRemoveRow: "col-span-1  flex gap-1 justify-end",
    availableColors: "font-medium",
    colorRemoveRow: "col-span-1 flex justify-end",
    colorImage: "h-8 w-8 rounded border border-gray-700 object-cover",
    colorUploadLabel: "cursor-pointer rounded border border-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-800",
    sizeInput: "col-span-1 min-h-11 bg-ink px-3 py-2 text-sm text-bone sm:col-span-5",
    priceInput: "col-span-1 min-h-11 bg-ink px-3 py-2 text-sm text-bone sm:col-span-2 scheme-dark",
    removeVariant: "p-2 rounded border cursor-pointer border-gray-700 hover:border-rose-500 hover:bg-rose-900/20 transition",
    colorList: "flex gap-2 flex-wrap",
    inlineDeleteIcon: "w-3.5 h-3.5 text-bone",
    colorGrid: "flex items-center justify-between mb-2",
    colorTitle: "font-medium",
  },
};
