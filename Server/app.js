import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRoutes from './routers/auth.routes.js';
import adminRoutes from './routers/admin.routes.js';
import vendorRoutes from './routers/vendor.routes.js';
import userRoutes from './routers/user.routes.js';
import cartRoutes from './routers/cart.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import productRoutes from './routers/productRoutes.js';
import cors from 'cors';

dotenv.config();
connectDb();

const app = express();


// Middleware
app.use(express.json()); // Body parser
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const PORT = process.env.PORT || 5000;

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);

// Error Handler (must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);