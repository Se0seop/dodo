import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Share2,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  Award
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAdmin } from '../contexts/AdminContext';

const reviews = [
  {
    id: 1,
    name: 'احمد رضایی',
    rating: 5,
    date: '۱۴۰۳/۰۲/۱۵',
    comment: 'کیفیت فوق‌العاده‌ای داره. به شدت راضی‌ام از خریدم.'
  },
  {
    id: 2,
    name: 'فاطمه احمدی',
    rating: 4,
    date: '۱۴۰۳/۰۲/۱۰',
    comment: 'خوب بود اما قیمت کمی بالا. ولی کیفیتش عالیه.'
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const { products } = useAdmin();
  
  // Find the product by ID
  const product = products.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [activeTab, setActiveTab] = useState('description');

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">محصول یافت نشد</h2>
            <p className="text-gray-400 mb-8">محصول مورد نظر شما وجود ندارد یا حذف شده است</p>
            <Link to="/products" className="btn-neon btn-neon-blue px-6 py-3 rounded-lg">
              بازگشت به محصولات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
        color: selectedColor,
        size: selectedSize
      }
    });
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-neon-blue transition-colors">خانه</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-neon-blue transition-colors">محصولات</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-6"
            >
              <div className="mb-6">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-neon-blue' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.badge && (
                    <span className="bg-gradient-to-r from-neon-green to-neon-blue text-black px-3 py-1 rounded-full text-sm font-bold">
                      {product.badge}
                    </span>
                  )}
                  <span className="text-gray-400">#{product.id}</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                <p className="text-gray-400">برند: {product.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className={index < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}
                    />
                  ))}
                  <span className="text-white font-semibold mr-2">{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviews} نظر)</span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-neon-green">
                    {product.price.toLocaleString('fa-IR')} تومان
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      {product.originalPrice.toLocaleString('fa-IR')}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-neon-pink">
                    شما {((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}٪ صرفه‌جویی کردید
                  </div>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-neon-green' : 'bg-red-500'}`}></div>
                <span className={product.inStock ? 'text-neon-green' : 'text-red-400'}>
                  {product.inStock ? `موجود (${product.stockCount} عدد)` : 'ناموجود'}
                </span>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3">رنگ:</h3>
                  <div className="flex gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedColor === color
                            ? 'border-neon-blue bg-neon-blue/20 text-neon-blue'
                            : 'border-gray-600 text-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3">سایز:</h3>
                  <div className="flex gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedSize === size
                            ? 'border-neon-pink bg-neon-pink/20 text-neon-pink'
                            : 'border-gray-600 text-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-white font-semibold mb-3">تعداد:</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center glass rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-white/10 transition-colors"
                    >
                      <Minus size={16} className="text-neon-blue" />
                    </button>
                    <span className="px-4 py-3 text-white font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-white/10 transition-colors"
                    >
                      <Plus size={16} className="text-neon-green" />
                    </button>
                  </div>
                  <span className="text-gray-400">از {product.stockCount} عدد</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="flex-1 btn-neon btn-neon-green py-4 rounded-xl text-lg inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  افزودن به سبد خرید
                </button>
                <button className="p-4 glass rounded-xl hover:bg-white/10 transition-colors">
                  <Heart size={20} className="text-neon-pink" />
                </button>
                <button className="p-4 glass rounded-xl hover:bg-white/10 transition-colors">
                  <Share2 size={20} className="text-neon-blue" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Truck className="text-neon-green" size={20} />
                  <span className="text-sm text-gray-300">ارسال رایگان</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="text-neon-blue" size={20} />
                  <span className="text-sm text-gray-300">پرداخت امن</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="text-neon-pink" size={20} />
                  <span className="text-sm text-gray-300">۷ روز ضمانت</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-neon-green" size={20} />
                  <span className="text-sm text-gray-300">اصالت کالا</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="glass rounded-2xl p-8 mb-16">
          <div className="flex border-b border-white/10 mb-8">
            {[
              { id: 'description', label: 'توضیحات' },
              { id: 'features', label: 'ویژگی‌ها' },
              { id: 'specifications', label: 'مشخصات' },
              { id: 'reviews', label: 'نظرات' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-neon-blue border-b-2 border-neon-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-gray-300 leading-relaxed">
            {activeTab === 'description' && (
              <div>
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'features' && (
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">{key}:</span>
                    <span className="text-white font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="glass rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{review.name[0]}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                size={14}
                                className={index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-glow-green mb-8">محصولات مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="glass rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{relatedProduct.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-neon-green">
                        {relatedProduct.price.toLocaleString('fa-IR')} تومان
                      </span>
                      <Link
                        to={`/product/${relatedProduct.id}`}
                        className="btn-neon btn-neon-blue px-4 py-2 rounded-lg text-sm"
                      >
                        مشاهده
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}