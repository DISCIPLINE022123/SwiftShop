import User from "../models/User.model.js"; // 🔥 Sabse zaroori line ye hai
import Product from "../models/Product.model.js";
import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";

/* =====================================================
   VENDORS / STORES DISCOVERY
   ===================================================== */

export const getVendors = async (req, res) => {
  try {
    const { city, category, search } = req.query;
    
    // Filter: Role 'vendor' hona chahiye
    let query = { role: 'vendor' };

    // City Filter (Case-insensitive)
    if (city) {
      query.city = { $regex: new RegExp(city, 'i') };
    }

    // Category Filter
    if (category && category !== 'All') {
      query.businessCategory = { $regex: new RegExp(category, 'i') };
    }

    // Search by Store/User Name
    if (search) {
      query.username = { $regex: new RegExp(search, 'i') };
    }

    const vendors = await User.find(query)
      .select('-password') // Password security ke liye hide karein
      .sort({ createdAt: -1 });

    res.status(200).json(vendors);
  } catch (error) {
    console.error("GET_VENDORS_ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/* =====================================================
   PRODUCTS LOGIC
   ===================================================== */

export const getAllProducts = async (req, res) => {
  try {
    const { category, search, vendorId } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (vendorId) filter.vendorId = vendorId;
    if (search) filter.name = { $regex: search, $options: "i" };

    const products = await Product.find(filter)
      .populate("vendorId", "username email city")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendorId", "username email city");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.params.vendorId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ORDERS LOGIC
   ===================================================== */

export const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    // Stock check logic...
    const order = await Order.create({
      userId: req.user._id,
      items,
      shippingAddress,
      totalAmount,
      status: "pending"
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id, status: 'pending' },
      { status: 'cancelled' },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found or cannot be cancelled" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};