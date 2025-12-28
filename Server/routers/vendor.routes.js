import express from 'express';
import {
    addProduct,
    getMyProducts,
    updateProduct,
    deleteProduct,
    getVendorOrders,
    updateOrderStatus,
    // --- ADDED NEW CONTROLLER IMPORTS ---
    getVendorProfile,
    updateVendorProfile,
    
} from '../Controllers/vendor.controller.js';
import upload from '../config/cloudinary.js';
import { protect } from '../middleware/auth.middleware.js';
import { isVendor } from '../middleware/role.middleware.js';

const router = express.Router();

/* ================= VENDOR PROFILE & BRANDING ================= */
// Use these for the Profile Image and Background Banner updates
router.get('/profile', protect, isVendor, getVendorProfile);
router.put('/profile', protect, isVendor, updateVendorProfile);

/* ================= PRODUCTS ================= */
// Aise hona chahiye aapka route
router.post('/product', protect, isVendor, upload.array('images', 5), addProduct);
router.get('/products', protect, isVendor, getMyProducts);
router.put('/product/:id', protect, isVendor, updateProduct);
router.delete('/product/:id', protect, isVendor, deleteProduct);

/* ================= ORDERS ================= */
router.get('/orders', protect, isVendor, getVendorOrders);
router.put('/order/:id/status', protect, isVendor, updateOrderStatus);

export default router;