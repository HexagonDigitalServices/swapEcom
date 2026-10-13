
// ================= My Orders =================

export const getMyOrders = async (req, res) => {
  try {
    const user = req.user._id;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const orders = await Order.find({ user })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log("My Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= Get Single Order =================

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }
    if (
      req.user.role !== "admin" &&
      String(order.user._id) !== String(req.user._id)
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied." });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("Get Single Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= Get All Orders =================

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [
        { paymentMethod: "COD" },
        { paymentMethod: "Stripe", paymentStatus: "Paid" },
      ],
    })
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log("Get All Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= Update Order Status =================

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Order Placed",
      "Order Confirmed",
      "Processing / Being Prepared",
      "Ready for Pickup",
      "Shipped / Dispatched",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];
    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.orderStatus = orderStatus;
    if (orderStatus === "Delivered" && order.paymentMethod === "COD") {
      order.paymentStatus = "Paid";
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.log("Update Order Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    return res
      .status(200)
      .json({ success: true, message: "Order deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
