import Product from '../models/Product.model.js';

export const searchProducts = async (req, res) => {
  try {
    const { q, category } = req.query;
    
    // Construct Search Object
    let queryObject = {};

    // 1. Text Search (Matches Name or Description)
    if (q) {
      queryObject.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } }
      ];
    }

    // 2. Category Filter
    if (category && category !== '') {
      queryObject.category = { $regex: category, $options: 'i' };
    }

    const products = await Product.find(queryObject).sort({ createdAt: -1 });
    
    res.status(200).json(products);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json([]);
  }
};