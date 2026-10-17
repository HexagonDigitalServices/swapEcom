import ABM1 from "../public/ABM1.png";
import ABM2 from "../public/ABM2.png";
import ABM3 from "../public/ABM3.png";
import ABM4 from "../public/ABM4.png";
import ABW1 from "../public/ABW1.png";
import ABW2 from "../public/ABW2.png";
import ABW3 from "../public/ABW3.png";
import ABW4 from "../public/ABW4.png";
import ASM1 from "../public/ASM1.png";
import ASM2 from "../public/ASM2.png";
import ASM3 from "../public/ASM3.png";
import ASM4 from "../public/ASM4.png";
import ASW1 from "../public/ASW1.png";
import ASW2 from "../public/ASW2.png";
import ASW3 from "../public/ASW3.png";
import ASW4 from "../public/ASW4.png";
import ACM1 from "../public/ACM1.png";
import ACM2 from "../public/ACM2.png";
import ACM3 from "../public/ACM3.png";
import ACM4 from "../public/ACM4.png";
import ACW1 from "../public/ACW1.png";
import ACW2 from "../public/ACW2.png";
import ACW3 from "../public/ACW3.png";
import ACW4 from "../public/ACW4.png";
import APM1 from "../public/APM1.png";
import APM2 from "../public/APM2.png";
import APM3 from "../public/APM3.png";
import APM4 from "../public/APM4.png";
import APW1 from "../public/APW1.png";
import APW2 from "../public/APW2.png";
import APW3 from "../public/APW3.png";
import APW4 from "../public/APW4.png";
import AHM1 from "../public/AHM1.png";
import AHM2 from "../public/AHM2.png";
import AHM3 from "../public/AHM3.png";
import AHM4 from "../public/AHM4.png";
import AHW1 from "../public/AHW1.png";
import AHW2 from "../public/AHW2.png";
import AHW3 from "../public/AHW3.png";
import AHW4 from "../public/AHW4.png";
import ANM1 from "../public/ANM1.png";
import ANM2 from "../public/ANM2.png";
import ANM3 from "../public/ANM3.png";
import ANM4 from "../public/ANM4.png";
import ANW1 from "../public/ANW1.png";
import ANW2 from "../public/ANW2.png";
import ANW3 from "../public/ANW3.png";
import ANW4 from "../public/ANW4.png";
import AGM1 from "../public/AGM1.png";
import AGM2 from "../public/AGM2.png";
import AGM3 from "../public/AGM3.png";
import AGM4 from "../public/AGM4.png";
import AGW1 from "../public/AGW1.png";
import AGW2 from "../public/AGW2.png";
import AGW3 from "../public/AGW3.png";
import AGW4 from "../public/AGW4.png";
import ATM1 from "../public/ATM1.png";
import ATM2 from "../public/ATM2.png";
import ATM3 from "../public/ATM3.png";
import ATM4 from "../public/ATM4.png";
import ATW1 from "../public/ATW1.png";
import ATW2 from "../public/ATW2.png";
import ATW3 from "../public/ATW3.png";
import ATW4 from "../public/ATW4.png";

// Accessories Categories List
export const ACCESSORIES_LIST = [
  { id: 1, key: "belt", label: "Belt" },
  { id: 2, key: "socks", label: "Socks" },
  { id: 3, key: "cap", label: "Cap" },
  { id: 4, key: "perfume", label: "Perfume" },
  { id: 5, key: "handbags", label: "Handbags" },
  { id: 6, key: "necklace", label: "Chain Necklace" },
  { id: 7, key: "goggles", label: "Goggles" },
  { id: 8, key: "tie-set", label: "Tie Set" },
];

// Accessories Products Data
export const ACCESSORIES_PRODUCTS = {
  belts: {
    id: 1,
    key: "belts",
    label: "Belts",
    men: [
      {
        id: 1,
        name: "Classic Leather Belt",
        brand: "Heritage Co.",
        image: ABM1,
        variants: [
          { size: "S (30-32)", price: 1199 },
          { size: "M (32-34)", price: 1299 },
          { size: "L (34-36)", price: 1399 },
          { size: "XL (36-38)", price: 1499 },
        ],
        colors: ["Brown", "Black"],
      },
      {
        id: 2,
        name: "Reversible Dress Belt",
        brand: "DapperLane",
        image: ABM2,
        variants: [
          { size: "M", price: 1499 },
          { size: "L", price: 1599 },
          { size: "XL", price: 1699 },
        ],
        colors: ["Black/Brown"],
      },
      {
        id: 3,
        name: "Braided Casual Belt",
        brand: "WeaveWorks",
        image: ABM3,
        variants: [
          { size: "S", price: 899 },
          { size: "M", price: 999 },
          { size: "L", price: 1099 },
          { size: "XL", price: 1199 },
        ],
        colors: ["Tan", "Dark Brown"],
      },
      {
        id: 4,
        name: "Performance Stretch Belt",
        brand: "ActiveForm",
        image: ABM4,
        variants: [
          { size: "S", price: 799 },
          { size: "M", price: 899 },
          { size: "L", price: 999 },
        ],
        colors: ["Black"],
      },
    ],
    women: [
      {
        id: 5,
        name: "Slim Leather Waist Belt",
        brand: "LuxeLane",
        image: ABW1,
        variants: [
          { size: "XS", price: 1099 },
          { size: "S", price: 1199 },
          { size: "M", price: 1299 },
          { size: "L", price: 1399 },
        ],
        colors: ["Black", "Tan", "Ivory"],
      },
      {
        id: 6,
        name: "Statement Chain Belt",
        brand: "Gilded",
        image: ABW2,
        variants: [{ size: "One Size (adjustable)", price: 1799 }],
        colors: ["Gold", "Silver"],
      },
      {
        id: 7,
        name: "Elastic Cinch Belt",
        brand: "Everyday Threads",
        image: ABW3,
        variants: [
          { size: "S/M", price: 699 },
          { size: "L/XL", price: 799 },
        ],
        colors: ["Black", "Nude"],
      },
      {
        id: 8,
        name: "Wide Obi Belt",
        brand: "OrientStyle",
        image: ABW4,
        variants: [{ size: "One Size (ties around)", price: 1299 }],
        colors: ["Black", "Burgundy"],
      },
    ],
  },

  "cotton-socks": {
    id: 2,
    key: "cotton-socks",
    label: "Cotton Socks",
    men: [
      {
        id: 9,
        name: "Cotton Socks - 3 Pack",
        brand: "Everyday Threads",
        image: ASM1,
        variants: [
          { size: "M (7-9)", price: 499, packCount: 3 },
          { size: "L (9-11)", price: 549, packCount: 3 },
        ],
        colors: ["White", "Grey", "Navy"],
      },
      {
        id: 10,
        name: "Athletic Socks - 2 Pack",
        brand: "ActiveForm",
        image: ASM2,
        variants: [
          { size: "M", price: 599, packCount: 2 },
          { size: "L", price: 649, packCount: 2 },
        ],
        colors: ["Black", "Grey"],
      },
      {
        id: 11,
        name: "Sneaker Socks - 5 Pack",
        brand: "SneakFit",
        image: ASM3,
        variants: [
          { size: "M", price: 699, packCount: 5 },
          { size: "L", price: 749, packCount: 5 },
        ],
        colors: ["Black", "White", "Grey"],
      },
      {
        id: 12,
        name: "Thermal Wool Socks",
        brand: "WarmStep",
        image: ASM4,
        variants: [
          { size: "M", price: 899, packCount: 1 },
          { size: "L", price: 949, packCount: 1 },
        ],
        colors: ["Charcoal", "Navy"],
      },
    ],
    women: [
      {
        id: 13,
        name: "Cotton Socks - 3 Pack",
        brand: "Everyday Threads",
        image: ASW1,
        variants: [
          { size: "S (5-7)", price: 499, packCount: 3 },
          { size: "M (7-9)", price: 549, packCount: 3 },
        ],
        colors: ["Ivory", "Blush", "Charcoal"],
      },
      {
        id: 14,
        name: "Liner Socks - 6 Pack",
        brand: "SneakFit",
        image: ASW2,
        variants: [
          { size: "S", price: 699, packCount: 6 },
          { size: "M", price: 749, packCount: 6 },
        ],
        colors: ["Nude", "Black", "White"],
      },
      {
        id: 15,
        name: "Ankle  Socks - 3 Pack",
        brand: "ActiveForm",
        image: ASW3,
        variants: [
          { size: "S", price: 549, packCount: 3 },
          { size: "M", price: 599, packCount: 3 },
        ],
        colors: ["Black", "White", "Pink"],
      },
      {
        id: 16,
        name: "Lace Trim Socks - Pair",
        brand: "FemmeForm",
        image: ASW4,
        variants: [
          { size: "S", price: 399, packCount: 1 },
          { size: "M", price: 449, packCount: 1 },
        ],
        colors: ["White", "Champagne"],
      },
    ],
  },

  "dad-cap": {
    id: 3,
    key: "dad-cap",
    label: "Caps",
    men: [
      {
        id: 17,
        name: "Dad Cap - Classic",
        brand: "Streetwise",
        image: ACM1,
        variants: [{ size: "One Size (adjustable)", price: 799 }],
        colors: ["Beige", "Olive", "Black"],
      },
      {
        id: 18,
        name: "Embroidered Logo Cap",
        brand: "BrandMark",
        image: ACM2,
        variants: [{ size: "One Size (adjustable)", price: 999 }],
        colors: ["Black", "Navy"],
      },
      {
        id: 19,
        name: "Running Cap",
        brand: "ActiveForm",
        image: ACM3,
        variants: [{ size: "One Size (elastic)", price: 699 }],
        colors: ["Black", "Neon Green"],
      },
      {
        id: 20,
        name: "Mesh Back Trucker Cap",
        brand: "MeshPro",
        image: ACM4,
        variants: [{ size: "One Size (snapback)", price: 749 }],
        colors: ["Black/White", "Navy/White"],
      },
    ],
    women: [
      {
        id: 21,
        name: "Embroidered Floral Cap",
        brand: "Streetwise",
        image: ACW1,
        variants: [{ size: "One Size (adjustable)", price: 799 }],
        colors: ["Blush", "White", "Navy"],
      },
      {
        id: 22,
        name: "Cat-Eye Sun Hat",
        brand: "SummerStyle",
        image: ACW2,
        variants: [{ size: "One Size (adjustable)", price: 1299 }],
        colors: ["White", "Black", "Straw"],
      },
      {
        id: 23,
        name: "Beret - Wool Blend",
        brand: "Parisian",
        image: ACW3,
        variants: [{ size: "One Size", price: 999 }],
        colors: ["Black", "Navy", "Burgundy"],
      },
      {
        id: 24,
        name: "Wide Brim Fedora",
        brand: "BohoChic",
        image: ACW4,
        variants: [{ size: "One Size (adjustable)", price: 1499 }],
        colors: ["Black", "Brown", "Grey"],
      },
    ],
  },

  "eau-de-parfum": {
    id: 4,
    key: "eau-de-parfum",
    label: "Eau de Parfum",
    men: [
      {
        id: 25,
        name: "Signature Eau De Parfum",
        brand: "Noir Atelier",
        image: APM1,
        variants: [
          { size: "50ml", price: 2599 },
          { size: "100ml", price: 3999 },
        ],
        colors: ["Signature Scent"],
      },
      {
        id: 26,
        name: "Urban Sport Cologne",
        brand: "ActiveScents",
        image: APM2,
        variants: [{ size: "100ml", price: 1999 }],
        colors: ["Fresh Aquatic"],
      },
      {
        id: 27,
        name: "Citrus Fresh EDT",
        brand: "CitrusWorks",
        image: APM3,
        variants: [{ size: "75ml", price: 1299 }],
      },
      {
        id: 28,
        name: "Heritage Amber EDP",
        brand: "Heritage Co.",
        image: APM4,
        variants: [{ size: "100ml", price: 3299 }],
        colors: ["Amber Scent"],
      },
    ],
    women: [
      {
        id: 29,
        name: "Signature Eau De Parfum — Fleur Edition",
        brand: "Noir Atelier",
        image: APW1,
        variants: [
          { size: "50ml", price: 2699 },
          { size: "100ml", price: 4199 },
        ],
        colors: ["Floral Oriental"],
      },
      {
        id: 30,
        name: "Blossom Breeze EDT",
        brand: "FleurCo",
        image: APW2,
        variants: [{ size: "75ml", price: 1599 }],
        colors: ["Floral Fresh"],
      },
      {
        id: 31,
        name: "Vanilla Noir EDP",
        brand: "LuxeLane",
        image: APW3,
        variants: [{ size: "100ml", price: 3499 }],
        colors: ["Vanilla Gourmand"],
      },
      {
        id: 32,
        name: "Citrus Blossom Mist",
        brand: "FleurCo",
        image: APW4,
        variants: [{ size: "50ml", price: 1299 }],
        colors: ["Citrus Floral"],
      },
    ],
  },

  handbags: {
    id: 5,
    key: "handbags",
    label: "Handbags",
    men: [
      {
        id: 33,
        name: "Leather Messenger Bag",
        brand: "UrbanCarry",
        image: AHM1,
        variants: [
          { size: "Standard", price: 3499 },
          { size: "Large", price: 3999 },
        ],
        colors: ["Brown", "Black", "Navy"],
      },
      {
        id: 34,
        name: "Canvas Backpack",
        brand: "ActiveForm",
        image: AHM2,
        variants: [
          { size: "Standard", price: 1999 },
          { size: "Large", price: 2499 },
        ],
        colors: ["Khaki", "Black", "Olive"],
      },
      {
        id: 35,
        name: "Business Briefcase",
        brand: "Executive",
        image: AHM3,
        variants: [
          { size: "Standard", price: 4599 },
          { size: "Executive", price: 5299 },
        ],
        colors: ["Black", "Brown"],
      },
      {
        id: 36,
        name: "Weekend Duffel Bag",
        brand: "TravelPro",
        image: AHM4,
        variants: [
          { size: "Standard", price: 2499 },
          { size: "Large", price: 2999 },
        ],
        colors: ["Navy", "Charcoal", "Burgundy"],
      },
    ],
    women: [
      {
        id: 37,
        name: "Classic Tote Bag",
        brand: "LuxeLane",
        image: AHW1,
        variants: [
          { size: "Standard", price: 2899 },
          { size: "Large", price: 3499 },
        ],
        colors: ["Beige", "Black", "Camel"],
      },
      {
        id: 38,
        name: "Crossbody Saddle Bag",
        brand: "ChicStyle",
        image: AHW2,
        variants: [
          { size: "Standard", price: 1799 },
          { size: "Mini", price: 1499 },
        ],
        colors: ["Tan", "Black", "Burgundy"],
      },
      {
        id: 39,
        name: "Evening Clutch",
        brand: "Gilded",
        image: AHW3,
        variants: [
          { size: "Standard", price: 1299 },
          { size: "Mini", price: 999 },
        ],
        colors: ["Gold", "Silver", "Rose Gold"],
      },
      {
        id: 40,
        name: "Quilted Shoulder Bag",
        brand: "FemmeForm",
        image: AHW4,
        variants: [
          { size: "Standard", price: 3299 },
          { size: "Large", price: 3999 },
        ],
        colors: ["White", "Black", "Red"],
      },
    ],
  },

  necklaces: {
    id: 6,
    key: "necklaces",
    label: "Necklaces",
    men: [
      {
        id: 41,
        name: "Silver Pendant Necklace",
        brand: "MetalWorks",
        image: ANM1,
        variants: [
          { size: "18 inch", price: 1499 },
          { size: "20 inch", price: 1599 },
          { size: "22 inch", price: 1699 },
        ],
        colors: ["Silver"],
      },
      {
        id: 42,
        name: "Leather Cord Necklace",
        brand: "RusticEdge",
        image: ANM2,
        variants: [
          { size: "20 inch", price: 899 },
          { size: "22 inch", price: 949 },
          { size: "24 inch", price: 999 },
        ],
        colors: ["Black", "Brown"],
      },
      {
        id: 43,
        name: "Diamond Accent Chain",
        brand: "LuxeLane",
        image: ANM3,
        variants: [
          { size: "20 inch", price: 3199 },
          { size: "22 inch", price: 3299 },
          { size: "24 inch", price: 3399 },
        ],
        colors: ["White Gold", "Yellow Gold"],
      },
      {
        id: 44,
        name: "Beaded Choker Necklace",
        brand: "Boheme",
        image: ANM4,
        variants: [{ size: "One Size", price: 699 }],
        colors: ["Black/White", "Blue/Green", "Red/Brown"],
      },
    ],
    women: [
      {
        id: 45,
        name: "Pearl Strand Necklace",
        brand: "ClassicPearl",
        image: ANW1,
        variants: [
          { size: "16 inch", price: 2399 },
          { size: "18 inch", price: 2499 },
        ],
        colors: ["White", "Cream"],
      },
      {
        id: 46,
        name: "Layered Necklace Set",
        brand: "StackStyle",
        image: ANW2,
        variants: [{ size: "Set of 3", price: 1899 }],
        colors: ["Gold", "Silver", "Rose Gold"],
      },
      {
        id: 47,
        name: "Statement Pendant Necklace",
        brand: "Gilded",
        image: ANW3,
        variants: [
          { size: "18 inch", price: 1299 },
          { size: "20 inch", price: 1399 },
          { size: "22 inch", price: 1499 },
        ],
        colors: ["Gold", "Silver"],
      },
      {
        id: 48,
        name: "Delicate Choker",
        brand: "FemmeForm",
        image: ANW4,
        variants: [{ size: "One Size", price: 799 }],
        colors: ["Gold", "Silver", "Rose Gold"],
      },
    ],
  },

  goggles: {
    id: 7,
    key: "goggles",
    label: "Sunglasses",
    men: [
      {
        id: 49,
        name: "Aviator Sunglasses",
        brand: "RayShade",
        image: AGM1,
        variants: [
          { size: "Standard", price: 1899 },
          { size: "Large", price: 2099 },
        ],
        colors: ["Gold Frame", "Silver Frame"],
      },
      {
        id: 50,
        name: "Wayfarer Sunglasses",
        brand: "ClassicEye",
        image: AGM2,
        variants: [
          { size: "Standard", price: 1499 },
          { size: "Large", price: 1699 },
        ],
        colors: ["Black", "Tortoise", "Brown"],
      },
      {
        id: 51,
        name: "Sport Wrap Sunglasses",
        brand: "ActiveForm",
        image: AGM3,
        variants: [{ size: "Standard", price: 1299 }],
        colors: ["Black/Red", "Blue/White", "Black/Yellow"],
      },
      {
        id: 52,
        name: "Round Frame Sunglasses",
        brand: "VintageVibes",
        image: AGM4,
        variants: [{ size: "Standard", price: 1399 }],
        colors: ["Gold", "Silver", "Black"],
      },
    ],
    women: [
      {
        id: 53,
        name: "Cat-Eye Sunglasses",
        brand: "FemmeForm",
        image: AGW1,
        variants: [
          { size: "Standard", price: 1599 },
          { size: "Large", price: 1799 },
        ],
        colors: ["Black", "Tortoise", "White"],
      },
      {
        id: 54,
        name: "Oversized Square Sunglasses",
        brand: "CelebStyle",
        image: AGW2,
        variants: [{ size: "Standard", price: 1299 }],
        colors: ["Black", "Brown", "Red"],
      },
      {
        id: 55,
        name: "Butterfly Sunglasses",
        brand: "ChicStyle",
        image: AGW3,
        variants: [{ size: "Standard", price: 1799 }],
        colors: ["Gold", "Rose Gold", "Silver"],
      },
      {
        id: 56,
        name: "Round Metal Sunglasses",
        brand: "Boheme",
        image: AGW4,
        variants: [{ size: "Standard", price: 1199 }],
        colors: ["Gold", "Silver", "Gunmetal"],
      },
    ],
  },

  ties: {
    id: 8,
    key: "ties",
    label: "Ties & Scarves",
    men: [
      {
        id: 57,
        name: "Silk Necktie",
        brand: "DapperLane",
        image: ATM1,
        variants: [{ size: "Standard 58 inch", price: 1299 }],
        colors: ["Navy", "Burgundy", "Charcoal"],
      },
      {
        id: 58,
        name: "Bow Tie - Self-Tie",
        brand: "VintageVibes",
        image: ATM2,
        variants: [{ size: "Adjustable", price: 899 }],
        colors: ["Black", "Navy", "Burgundy"],
      },
      {
        id: 59,
        name: "Patterned Silk Tie",
        brand: "Executive",
        image: ATM3,
        variants: [{ size: "Standard 58 inch", price: 1499 }],
        colors: ["Navy", "Green", "Burgundy"],
      },
      {
        id: 60,
        name: "Skinny Tie",
        brand: "ModernMan",
        image: ATM4,
        variants: [{ size: "Standard 58 inch", price: 999 }],
        colors: ["Black", "Grey", "Navy"],
      },
    ],
    women: [
      {
        id: 61,
        name: "Silk Scarf - Large",
        brand: "LuxeLane",
        image: ATW1,
        variants: [{ size: "35x35 inches", price: 1999 }],
        colors: ["Floral Print", "Abstract Print", "Geometric Print"],
      },
      {
        id: 62,
        name: "Pashmina Shawl",
        brand: "CozyNest",
        image: ATW2,
        variants: [{ size: "70x30 inches", price: 2499 }],
        colors: ["Cashmere Grey", "Navy Blue", "Burgundy"],
      },
      {
        id: 63,
        name: "Chiffon Neck Scarf",
        brand: "FemmeForm",
        image: ATW3,
        variants: [{ size: "One Size", price: 799 }],
        colors: ["Floral", "Polka Dot", "Stripes"],
      },
      {
        id: 64,
        name: "Winter Wool Scarf",
        brand: "WarmStep",
        image: ATW4,
        variants: [{ size: "70x12 inches", price: 1499 }],
        colors: ["Camel", "Grey", "Navy"],
      },
    ],
  },
};

const ACCESSORIES_COLOR_IMAGE_POOLS = {
  belts: {
    men: [ABM1, ABM2, ABM3, ABM4],
    women: [ABW1, ABW2, ABW3, ABW4],
  },
  "cotton-socks": {
    men: [ASM1, ASM2, ASM3, ASM4],
    women: [ASW1, ASW2, ASW3, ASW4],
  },
  "dad-cap": {
    men: [ACM1, ACM2, ACM3, ACM4],
    women: [ACW1, ACW2, ACW3, ACW4],
  },
  "eau-de-parfum": {
    men: [APM1, APM2, APM3, APM4],
    women: [APW1, APW2, APW3, APW4],
  },
  handbags: {
    men: [AHM1, AHM2, AHM3, AHM4],
    women: [AHW1, AHW2, AHW3, AHW4],
  },
  necklaces: {
    men: [ANM1, ANM2, ANM3, ANM4],
    women: [ANW1, ANW2, ANW3, ANW4],
  },
  goggles: {
    men: [AGM1, AGM2, AGM3, AGM4],
    women: [AGW1, AGW2, AGW3, AGW4],
  },
  ties: {
    men: [ATM1, ATM2, ATM3, ATM4],
    women: [ATW1, ATW2, ATW3, ATW4],
  },
};

const getDummyColorName = (color) =>
  typeof color === "object" ? color.color || color.name || "" : color;

const rotateImages = (images, startIndex) =>
  images.length
    ? [...images.slice(startIndex % images.length), ...images.slice(0, startIndex % images.length)]
    : [];

const addDummyColorImages = (product, imagePool, index) => {
  const colorOptions = product.colors || product.availableColors || [];
  if (!Array.isArray(colorOptions) || colorOptions.length === 0) return product;

  const rotatedImages = rotateImages(imagePool, index);
  const variantImages = [
    product.image,
    ...rotatedImages.filter((image) => image && image !== product.image),
  ].filter(Boolean);

  const colorImages = colorOptions.reduce((acc, color, colorIndex) => {
    const name = getDummyColorName(color);
    if (name) acc[name] = variantImages[colorIndex % variantImages.length] || product.image;
    return acc;
  }, {});

  return { ...product, colorImages };
};

Object.entries(ACCESSORIES_PRODUCTS).forEach(([categoryKey, category]) => {
  ["men", "women"].forEach((gender) => {
    if (!Array.isArray(category[gender])) return;
    const imagePool = ACCESSORIES_COLOR_IMAGE_POOLS[categoryKey]?.[gender] || [];
    category[gender] = category[gender].map((product, index) =>
      addDummyColorImages(product, imagePool, index),
    );
  });
});

// Helper function to get all products
export const getAllProducts = () => {
  const allProducts = [];

  Object.values(ACCESSORIES_PRODUCTS).forEach((category) => {
    if (category.men) allProducts.push(...category.men);
    if (category.women) allProducts.push(...category.women);
  });

  return allProducts;
};

// Helper function to get products by category and gender
export const getProductsByCategory = (categoryKey, gender = null) => {
  const category = ACCESSORIES_PRODUCTS[categoryKey];
  if (!category) return [];

  if (gender === "men") return category.men || [];
  if (gender === "women") return category.women || [];

  return [...(category.men || []), ...(category.women || [])];
};

// Find product by ID and category
export const getProductById = (categoryKey, productId) => {
  const category = ACCESSORIES_PRODUCTS[categoryKey];
  if (!category) return null;

  // Search in men's products
  const menProduct = category.men?.find(
    (product) => product.id === parseInt(productId),
  );
  if (menProduct) return { ...menProduct, gender: "men" };

  // Search in women's products
  const womenProduct = category.women?.find(
    (product) => product.id === parseInt(productId),
  );
  if (womenProduct) return { ...womenProduct, gender: "women" };

  return null;
};
