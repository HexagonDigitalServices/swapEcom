import {
  BadgePlus,
  Calendar,
  LayoutDashboard,
  ListOrdered,
} from "lucide-react";

export const initialOrders = [
  {
    id: 1,
    image:
      "/downloaded-assets/images-unsplash-com-photo-1505740420928-5e560c06d30e-1a7b36e87d.jpg",
    name: "Wireless Headphones",
    brand: "Sony",
    price: 299,
    quantity: 2,
    size: "One Size",
    color: "Black",
    paymentStatus: "Online",
    orderStatus: "Confirmed",
    date: "2024-01-15",
    customer: {
      name: "John Smith",
      mobile: "9876543210",
      address: "123 Main Street, Apartment 4B, Mumbai",
      pincode: "400001",
    },
  },
  {
    id: 2,
    image:
      "/downloaded-assets/images-unsplash-com-photo-1523275335684-37898b6baf30-ecabec4a7c.jpg",
    name: "Smart Watch Pro",
    brand: "Apple",
    price: 399,
    quantity: 1,
    size: "42mm",
    color: "Silver",
    paymentStatus: "COD",
    orderStatus: "Confirmed",
    date: "2024-01-14",
    customer: {
      name: "Emma Johnson",
      mobile: "9123456789",
      address: "456 Oak Avenue, Delhi",
      pincode: "110001",
    },
  },
  {
    id: 3,
    image:
      "/downloaded-assets/images-unsplash-com-photo-1546868871-7041f2a55e12-18b66634ce.jpg",
    name: "Fitness Tracker",
    brand: "Fitbit",
    price: 129,
    quantity: 3,
    size: "Regular",
    color: "Blue",
    paymentStatus: "Online",
    orderStatus: "Delivered",
    date: "2024-01-13",
    customer: {
      name: "Robert Williams",
      mobile: "9988776655",
      address: "789 Pine Road, Bangalore",
      pincode: "560001",
    },
  },
  {
    id: 4,
    image:
      "/downloaded-assets/images-unsplash-com-photo-1491553895911-0055eca6402d-562e1c30a4.jpg",
    name: "Running Shoes",
    brand: "Nike",
    price: 89,
    quantity: 1,
    size: "10ml",
    color: "Red Blue Green",
    paymentStatus: "Online",
    orderStatus: "Cancelled",
    date: "2024-01-12",
    customer: {
      name: "Sarah Davis",
      mobile: "9123987456",
      address: "321 Elm Street, Chennai",
      pincode: "600001",
    },
  },
  {
    id: 5,
    image:
      "/downloaded-assets/images-unsplash-com-photo-1572635196237-14b3f281503f-e46d86939a.jpg",
    name: "Sunglasses",
    brand: "Ray-Ban",
    price: 159,
    quantity: 2,
    size: "Medium",
    color: "Tortoise",
    paymentStatus: "COD",
    orderStatus: "Confirmed",
    date: "2024-01-11",
    customer: {
      name: "Michael Brown",
      mobile: "9012345678",
      address: "654 Cedar Lane, Kolkata",
      pincode: "700001",
    },
  },
  {
    id: 6,
    image:
      "/downloaded-assets/images-unsplash-com-photo-1572635196237-14b3f281503f-e46d86939a.jpg",
    name: "Sunglasses",
    brand: "Ray-Ban",
    price: 159,
    quantity: 2,
    size: "Medium",
    paymentStatus: "COD",
    orderStatus: "Confirmed",
    date: "2024-01-11",
    customer: {
      name: "Lisa Anderson",
      mobile: "8899776655",
      address: "987 Maple Drive, Hyderabad",
      pincode: "500001",
    },
  },
  {
    id: 7,
    image:
      "/downloaded-assets/images-unsplash-com-photo-1572635196237-14b3f281503f-e46d86939a.jpg",
    name: "Sunglasses",
    brand: "Ray-Ban",
    price: 159,
    quantity: 2,
    size: "Medium",
    color: "Gold",
    paymentStatus: "COD",
    orderStatus: "Confirmed",
    date: "2024-01-11",
    customer: {
      name: "David Wilson",
      mobile: "7766554433",
      address: "147 Walnut Street, Pune",
      pincode: "411001",
    },
  },
  {
    id: 8,
    image:
      "/downloaded-assets/images-unsplash-com-photo-1572635196237-14b3f281503f-e46d86939a.jpg",
    name: "Sunglasses",
    brand: "Ray-Ban",
    price: 159,
    quantity: 2,
    size: "Medium",
    color: "Brown",
    paymentStatus: "COD",
    orderStatus: "Confirmed",
    date: "2024-01-11",
    customer: {
      name: "Jennifer Taylor",
      mobile: "6655443322",
      address: "258 Birch Avenue, Ahmedabad",
      pincode: "380001",
    },
  },
  {
    id: 9,
    image:
      "/downloaded-assets/images-unsplash-com-photo-1572635196237-14b3f281503f-e46d86939a.jpg",
    name: "Sunglasses",
    brand: "Ray-Ban",
    price: 159,
    quantity: 2,
    size: "Medium",
    color: "Green",
    paymentStatus: "COD",
    orderStatus: "Confirmed",
    date: "2024-01-11",
    customer: {
      name: "James Miller",
      mobile: "9988771234",
      address: "369 Spruce Court, Jaipur",
      pincode: "302001",
    },
  },
  {
    id: 10,
    image:
      "/downloaded-assets/images-unsplash-com-photo-1572635196237-14b3f281503f-e46d86939a.jpg",
    name: "Sunglasses",
    brand: "Ray-Ban",
    price: 159,
    quantity: 2,
    size: "Medium",
    color: "Black",
    paymentStatus: "COD",
    orderStatus: "Confirmed",
    date: "2024-01-11",
    customer: {
      name: "Patricia Moore",
      mobile: "8877665544",
      address: "741 Oakwood Drive, Lucknow",
      pincode: "226001",
    },
  },
];

export const statusFlow = [
  "Order Placed",
  "Order Confirmed",
  "Processing / Being Prepared",
  "Ready for Pickup",
  "Shipped / Dispatched",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export const PRODUCT_TYPES = [
  "Shirts",
  "Pants",
  "Jeans",
  "Jackets",
  "Shoes",
  "Backpacks",
  "Shorts",
  "Joggers",
];

export const GROOMING_CATS = [
  "Face Wash",
  "Trimmer Pro",
  "Hair Wax",
  "Premium Cologne",
  "Hair Serum",
  "Body Lotion",
  "Vitamin C Serum",
  "Night Cream",
];

// These are the same canonical values used by the customer Accessories pages.
export const ACCESSORIES_CATS = [
  "Belt",
  "Socks",
  "Cap",
  "Perfume",
  "Handbags",
  "Chain Necklace",
  "Goggles",
  "Tie Set",
];

// Keep this in sync with Add Clothing. Values are lowercase because products
// are saved with lowercase sub-categories by the add-product form.
export const CLOTHING_CATS = [
  "Shirts",
  "Pants",
  "Jeans",
  "Jackets",
  "Shoes",
  "Backpacks",
  "Shorts",
  "Joggers",
];

export const initialProducts = [
  {
    id: "1",
    category: "Shampoo",
    name: "Fresh Mint Shampoo",
    brand: "PureCare",
    gender: "men",
    image:
      "/downloaded-assets/images-unsplash-com-photo-1556228578-9c360e1d8d34-794be582f3.svg",
    description: "Refreshing mint shampoo for daily use",
    // grooming: volumes
    volumes: [
      { id: "v1", label: "200 ml", price: 349 },
      { id: "v2", label: "500 ml", price: 599 },
    ],
    rating: 4.5,
  },
  {
    id: "2",
    category: "Facewash",
    name: "Charcoal Facewash",
    brand: "SkinCare+",
    gender: "women",
    image:
      "/downloaded-assets/images-unsplash-com-photo-1556228578-7c1d3f46e539-130282ed82.svg",
    volumes: [
      { id: "v1", label: "100 ml", price: 299 },
      { id: "v2", label: "250 ml", price: 499 },
    ],
    rating: 4.2,
  },
  {
    id: "3",
    category: "Shirts",
    name: "Premium Cotton Shirt",
    brand: "UrbanThreads",
    gender: "men",
    image:
      "/downloaded-assets/images-unsplash-com-photo-1596755094514-f87e34085b2c-e8e814acc0.jpg",
    // clothing: sizes
    sizes: [
      { id: "s1", size: "S", price: 1199 },
      { id: "s2", size: "M", price: 1299 },
      { id: "s3", size: "L", price: 1399 },
    ],
    // colors for clothing (new optional field)
    colors: ["Blue", "White"],
    rating: 4.8,
  },
  {
    id: "4",
    category: "Perfume",
    name: "Floral Essence",
    brand: "Scentio",
    gender: "women",
    image:
      "/downloaded-assets/images-unsplash-com-photo-1541643600914-78b084683601-5db0efe4ed.jpg",
    volumes: [
      { id: "v1", label: "30 ml", price: 1499 },
      { id: "v2", label: "50 ml", price: 2199 },
    ],
    rating: 4.7,
  },
  {
    id: "5",
    category: "Watches",
    name: "Classic Leather Watch",
    brand: "TimeCraft",
    gender: "men",
    image:
      "/downloaded-assets/images-unsplash-com-photo-1523170335258-f5ed11844a49-5df8590f16.jpg",
    sizes: [{ id: "one", size: "One Size", price: 2499 }],
    colors: ["Black", "Brown"],
    rating: 4.9,
  },
  {
    id: "6",
    category: "Skincare",
    name: "Vitamin C Serum",
    brand: "GlowLab",
    gender: "women",
    image:
      "/downloaded-assets/images-unsplash-com-photo-1556228578-9c360e1d8d34-794be582f3.svg",
    volumes: [
      { id: "v1", label: "30 ml", price: 899 },
      { id: "v2", label: "60 ml", price: 1599 },
    ],
    rating: 4.6,
  },
  {
    id: "7",
    category: "Shoes",
    name: "Runner Sneakers",
    brand: "Stride",
    gender: "men",
    image:
      "/downloaded-assets/images-unsplash-com-photo-1542291026-7eec264c27ff-32de71b7a0.jpg",
    sizes: [
      { id: "s6", size: "6", price: 1699 },
      { id: "s7", size: "7", price: 1799 },
      { id: "s8", size: "8", price: 1999 },
    ],
    colors: ["Black", "White"],
    rating: 4.4,
  },
  {
    id: "8",
    category: "Handbags",
    name: "Leather Tote Bag",
    brand: "CarryAll",
    gender: "women",
    image:
      "/downloaded-assets/images-unsplash-com-photo-1584917865442-de89df76afd3-3692525ce0.jpg",
    sizes: [
      { id: "sm", size: "Small", price: 2499 },
      { id: "md", size: "Medium", price: 2999 },
    ],
    colors: ["Tan", "Black"],
    rating: 4.8,
  },
];

export const addProductCategories = {
  men: [
    "Shirts",
    "Pants",
    "Jeans",
    "Jackets",
    "Shoes",
    "Backpacks",
    "Shorts",
    "Joggers",
  ],
  women: [
    "Shirts",
    "Pants",
    "Jeans",
    "Jackets",
    "Shoes",
    "Backpacks",
    "Shorts",
    "Joggers",
  ],
};

export const adminNavItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Add Clothing", href: "/addcategories", icon: BadgePlus },
  { name: "Add Grooming", href: "/addgrooming", icon: BadgePlus },
  { name: "Add Accessories", href: "/addaccessories", icon: BadgePlus },
  { name: "List Products", href: "/listproducts", icon: ListOrdered },
  { name: "Manage Booking", href: "/managebookings", icon: Calendar },
];
