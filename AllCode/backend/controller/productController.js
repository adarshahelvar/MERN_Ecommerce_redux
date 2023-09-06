const Product = require("../models/productModel");
const ErrorHandler = require("../util/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create Product -- admin route
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all product
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// Get single product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    // return res.status(500).json({
    //   success: false,
    //   message: "product not found",
    // });
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

// Update product --admin route

exports.updateProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
});

// Delete product --admin routes
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    // return res.status(500).json({
    //   success: false,
    //   message: "product not found",
    // });
    return next(new ErrorHandler("product not found", 404));
  }

  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "product deleted successfully" });
});
