import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Target, 
  Heart,
  Star,
  TrendingUp,
  Shield,
  Truck
} from 'lucide-react';

const stats = [
  { icon: Users, value: '۱۰,۰۰۰+', label: 'مشتری راضی', color: 'text-neon-green' },
  { icon: Award, value: '۵۰۰+', label: 'برند معتبر', color: 'text-neon-blue' },
  { icon: TrendingUp, value: '۹۸٪', label: 'رضایت مشتری', color: 'text-neon-pink' },
  { icon: Star, value: '۴.۹', label: 'امتیاز کاربران', color: 'text-neon-green' }
];

const values = [
  {
    icon: Target,
    title: 'کیفیت بالا',
    description: 'ما تنها بهترین برندهای جهانی را انتخاب می‌کنیم تا بهترین کیفیت را به شما ارائه دهیم.',
    color: 'text-neon-green'
  },
  {
    icon: Heart,
    title: 'مشتری‌مداری',
    description: 'رضایت شما اولویت اصلی ماست. تیم پشتیبانی ما ۲۴/۷ در خدمت شماست.',
    color: 'text-neon-pink'
  },
  {
    icon: Shield,
    title: 'اعتماد و امنیت',
    description: 'تمام محصولات ما اصل و دارای گارانتی معتبر هستند. خرید شما کاملاً امن است.',
    color: 'text-neon-blue'
  },
  {
    icon: Truck,
    title: 'ارسال سریع',
    description: 'با شبکه توزیع گسترده‌مان، محصولات را در کمترین زمان به دست شما می‌رسانیم.',
    color: 'text-neon-green'
  }
];

const team = [
  {
    name: 'علی احمدی',
    role: 'مدیر عامل',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    description: 'بیش از ۱۵ سال تجربه در صنعت ورزش'
  },
  {
    name: 'فاطمه رضایی',
    role: 'مدیر فروش',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
    description: 'متخصص در مشاوره تجهیزات ورزشی'
  },
  {
    name: 'محمد کریمی',
    role: 'مدیر فنی',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
    description: 'کارشناس تجهیزات بدنسازی و فیتنس'
  }
];

export default function About() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-glow-blue mb-6">
              درباره نام‌آوران
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              نام‌آوران بزرگ‌ترین فروشگاه آنلاین لوازم ورزشی ایران است که از سال ۱۳۹۰ با هدف ارائه بهترین تجهیزات ورزشی و خدمات مشتری‌محور فعالیت می‌کند. ما معتقدیم که ورزش حق همه است و تلاش می‌کنیم تا بهترین محصولات را با قیمت مناسب در اختیار ورزشکاران قرار دهیم.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-neon btn-neon-green px-8 py-4 text-lg rounded-xl">
                تماس با ما
              </button>
              <button className="btn-neon btn-neon-blue px-8 py-4 text-lg rounded-xl">
                مشاهده محصولات
              </button>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="glass rounded-2xl p-12">
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
                    <stat.icon className={stat.color} size={24} />
                  </div>
                  <h3 className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-glow-green mb-6">ماموریت ما</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                ماموریت ما ارائه بهترین تجهیزات ورزشی با کیفیت بالا و قیمت مناسب به تمام ورزشکاران ایرانی است. ما می‌خواهیم فرهنگ ورزش را در جامعه گسترش دهیم و به افراد کمک کنیم تا به اهداف سلامتی و تناسب اندام خود برسند.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                  <span className="text-gray-300">ارائه محصولات با کیفیت</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                  <span className="text-gray-300">خدمات مشتری‌محور</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                  <span className="text-gray-300">قیمت‌گذاری منصفانه</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-glow-blue mb-6">چشم‌انداز ما</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                چشم‌انداز ما تبدیل شدن به بزرگ‌ترین و معتبرترین فروشگاه آنلاین لوازم ورزشی در منطقه خاورمیانه است. ما می‌خواهیم پیشرو در استفاده از فناوری‌های نوین و ارائه تجربه خرید بی‌نظیر باشیم.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                  <span className="text-gray-300">رهبری در بازار منطقه</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                  <span className="text-gray-300">نوآوری در خدمات</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                  <span className="text-gray-300">توسعه پایدار</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-glow-pink mb-4">ارزش‌های ما</h2>
            <p className="text-gray-400 text-lg">اصولی که ما را در مسیر موفقیت راهنمایی می‌کند</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 glass rounded-full mb-4">
                  <value.icon className={value.color} size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-glow-green mb-4">تیم ما</h2>
            <p className="text-gray-400 text-lg">افرادی که نام‌آوران را می‌سازند</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-500/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-neon-blue font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* History Timeline */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-glow-blue mb-4">تاریخچه ما</h2>
            <p className="text-gray-400 text-lg">سفر ما از ابتدا تا امروز</p>
          </motion.div>

          <div className="glass rounded-2xl p-8">
            <div className="space-y-8">
              {[
                { year: '۱۳۹۰', title: 'تأسیس نام‌آوران', description: 'شروع فعالیت با ۱۰ محصول اولیه' },
                { year: '۱۳۹۵', title: 'گسترش محصولات', description: 'افزودن بیش از ۵۰۰ محصول جدید' },
                { year: '۱۳۹۸', title: 'راه‌اندازی فروشگاه آنلاین', description: 'ورود به دنیای تجارت الکترونیک' },
                { year: '۱۴۰۱', title: 'رسیدن به ۱۰,۰۰۰ مشتری', description: 'عبور از مرز ۱۰ هزار مشتری راضی' },
                { year: '۱۴۰۳', title: 'نسخه جدید وب‌سایت', description: 'طراحی مجدد با فناوری‌های روز دنیا' }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-neon-green to-neon-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="glass rounded-2xl p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl font-bold text-glow-green mb-6">
                آماده همراهی با ما هستید؟
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                به خانواده بزرگ نام‌آوران بپیوندید و از بهترین تجهیزات ورزشی با قیمت مناسب بهره‌مند شوید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-neon btn-neon-pink px-8 py-4 text-lg rounded-xl">
                  عضویت در خبرنامه
                </button>
                <button className="btn-neon btn-neon-blue px-8 py-4 text-lg rounded-xl">
                  مشاهده محصولات
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}