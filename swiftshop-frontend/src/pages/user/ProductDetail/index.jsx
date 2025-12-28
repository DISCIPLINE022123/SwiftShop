import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../../../services/api';
import Navbar from '../../../components/Navbar';
import Loader from '../../../components/Loader';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import VendorCard from './VendorCard';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [vendorProducts, setVendorProducts] = useState([]); // 🔥 Added this to fix your error
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // 1. Get Main Product
        const response = await userAPI.getProductById(id);
        const productData = response.data;
        setProduct(productData);

        // 2. Get Other Products from same Vendor
        if (productData?.vendorId?._id) {
          const relatedRes = await userAPI.getProducts({ vendorId: productData.vendorId._id });
          // Current product ko hata kar baaki dikhao
          setVendorProducts(relatedRes.data.filter(p => p._id !== id));
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
  if (!product) return <div className="text-center py-20 font-bold">Product Not Found</div>;

  // 🔥 Safe Images Array Logic
  const images = product.images && product.images.length > 0 
                 ? product.images 
                 : (product.image ? [product.image] : ["https://via.placeholder.com/600x800?text=No+Image"]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      // src/pages/user/ProductDetail/index.jsx
<main className="container mx-auto px-4 py-10 max-w-5xl">
  <div className="grid lg:grid-cols-12 gap-6 items-start">
    {/* LEFT GALLERY */}
    <div className="lg:col-span-7">
      <ImageGallery images={images} />
    </div>

    {/* RIGHT INFO */}
    <div className="lg:col-span-5 border-l border-gray-50 md:pl-6">
      <ProductInfo product={product} />
      <div className="mt-8">
        <VendorCard vendor={product.vendorId} />
      </div>
    </div>
  </div>
</main>
    </div>
  );
};

export default ProductDetail;
// src/pages/user/ProductDetail/index.jsx mein return part:
