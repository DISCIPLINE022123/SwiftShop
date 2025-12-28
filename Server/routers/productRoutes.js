import express from 'express';
const router = express.Router();
import { searchProducts } from '../Controllers/productController.js';


// Search route: /api/products/search?q=your-query
router.get('/search', searchProducts);


// 'image' wahi naam hai jo humne frontend FormData mein append kiya tha
export default router;
