import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست';
    }

    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'نام الزامی است';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'تکرار رمز عبور الزامی است';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیستند';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }

      if (success) {
        navigate('/');
      } else {
        setErrors({
          submit: isLogin ? 'ایمیل یا رمز عبور اشتباه است' : 'خطا در ثبت نام'
        });
      }
    } catch (error) {
      setErrors({
        submit: 'خطا در اتصال به سرور'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-blue rounded-xl flex items-center justify-center mx-auto mb-4">
                <User className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {isLogin ? 'ورود به حساب کاربری' : 'ثبت نام'}
              </h1>
              <p className="text-gray-400">
                {isLogin ? 'به نام‌آوران خوش آمدید' : 'عضو خانواده نام‌آوران شوید'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-white font-semibold mb-2">نام و نام خانوادگی</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full glass rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.name ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-neon-blue'
                      }`}
                      placeholder="نام خود را وارد کنید"
                    />
                    <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-white font-semibold mb-2">ایمیل</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full glass rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.email ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-neon-green'
                    }`}
                    placeholder="example@email.com"
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">رمز عبور</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full glass rounded-lg px-4 py-3 pr-12 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.password ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-neon-pink'
                    }`}
                    placeholder="رمز عبور خود را وارد کنید"
                  />
                  <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-white font-semibold mb-2">تکرار رمز عبور</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full glass rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.confirmPassword ? 'focus:ring-red-500 border border-red-500' : 'focus:ring-neon-blue'
                      }`}
                      placeholder="رمز عبور را مجدد وارد کنید"
                    />
                    <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {errors.submit && (
                <div className="glass-dark rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-neon btn-neon-green py-4 rounded-xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="loading-dots">در حال پردازش</span>
                ) : (
                  isLogin ? 'ورود' : 'ثبت نام'
                )}
              </button>
            </form>

            {/* Toggle */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                {isLogin ? 'حساب کاربری ندارید؟' : 'قبلاً ثبت نام کرده‌اید؟'}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                    setFormData({
                      email: '',
                      password: '',
                      name: '',
                      confirmPassword: ''
                    });
                  }}
                  className="text-neon-blue hover:text-white transition-colors mr-2"
                >
                  {isLogin ? 'ثبت نام کنید' : 'وارد شوید'}
                </button>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm text-center mb-3">حساب‌های نمونه:</p>
              <div className="space-y-2 text-xs">
                <div className="glass-dark rounded-lg p-2">
                  <p className="text-neon-green">مدیر: admin@namavaraan.com</p>
                  <p className="text-gray-400">رمز: admin123</p>
                </div>
                <div className="glass-dark rounded-lg p-2">
                  <p className="text-neon-blue">کاربر: user@test.com</p>
                  <p className="text-gray-400">رمز: user123</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}