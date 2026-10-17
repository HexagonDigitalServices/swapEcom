import AH1 from "../public/AH1.png"
import AH2 from "../public/AH2.png"
import AH3 from "../public/AH3.png";
import AH4 from "../public/AH4.png";
import AH5 from "../public/AH5.png";
import AH6 from "../public/AH6.png";
import AH7 from "../public/AH7.png"
import AH8 from "../public/AH8.png";

export const items = [
  {
    src: AH1,
    name: "Leather Belt",
    url: "accessories/belt",
  },
  {
    src: AH2,
    name: "Cotton Socks",
    url: "accessories/socks",
  },
  {
    src: AH3,
    name: "Dad Cap",
    url: "accessories/cap",
  },
  {
    src: AH4,
    name: "Eau De Parfum",
    url: "accessories/perfume",
  },
  {
    src: AH5,
    name: "Handbags",
    url: "accessories/handbags",
  },
  {
    src: AH6,
    name: "Chain Necklace",
    url: "accessories/necklace",
  },
  {
    src: AH7,
    name: "Goggles",
    url: "accessories/goggles",
  },
  {
    src: AH8,
    name: "Tie Set",
    url: "accessories/tie-set",
  },
];

// Slug helper
export function slugify(value = "") {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
