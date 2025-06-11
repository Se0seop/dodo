import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart,
  MapPin,
  Phone
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state: cartState } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-dark border-b border-white/10">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-neon-green/20 to-neon-blue/20 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={14} className="text-neon-green" />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-neon-blue" />
              <span>ارسال رایگان بالای ۵۰۰ هزار تومان</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="text-neon-pink animate-pulse">
              ویژه نوروز ۱۴۰۳ - تخفیف ۲۰٪
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-blue rounded-xl flex items-center justify-center animate-pulse-neon">
                <span className="text-2xl font-bold text-white">ن</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-glow-green">نام‌آوران</h1>
                <p className="text-xs text-gray-400">فروشگاه لوازم ورزشی</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-white hover:text-neon-green transition-colors">
                خانه
              </Link>
              <Link to="/products" className="text-white hover:text-neon-blue transition-colors">
                محصولات
              </Link>
              <div className="relative group">
                <button className="text-white hover:text-neon-pink transition-colors">
                  دسته‌بندی‌ها
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 glass rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/products?category=fitness" className="block py-2 text-white hover:text-neon-green">
                    تجهیزات بدنسازی
                  </Link>
                  <Link to="/products?category=football" className="block py-2 text-white hover:text-neon-blue">
                    فوتبال
                  </Link>
                  <Link to="/products?category=running" className="block py-2 text-white hover:text-neon-pink">
                    دویدن
                  </Link>
                  <Link to="/products?category=supplements" className="block py-2 text-white hover:text-neon-green">
                    مکمل‌ها
                  </Link>
                </div>
              </div>
              <Link to="/about" className="text-white hover:text-neon-green transition-colors">
                درباره ما
              </Link>
              <Link to="/contact" className="text-white hover:text-neon-blue transition-colors">
                تماس
              </Link>
            </nav>

            {/* Search, Cart, Profile */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                <Search size={20} className="text-neon-blue" />
              </button>

              {/* Wishlist */}
              <button className="p-2 glass rounded-lg hover:bg-white/10 transition-colors relative">
                <Heart size={20} className="text-neon-pink" />
                <span className="absolute -top-1 -left-1 bg-neon-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 glass rounded-lg hover:bg-white/10 transition-colors relative"
              >
                <ShoppingCart size={20} className="text-neon-green" />
                {cartState.count > 0 && (
                  <span className="absolute -top-1 -left-1 bg-neon-green text-black text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartState.count}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
                    <User size={20} className="text-neon-blue" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 glass rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="text-sm text-gray-300 mb-2">سلام {user?.name}</div>
                    <Link to="/profile" className="block py-2 text-white hover:text-neon-green">
                      پروفایل
                    </Link>
                    <Link to="/orders" className="block py-2 text-white hover:text-neon-blue">
                      سفارشات
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="block py-2 text-white hover:text-neon-pink">
                        پنل مدیریت
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-right py-2 text-red-400 hover:text-red-300"
                    >
                      خروج
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-neon btn-neon-blue px-4 py-2 rounded-lg text-sm"
                >
                  ورود
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? (
                  <X size={20} className="text-neon-pink" />
                ) : (
                  <Menu size={20} className="text-neon-green" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو در محصولات..."
                  className="w-full glass rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                />
                <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden glass-dark border-t border-white/10"
        >
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/"
              className="block text-white hover:text-neon-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              خانه
            </Link>
            <Link
              to="/products"
              className="block text-white hover:text-neon-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              محصولات
            </Link>
            <Link
              to="/about"
              className="block text-white hover:text-neon-green transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              درباره ما
            </Link>
            <Link
              to="/contact"
              className="block text-white hover:text-neon-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              تماس
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="block btn-neon btn-neon-green px-4 py-2 rounded-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                ورود / ثبت نام
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}