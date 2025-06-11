import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Search, 
  Star, 
  Heart, 
  ShoppingCart,
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAdmin } from '../contexts/AdminContext';

export default function Products() {
  const { products, categories, brands } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('همه');
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { dispatch } = useCart();

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'همه' || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default: // popular
        return b.reviews - a.reviews;
    }
  });

  const addToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1
      }
    });
  };

  // Create category options including "all"
  const categoryOptions = [
    { id: 'all', name: 'همه', slug: 'all', count: products.length },
    ...categories.map(cat => ({
      ...cat,
      count: products.filter(p => p.category === cat.slug).length
    }))
  ];

  // Create brand options
  const brandOptions = ['همه', ...Array.from(new Set(products.map(p => p.brand)))];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-glow-blue mb-4">محصولات</h1>
          <p className="text-gray-400">بهترین تجهیزات ورزشی را از ما بخرید</p>
        </div>

        {/* Search and Controls */}
        <div className="glass rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="جستجو در محصولات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
              />
              <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-green"
              >
                <option value="popular">محبوب‌ترین</option>
                <option value="price-low">ارزان‌ترین</option>
                <option value="price-high">گران‌ترین</option>
                <option value="rating">بهترین امتیاز</option>
                <option value="name">نام</option>
              </select>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-neon-blue/20 text-neon-blue' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-neon-blue/20 text-neon-blue' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn-neon btn-neon-green px-4 py-2 rounded-lg inline-flex items-center gap-2"
              >
                <SlidersHorizontal size={20} />
                فیلترها
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="glass rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Filter size={20} className="text-neon-green" />
                فیلترها
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4">دسته‌بندی</h4>
                <div className="space-y-2">
                  {categoryOptions.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`w-full text-right p-3 rounded-lg transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                          : 'hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm opacity-70">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4">برند</h4>
                <div className="space-y-2">
                  {brandOptions.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`w-full text-right p-2 rounded-lg transition-colors ${
                        selectedBrand === brand
                          ? 'bg-neon-pink/20 text-neon-pink'
                          : 'hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">محدوده قیمت</h4>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="از"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full glass rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                    />
                    <input
                      type="number"
                      placeholder="تا"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 20000000])}
                      className="w-full glass rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                    />
                  </div>
                  <div className="text-sm text-gray-400">
                    {priceRange[0].toLocaleString('fa-IR')} - {priceRange[1].toLocaleString('fa-IR')} تومان
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-400">
                {sortedProducts.length} محصول یافت شد
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="glass rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.badge && (
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              product.badge === 'ناموجود' 
                                ? 'bg-red-500/80 text-white'
                                : 'bg-gradient-to-r from-neon-green to-neon-blue text-black'
                            }`}>
                              {product.badge}
                            </span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <button className="p-2 glass rounded-full hover:bg-white/20 transition-colors">
                            <Heart size={16} className="text-neon-pink" />
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">{product.brand}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-300">{product.rating}</span>
                          </div>
                          <span className="text-sm text-gray-400">({product.reviews} نظر)</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-bold text-neon-green">
                            {product.price.toLocaleString('fa-IR')} تومان
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {product.originalPrice.toLocaleString('fa-IR')}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Link
                            to={`/product/${product.id}`}
                            className="flex-1 btn-neon btn-neon-blue py-2 rounded-lg text-center text-sm"
                          >
                            جزئیات
                          </Link>
                          <button
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                            className={`p-2 rounded-lg transition-colors ${
                              product.inStock
                                ? 'btn-neon btn-neon-green'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <ShoppingCart size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex gap-6">
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                          {product.badge && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              product.badge === 'ناموجود' 
                                ? 'bg-red-500/80 text-white'
                                : 'bg-gradient-to-r from-neon-green to-neon-blue text-black'
                            }`}>
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 mb-3">{product.brand}</p>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-300">{product.rating}</span>
                            <span className="text-sm text-gray-400">({product.reviews} نظر)</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-neon-green">
                              {product.price.toLocaleString('fa-IR')} تومان
                            </span>
                            {product.originalPrice && (
                              <span className="text-gray-400 line-through">
                                {product.originalPrice.toLocaleString('fa-IR')}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 glass rounded-lg hover:bg-white/20 transition-colors">
                              <Heart size={16} className="text-neon-pink" />
                            </button>
                            <button
                              onClick={() => addToCart(product)}
                              disabled={!product.inStock}
                              className={`px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 ${
                                product.inStock
                                  ? 'btn-neon btn-neon-green'
                                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <ShoppingCart size={16} />
                              افزودن به سبد
                            </button>
                            <Link
                              to={`/product/${product.id}`}
                              className="btn-neon btn-neon-blue px-4 py-2 rounded-lg"
                            >
                              جزئیات
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {sortedProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">محصولی با این مشخصات یافت نشد</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}