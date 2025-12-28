import express from 'express';
import {
    getAdminStats,
    createVendor,
    getAllVendors,
    updateVendor,
    deleteVendor
} from '../Controllers/admin.controller.js';

import { protect } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

// Stats Route (For Dashboard Charts & Cards)
router.get('/stats', protect, isAdmin, getAdminStats);

// Vendor Management
router.get('/vendors', protect, isAdmin, getAllVendors);
router.post('/vendor', protect, isAdmin, createVendor);
router.put('/vendor/:id', protect, isAdmin, updateVendor);
router.delete('/vendor/:id', protect, isAdmin, deleteVendor);

export default router;