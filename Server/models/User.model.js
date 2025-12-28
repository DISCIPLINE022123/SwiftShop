import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'vendor'], default: 'user' },
    
    // Vendor Specific Fields (Important for Discovery Page)
    city: { type: String, default: 'Jabalpur' }, // 👈 Added for City Selector
    businessCategory: { type: String, default: 'Clothing' }, // 👈 Added for Category Filter (Electronics, Cloth, etc.)
    
    // UI/Profile Fields
    profileImage: { type: String, default: '' },
    backgroundImage: { type: String, default: '' },
    description: { type: String, default: '' },
    phone: { type: String, default: '' },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Indexing for faster search
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ city: 1 }); // 👈 Performance boost for city filter

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;