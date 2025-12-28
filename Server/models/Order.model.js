import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: { 
            type: Number, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'Packed', 'delivered', 'cancelled', 'Out for delivery'],
        default: 'pending'
    },
}, { timestamps: true }); // ✅ Fixed: was 'timestamp' now 'timestamps'

// Add indexes for better query performance
orderSchema.index({ userId: 1 });
orderSchema.index({ vendorId: 1 });
orderSchema.index({ status: 1 });

// Prevent OverwriteModelError
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;