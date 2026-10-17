// public/dummyStyles.js

export const TrendingNowStyles = {
  // Section styles
  section: "mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24",

  // Heading styles
  heading: "mb-6 text-left font-display text-3xl font-normal leading-tight tracking-[-0.02em] text-bone sm:mb-8 sm:text-4xl",
  headingSpan: "font-display",

  // Grid styles
  grid: "grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6",

  // Link/Card styles
  link: "group min-w-0 text-bone",

  // Image container styles
  imageContainer:
    "relative aspect-[4/5] overflow-hidden rounded-sm bg-graphite",

  // Image styles
  image:
    "object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.025]",

  // Bottom content styles
  bottomDiv:
    "flex min-h-14 items-start justify-between gap-2 pt-3 text-bone",

  // Product name styles
  productName:
    "min-w-0 line-clamp-2 text-sm font-normal sm:text-base",

  // Shop Now button styles
  shopNowSpan:
    "inline-flex min-h-11 shrink-0 items-center whitespace-nowrap text-fog transition-colors group-hover:text-bone",
};

export const bannerStyles = {
  // Layout styles
  section: "w-full px-0 pb-10 pt-16 sm:pb-14 sm:pt-20 lg:pb-16 lg:pt-24",
  container: "mx-auto w-full",

  // Banner card
  bannerCard: "relative overflow-hidden",

  // Slide container
  slideContainer:
    "relative flex min-h-[520px] items-center sm:min-h-[620px] lg:min-h-[min(82dvh,900px)]",

  // Background image
  backgroundImage: "object-cover object-[64%_center]",

  // Gradient overlay
  gradientOverlay:
    "absolute inset-0 bg-linear-to-r from-ink/85 via-ink/35 to-transparent",

  // Content container
  contentContainer:
    "absolute inset-y-0 left-0 z-10 flex w-full flex-col items-start justify-center px-5 text-bone sm:px-8 md:px-12 lg:px-16",

  // Text styles
  newArrivalText: "text-xs tracking-[0.12em] text-fog sm:text-sm",
  title: "mt-3 max-w-[11ch] text-balance font-interface text-5xl leading-[0.88] tracking-[-0.045em] sm:text-7xl lg:text-[clamp(5rem,9vw,8rem)]",
  titleStrong: "block font-bold",
  titleLight: "block font-light",
  subtitle: "mt-3 max-w-sm text-pretty text-sm leading-relaxed text-bone sm:text-base",

  // Button styles
  ctaButton:
    "inline-flex min-h-12 w-auto items-center justify-center gap-2 rounded-md bg-brass px-6 text-sm font-medium text-brass-ink transition-colors hover:bg-bone",
  exploreButton: "inline-flex min-h-12 items-center justify-center px-5 text-sm text-bone underline underline-offset-4 hover:text-brass",
  nextButton: "absolute bottom-6 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-md border border-hairline bg-ink/70 text-bone transition-colors hover:bg-slate sm:bottom-8 sm:right-8 lg:right-12",

  // Controls
  controlsContainer: "mt-4 flex justify-end sm:mt-5",
  contentActions: "mt-6 flex flex-row flex-wrap items-center gap-3",
  controlsContainerEnd: "mt-4 flex justify-end sm:mt-5 justify-end",
  slideCounter: "text-sm tabular-nums text-fog",

  // Motion variants (unchanged from original)
  motionVariants: {
    sideCardVariant: {
      hiddenLeft: { x: -120, opacity: 0 },
      hiddenRight: { x: 120, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    contentVariant: {
      hidden: { x: -30, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
  },
};

export const FooterStyles = {
  footer:
    "relative isolate overflow-hidden border-t border-hairline bg-ink py-14 text-bone sm:py-16 lg:py-20",
  container: "relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12",
  grid: "grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12",
  brandContainer: "flex flex-col items-start text-left",
  logoImage: "mb-3 block h-auto w-32 object-contain",
  brandTitle: "text-lg font-medium tracking-wide text-bone",
  brandSubtitle: "mt-1 text-sm text-fog",
  socialIconsContainer: "mt-5 flex items-center gap-1",
  socialIconLink:
    "flex h-11 w-11 items-center justify-center text-fog transition-colors hover:text-bone",
  columnTitle: "mb-4 text-[11px] font-normal uppercase tracking-[0.14em] text-fog",
  linkList: "flex flex-col items-start gap-1 text-sm",
  footerLink:
    "inline-flex min-h-11 items-center text-bone transition-colors hover:text-brass",
  ctaContainer: "flex flex-col items-start text-left",
  ctaDescription: "max-w-prose text-sm leading-relaxed text-fog",
  ctaForm:
    "mt-5 flex w-full max-w-md flex-col overflow-hidden border border-hairline bg-graphite sm:flex-row",
  ctaFormInputContainer: "flex min-w-0 w-full items-center gap-3 px-3 py-2",
  ctaFormInputIcon: "shrink-0 text-fog",
  ctaFormInput:
    "min-h-11 min-w-0 w-full bg-transparent text-sm text-bone placeholder:text-fog",
  ctaFormButton:
    "min-h-12 shrink-0 bg-brass px-4 text-sm font-medium text-brass-ink transition-colors hover:bg-bone sm:min-h-0",
  supportStatusContainer: "mt-5 text-sm text-fog",
  supportStatusIndicator: "h-2 w-2 rounded-full bg-success",
  supportStatusTextContainer: "flex items-center gap-3",
  supportHours: "mt-2 text-xs text-fog",
  separator: "mt-10 border-t border-hairline pt-5 sm:mt-12 sm:pt-6",
  copyrightContainer:
    "flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center",
  copyrightText: "text-sm text-fog",
  designByLink: "group inline-flex min-h-11 items-center gap-3",
  designByText1: "text-xs text-fog",
  designByText2: "text-xs font-medium text-bone group-hover:text-brass",
  backgroundLayer: "pointer-events-none absolute inset-0",
  backgroundImage: "object-cover object-center opacity-100 blur-[1px] sm:opacity-100",
  backgroundOverlay: "absolute inset-0 bg-linear-to-b from-ink/85 via-ink/65 to-ink/40",
  screenReaderOnly: "sr-only",
};

// public/dummyStyles.js

export const NavbarStyles = {
  // Header and main container
  header: "fixed inset-x-0 top-0 z-[100] w-full px-3 pt-3 sm:px-4 sm:pt-4 lg:px-8",
  nav: "relative mx-auto max-w-[1440px] border-b border-hairline bg-ink/90 text-bone backdrop-blur-md",

  // Main navigation container
  navContainer:
    "flex min-h-14 items-center justify-between gap-3 px-3 py-2 sm:min-h-16 sm:px-5",

  // Logo section
  logoContainer: "flex min-h-11 shrink-0 items-center gap-2 sm:gap-3",
  logoImage: "h-auto w-24 object-contain sm:w-28",

  // Desktop menu
  desktopMenu: "hidden items-center gap-2 lg:flex xl:gap-4",
  navItemContainer:
    "relative flex min-h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors tablet-nav-item",
  navItemActive: "text-brass",
  navItemInactive: "text-fog hover:text-bone",
  navItemText: "text-sm",
  navUnderline:
    "hidden",

  // Right actions container
  rightActions: "flex shrink-0 items-center gap-1 sm:gap-2",

  // Cart button
  cartButton:
    "relative flex min-h-11 min-w-11 items-center justify-center rounded-md text-bone transition-colors hover:bg-slate tablet-cart-btn",
  cartIcon: "sm:text-[18px]",
  cartBadge:
    "pointer-events-none absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brass px-1 text-[11px] font-medium text-brass-ink",

  // Login button (desktop)
  desktopLoginButton:
    "hidden min-h-11 items-center justify-center gap-2 rounded-md border border-hairline px-4 text-sm text-bone transition-colors hover:bg-slate md:inline-flex",
  loginButtonGradient: "hidden",
  loginButtonContent: "flex items-center gap-2",
  loginButtonText: "text-sm",

  // Mobile menu button
  mobileMenuButton: "flex min-h-11 min-w-11 items-center justify-center rounded-md text-bone hover:bg-slate lg:hidden",

  // Mobile menu overlay
  mobileOverlay: "fixed inset-0 z-[110] bg-scrim lg:hidden",

  // Mobile menu container
  mobileMenuContainer:
    "fixed inset-0 z-[120] h-[100dvh] overflow-y-auto bg-ink px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-[calc(16px+env(safe-area-inset-top))] lg:hidden",
  mobileMenuInner: "mx-auto flex min-h-full max-w-xl flex-col gap-2",
  mobileMenuHeader: "mb-6 flex min-h-12 items-center justify-between border-b border-hairline pb-4",
  mobileMenuTitle: "font-display text-2xl",

  // Mobile login button
  mobileLoginButtonContainer: "px-2",
  mobileLoginButton:
    "flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-hairline bg-graphite px-4 text-bone",

  // Mobile nav items
  mobileNavItemContainer:
    "flex min-h-14 items-center gap-4 border-b border-hairline px-3 text-base transition-colors",
  mobileNavItemActive: "text-brass",
  mobileNavItemInactive: "text-bone hover:bg-graphite",
  mobileNavItemText: "text-base",

  // Custom CSS styles
  customCSS: `
    .animated-gradient {
      background: linear-gradient(
        90deg,
        rgba(124, 58, 237, 0.2),
        rgba(99, 102, 241, 0.25),
        rgba(6, 182, 212, 0.15)
      );
      background-size: 300% 100%;
      animation: flow 6s linear infinite;
    }

    @keyframes flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      /* tighten nav item padding/gap and slightly smaller icons/text on tablets */
      .tablet-nav-item {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
        gap: 0.6rem;
        font-size: 0.86rem;
      }
      .tablet-nav-item svg {
        width: 16px;
        height: 16px;
      }

      /* small adjustment for cart button so it doesn't feel too large on tablets */
      .tablet-cart-btn {
        padding: 0.45rem !important;
      }

      /* tighten login button padding on tablets (still visible on md) */
      .tablet-login {
        padding-left: 0.6rem !important;
        padding-right: 0.6rem !important;
      }

      /* make the animated gradient flow a touch faster on tablets for a livelier feel */
      .animated-gradient {
        animation-duration: 5.5s;
      }
    }
  `,
};

export const clothingHomeStyles = {
  section: "w-full py-12 sm:py-16 lg:py-20",
  container: "mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12",
  headingContainer: "mb-6 flex items-end justify-between gap-4 text-left sm:mb-8",
  headingTitle: "font-display text-3xl font-normal leading-tight tracking-[-0.02em] text-bone sm:text-4xl",
  gridContainer:
    "grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 xl:grid-cols-5",
  gridItem: "min-w-0",
  gridItemHiddenLast: "min-w-0 hidden sm:block",
  cardLink: "group flex h-full w-full min-w-0 flex-col",
  cardContainer: "relative flex h-full w-full flex-col",
  cardImage: "block aspect-[4/5] w-full rounded-sm bg-photo-well object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02] sm:p-5",
  clothingName:
    "mt-2 flex min-h-11 w-full items-center px-1 py-2 text-left text-sm font-normal text-bone line-clamp-2 sm:mt-3 sm:text-base",
  toggleButton:
    "inline-flex min-h-11 shrink-0 items-center gap-2 px-1 text-sm text-fog transition-colors hover:text-bone",
};

// GroomingHome Styles
export const groomingHomeStyles = {
  // Section styles
  section: "px-4 py-12 text-bone sm:px-6 sm:py-16 lg:px-12 lg:py-20",
  sectionBackground: {
    background: "transparent",
  },

  // Container
  container: "mx-auto w-full max-w-[1440px]",

  // Header
  headerContainer: "mb-6 flex flex-col items-start gap-3 sm:mb-8",
  headerLeft: "space-y-2",
  headerTitleContainer: "flex items-center gap-3",
  blueLine: "hidden",
  heading: "font-display text-3xl font-normal leading-tight tracking-[-0.02em] sm:text-4xl",
  headingGradient: {
    color: "var(--bone)",
  },
  description: "max-w-2xl text-sm leading-relaxed text-fog",

  // Grid
  gridContainer:
    "grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6",

  // Article/Card
  article:
    "group relative flex h-full min-w-0 flex-col",
  imageContainer: "relative aspect-[4/5] overflow-hidden rounded-sm bg-graphite",
  image: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]",
  contentContainer: "relative mt-2 flex min-h-16 flex-col justify-between py-1 sm:mt-3",
  titleContainer: "mb-1 min-h-10",
  title:
    "line-clamp-2 text-sm font-normal text-bone sm:text-base",
  buttonContainer: "flex items-center justify-between",
  button:
    "inline-flex min-h-11 items-center px-1 text-sm text-fog underline decoration-transparent underline-offset-4 transition-colors hover:text-bone hover:decoration-current",
  buttonGradient: { background: "transparent" },

  // Decorative variants (unchanged from original)
  decorativeVariants: [
    "translate-y-0 rotate-0 skew-y-0 scale-100 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent",
    "-rotate-3 translate-y-1 scale-[0.995] bg-gradient-to-tr from-green-600/10 via-transparent to-transparent",
    "rotate-2 translate-y-0 scale-100 bg-gradient-to-tr from-purple-500/8 via-transparent to-transparent",
    "-rotate-1 translate-y-0 scale-100 bg-gradient-to-tr from-amber-400/8 via-transparent to-transparent",
    "rotate-1 translate-y-0 scale-100 bg-gradient-to-tr from-teal-500/8 via-transparent to-transparent",
  ],

  // Animation variants (unchanged from original)
  listVariants: {
    visible: { transition: { staggerChildren: 0.04 } },
    hidden: {},
  },
  itemVariants: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
};

// public/dummyStyles.js

// ... existing styles ...

export const AboutPageStyles = {
  // Main container
  mainContainer:
    "min-h-screen overflow-hidden bg-linear-to-b from-ink via-graphite to-ink font-display",

  // Background patterns
  backgroundPatternsContainer:
    "fixed inset-0 overflow-hidden pointer-events-none",
  gridPattern: "absolute inset-0 opacity-6",
  dotPattern: "absolute inset-0",

  // Hero section
  heroSection:
    "relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8",
  heroContainer: "max-w-7xl mx-auto text-center",

  // Year badge
  yearBadge:
    "mb-6 inline-flex items-center gap-3 border border-hairline bg-graphite px-4 py-2.5 sm:mb-8 sm:px-6 sm:py-3",
  yearIcon: "w-4 h-4 sm:w-5 sm:h-5 text-gray-300",
  yearText:
    "text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-300 font-sans",

  // Main heading
  mainHeading:
    "text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight md:leading-[0.95]",
  headingLine1:
    "block text-bone",
  headingLine2:
    "mt-3 block py-2 text-bone sm:mt-4",

  // Hero description
  heroDescription:
    "text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed font-sans",

  // Hero buttons container
  heroButtonsContainer:
    "flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center",

  // Button styles
  buttonDark:
    "group relative overflow-hidden border border-hairline px-6 py-3 font-semibold text-bone sm:px-10 sm:py-4",
  buttonLight:
    "group relative overflow-hidden bg-brass px-6 py-3 font-semibold text-brass-ink sm:px-10 sm:py-4",
  buttonContent:
    "relative z-10 flex items-center gap-3 font-sans tracking-wide text-sm sm:text-base",
  buttonHoverOverlay:
    "absolute inset-0 bg-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100",

  // Stats section
  statsGrid:
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 md:mb-24",
  statCard:
    "group relative border border-hairline bg-graphite p-6 sm:p-8",
  statCardHoverOverlay:
    "absolute -inset-0.5 opacity-0 bg-linear-to-br from-slate/60 to-transparent transition-opacity duration-300 group-hover:opacity-100",
  statCardContent: "relative z-10 mb-2 sm:mb-4",
  statValue:
    "mb-1 text-2xl font-semibold text-bone sm:mb-2 sm:text-3xl md:text-4xl",
  statLabel: "mb-1 text-md font-semibold text-bone sm:text-lg",
  statDescription: "text-sm sm:text-sm text-gray-400",

  // Story/Lottie section
  storySection: "py-16 sm:py-20 px-4 sm:px-6 lg:px-8",
  storyContainer: "max-w-7xl mx-auto",
  storyGrid:
    "grid lg:grid-cols-2 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 sm:mb-32",
  lottieContainer: "relative h-64 sm:h-80 md:h-96 overflow-hidden group",
  lottieWrapper:
    "absolute inset-0 z-20 flex items-center justify-center pointer-events-none",
  lottieElement:
    "w-90 xl:mb-0 lg:mb-0 md:mb-0 mb-20 sm:w-72 md:w-100 lg:w-150 opacity-85 mix-blend-screen pointer-events-auto",

  // Legacy badge
  legacyBadge:
    "mb-6 inline-flex items-center gap-3 border border-hairline bg-graphite px-4 py-2.5 sm:mb-8",
  legacyIcon: "w-4 h-4 text-gray-300",
  legacyText: "text-sm tracking-[0.2em] uppercase text-gray-300 font-sans",

  // Story heading
  storyHeading:
    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight",
  storyHeadingLine1:
    "block text-bone",
  storyHeadingLine2:
    "text-bone",

  // Story description
  storyDescription:
    "text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed font-sans",

  // Feature items
  featureContainer: "space-y-6 mb-8 sm:mb-10",
  featureItem: "flex items-start gap-4 group",
  featureIconContainer:
    "shrink-0 border border-hairline bg-graphite p-3",
  featureLightIconContainer:
    "shrink-0 border border-hairline bg-slate p-3",
  featureIcon: "w-5 h-5 text-gray-300",
  featureLightIcon: "w-5 h-5 text-gray-900",
  featureContent: "",
  featureTitle: "mb-1 font-semibold text-bone",
  featureDescription: "text-gray-400 text-sm sm:text-sm font-sans",

  // Process section
  processSection: "mb-20 sm:mb-32",
  processHeader: "text-center mb-12 sm:mb-16",
  processBadge:
    "mb-4 inline-flex items-center gap-3 border border-hairline bg-graphite px-4 py-2.5",
  processIcon: "w-4 h-4 text-gray-300",
  processBadgeText:
    "text-sm tracking-[0.2em] uppercase text-gray-300 font-sans",
  processHeading: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
  processHeadingLine1:
    "text-bone",
  processHeadingLine2:
    "text-bone",
  processDescription:
    "text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans",

  // Process steps
  processGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8",
  processStepCard:
    "group relative border border-hairline bg-graphite p-6 sm:p-8",
  processStepContent: "relative z-10",
  processStepNumber:
    "mb-4 py-2 text-3xl font-semibold text-bone sm:text-4xl md:text-5xl",
  processStepIcon: "w-8 h-8 sm:w-10 sm:h-10 text-gray-300 mb-4",
  processStepTitle: "mb-2 text-lg font-semibold text-bone sm:text-xl",
  processStepText:
    "text-gray-400 text-sm sm:text-sm leading-relaxed italic font-sans",

  // Core Values section
  valuesHeader: "text-center mb-12 sm:mb-16",
  valuesHeading: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
  valuesHeadingLine1:
    "text-bone",
  valuesHeadingLine2:
    "text-bone",
  valuesSubheading:
    "text-gray-400 text-sm sm:text-base md:text-lg font-sans mb-8",
  valuesGrid: "grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8",
  valueCard:
    "group relative border border-hairline bg-graphite p-6 sm:p-10",
  valueCardContent: "relative z-10 text-center",
  valueIconContainer:
    "mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden flex items-center justify-center border border-gray-700 bg-gray-900",
  valueTitle: "mb-3 text-xl font-bold text-bone sm:text-2xl md:text-xl",
  valueDescription:
    "text-gray-400 leading-relaxed font-sans mb-6 text-sm sm:text-base",

  // Details section
  detailsSection: "py-16 sm:py-20 px-4 sm:px-6 lg:px-8",
  detailsContainer: "max-w-7xl mx-auto",
  detailsCard:
    "relative overflow-hidden border border-hairline bg-graphite p-8 sm:p-12",
  detailsPattern: "absolute inset-0 opacity-10",
  detailsCardContent: "relative z-10",
  detailsHeading:
    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center",
  detailsHeadingLine1:
    "text-bone",
  detailsHeadingLine2:
    "text-bone",

  // Details stats
  detailsStatsGrid: "grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 sm:mb-12",
  detailStat: "text-center",
  detailStatValue:
    "mb-2 text-2xl font-semibold text-bone sm:text-3xl md:text-4xl",
  detailStatLabel: "mb-1 font-semibold text-bone",
  detailStatDescription: "text-gray-400 text-sm sm:text-sm font-sans",

  // Details buttons
  detailsButtonsContainer:
    "flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center",

  // Footer
  pageFooter: "py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-900",
  pageFooterContainer: "max-w-7xl mx-auto text-center",
  pageFooterText1:
    "text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-500 mb-4 font-sans",
  pageFooterText2: "text-gray-400 text-base sm:text-lg font-serif italic",

  // Animation performance style object (for inline styles)
  animPerfStyle: {
    willChange: "transform, opacity",
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
  },
};

// CategoryPage Styles
export const categoryPageStyles = {
  // Layout
  pageContainer: "min-h-screen bg-ink pt-24 font-interface text-bone",
  headerContainer: "mx-auto flex max-w-screen-2xl flex-col gap-5 border-b border-hairline px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:px-10",
  titleContainer: "flex w-full items-center lg:flex-1",
  title:
    "w-full truncate text-center font-display text-3xl font-normal tracking-tight text-bone sm:text-4xl lg:text-left",

  // Search
  searchContainer: "flex w-full justify-center lg:flex-1",
  searchWrapper: "relative w-full max-w-xl",
  searchIcon: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fog",
  searchInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate py-3 pl-12 pr-12 text-sm text-bone outline-none transition-colors placeholder:text-fog focus:border-brass",
  clearSearchButton: "absolute right-2 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-fog transition-colors hover:text-bone",
  clearSearchIcon: "text-fog hover:text-bone",

  // Filters
  filtersContainer:
    "mt-6 mb-8 flex flex-col gap-4 border-b border-hairline pb-4 md:flex-row md:items-center md:justify-between",
  genderButtonsContainer: "flex shrink-0 gap-1 border-b border-hairline",
  genderButton: (isActive) =>
    `min-h-11 border-b-2 px-4 py-2 text-sm transition-colors focus-visible:outline-brass ${isActive ? "border-brass text-bone" : "border-transparent text-fog hover:text-bone"}`,
  sortContainer:
    "ml-auto flex shrink-0 items-center gap-3",
  sortLabel: "text-fog text-sm",
  sortSelect:
    "min-h-11 cursor-pointer rounded-sm border border-hairline bg-slate px-4 py-2 text-sm text-bone outline-none transition-colors hover:border-fog focus:border-brass",

  // Main content
  mainContainer: "mx-auto max-w-screen-2xl px-4 pb-20 sm:px-6 lg:px-10",

  // No products state
  noProductsContainer: "text-center py-20",
  noProductsIcon: "mx-auto text-gray-600 mb-4",
  noProductsMessage: "text-gray-400 text-xl mb-2",
  noProductsSubMessage: "text-gray-500",

  // Products grid
  productsGrid:
    "grid auto-rows-fr grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4",

  // Product card
  productCard:
    "group relative flex h-full w-full flex-col overflow-hidden bg-ink",
  productCardWhileHover: { y: -4, transition: { duration: 0.18 } },

  // Product image
  imageContainer:
    "relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-photo-well",
  productImage: "object-contain object-center p-4 transition-transform duration-250 group-hover:scale-[1.02]",
  noImagePlaceholder: "flex h-full items-center justify-center text-ink",

  // Product content
  contentContainer: "relative flex flex-1 flex-col pt-3",
  headerSection: "flex items-start justify-between gap-3",
  titleSection: "min-w-0 flex-1",
  productTitle:
    "line-clamp-2 text-sm font-medium text-bone",
  brandText: "mt-1 min-h-5 truncate text-xs text-fog",
  brandLabel: "font-normal text-fog",

  // Price
  priceContainer: "mt-2 mb-3 flex items-center gap-3",
  priceText: "text-sm font-normal tabular-nums text-bone",

  // Colors
  colorsContainer: "mb-3 min-h-13",
  colorsLabel: "mb-2 text-xs tracking-wide text-fog",
  colorsWrapper: "flex gap-2 flex-wrap",
  colorButton: (isActive) =>
    `min-h-11 rounded-sm border px-3 py-2 text-sm transition-colors focus-visible:outline-brass ${isActive ? "border-brass bg-brass text-brass-ink" : "border-hairline bg-slate text-bone hover:border-fog"}`,

  // Sizes
  sizesContainer: "mb-3 min-h-13",
  sizesLabel: "mb-2 text-xs tracking-wide text-fog",
  sizesWrapper: "flex gap-2 flex-wrap",
  sizeButton: (isActive) =>
    `flex min-h-11 items-center rounded-sm border px-3 py-2 text-sm transition-colors focus-visible:outline-brass ${isActive ? "border-brass bg-brass text-brass-ink" : "border-hairline bg-slate text-bone hover:border-fog"}`,

  // Action buttons
  actionContainer: "mt-auto flex justify-center gap-3 pt-2",
  quantitySelector:
    "inline-flex min-h-11 items-center gap-2 border border-hairline bg-slate p-1",
  quantityButton: "flex min-h-11 min-w-11 items-center justify-center text-bone transition-colors hover:bg-graphite focus-visible:outline-brass",
  quantityDisplay: "min-w-8 px-2 text-center text-sm tabular-nums text-bone",
  addToCartButton:
    "flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-brass px-4 py-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95",

  // Animation variants
  listVariants: {
    visible: { transition: { staggerChildren: 0.06 } },
    hidden: {},
  },
  cardVariants: { visible: { opacity: 1, y: 0, scale: 1 } },
  noWrap: "whitespace-nowrap",
};

// public/dummyStyles.js

// ... existing styles ...

export const CartPageStyles = {
  // Main container
  mainContainer:
    "min-h-screen overflow-x-clip bg-ink px-4 pb-12 font-interface text-bone sm:px-6",
  contentContainer: "relative z-10 mx-auto max-w-screen-2xl px-0 pt-24",

  // Header section
  headerContainer: "flex  items-center gap-3 mb-8",
  headerIconContainer:
    "flex h-11 w-11 items-center justify-center border border-hairline bg-graphite",
  headerIcon: "text-brass",
  headerTitle:
    "font-display text-3xl font-normal tracking-tight text-bone sm:text-4xl",

  // Empty cart
  emptyCartContainer:
    "border border-hairline bg-graphite p-6 sm:p-8",
  emptyCartContent:
    "flex flex-col items-center justify-center space-y-4 relative",
  emptyCartIconContainer: "flex h-14 w-14 items-center justify-center border border-hairline bg-ink",
  emptyCartText: "text-lg text-bone",
  emptyCartSubtext: "text-sm text-fog",
  emptyCartButton:
    "mt-2 inline-flex min-h-12 items-center justify-center rounded-sm bg-brass px-5 py-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95",

  // Cart items grid
  cartItemsGrid: "space-y-7",
  itemsGrid: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",

  // Cart item card
  cartItemContainer: "relative group",
  cartItemAnimationStyle: (index) => ({ animationDelay: `${index * 100}ms` }),
  cartItemCard:
    "relative flex h-full flex-col gap-3 overflow-hidden border border-hairline bg-graphite p-3",

  // Product image
  productImageContainer:
    "relative aspect-[3/4] w-full overflow-hidden bg-photo-well",
  productImage: "object-contain p-3",

  // Product info
  productInfoContainer: "flex flex-1 flex-col w-full",
  productHeader:
    "flex items-start justify-between gap-2 mb-3",
  productName: "line-clamp-2 text-sm font-medium leading-5 text-bone",
  productBrand: "mt-1 truncate text-xs text-fog",
  variantTagsContainer: "flex flex-wrap gap-1.5 mt-2 min-h-6",
  variantTag:
    "border border-hairline bg-ink px-2 py-1 text-[11px] text-fog",
  priceContainer: "shrink-0 text-right",
  productPrice: "text-base font-normal tabular-nums text-bone",
  priceLabel: "text-[10px] tracking-wide text-fog",

  // Quantity controls
  controlsContainer:
    "mt-auto flex items-center justify-between gap-2 border-t border-hairline pt-3",
  quantityContainer: "flex items-center gap-2",
  quantityWrapper:
    "inline-flex min-h-11 items-center gap-1 border border-hairline bg-ink p-1",
  quantityButton:
    "flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-bone transition-colors hover:bg-slate",
  quantityDisplay: "w-7 text-center text-sm tabular-nums text-bone",

  // Delete button
  deleteButton:
    "flex min-h-11 min-w-11 cursor-pointer items-center justify-center border border-danger/20 text-danger transition-colors hover:bg-danger/10",
  deleteIcon: "",

  // Item subtotal
  itemSubtotalLabel: "text-[10px] tracking-wide text-fog",
  itemSubtotalValue: "text-base font-normal tabular-nums text-bone",

  // Address section
  addressSection: "relative group",
  addressCard:
    "relative overflow-hidden border border-hairline bg-graphite p-5 sm:p-7",
  addressHeader: "mb-6 flex items-center gap-3 border-b border-hairline pb-5",
  addressIconContainer:
    "flex h-11 w-11 items-center justify-center border border-hairline bg-slate",
  addressIcon: "text-brass",
  addressTitle:
    "font-display text-xl font-normal text-bone sm:text-2xl",

  // Address form
  addressFormGrid: "grid grid-cols-1 md:grid-cols-2 gap-5",
  formField: "space-y-2",
  formLabelContainer: "flex items-center gap-2",
  formLabelIcon: "text-fog",
  formLabel: "text-sm font-normal text-bone",
  formInput: (hasError) =>
    `min-h-12 w-full rounded-sm border bg-slate px-4 py-3 text-bone placeholder:text-fog focus:outline-none ${hasError ? "border-danger" : "border-hairline focus:border-brass"}`,
  formTextarea: (hasError) =>
    `min-h-12 w-full rounded-sm border bg-slate px-4 py-3 text-bone placeholder:text-fog focus:outline-none ${hasError ? "border-danger" : "border-hairline focus:border-brass"}`,
  errorMessage: "text-sm text-danger",
  formNote: "md:col-span-2 pt-2",
  formNoteText: "text-sm text-fog",

  // Summary section
  summarySection: "relative group",
  summaryCard:
    "relative flex flex-col items-start justify-between gap-5 border border-hairline bg-graphite p-5 md:flex-row md:items-center sm:p-6",
  summaryLabel: "text-sm tracking-wide text-fog",
  totalContainer: "flex items-center gap-2 mt-2",
  totalValue:
    "text-2xl font-normal tabular-nums text-bone sm:text-3xl",
  paymentContainer:
    "w-full border border-hairline bg-ink p-3 md:w-auto",
  paymentTitle: "mb-3 text-sm font-normal text-fog",
  paymentOptions: "grid grid-cols-2 gap-2",
  remainingItemHeader: "flex items-start gap-3",
  remainingTextRight: "text-right",
  remainingItemActions: "flex items-center gap-2",
  remainingFlexChild: "flex-1",
  remainingAddressField: "md:col-span-2 space-y-2",
  remainingPaymentField: "w-full md:w-auto",
  paymentOptionButton:
    "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm border border-hairline bg-slate px-4 py-2.5 text-sm font-medium text-bone transition-colors hover:border-brass disabled:opacity-40",
  paymentOptionIcon: "text-brass",

  // Action buttons
  buttonsContainer:
    "flex w-full sm:w-auto flex-col sm:flex-row items-center gap-3 sm:gap-4",
  clearButton:
    "group/clear flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-hairline px-5 py-3 text-sm text-fog transition-colors hover:border-danger hover:text-danger sm:w-auto",
  checkoutButton:
    "group/checkout flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-brass px-6 py-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95 sm:w-auto",
  checkoutIcon:
    "group-hover/checkout:translate-x-1 transition-transform duration-300",

  // Toast notification
  toastContainer:
    "w-full max-w-md border border-hairline bg-graphite p-4 text-bone shadow-xl",
  toastIconContainer: "flex h-10 w-10 items-center justify-center border border-success/20 text-success",
  toastIcon: "",
  toastContent: "flex-1",
  toastHeader: "flex items-center justify-between gap-3",
  toastTitle: "text-lg font-medium text-bone",
  toastSubtitle: "mt-0.5 text-sm text-fog",
  toastTotalLabel: "text-sm text-fog",
  toastTotalValue: "text-lg font-medium tabular-nums text-bone",
  toastFooter: "mt-3 flex items-center justify-between gap-3",
  toastOrderId: "text-xs text-fog",
  toastOrderIdValue: "text-bone",
  toastCloseButton:
    "flex min-h-11 items-center rounded-sm border border-hairline bg-slate px-3 py-1 text-sm text-bone transition-colors hover:bg-graphite",
};

// public/dummyStyles.js

// ... existing styles ...

export const CategoryPageStyles = {
  // Main container
  mainContainer:
    "min-h-screen bg-ink pt-24 font-interface text-bone",

  // Header
  header: "",
  headerContainer:
    "mx-auto max-w-screen-2xl border-b border-hairline px-4 py-6 sm:px-6 md:flex-row md:items-center lg:px-10",
  titleContainer: "w-full md:flex-1 flex items-center",
  title:
    "w-full truncate px-2 py-2 text-center font-display text-3xl font-normal leading-[1.3] tracking-tight text-bone sm:text-4xl md:text-left",

  // Search section
  searchContainer: "w-full md:flex-1 flex justify-center md:mt-0",
  searchWrapper: "relative w-full max-w-xl",
  searchIcon: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fog",
  searchInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate py-3 pl-11 pr-11 text-sm text-bone outline-none transition-colors placeholder:text-fog focus:border-brass",
  clearSearchButton:
    "absolute right-2 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-fog transition-colors hover:text-bone",

  // Main content
  mainContent: "mx-auto max-w-screen-2xl px-4 pb-20 pt-8 sm:px-6 lg:px-10",

  // Filters section
  filtersSection: "mb-8",
  filtersContainer: "flex flex-col gap-4 border-b border-hairline pb-4 md:flex-row md:items-center md:justify-between",
  genderButtonsContainer: "flex items-center gap-1 border-b border-hairline",
  genderButtonBase:
    "min-h-11 cursor-pointer border-b-2 px-4 py-2 text-sm transition-colors",
  genderButtonActive: "border-brass text-bone",
  genderButtonInactive: "border-transparent text-fog hover:text-bone",
  sortContainer: "flex items-center gap-3 ml-auto",
  filterLabel: "text-xs font-semibold uppercase tracking-wide text-gray-400",
  sortSelect:
    "min-h-11 cursor-pointer rounded-sm border border-hairline bg-slate px-4 py-2 text-sm text-bone outline-none focus:border-brass",
  sortOption: "bg-graphite text-bone",

  // Products section
  notFoundContainer: "py-20 text-center text-gray-400",
  productsGrid: (categoryKey) =>
    `grid auto-rows-fr grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4 ${categoryKey === "backpacks" ? "items-stretch" : ""}`,

  // Product card
  productCard:
    "relative group flex h-full flex-col overflow-hidden bg-ink",
  productImageContainer:
    "relative aspect-[3/4] w-full shrink-0 bg-photo-well",
  productImage: "object-contain object-center p-4 transition-transform duration-250 group-hover:scale-[1.02]",
  productDetailsContainer:
    "flex w-full flex-1 flex-col justify-between pt-3",
  productName:
    "text-sm font-medium text-bone",
  productBrand: "mt-1 truncate text-sm text-fog",
  brandLabel: "font-normal text-fog",

  // Color selection
  colorSelectionContainer: "mt-3",
  colorSelectionLabel: "mb-2 text-sm text-fog",
  colorButtonsContainer: "flex flex-wrap gap-2 items-center",
  colorButtonBase:
    "flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-sm border px-3 py-2 text-sm transition-colors focus-visible:outline-brass",
  colorButtonActive: "border-brass bg-brass text-brass-ink",
  colorButtonInactive: "border-hairline bg-slate text-bone hover:border-fog",

  // Size selection
  sizeSelectionContainer: "mt-3",
  sizeSelectionLabel: "mb-2 text-sm text-fog",
  sizeButtonsGrid: "flex flex-wrap gap-2",
  sizeButtonBase:
    "flex min-h-11 min-w-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-sm border px-3 py-2 text-sm transition-colors focus-visible:outline-brass",
  sizeButtonActive: "border-brass bg-brass text-brass-ink",
  sizeButtonInactive: "border-hairline bg-slate text-bone hover:border-fog",
  sizeButtonText: "font-semibold",

  // Price and cart section
  priceAndCartContainer: "mt-4 flex flex-col items-start justify-center gap-3 border-t border-hairline pt-4 sm:flex-row sm:items-center sm:justify-between",
  priceText: "text-base tabular-nums text-bone",
  cartControlsContainer: "flex w-full justify-center",

  // Quantity controls (when item is in cart)
  quantityControlsContainer:
    "inline-flex min-h-11 min-w-32 items-center justify-between gap-2 border border-hairline bg-slate p-1",
  quantityButton: "flex min-h-11 min-w-11 items-center justify-center text-bone transition-colors hover:bg-graphite focus-visible:outline-brass",
  quantityIcon: "h-4 w-4",
  quantityDisplay: "px-3 text-sm tabular-nums text-bone",

  // Add to cart button (when not in cart)
  addToCartButtonBase: "min-h-12 w-full rounded-sm px-4 py-3 text-sm font-medium transition-colors",
  addToCartButtonDisabled: "cursor-not-allowed bg-slate text-fog opacity-40",
  addToCartButtonEnabled:
    "cursor-pointer bg-brass text-brass-ink hover:brightness-95",

  // Animation variants (for Framer Motion)
  listVariants: {
    visible: { transition: { staggerChildren: 0.06 } },
    hidden: {},
  },
  cardVariants: {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },

  // Specifications (unused in this component but from original code)
  specsTag: "px-2 py-1 rounded-full bg-gray-800 border border-gray-700",

  // Size filter chips (not used in current UI but from original code)
  sizeFilterChip:
    "px-2 py-1 rounded-full text-sm bg-gray-800 border border-gray-700",
  sizeFilterChipActive: "border-brass bg-brass text-brass-ink",
  sizeFiltersContainer: "mt-4 flex flex-col gap-3",
  sizeFilterList: "flex flex-wrap items-center gap-2",
  clearFiltersButton:
    "border border-hairline px-3 py-1 text-sm text-fog hover:bg-slate hover:text-bone",
};

// public/dummyStyles.js

// ... existing styles ...

export const GroomingPageStyles = {
  // Main container
  mainContainer:
    "min-h-screen bg-ink px-4 pb-20 pt-24 font-interface text-bone sm:px-6 lg:px-10",
  contentContainer: "mx-auto max-w-screen-2xl",

  // Header section
  header: "mb-8 flex flex-col gap-5 border-b border-hairline pb-5 md:flex-row md:items-end md:justify-between",
  headerLeft: "flex w-full flex-col items-start gap-3 md:w-auto",
  headerTitle:
    "mb-1 font-display text-3xl font-normal tracking-tight text-bone md:whitespace-nowrap xl:text-4xl",

  // Gender filter
  genderFilterContainer: "flex items-center gap-1 border-b border-hairline",
  genderButtonBase:
    "min-h-11 cursor-pointer border-b-2 px-4 py-2 text-sm transition-colors focus-visible:outline-brass",
  genderButtonActive: "border-brass text-bone",
  genderButtonInactive: "border-transparent text-fog hover:text-bone",

  // Search section
  searchSection:
    "mx-auto flex w-full max-w-xl flex-1 justify-center",
  searchWrapper: "w-full",
  searchInputContainer: "relative",
  searchInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate py-3 pl-11 pr-11 text-sm text-bone outline-none transition-colors placeholder:text-fog focus:border-brass",
  searchIcon: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-300",
  clearSearchButton:
    "absolute right-3 top-1/2 -translate-y-1/2 p-2 text-fog transition-colors hover:bg-slate hover:text-bone",

  // Sort section
  sortContainer: "flex items-center gap-3 w-full md:w-auto mt-3 md:mt-0",
  sortLabel: "text-xs tracking-wide text-fog",
  sortSelect:
    "min-h-11 cursor-pointer rounded-sm border border-hairline bg-slate px-4 py-2 text-sm text-bone outline-none focus:border-brass",
  sortOption: "bg-graphite text-bone",

  // Grid section
  productsGrid:
    "grid auto-rows-fr grid-cols-2 gap-x-3 gap-y-8 justify-items-stretch sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4",

  // Product card
  productCard:
    "group relative flex h-full w-full flex-col overflow-hidden bg-ink",
  productImageContainer:
    "relative aspect-[3/4] w-full shrink-0 bg-photo-well",
  productImage: "object-contain object-center p-4 transition-transform duration-250 group-hover:scale-[1.02]",
  productContent: "flex min-h-60 flex-1 flex-col pt-3",
  productHeader: "flex items-start justify-between gap-3",
  productNameContainer: "min-w-0",
  productName: "min-h-10 line-clamp-2 text-sm font-medium text-bone",
  productBrand: "mt-1 truncate text-xs text-fog",
  brandLabel: "font-normal text-fog",
  productPrice: "mt-2 text-sm tabular-nums text-bone",
  textRight: "text-right",
  productDescription: "mt-3 line-clamp-2 text-sm text-fog",

  // Volume options
  volumeOptionsContainer: "mt-4",
  volumeOptionsLabel: "mb-2 flex items-center gap-2 text-xs tracking-wide text-fog",
  volumeOptionsGrid:
    "flex flex-wrap gap-2",
  volumeButtonBase:
    "flex min-h-11 min-w-16 select-none items-center justify-center whitespace-nowrap rounded-sm border border-hairline bg-slate p-2 text-sm text-bone transition-colors focus-visible:outline-brass",
  volumeButtonActive: "border-brass bg-brass text-brass-ink",
  volumeButtonInactive: "hover:border-fog",
  volumeButtonText: "whitespace-nowrap",

  // Cart controls
  cartControlsContainer: "mt-auto flex w-full items-center justify-center gap-3 pt-4",

  // Quantity controls (when item is in cart)
  quantityControlsContainer:
    "inline-flex min-h-11 min-w-32 items-center justify-between gap-2 border border-hairline bg-slate p-1",
  quantityButton: "flex min-h-11 min-w-11 items-center justify-center text-bone transition-colors hover:bg-graphite focus-visible:outline-brass",
  quantityIcon: "size={14}",
  quantityDisplay: "px-3 text-sm",

  // Add to cart button (when not in cart)
  addToCartButton:
    "min-h-12 w-full cursor-pointer rounded-sm bg-brass px-4 py-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95",
  addToCartButtonDisabled: "cursor-not-allowed opacity-40",

  // No products found
  noProductsContainer: "col-span-full p-8 text-center text-gray-400",

  // Animation variants (for Framer Motion)
  listVariants: {
    layout: true,
  },
  productCardVariants: {
    layout: true,
    whileHover: { y: -6 },
  },

  // Utility functions (for dynamic classes)
  getGenderButtonClass: (isActive) =>
    `${GroomingPageStyles.genderButtonBase} ${isActive ? GroomingPageStyles.genderButtonActive : GroomingPageStyles.genderButtonInactive}`,

  getVolumeButtonClass: (isSelected) =>
    `${GroomingPageStyles.volumeButtonBase} ${isSelected ? GroomingPageStyles.volumeButtonActive : GroomingPageStyles.volumeButtonInactive}`,

  getAddToCartButtonClass: (isDisabled) =>
    `${GroomingPageStyles.addToCartButton} ${isDisabled ? GroomingPageStyles.addToCartButtonDisabled : ""}`,
};

// ContactPage Styles
export const contactPageStyles = {
  // Success toast
  successToast: "fixed top-6 left-1/2 -translate-x-1/2 z-50",
  successToastContainer:
    "flex items-center gap-3 border border-hairline bg-graphite px-6 py-3 text-success",
  successIcon: "h-5 w-5 text-success",
  successTitle: "font-medium text-bone",
  successMessage: "text-sm text-fog",

  // Container
  container:
    "relative z-10 mx-auto max-w-screen-2xl px-4 pb-10 pt-24 sm:px-6 lg:px-10 lg:pb-16",

  // Header
  headerContainer: "mb-8 max-w-3xl text-left sm:mb-10",
  headerBadge:
    "mb-5 inline-flex min-h-11 items-center gap-3 border border-hairline bg-graphite px-4 py-2",
  headerIcon: "h-5 w-5 text-brass",
  headerBadgeText: "text-xs tracking-wide text-fog",
  headerTitle: "mb-3 font-display text-4xl font-normal tracking-tight text-bone sm:text-5xl",
  headerGradient: { color: "var(--bone)" },
  headerWhiteText: "text-fog",
  headerDescription: "max-w-2xl text-sm leading-6 text-fog sm:text-base",

  // Main card
  mainCard:
    "mx-auto max-w-screen-2xl overflow-hidden border border-hairline bg-graphite",
  mainGrid: "grid grid-cols-1 lg:grid-cols-2",

  // Left section (Form)
  leftSection: "p-5 sm:p-8 lg:p-10",
  formHeaderContainer: "flex items-center gap-4 mb-4 sm:mb-6",
  formIconContainer: "flex h-11 w-11 items-center justify-center border border-hairline bg-slate",
  formIcon: "h-5 w-5 text-brass",
  formTitleContainer: "",
  formTitle: "text-xl font-medium text-bone sm:text-2xl",
  formTitleGradient: { color: "var(--bone)" },
  formSubtitle: "mt-1 text-sm text-fog",

  // Form
  form: "space-y-3 sm:space-y-4",
  formGrid: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
  formInput:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-3 py-3 text-sm text-bone placeholder:text-fog outline-none focus:border-brass sm:px-4 sm:text-base",
  phoneContainer: "flex gap-2 w-full",
  phonePrefix:
    "inline-flex min-h-12 items-center border border-hairline bg-ink px-3",
  phonePrefixIcon: "w-4 h-4",
  phonePrefixText: "ml-2 text-sm",
  phoneInput:
    "min-h-12 w-full flex-1 rounded-sm border border-hairline bg-slate px-3 py-3 text-sm text-bone placeholder:text-fog outline-none focus:border-brass sm:px-4 sm:text-base",
  formGridThree: "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4",
  formSelect:
    "min-h-12 w-full rounded-sm border border-hairline bg-slate px-3 py-3 text-sm text-bone outline-none focus:border-brass sm:px-4 sm:text-base",
  selectOption: "bg-graphite text-bone",

  // Form actions
  formActions: "flex items-center justify-between mt-2 sm:mt-4",
  formActionLeft: "flex items-center gap-3 text-sm text-fog",
  formActionIcon: "w-4 h-4",
  formActionButton:
    "inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-sm bg-brass px-4 py-3 font-medium text-brass-ink transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6",
  loadingSpinner:
    "h-4 w-4 animate-spin border-2 border-hairline border-t-transparent",
  loadingIndicatorStyle: {
    width: "16px",
    height: "16px",
    border: "2px solid var(--hairline)",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: "text-sm sm:text-base",
  buttonIcon: "w-4 h-4",
  buttonText: "text-sm lg:text-sm sm:text-base",

  // Form messages
  errorContainer: "mt-2 flex items-center gap-2 text-sm text-danger",
  errorIcon: "w-4 h-4",
  successContainer: "mt-2 flex items-center gap-2 text-sm text-success",
  successIconSmall: "w-4 h-4",

  // Right section (Preview)
  rightSection:
    "flex flex-col justify-between border-t border-hairline bg-ink p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10",
  previewCard:
    "mb-6 overflow-hidden border border-hairline",
  previewCardInner: "relative h-48 bg-graphite",
  previewCardGradient: { background: "var(--graphite)" },
  previewCardContent: "absolute inset-0 flex items-center justify-center",
  previewCardTitle: "font-medium text-bone",
  previewCardSubtitle: "mt-1 text-sm text-fog",
  previewCardBadgeContainer: "absolute bottom-3 left-0 right-0 text-center",
  previewCardBadge:
    "inline-flex min-h-11 items-center gap-2 border border-hairline bg-graphite px-3 py-2",
  previewCardBadgeIcon: "h-4 w-4 text-success",
  previewCardBadgeText: "text-sm tabular-nums text-bone",

  // Contact info
  contactTitle: "mb-4 font-display text-xl font-normal text-bone sm:text-2xl",
  contactItem:
    "flex items-center gap-3 border border-hairline bg-graphite p-3",
  contactIconContainer: "flex h-11 w-11 items-center justify-center border border-hairline bg-slate",
  contactIcon: "w-5 h-5",
  contactDetails: "",
  contactLabel: "text-sm font-medium text-bone",
  contactValue: "text-sm text-bone",
  contactDescription: "text-xs text-fog",

  // Colors for contact icons
  whatsappIconBg: { backgroundColor: "var(--slate)" },
  whatsappIconColor: { color: "var(--success)" },
  instagramIconBg: { backgroundColor: "var(--slate)" },
  instagramIconColor: { color: "var(--brass)" },
  emailIconBg: { backgroundColor: "var(--slate)" },
  emailIconColor: { color: "var(--info)" },

  // Order preview
  orderPreviewContainer: "mt-6",
  orderPreview:
    "border border-hairline bg-graphite p-4",
  orderPreviewHeader: "flex items-center justify-between mb-3",
  orderPreviewTitle: "text-sm font-medium",
  orderPreviewTime: "text-xs text-gray-400",
  orderPreviewRow: "flex justify-between",
  orderPreviewLabel: "text-gray-400",
  orderPreviewValue: "text-bone",
  orderPreviewDivider: "border-t border-hairline pt-2",
  orderPreviewMessageLabel: "text-xs text-fog",
  orderPreviewMessage: "truncate text-bone",

  // Footer
  footer: "mt-8 sm:mt-10 text-center",
  footerBadge:
    "inline-flex min-h-11 items-center gap-2 border border-hairline bg-graphite px-3 py-2",
  footerIcon: "h-4 w-4 text-fog",
  footerText: "text-sm text-fog",
  page: "min-h-screen overflow-x-clip bg-ink font-interface text-bone",
  fieldLabel: "block space-y-2 text-sm text-fog",
  wideFieldLabel: "block space-y-2 text-sm text-fog sm:col-span-2",
  previewPlaceholder: "text-center p-4",
  hidden: "hidden",
  stackedFields: "space-y-3",
  bodyText: "text-bone text-sm",
  captionText: "text-bone text-xs",
  compactStack: "text-sm space-y-2",
};

// public/dummyStyles.js

// ... existing styles ...

// styles/dummyStyles.js - Update OrdersPageStyles with missing styles
export const OrdersPageStyles = {
  // Main container
  mainContainer: "min-h-screen bg-ink pt-24 font-interface text-bone",
  contentContainer: "mx-auto max-w-screen-2xl px-4 py-10 md:px-6 lg:px-10",

  // Header section
  header: "mb-8 flex flex-col sm:flex-row items-start justify-between gap-6",
  headerTitle:
    "font-display text-4xl font-normal tracking-tight text-bone",
  headerDescription: "mt-2 max-w-xl text-fog",

  // Orders grid
  ordersGrid:
    "grid grid-cols-1 items-start gap-5",

  // Order card
  orderCard:
    "group flex h-auto flex-col overflow-hidden border border-hairline bg-graphite",
  orderStrip:
    "grid grid-cols-2 items-center gap-4 p-4 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1.2fr_1.5fr_auto]",
  orderStripLabel: "text-xs tracking-wide text-fog",
  orderStripValue: "mt-1 text-sm font-medium tabular-nums text-bone",
  orderStripTotal: "mt-1 text-base font-medium tabular-nums text-bone",
  orderStripStatus: "flex flex-wrap items-center gap-2",
  orderCardInner: "flex flex-col sm:flex-row items-start gap-4",

  // Product image
  productImageContainer:
    "relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-photo-well sm:w-28",
  productImage: "object-contain p-2",
  loadingSkeleton: "h-36 animate-pulse border border-hairline bg-graphite motion-reduce:animate-none",
  errorState: "col-span-full border border-hairline bg-graphite px-6 py-12 text-center",
  errorTitle: "text-lg text-bone",
  errorText: "mt-2 text-sm text-fog",
  emptyState: "col-span-full flex min-h-80 flex-col items-center justify-center border border-hairline bg-graphite px-6 py-12 text-center text-fog",
  emptyTitle: "text-lg font-medium text-bone",
  emptyText: "mt-2 text-sm",
  retryButton: "mt-5 inline-flex min-h-12 items-center rounded-sm border border-hairline px-5 py-2 text-sm font-medium text-bone transition-colors hover:bg-slate",

  // Product info
  productInfoContainer: "flex-1 min-w-0",
  productName: "text-lg font-medium text-bone",
  productBrand: "mt-1 truncate text-sm text-fog",

  // Meta row
  metaRow: "mt-3 flex-row lg:flex-col xl:flex-row flex items-center gap-2",
  paymentMethodContainer:
    "ml-auto flex items-center gap-2 text-sm font-normal text-fog",
  paymentMethodIcon: "h-4 w-4 text-brass",

  // Details section
  detailsContainer: "flex flex-col",
  detailsGrid: "grid grid-cols-2 gap-3 text-sm text-fog",
  detailLabel: "text-xs text-fog",
  detailValue: "font-normal text-bone",

  // Footer section
  footerContainer:
    "mt-4 flex items-center justify-between border-t border-hairline pt-4",
  priceContainer: "text-lg font-normal tabular-nums text-bone",

  // Status badge base
  statusBadgeBase:
    "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium",
  statusBadgeIcon: "w-4 h-4 opacity-90",

  // Status badge variants
  statusBadgeConfirmed:
    "border-info/20 bg-info/10 text-info",
  statusBadgeShipped:
    "border-info/20 bg-info/10 text-info",
  statusBadgeDelivered:
    "border-success/20 bg-success/10 text-success",
  statusBadgeCancelled: "border-danger/20 bg-danger/10 text-danger",
  statusBadgeDefault: "border-hairline bg-slate text-fog",

  // NEW STYLES ADDED:
  // Variant list
  variantList:
    "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
  variantRow:
    "flex min-w-0 flex-col gap-3 border border-hairline bg-ink p-3 text-sm text-fog transition-colors hover:border-fog",

  // Variant detail sections
  variantDetailSection: "flex flex-wrap gap-3",
  variantDetailItem: "flex items-center gap-1",

  // Order total section
  orderTotalRow: "mt-3 border-t border-hairline pt-3",
  totalLabel: "text-xs tracking-wide text-fog",
  totalValue: "text-xl font-normal tabular-nums text-bone",

  // Responsive container for variant details
  variantResponsiveContainer: (isColumnLayout) =>
    isColumnLayout ? "flex flex-col gap-2" : "flex items-center gap-3",

  // Price display styles
  variantPriceContainer: "ml-auto text-right",
  variantPriceText: "text-sm font-bold",

  // Status badge helper function
  getStatusBadgeClass: (status) => {
    const normalized = (status || "").toLowerCase();
    const map = {
      "order placed": "border-hairline bg-slate text-fog",
      "order confirmed": "border-info/20 bg-info/10 text-info",
      "processing / being prepared": "border-info/20 bg-info/10 text-info",
      "ready for pickup": "border-warning/20 bg-warning/10 text-warning",
      "shipped / dispatched": "border-info/20 bg-info/10 text-info",
      "out for delivery": "border-info/20 bg-info/10 text-info",
      confirmed: "border-info/20 bg-info/10 text-info",
      shipped: "border-info/20 bg-info/10 text-info",
      delivered: "border-success/20 bg-success/10 text-success",
      cancelled: "border-danger/20 bg-danger/10 text-danger",
    };
    return (
      map[normalized] ||
      "border-hairline bg-slate text-fog"
    );
  },

  // ---- Newly extracted inline style objects ----

  smallLabel: "text-xs", // base style, colour is added via smallLabelStyle
  smallLabelStyle: { color: "var(--fog)" },

  detailValueStyle: { color: "var(--bone)", overflowWrap: "anywhere", lineHeight: 1.4 },

  thumbnailContainerStyle: {
    width: "100%",
    aspectRatio: "3 / 4",
    position: "relative",
    overflow: "hidden",
    background: "var(--photo-well)",
  },

  detailsFlexContainerStyle: {
    flex: "1 1 0%",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    alignItems: "stretch",
    minWidth: 0,
  },

  leftDetailsBlockStyle: {
    minWidth: 0,
    flex: "1 1 auto",
  },

  itemTitleStyle: {
    fontWeight: 600,
    fontSize: "1rem",
    color: "var(--bone)",
    marginBottom: "0.25rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  itemBrandStyle: {
    fontSize: "0.85rem",
    color: "var(--fog)",
    marginBottom: "0.5rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  itemDetailsRowStyle: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "0.55rem",
    paddingTop: "0.65rem",
    borderTop: "1px solid var(--hairline)",
    alignItems: "start",
  },

  itemPriceContainerStyle: {
    flex: "0 0 auto",
    marginTop: "0.15rem",
    textAlign: "left",
    fontWeight: 600,
    color: "var(--brass)",
    whiteSpace: "nowrap",
    paddingTop: "0.65rem",
    borderTop: "1px solid var(--hairline)",
  },

  itemPriceTextStyle: {
    fontSize: "1.1rem",
  },

  collapsedIndicatorContainerStyle: {
    padding: "0.75rem 1rem",
    textAlign: "center",
  },

  collapsedIndicatorTextStyle: {
    color: "var(--fog)",
    fontSize: "0.9rem",
  },

  totalPaymentContainerStyle: {
    padding: "0.75rem 1rem",
    borderTop: "1px solid var(--hairline)",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1rem",
    gridColumn: "1 / -1",
  },

  totalPaymentInnerStyle: {
    textAlign: "right",
  },

  totalLabelStyle: {
    color: "var(--fog)",
    fontSize: "0.9rem",
    marginBottom: "0.125rem",
  },

  totalAmountStyle: {
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "var(--bone)",
  },

  statusRowContainerStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1rem",
    borderTop: "1px solid var(--hairline)",
  },

  paymentMethodInnerContainerStyle: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },

  paymentMethodTextStyle: {
    fontSize: "0.95rem",
    fontWeight: 500,
  },
  getPaymentMethodStyle: (isOnline) => ({
    fontSize: "0.95rem",
    fontWeight: 500,
    ...(isOnline
      ? { color: "var(--info)" }
      : { color: "var(--warning)" }),
  }),

  onlinePaymentTextStyle: {
    color: "var(--info)",
  },

  cashPaymentTextStyle: {
    color: "var(--warning)",
  },

  // Dynamic row style for variants
  getVariantRowStyle: (isColumnLayout, isLastVisibleItem) => ({
    flexDirection: isColumnLayout ? "column" : "row",
    alignItems: isColumnLayout ? "stretch" : "flex-start",
    gap: "1rem",
    padding: "1rem",
    borderBottom: isLastVisibleItem ? "none" : "1px solid var(--hairline)",
  }),

  // Button style (now a Tailwind class with exact values)
  viewButtonStyle:
    "inline-flex min-h-11 items-center gap-2 rounded-sm border border-hairline px-4 py-2 text-sm text-bone transition-colors hover:bg-slate",
};

export const EditorialBannerStyles = {
  section: "mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-12 lg:py-8",
  banner: "relative isolate flex min-h-[360px] items-center overflow-hidden border border-hairline sm:min-h-[400px] lg:min-h-[360px]",
  image: "object-cover object-[70%_top]",
  overlay: "absolute inset-0 bg-linear-to-r from-ink/95 via-ink/65 to-ink/10",
  content: "relative z-10 max-w-xl px-5 py-10 text-bone sm:px-8 lg:px-12",
  title: "max-w-[12ch] text-balance font-display text-4xl font-normal leading-[0.98] tracking-[-0.03em] sm:text-5xl lg:text-6xl",
  description: "mt-3 max-w-sm text-pretty text-sm leading-relaxed text-fog sm:text-base",
  action: "mt-5 inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-brass px-5 text-sm font-medium text-brass-ink transition-colors hover:bg-bone",
  links: "absolute bottom-8 right-8 top-8 z-10 hidden w-36 flex-col justify-center border-l border-hairline pl-6 lg:flex",
  link: "inline-flex min-h-11 items-center text-sm text-fog transition-colors hover:text-bone",
};

export const AuthPageStyles = {
  page: "min-h-screen overflow-x-clip bg-ink font-interface text-bone",
  standardPage: "min-h-screen bg-ink font-interface text-bone",
  toast: "fixed right-4 top-24 z-80 flex items-center gap-3 rounded-md border border-hairline bg-graphite px-5 py-3 text-sm text-success",
  toastIcon: "h-5 w-5 text-success",
  section: "grid min-h-[100dvh] place-items-center px-4 pb-10 pt-28 sm:pt-32",
  panel: "relative grid w-full max-w-6xl overflow-hidden border border-hairline bg-graphite lg:grid-cols-[1.05fr_.95fr]",
  imagePanel: "relative hidden min-h-155 overflow-hidden lg:block",
  image: "object-cover",
  imageOverlay: "absolute inset-0 bg-[linear-gradient(0deg,var(--scrim),transparent_75%)]",
  imageCopy: "absolute bottom-8 left-8 right-8",
  brand: "inline-flex min-h-11 items-center border border-hairline bg-ink/80 px-4 py-2 text-xs tracking-[0.12em] text-bone",
  imageTitle: "mt-5 max-w-[12ch] font-display text-5xl font-normal leading-[1.05] tracking-tight text-bone",
  imageDescription: "mt-3 max-w-md text-sm leading-6 text-fog",
  formPanel: "p-6 sm:p-10 lg:p-12",
  modeContent: "text-xs tracking-[0.12em] text-fog",
  title: "mt-3 font-display text-4xl font-normal tracking-tight text-bone sm:text-5xl",
  description: "mt-3 text-sm leading-6 text-fog",
  form: "mt-8 space-y-4",
  label: "block space-y-2 text-sm text-bone",
  inputIconWrap: "relative block",
  inputIcon: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fog",
  input: "min-h-12 w-full rounded-sm border border-hairline bg-slate px-11 py-3 text-sm text-bone placeholder:text-fog outline-none transition-colors focus:border-brass",
  passwordInput: "min-h-12 w-full rounded-sm border border-hairline bg-slate px-11 py-3 text-sm text-bone placeholder:text-fog outline-none transition-colors focus:border-brass pr-12",
  passwordToggle: "absolute right-3 top-1/2 flex min-h-11 -translate-y-1/2 items-center gap-2 text-fog transition-colors hover:text-bone",
  forgotRow: "flex justify-end text-sm text-fog",
  forgotButton: "min-h-11 text-fog underline-offset-4 hover:text-bone hover:underline",
  submitButton: "flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-brass px-5 py-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95 disabled:opacity-40",
  spinner: "h-4 w-4 animate-spin",
  loadingIcon: "animate-spin",
  screenReaderOnly: "sr-only",
  error: "mt-4 text-sm text-danger",
  footer: "mt-7 text-center text-sm text-fog",
  modeToggle: "min-h-11 font-medium text-bone underline underline-offset-4",
  forgotToast: (type) =>
    `fixed bottom-4 right-4 z-200 flex max-w-sm items-center gap-3 border border-hairline bg-graphite px-4 py-3 text-sm ${type === "success" ? "text-success" : "text-danger"}`,
  forgotSection: "mx-auto flex min-h-[100dvh] max-w-md items-center px-5 pt-16",
  forgotForm: "w-full space-y-5 border border-hairline bg-graphite p-6 sm:p-8",
  forgotTitle: "font-display text-3xl font-normal text-bone",
  forgotLabel: "block space-y-2 text-sm text-bone",
  forgotInput: "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone placeholder:text-fog focus:border-brass focus:outline-none disabled:cursor-not-allowed disabled:opacity-40",
  forgotCodeInput: "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone placeholder:text-fog focus:border-brass focus:outline-none",
  forgotSubmit: "flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-brass p-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40",
  verifySection: "mx-auto flex min-h-[100dvh] max-w-md items-center px-5 pt-16",
  verifyForm: "w-full space-y-5 border border-hairline bg-graphite p-6 sm:p-8",
  verifyTitle: "font-display text-3xl font-normal text-bone",
  verifyDescription: "text-sm text-fog",
  verifyLabel: "block space-y-2 text-sm text-bone",
  verifyEmailInput: "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone focus:border-brass focus:outline-none disabled:opacity-40",
  verifyCodeInput: "min-h-12 w-full rounded-sm border border-hairline bg-slate px-4 py-3 text-bone placeholder:text-fog focus:border-brass focus:outline-none disabled:opacity-40",
  verifyButton: "flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-brass p-3 text-sm font-medium text-brass-ink transition-colors hover:brightness-95 disabled:opacity-40",
  verifyMessage: "text-sm text-fog",
  emptyPage: "min-h-screen bg-ink",
};

export const PaymentSuccessStyles = {
  main: "grid min-h-[100dvh] place-items-center bg-ink px-4 font-interface text-bone",
  section: "w-full max-w-lg border border-hairline bg-graphite p-8 text-center",
  title: "font-display text-2xl font-normal text-bone",
  fallback: "grid min-h-[100dvh] place-items-center bg-ink px-4 font-interface text-lg text-bone",
};

export const HomePageStyles = {
  shell: "home-shell",
  content: "relative z-10",
};

export const RootLayoutStyles = {
  body: "min-h-screen antialiased",
};
