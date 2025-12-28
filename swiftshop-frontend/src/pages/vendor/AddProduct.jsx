import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import { vendorAPI } from '../../services/api';
import { X, Plus } from 'lucide-react'; // Icons for better UI

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
  });
  
  // 🔥 Multiple images ke liye arrays
  const [imageFiles, setImageFiles] = useState([]); 
  const [previews, setPreviews] = useState([]); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Handle Multiple File Selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Limit to 5 images
    if (imageFiles.length + selectedFiles.length > 5) {
      return setError("You can only upload up to 5 images");
    }

    const newFiles = [...imageFiles, ...selectedFiles];
    setImageFiles(newFiles);

    // Create preview URLs
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
    setError('');
  };

  // 🔥 Remove image from selection
  const removeImage = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (imageFiles.length === 0) return setError("Please upload at least one image");
    
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('stock', formData.stock);
      data.append('description', formData.description);
      
      // 🔥 Multiple files append kar rahe hain 'images' field name se
      imageFiles.forEach((file) => {
        data.append('images', file); 
      });

      await vendorAPI.createProduct(data);
      
      alert('Product added successfully');
      navigate('/vendor/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="vendor" />

      <div className="flex-1 p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-display font-bold mb-8 italic text-gray-800">Add New Product</h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 border-l-4 border-red-500 font-bold">
              {error}
            </div>
          )}

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 🔥 Multiple Image Upload & Preview Section */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-4">
                  Product Images (Max 5) *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {/* Preview Thumbnails */}
                  {previews.map((url, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img src={url} alt="Preview" className="w-full h-full object-cover rounded-xl border border-gray-200" />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  {/* Upload Button Block */}
                  {imageFiles.length < 5 && (
                    <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl hover:border-[#D4AF37] hover:bg-yellow-50/30 cursor-pointer transition-all">
                      <Plus className="text-gray-400 mb-1" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Add Image</span>
                      <input type="file" className="hidden" accept="image/*" multiple onChange={handleFileChange} />
                    </label>
                  )}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Product Name */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Premium Silk Saree" required />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Price (₹) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="0.00" required />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Stock *</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="0" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" required>
                  <option value="">Select category</option>
                  <option value="fashion">Fashion</option>
                  <option value="electronics">Electronics</option>
                  <option value="home">Home & Living</option>
                  <option value="beauty">Beauty</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" rows="3" placeholder="Describe your product..."></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gray-900 text-white font-black py-4 uppercase tracking-[0.2em] rounded-lg hover:bg-[#D4AF37] transition-all disabled:opacity-50"
                >
                  {loading ? 'Uploading Product...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;