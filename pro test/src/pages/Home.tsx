import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  TrendingUp, 
  Users, 
  Award,
  Zap,
  Target,
  Dumbbell
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const categories = [
  {
    name: 'بدنسازی',
    icon: Dumbbell,
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
    count: '۲۳۴ محصول'
  },
  {
    name: 'دویدن',
    icon: Zap,
    image: 'https://images.pexels.com/photos/2361952/pexels-photo-2361952.jpeg',
    count: '۱۲۸ محصول'
  },
  {
    name: 'فوتبال',
    icon: Target,
    image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg',
    count: '۱۹۶ محصول'
  }
];

const stats = [
  { icon: Users, value: '۱۰,۰۰۰+', label: 'مشتری راضی' },
  { icon: Award, value: '۵۰۰+', label: 'برند معتبر' },
  { icon: TrendingUp, value: '۹۸٪', label: 'رضایت مشتری' },
  { icon: Star, value: '۴.۹', label: 'امتیاز کاربران' }
];

export default function Home() {
  const { products } = useAdmin();
  
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-500/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-glow-green">نام‌آوران</span>
                <br />
                <span className="text-white">ورزش</span>
                <span className="text-glow-blue"> بهتر</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                بهترین تجهیزات ورزشی جهان در یک مکان. از بدنسازی تا دویدن، همه چیز برای موفقیت شما.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn-neon btn-neon-green px-8 py-4 text-lg rounded-xl inline-flex items-center gap-2 justify-center"
                >
                  مشاهده محصولات
                  <ArrowLeft size={20} />
                </Link>
                <button className="btn-neon btn-neon-blue px-8 py-4 text-lg rounded-xl">
                  مشاوره رایگان
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-16 h-16 glass rounded-full flex items-center justify-center">
            <Dumbbell className="text-neon-green" size={24} />
          </div>
        </div>
        <div className="absolute bottom-32 right-32 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
            <Target className="text-neon-pink" size={20} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 glass-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 glass rounded-full mb-4">
                  <stat.icon className="text-neon-blue" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-glow-green mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-glow-blue mb-4">
              دسته‌بندی‌های محصولات
            </h2>
            <p className="text-gray-400 text-lg">
              تجهیزات ورزشی برای هر نوع ورزش و فعالیت
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to="/products" className="block">
                  <div className="relative glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-center w-16 h-16 glass rounded-full mb-4">
                        <category.icon className="text-neon-green" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-gray-400 mb-4">{category.count}</p>
                      <div className="text-neon-blue hover:text-white transition-colors inline-flex items-center gap-2">
                        مشاهده همه
                        <ArrowLeft size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 glass-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-glow-pink mb-4">
              محصولات ویژه
            </h2>
            <p className="text-gray-400 text-lg">
              پرفروش‌ترین و بهترین محصولات ما
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                        <span className="bg-gradient-to-r from-neon-green to-neon-blue text-black px-3 py-1 rounded-full text-xs font-bold">
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {product.name}
                    </h3>
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

                    <Link
                      to={`/product/${product.id}`}
                      className="w-full btn-neon btn-neon-blue py-2 rounded-lg text-center block"
                    >
                      مشاهده جزئیات
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-neon btn-neon-green px-8 py-4 text-lg rounded-xl inline-flex items-center gap-2"
            >
              مشاهده همه محصولات
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl font-bold text-glow-green mb-6">
                آمادۀ شروع سفر ورزشی‌تان هستید؟
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                با مشاوره‌های رایگان ما بهترین تجهیزات را برای اهدافتان انتخاب کنید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-neon btn-neon-pink px-8 py-4 text-lg rounded-xl">
                  مشاوره رایگان
                </button>
                <Link
                  to="/contact"
                  className="btn-neon btn-neon-blue px-8 py-4 text-lg rounded-xl"
                >
                  تماس با ما
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}