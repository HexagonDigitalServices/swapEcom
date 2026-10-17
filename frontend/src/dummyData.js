import React from "react";
import {
  Facebook,
  Github,
  Home,
  Instagram,
  Package,
  Phone,
  Twitter,
} from "lucide-react";

export const sampleOrders = [
  {
    id: 1,
    status: "Confirmed",
    paymentMethod: "Online",
    items: [
      {
        id: "1a",
        title: "Whey Protein — 2 kg",
        brand: "MuscleBlaze",
        size: "2 kg",
        color: "Chocolate",
        price: "2,499",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1599901860904-17e6ed7083a0-59c86105f5.jpg",
      },
      {
        id: "1b",
        title: "Whey Protein — 1 kg",
        brand: "MuscleBlaze",
        size: "1 kg",
        color: "Vanilla",
        price: "1,299",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1609783547920-2d8a3c1b7b4f-a5b9bbe176.svg",
      },
      {
        id: "1c",
        title: "Eco Yoga Mat",
        brand: "Prana",
        size: "6 mm",
        color: "Green",
        price: "899",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1546484959-f5a2fb0fa2d4-1133817774.svg",
      },
      {
        id: "1d",
        title: "Adjustable Dumbbell Set",
        brand: "BodyMax",
        size: "20 kg",
        color: "Black",
        price: "3,199",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1571019613454-1cb2f99b2d8b-9e73c5e495.jpg",
      },
      {
        id: "1e",
        title: "Whey Protein — 2 kg",
        brand: "MuscleBlaze",
        size: "2 kg",
        color: "Chocolate",
        price: "2,499",
        quantity: 2,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1599901860904-17e6ed7083a0-59c86105f5.jpg",
      },
    ],
  },
  {
    id: 3,
    status: "Confirmed",
    paymentMethod: "Online",
    items: [
      {
        id: "1a",
        title: "Whey Protein — 2 kg",
        brand: "MuscleBlaze",
        size: "2 kg",
        color: "Chocolate",
        price: "2,499",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1599901860904-17e6ed7083a0-59c86105f5.jpg",
      },
      {
        id: "1b",
        title: "Whey Protein — 1 kg",
        brand: "MuscleBlaze",
        size: "1 kg",
        color: "Vanilla",
        price: "1,299",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1609783547920-2d8a3c1b7b4f-a5b9bbe176.svg",
      },
      {
        id: "1c",
        title: "Eco Yoga Mat",
        brand: "Prana",
        size: "6 mm",
        color: "Green",
        price: "899",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1546484959-f5a2fb0fa2d4-1133817774.svg",
      },
      {
        id: "1d",
        title: "Adjustable Dumbbell Set",
        brand: "BodyMax",
        size: "20 kg",
        color: "Black",
        price: "3,199",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1571019613454-1cb2f99b2d8b-9e73c5e495.jpg",
      },
      {
        id: "1e",
        title: "Whey Protein — 2 kg",
        brand: "MuscleBlaze",
        size: "2 kg",
        color: "Chocolate",
        price: "2,499",
        quantity: 2,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1599901860904-17e6ed7083a0-59c86105f5.jpg",
      },
    ],
  },

  {
    id: 2,
    status: "Shipped",
    paymentMethod: "COD",
    items: [
      {
        id: "2a",
        title: "Classic Cotton Shirt",
        brand: "Levi's",
        size: "M",
        color: "Navy Blue",
        price: "799",
        quantity: 2,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1520962918057-89b6d8a6a0f8-4731e2c877.svg",
      },
      {
        id: "2b",
        title: "Eau de Parfum",
        brand: "Dior",
        volume: "100 ml",
        color: "—",
        price: "4,499",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1533777324565-a040eb52fac2-ae53a619d1.svg",
      },
      {
        id: "2c",
        title: "Running Sneakers",
        brand: "Nike",
        size: "9",
        color: "White",
        price: "6,999",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1528701800489-6c3a0b5d3f68-d73f6f07a2.svg",
      },
      {
        id: "2d",
        title: "Aviator Sunglasses",
        brand: "Ray-Ban",
        size: "Standard",
        color: "Black",
        price: "3,199",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1517248135467-4c7edcad34c4-610680198e.jpg",
      },
      {
        id: "2e",
        title: "Racing Goggles",
        brand: "SpeedX",
        size: "One Size",
        color: "Black",
        price: "1,299",
        quantity: 1,
        image:
          "/downloaded-assets/images-unsplash-com-photo-1585386959984-a4155226b4a3-6a287fefa3.svg",
      },
    ],
  },
];


export const socialIcons = [
  { name: "Twitter", icon: <Twitter size={18} />, link: "#" },
  { name: "GitHub", icon: <Github size={18} />, link: "#" },
  { name: "Instagram", icon: <Instagram size={18} />, link: "#" },
  { name: "Facebook", icon: <Facebook size={18} />, link: "#" },
];


export const quickLinks = [
  { name: "Men", href: "#" },
  { name: "Women", href: "#" },
  { name: "New Arrivals", href: "#" },
  { name: "Collections", href: "#" },
];


export const navItems = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: <Home size={18} />,
    },
    {
      id: "contact",
      label: "Contact",
      path: "/contact",
      icon: <Phone size={18} />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/orders",
      icon: <Package size={18} />,
    },
  ];

