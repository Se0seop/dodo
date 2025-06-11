import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  Truck,
  CreditCard,
  Clock
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-dark border-t border-white/10 mt-20">
      {/* Trust badges */}
      <div className="py-8 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 glass rounded-lg p-4">
              <Shield className="text-neon-green" size={24} />
              <div>
                <h4 className="text-white font-semibold text-sm">پرداخت امن</h4>
                <p className="text-gray-400 text-xs">۱۰۰٪ تضمین امنیت</p>
              </div>
            </div>
            <div className="flex items-center gap-3 glass rounded-lg p-4">
              <Truck className="text-neon-blue" size={24} />
              <div>
                <h4 className="text-white font-semibold text-sm">ارسال رایگان</h4>
                <p className="text-gray-400 text-xs">بالای ۵۰۰ هزار تومان</p>
              </div>
            </div>
            <div className="flex items-center gap-3 glass rounded-lg p-4">
              <CreditCard className="text-neon-pink" size={24} />
              <div>
                <h4 className="text-white font-semibold text-sm">پرداخت آسان</h4>
                <p className="text-gray-400 text-xs">تمام کارت‌ها</p>
              </div>
            </div>
            <div className="flex items-center gap-3 glass rounded-lg p-4">
              <Clock className="text-neon-green" size={24} />
              <div>
                <h4 className="text-white font-semibold text-sm">پشتیبانی ۲۴/۷</h4>
                <p className="text-gray-400 text-xs">همیشه در خدمت شما</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-white">ن</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-glow-green">نام‌آوران</h3>
                  <p className="text-xs text-gray-400">فروشگاه لوازم ورزشی</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                نام‌آوران بزرگ‌ترین فروشگاه آنلاین لوازم ورزشی ایران با بیش از ۱۰ سال تجربه و هزاران مشتری راضی.
              </p>
              <div className="flex gap-3">
                <a href="#" className="p-2 glass rounded-lg hover:bg-neon-green/20 transition-colors">
                  <Instagram size={20} className="text-neon-pink" />
                </a>
                <a href="#" className="p-2 glass rounded-lg hover:bg-neon-blue/20 transition-colors">
                  <Twitter size={20} className="text-neon-blue" />
                </a>
                <a href="#" className="p-2 glass rounded-lg hover:bg-neon-green/20 transition-colors">
                  <Facebook size={20} className="text-neon-green" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 text-glow-blue">
                دسترسی سریع
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-neon-green transition-colors text-sm">
                    تمام محصولات
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=fitness" className="text-gray-300 hover:text-neon-blue transition-colors text-sm">
                    تجهیزات بدنسازی
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=supplements" className="text-gray-300 hover:text-neon-pink transition-colors text-sm">
                    مکمل‌های ورزشی
                  </Link>
                </li>
                <li>
                  <Link to="/products?sale=true" className="text-gray-300 hover:text-neon-green transition-colors text-sm">
                    تخفیف‌ویژه
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-neon-blue transition-colors text-sm">
                    مقالات
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 text-glow-pink">
                خدمات مشتریان
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/shipping" className="text-gray-300 hover:text-neon-green transition-colors text-sm">
                    راهنمای خرید
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-gray-300 hover:text-neon-blue transition-colors text-sm">
                    مرجوعی کالا
                  </Link>
                </li>
                <li>
                  <Link to="/warranty" className="text-gray-300 hover:text-neon-pink transition-colors text-sm">
                    گارانتی محصولات
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-neon-green transition-colors text-sm">
                    سؤالات متداول
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-neon-blue transition-colors text-sm">
                    تماس با ما
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 text-glow-green">
                اطلاعات تماس
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-neon-blue mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">
                    تهران، خیابان ولیعصر، پلاک ۱۲۳۴
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-neon-green flex-shrink-0" />
                  <p className="text-gray-300 text-sm">۰۲۱-۱۲۳۴۵۶۷۸</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-neon-pink flex-shrink-0" />
                  <p className="text-gray-300 text-sm">info@namavaraan.ir</p>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-6">
                <h5 className="text-white font-semibold mb-3">خبرنامه</h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="ایمیل شما"
                    className="flex-1 glass rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  />
                  <button className="btn-neon btn-neon-green px-4 py-2 text-sm rounded-lg">
                    عضویت
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © ۱۴۰۳ فروشگاه نام‌آوران. تمام حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-neon-green transition-colors text-sm">
                حریم خصوصی
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                قوانین و مقررات
              </Link>
              <div className="flex items-center gap-2">
                <img 
                  src="https://images.pexels.com/photos/6053816/pexels-photo-6053816.jpeg?auto=compress&cs=tinysrgb&w=50&h=30"
                  alt="نماد اعتماد"
                  className="w-8 h-6 rounded opacity-70"
                />
                <span className="text-xs text-gray-500">نماد اعتماد</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}