// src/data/aboutData.js
// Dummy data for AboutPage (stats, coreValues, processSteps)

export const stats = [
  {
    id: 1,
    value: "500K+",
    label: "Satisfied Clients Worldwide",
    description: "From fashion enthusiasts to industry professionals",
  },
  {
    id: 2,
    value: "98.7%",
    label: "Client Retention Rate",
    description: "Exceptional service delivering consistent satisfaction",
  },
  {
    id: 3,
    value: "50+",
    label: "Global Ateliers",
    description: "Crafting excellence across continents",
  },
  {
    id: 4,
    value: "120+",
    label: "Design Awards",
    description: "Recognized for innovation and craftsmanship",
  },
];

export const coreValues = [
  {
    id: 1,
    title: "Precision Craftsmanship",
    description:
      "Each piece undergoes 150+ quality checks with master artisans overseeing every stitch. Our craftsmen train for 10,000 hours before handling premium materials.",
    lottie:
      "/downloaded-assets/lottie-host-emsg18gxap-21f6e37b73.lottie",
  },
  {
    id: 2,
    title: "Timeless Elegance",
    description:
      "Designs that transcend seasons, crafted from ethically sourced materials that age beautifully. We blend classical techniques with contemporary silhouettes.",
    lottie:
      "/downloaded-assets/lottie-host-o3mmiyrnqj-10995f59c7.lottie",
  },
  {
    id: 3,
    title: "Sustainable Luxury",
    description:
      "Responsibly sourced fabrics, low-impact manufacturing, and mindful packaging — designed to reduce waste while maintaining uncompromised quality and comfort.",
    lottie:
      "/downloaded-assets/lottie-host-su1yqso6xx-c56aad74fb.lottie",
  },
];

export const processSteps = [
  {
    id: 1,
    step: "01",
    title: "Fabric & Material Sourcing",
    description:
      "We source premium, sustainable fabrics for both men’s and women’s collections — organic cotton, responsibly produced denim, and performance blends — prioritizing durability, hand-feel, and low environmental impact.",
  },
  {
    id: 2,
    step: "02",
    title: "Design & Pattern Development",
    description:
      "Design teams create gender-aware silhouettes and technical packs. Patterns are graded across full size ranges (XS–XXXL) and refined using 3D prototyping to ensure consistent fit and drape for all body types.",
  },
  {
    id: 3,
    step: "03",
    title: "Sampling & Fit Sessions",
    description:
      "Male and female fit models (including petite and plus) test samples in iterative sessions. We adjust cut, seam placement, and sizing to optimize comfort, proportion, and movement for real customers.",
  },
  {
    id: 4,
    step: "04",
    title: "Production, QC & Fulfillment",
    description:
      "Full production runs follow strict quality checks (stitching, colorfastness, dimensional accuracy). Finished pieces are styled, photographed, packaged in eco-friendly materials and dispatched through tracked logistics with easy returns and customer support.",
  },
];

export default {
  stats,
  coreValues,
  processSteps,
};
