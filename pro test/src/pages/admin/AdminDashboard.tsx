import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Tag,
  Layers
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAdmin } from '../../contexts/AdminContext';
import ProductForm from '../../components/admin/ProductForm';

// Dashboard Overview Component
function Dashboard() {
  const { dashboardStats } = useAdmin();

  const stats = [
    { 
      title: 'فروش امروز', 
      value: `${dashboardStats.totalSales.toLocaleString('fa-IR')} تومان`, 
      change: `+${dashboardStats.salesGrowth}%`, 
      icon: DollarSign, 
      color: 'text-neon-green' 
    },
    { 
      title: 'سفارشات جدید', 
      value: dashboardStats.totalOrders.toString(), 
      change: `+${dashboardStats.ordersGrowth}%`, 
      icon: ShoppingCart, 
      color: 'text-neon-blue' 
    },
    { 
      title: 'کاربران فعال', 
      value: dashboardStats.totalUsers.toString(), 
      change: '+۵%', 
      icon: Users, 
      color: 'text-neon-pink' 
    },
    { 
      title: 'محصولات', 
      value: dashboardStats.totalProducts.toString(), 
      change: '+۳%', 
      icon: Package, 
      color: 'text-neon-green' 
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 glass rounded-lg flex items-center justify-center`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-neon-green' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">فروش هفتگی</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 65, 45, 80, 55, 70, 85].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-neon-blue to-neon-green rounded-t transition-all duration-500 hover:from-neon-green hover:to-neon-pink"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-2">
                  {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">سفارشات اخیر</h3>
            <Link to="/admin/orders" className="text-neon-blue hover:text-white transition-colors text-sm">
              مشاهده همه
            </Link>
          </div>
          <div className="space-y-4">
            {dashboardStats.recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between glass-dark rounded-lg p-4">
                <div>
                  <h4 className="text-white font-semibold">#{order.id}</h4>
                  <p className="text-gray-400 text-sm">{order.customerName}</p>
                </div>
                <div className="text-left">
                  <p className="text-neon-green font-semibold">
                    {order.total.toLocaleString('fa-IR')} تومان
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-neon-green/20 text-neon-green' :
                    order.status === 'shipped' ? 'bg-neon-blue/20 text-neon-blue' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {order.status === 'delivered' ? 'تحویل شده' :
                     order.status === 'shipped' ? 'ارسال شده' :
                     order.status === 'processing' ? 'در حال پردازش' : 'در انتظار'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">محصولات پرفروش</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardStats.topProducts.map(product => (
            <div key={product.id} className="glass-dark rounded-lg p-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h4 className="text-white font-semibold mb-2">{product.name}</h4>
              <div className="flex justify-between items-center">
                <span className="text-neon-green font-bold">
                  {product.price.toLocaleString('fa-IR')} تومان
                </span>
                <span className="text-gray-400 text-sm">{product.reviews} فروش</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Products Management Component
function ProductsManagement() {
  const { products, categories, brands, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (productData) => {
    addProduct(productData);
    setShowForm(false);
  };

  const handleEditProduct = (productData) => {
    updateProduct(editingProduct.id, productData);
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleDeleteProduct = (id) => {
    if (confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      deleteProduct(id);
    }
  };

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={editingProduct ? handleEditProduct : handleAddProduct}
        onCancel={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
        categories={categories}
        brands={brands}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">مدیریت محصولات</h2>
          <p className="text-gray-400">مدیریت و ویرایش محصولات فروشگاه</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-neon btn-neon-green px-6 py-3 rounded-lg inline-flex items-center gap-2"
        >
          <Plus size={20} />
          افزودن محصول جدید
        </button>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="جستجو در محصولات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
            />
            <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="glass rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-green"
          >
            <option value="">همه دسته‌بندی‌ها</option>
            {categories.map(category => (
              <option key={category.id} value={category.slug}>{category.name}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <button className="btn-neon btn-neon-blue px-4 py-3 rounded-lg inline-flex items-center gap-2">
              <Download size={16} />
              خروجی Excel
            </button>
            <button className="btn-neon btn-neon-pink px-4 py-3 rounded-lg inline-flex items-center gap-2">
              <Upload size={16} />
              ورودی Excel
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-right p-4 text-white font-semibold">تصویر</th>
                <th className="text-right p-4 text-white font-semibold">نام محصول</th>
                <th className="text-right p-4 text-white font-semibold">دسته‌بندی</th>
                <th className="text-right p-4 text-white font-semibold">برند</th>
                <th className="text-right p-4 text-white font-semibold">قیمت</th>
                <th className="text-right p-4 text-white font-semibold">موجودی</th>
                <th className="text-right p-4 text-white font-semibold">وضعیت</th>
                <th className="text-right p-4 text-white font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <h4 className="text-white font-semibold">{product.name}</h4>
                      <p className="text-gray-400 text-sm">#{product.id}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">
                      {categories.find(c => c.slug === product.category)?.name || product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">{product.brand}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className="text-neon-green font-semibold">
                        {product.price.toLocaleString('fa-IR')} تومان
                      </span>
                      {product.originalPrice && (
                        <div className="text-gray-400 text-sm line-through">
                          {product.originalPrice.toLocaleString('fa-IR')}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.stockCount > 10 ? 'bg-neon-green/20 text-neon-green' :
                      product.stockCount > 5 ? 'bg-yellow-500/20 text-yellow-400' :
                      product.stockCount > 0 ? 'bg-orange-500/20 text-orange-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {product.stockCount} عدد
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.inStock ? 'bg-neon-green/20 text-neon-green' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {product.inStock ? 'موجود' : 'ناموجود'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingProduct(product);
                          setShowForm(true);
                        }}
                        className="p-2 glass rounded-lg hover:bg-neon-blue/20 transition-colors"
                      >
                        <Edit size={16} className="text-neon-blue" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 glass rounded-lg hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">محصولی یافت نشد</h3>
            <p className="text-gray-400">محصولی با این مشخصات وجود ندارد</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Categories Management Component
function CategoriesManagement() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    isActive: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      ...formData,
      productCount: editingCategory?.productCount || 0
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, categoryData);
    } else {
      addCategory(categoryData);
    }

    setShowForm(false);
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', image: '', isActive: true });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      isActive: category.isActive
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('آیا از حذف این دسته‌بندی اطمینان دارید؟')) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">مدیریت دسته‌بندی‌ها</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-neon btn-neon-green px-4 py-2 rounded-lg inline-flex items-center gap-2"
        >
          <Plus size={16} />
          افزودن دسته‌بندی
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6">
            {editingCategory ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی جدید'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">نام دسته‌بندی</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">نام انگلیسی (slug)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">توضیحات</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">تصویر (URL)</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-white">فعال</label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="btn-neon btn-neon-green px-6 py-2 rounded-lg"
              >
                {editingCategory ? 'بروزرسانی' : 'ذخیره'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCategory(null);
                  setFormData({ name: '', slug: '', description: '', image: '', isActive: true });
                }}
                className="btn-neon btn-neon-pink px-6 py-2 rounded-lg"
              >
                لغو
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{category.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  category.isActive ? 'bg-neon-green/20 text-neon-green' : 'bg-red-500/20 text-red-400'
                }`}>
                  {category.isActive ? 'فعال' : 'غیرفعال'}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{category.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-neon-blue">{category.productCount} محصول</span>
                <span className="text-gray-400 text-sm">/{category.slug}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 btn-neon btn-neon-blue py-2 rounded-lg text-sm"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 glass rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Orders Management Component
function OrdersManagement() {
  const { orders, updateOrderStatus } = useAdmin();
  const [filterStatus, setFilterStatus] = useState('');

  const filteredOrders = orders.filter(order => 
    !filterStatus || order.status === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-neon-green/20 text-neon-green';
      case 'shipped': return 'bg-neon-blue/20 text-neon-blue';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'در انتظار';
      case 'processing': return 'در حال پردازش';
      case 'shipped': return 'ارسال شده';
      case 'delivered': return 'تحویل شده';
      case 'cancelled': return 'لغو شده';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">مدیریت سفارشات</h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="glass rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
        >
          <option value="">همه سفارشات</option>
          <option value="pending">در انتظار</option>
          <option value="processing">در حال پردازش</option>
          <option value="shipped">ارسال شده</option>
          <option value="delivered">تحویل شده</option>
          <option value="cancelled">لغو شده</option>
        </select>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-right p-4 text-white font-semibold">شماره سفارش</th>
                <th className="text-right p-4 text-white font-semibold">مشتری</th>
                <th className="text-right p-4 text-white font-semibold">تاریخ</th>
                <th className="text-right p-4 text-white font-semibold">مبلغ</th>
                <th className="text-right p-4 text-white font-semibold">وضعیت</th>
                <th className="text-right p-4 text-white font-semibold">پرداخت</th>
                <th className="text-right p-4 text-white font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <span className="text-white font-semibold">#{order.id}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <h4 className="text-white font-semibold">{order.customerName}</h4>
                      <p className="text-gray-400 text-sm">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">{order.createdAt}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-neon-green font-semibold">
                      {order.total.toLocaleString('fa-IR')} تومان
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)} bg-transparent border-0 focus:outline-none`}
                    >
                      <option value="pending">در انتظار</option>
                      <option value="processing">در حال پردازش</option>
                      <option value="shipped">ارسال شده</option>
                      <option value="delivered">تحویل شده</option>
                      <option value="cancelled">لغو شده</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.paymentStatus === 'paid' ? 'bg-neon-green/20 text-neon-green' :
                      order.paymentStatus === 'failed' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.paymentStatus === 'paid' ? 'پرداخت شده' :
                       order.paymentStatus === 'failed' ? 'ناموفق' :
                       order.paymentStatus === 'refunded' ? 'بازگشت' : 'در انتظار'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 glass rounded-lg hover:bg-neon-blue/20 transition-colors">
                        <Eye size={16} className="text-neon-blue" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Users Management Component
function UsersManagement() {
  const { users, updateUserRole, toggleUserStatus } = useAdmin();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">مدیریت کاربران</h2>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-right p-4 text-white font-semibold">نام</th>
                <th className="text-right p-4 text-white font-semibold">ایمیل</th>
                <th className="text-right p-4 text-white font-semibold">تلفن</th>
                <th className="text-right p-4 text-white font-semibold">نقش</th>
                <th className="text-right p-4 text-white font-semibold">وضعیت</th>
                <th className="text-right p-4 text-white font-semibold">تاریخ عضویت</th>
                <th className="text-right p-4 text-white font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <span className="text-white font-semibold">{user.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">{user.email}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">{user.phone || '-'}</span>
                  </td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="glass rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue"
                    >
                      <option value="user">کاربر</option>
                      <option value="manager">مدیر</option>
                      <option value="admin">ادمین</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isActive ? 'bg-neon-green/20 text-neon-green' : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {user.isActive ? 'فعال' : 'غیرفعال'}
                    </button>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">{user.createdAt}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 glass rounded-lg hover:bg-neon-blue/20 transition-colors">
                        <Eye size={16} className="text-neon-blue" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">دسترسی غیرمجاز</h2>
          <p className="text-gray-400">شما مجوز دسترسی به پنل مدیریت را ندارید</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: BarChart3 },
    { id: 'products', label: 'محصولات', icon: Package },
    { id: 'categories', label: 'دسته‌بندی‌ها', icon: Layers },
    { id: 'orders', label: 'سفارشات', icon: ShoppingCart },
    { id: 'users', label: 'کاربران', icon: Users },
    { id: 'analytics', label: 'آمار', icon: TrendingUp },
    { id: 'settings', label: 'تنظیمات', icon: Settings }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-glow-blue mb-4">پنل مدیریت</h1>
          <p className="text-gray-400">مدیریت فروشگاه نام‌آوران</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <nav className="space-y-2">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${
                      activeTab === item.id
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-4">
            <div className="glass rounded-xl p-8">
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'products' && <ProductsManagement />}
              {activeTab === 'categories' && <CategoriesManagement />}
              {activeTab === 'orders' && <OrdersManagement />}
              {activeTab === 'users' && <UsersManagement />}
              {activeTab === 'analytics' && (
                <div className="text-center py-20">
                  <TrendingUp size={64} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl text-white mb-4">آمار و گزارشات</h3>
                  <p className="text-gray-400">این بخش در حال توسعه است</p>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="text-center py-20">
                  <Settings size={64} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl text-white mb-4">تنظیمات سیستم</h3>
                  <p className="text-gray-400">این بخش در حال توسعه است</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}