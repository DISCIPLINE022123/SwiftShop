import express from "express";
import {
  getAllProducts,
  getProductById,
  placeOrder,
  getMyOrders,
  cancelOrder,
  getVendorProducts,
  getVendors
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { isUser } from "../middleware/role.middleware.js";

const router = express.Router();

// 🟢 TEST ROUTE (VERIFY FIRST)
router.get("/test", (req, res) => {
  res.send("USER ROUTES WORKING");
});

// 🟢 GET ALL PRODUCTS (THIS FIXES YOUR ERROR)

// GET SINGLE PRODUCT
router.get("/product/:id", protect, getProductById);

// GET ALL PRODUCTS
router.get("/products", protect, getAllProducts);

// GET VENDOR PRODUCTS
router.get("/products/vendor/:vendorId", protect, getVendorProducts);


// Orders
router.post("/order", protect, isUser, placeOrder);
router.get("/orders", protect, isUser, getMyOrders);
router.put("/order/:id/cancel", protect, isUser, cancelOrder);
router.get('/vendors', getVendors);


export default router;
