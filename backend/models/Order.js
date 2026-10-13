import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    color: {
      type: String,
      default: "",
    },

    size: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    productName: { type: String, trim: true, default: "" },
    brand: { type: String, trim: true, default: "" },
    imageUrl: { type: String, default: "" },
    productCategory: { type: String, trim: true, default: "" },
    productSubCategory: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      sparse: true,
      match: /^\d{4}$/,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },

      mobileNumber: {
        type: String,
        required: true,
      },

      completeAddress: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Stripe",
    },

   

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Order Placed",
        "Order Confirmed",
        "Processing / Being Prepared",
        "Ready for Pickup",
        "Shipped / Dispatched",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Confirmed",
        "Shipped",
      ],
      default: "Order Placed",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
