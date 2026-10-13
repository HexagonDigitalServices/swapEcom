
// ======================= Get All Products =======================

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================= Get Current Admin Products =======================

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    return res
      .status(200)
      .json({ success: true, count: products.length, products });
  } catch (error) {
    console.log("Get My Products Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
// ======================= Get Single Product =======================

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("Get Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================= Update Product =======================

export const updateProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    const retainedIds = new Set(
      (req.body.variants || []).flatMap((variant) =>
        (variant.images || []).map((image) => image.publicId).filter(Boolean),
      ),
    );
    for (const variant of existingProduct.variants) {
      for (const image of variant.images || []) {
        if (image.publicId && !retainedIds.has(image.publicId)) {
          await cloudinary.uploader.destroy(image.publicId);
        }
      }
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.log("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================= Delete Product =======================

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Delete all images from Cloudinary
    for (const variant of product.variants) {
      for (const image of variant.images) {
        if (image.publicId) {
          await cloudinary.uploader.destroy(image.publicId);
        }
      }
    }

    // Delete product from MongoDB
    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.log("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================= Category Products =======================

export const getCategoryProducts = async (req, res) => {
  try {
    const { category } = req.params;
    const { gender } = req.query;

    const filter = { category };

    if (gender) {
      filter.gender = gender;
    }

    const products = await Product.find(filter);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================= SubCategory Products =======================

export const getSubCategoryProducts = async (req, res) => {
  try {
    const { category, subCategory } = req.params;
    const { gender } = req.query;

    const filter = { category };
    if (gender) filter.gender = gender;
    const normalizeSubCategory = (value) => {
      const normalizedValue = String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .replace(/s$/, "");
      const aliases = {
        belts: "belt",
        cottonsocks: "sock",
        caps: "cap",
        eaudeparfum: "perfume",
        chain: "necklace",
        chains: "necklace",
        chainnecklace: "necklace",
        necklaces: "necklace",
        sunglasses: "goggles",
        ties: "tieset",
        tiesandscarves: "tieset",
      };
      return aliases[normalizedValue] || normalizedValue;
    };
    const normalized = normalizeSubCategory(subCategory);
    const products = (await Product.find(filter)).filter(
      (product) => normalizeSubCategory(product.subCategory) === normalized,
    );

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
