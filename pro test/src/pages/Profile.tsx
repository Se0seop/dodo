import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X,
  Package,
  Heart,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, updateProfile, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'پروفایل', icon: User },
    { id: 'orders', label: 'سفارشات', icon: Package },
    { id: 'wishlist', label: 'علاقه‌مندی‌ها', icon: Heart },
    { id: 'settings', label: 'تنظیمات', icon: Settings }
  ];

  // Mock orders data
  const orders = [
    {
      id: '1001',
      date: '۱۴۰۳/۰۲/۱۵',
      status: 'تحویل شده',
      total: 2500000,
      items: 3
    },
    {
      id: '1002',
      date: '۱۴۰۳/۰۲/۱۰',
      status: 'در حال ارسال',
      total: 1800000,
      items: 2
    }
  ];

  // Mock wishlist data
  const wishlist = [
    {
      id: '1',
      name: 'دمبل قابل تنظیم ۲۰ کیلو',
      price: 2500000,
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg'
    },
    {
      id: '2',
      name: 'تردمیل خانگی حرفه‌ای',
      price: 15000000,
      image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">دسترسی غیرمجاز</h2>
          <p className="text-gray-400">لطفاً ابتدا وارد حساب کاربری خود شوید</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-glow-blue mb-4">پروفایل کاربری</h1>
          <p className="text-gray-400">مدیریت اطلاعات و سفارشات شما</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <p className="text-gray-400 text-sm">{user.email}</p>
                {user.role === 'admin' && (
                  <span className="inline-block bg-neon-pink/20 text-neon-pink px-3 py-1 rounded-full text-xs font-semibold mt-2">
                    مدیر
                  </span>
                )}
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${
                      activeTab === tab.id
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
                
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors text-right"
                >
                  <LogOut size={20} />
                  خروج از حساب
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="glass rounded-xl p-8">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">اطلاعات شخصی</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-neon btn-neon-green px-4 py-2 rounded-lg inline-flex items-center gap-2"
                      >
                        <Edit3 size={16} />
                        ویرایش
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="btn-neon btn-neon-green px-4 py-2 rounded-lg inline-flex items-center gap-2"
                        >
                          <Save size={16} />
                          ذخیره
                        </button>
                        <button
                          onClick={handleCancel}
                          className="btn-neon btn-neon-pink px-4 py-2 rounded-lg inline-flex items-center gap-2"
                        >
                          <X size={16} />
                          لغو
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">نام و نام خانوادگی</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        />
                      ) : (
                        <div className="glass-dark rounded-lg px-4 py-3 text-gray-300">
                          {user.name || 'وارد نشده'}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">ایمیل</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                        />
                      ) : (
                        <div className="glass-dark rounded-lg px-4 py-3 text-gray-300">
                          {user.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">شماره تماس</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                        />
                      ) : (
                        <div className="glass-dark rounded-lg px-4 py-3 text-gray-300">
                          {user.phone || 'وارد نشده'}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white font-semibold mb-2">آدرس</label>
                      {isEditing ? (
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue resize-none"
                        />
                      ) : (
                        <div className="glass-dark rounded-lg px-4 py-3 text-gray-300">
                          {user.address || 'وارد نشده'}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-8">سفارشات من</h2>
                  
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="glass-dark rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">سفارش #{order.id}</h3>
                            <p className="text-gray-400 text-sm">{order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'تحویل شده' 
                              ? 'bg-neon-green/20 text-neon-green'
                              : 'bg-neon-blue/20 text-neon-blue'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-300">{order.items} محصول</p>
                            <p className="text-neon-green font-semibold">
                              {order.total.toLocaleString('fa-IR')} تومان
                            </p>
                          </div>
                          <button className="btn-neon btn-neon-blue px-4 py-2 rounded-lg text-sm">
                            جزئیات
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-8">علاقه‌مندی‌ها</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.map(item => (
                      <div key={item.id} className="glass-dark rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                          <p className="text-neon-green font-bold mb-4">
                            {item.price.toLocaleString('fa-IR')} تومان
                          </p>
                          <div className="flex gap-2">
                            <button className="flex-1 btn-neon btn-neon-green py-2 rounded-lg text-sm">
                              افزودن به سبد
                            </button>
                            <button className="p-2 glass rounded-lg hover:bg-red-500/20 transition-colors">
                              <X size={16} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-8">تنظیمات</h2>
                  
                  <div className="space-y-6">
                    <div className="glass-dark rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">اعلان‌ها</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-300">اعلان‌های ایمیل</span>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-300">اعلان‌های پیامکی</span>
                          <input type="checkbox" className="toggle" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-300">اعلان‌های تخفیف</span>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </label>
                      </div>
                    </div>

                    <div className="glass-dark rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">حریم خصوصی</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-300">نمایش پروفایل عمومی</span>
                          <input type="checkbox" className="toggle" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-300">اشتراک‌گذاری فعالیت‌ها</span>
                          <input type="checkbox" className="toggle" />
                        </label>
                      </div>
                    </div>

                    <div className="glass-dark rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">امنیت</h3>
                      <div className="space-y-4">
                        <button className="btn-neon btn-neon-blue px-4 py-2 rounded-lg">
                          تغییر رمز عبور
                        </button>
                        <button className="btn-neon btn-neon-green px-4 py-2 rounded-lg">
                          فعال‌سازی احراز هویت دو مرحله‌ای
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}