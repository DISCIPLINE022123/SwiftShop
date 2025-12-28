import Product from '../models/Product.model.js';
import Order from '../models/Order.model.js';
import User from '../models/User.model.js';
/* ================= PRODUCTS ================= */

/**
 * ADD PRODUCT
 *//**
 * ADD PRODUCT (With Image Support)
 */export const addProduct = async (req, res) => {
  try {
    // req.files mein saari images ka array milega
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Saari images ke paths (URLs) nikal kar array banayein
    const imageUrls = req.files.map(file => file.path);

    const { name, description, price, stock, category } = req.body;

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      images: imageUrls, // 🔥 Store the array of URLs
      image: imageUrls[0], // Backward compatibility ke liye pehli image
      vendorId: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * GET MY PRODUCTS
 */
export const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({ vendorId: req.user._id }); // ✅ Fixed: changed 'vendor' to 'vendorId'
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, vendorId: req.user._id },
            req.body,
            { new: true }
        );
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id,
            vendorId: req.user._id  // ✅ Fixed: changed req.user.id to req.user._id
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/* ================= ORDERS ================= */

/**
 * GET VENDOR ORDERS
 */
export const getVendorOrders = async (req, res) => {
    try {
        const orders = await Order.find({ vendorId: req.user._id }) // ✅ Fixed: changed req.user.id to req.user._id
            .populate('userId', 'username email')
            .populate('items.productId', 'name price');

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * UPDATE ORDER STATUS
 */
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, vendorId: req.user._id }, // ✅ Fixed: changed req.user.id to req.user._id
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// controllers/vendor.controller.js

export const getVendorProfile = async (req, res) => {
    try {
        // Check if req.user exists from middleware
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Not authorized, user data missing" });
        }

        const vendor = await User.findById(req.user._id).select('-password');
        
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found in database" });
        }

        res.status(200).json(vendor);
    } catch (error) {
        console.error("GET PROFILE ERROR:", error); // This shows in your terminal
        res.status(500).json({ message: error.message });
    }
};

export const updateVendorProfile = async (req, res) => {
    try {
        // Log the incoming data to see if it's reaching the backend
        console.log("DATA FROM FRONTEND:", req.body);

        const { username, profileImage, backgroundImage, description, phone } = req.body;

        // Use findByIdAndUpdate with { new: true } to return the changed document
        const updatedVendor = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    username,
                    profileImage,
                    backgroundImage,
                    description,
                    phone
                }
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        console.log("DATA SAVED TO DB:", updatedVendor);
        res.status(200).json(updatedVendor);
    } catch (error) {
        console.error("BACKEND UPDATE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};


