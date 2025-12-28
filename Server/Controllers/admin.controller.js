import User from '../models/User.model.js';
import Order from '../models/Order.model.js';
import Product from '../models/Product.model.js';
import bcrypt from 'bcryptjs';

/**
 * GET PLATFORM STATS
 */
export const getAdminStats = async (req, res) => {
    try {
        const totalVendors = await User.countDocuments({ role: 'vendor' });
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalProducts = await Product.countDocuments();
        
        const sales = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" }, count: { $sum: 1 } } }
        ]);

        const revenue = sales[0]?.total || 0;
        const totalOrders = sales[0]?.count || 0;

        res.json({
            revenue,
            totalVendors,
            totalProducts,
            totalOrders,
            totalUsers,
            commission: (revenue * 0.10).toFixed(2) 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};

/**
 * CREATE VENDOR ✅ Updated with City & Category
 */
export const createVendor = async (req, res) => {
    try {
        // Frontend se aane waali saari fields yahan destructure karein
        const { name, email, password, shopName, phone, city, businessCategory, address } = req.body;
        
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const vendor = await User.create({
            username: name,
            email,
            password: hashedPassword,
            role: 'vendor',
            shopName,
            phone,
            city: city || 'Jabalpur', // Default agar city na aaye
            businessCategory: businessCategory || 'Clothing', // Default category
            address,
            isApproved: true, 
            createdBy: req.user._id
        });

        res.status(201).json(vendor);
    } catch (error) {
        res.status(500).json({ message: 'Error creating vendor', error: error.message });
    }
};

/**
 * GET ALL VENDORS
 */
export const getAllVendors = async (req, res) => {
    try {
        const vendors = await User.find({ role: 'vendor' })
            .select('-password')
            .sort({ createdAt: -1 });
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vendors' });
    }
};

/**
 * UPDATE VENDOR
 */
export const updateVendor = async (req, res) => {
    try {
        const vendor = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Isme city/category update ho jayenge
            { new: true }
        ).select('-password');

        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.json(vendor);
    } catch (error) {
        res.status(500).json({ message: 'Error updating vendor' });
    }
};

/**
 * DELETE VENDOR
 */
export const deleteVendor = async (req, res) => {
    try {
        const vendor = await User.findByIdAndDelete(req.params.id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        res.json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vendor' });
    }
};