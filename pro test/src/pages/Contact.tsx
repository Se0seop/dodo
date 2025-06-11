import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'آدرس',
      content: 'تهران، خیابان ولیعصر، پلاک ۱۲۳۴',
      color: 'text-neon-green'
    },
    {
      icon: Phone,
      title: 'تلفن',
      content: '۰۲۱-۱۲۳۴۵۶۷۸',
      color: 'text-neon-blue'
    },
    {
      icon: Mail,
      title: 'ایمیل',
      content: 'info@namavaraan.ir',
      color: 'text-neon-pink'
    },
    {
      icon: Clock,
      title: 'ساعات کاری',
      content: 'شنبه تا پنج‌شنبه: ۹ تا ۱۸',
      color: 'text-neon-green'
    }
  ];

  const socialLinks = [
    { icon: Instagram, url: '#', color: 'text-neon-pink' },
    { icon: Twitter, url: '#', color: 'text-neon-blue' },
    { icon: Facebook, url: '#', color: 'text-neon-green' }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-glow-blue mb-6">تماس با ما</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              ما همیشه آماده پاسخگویی به سؤالات شما هستیم. از طریق راه‌های زیر می‌توانید با ما در ارتباط باشید.
            </p>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-8">اطلاعات تماس</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 glass rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className={info.color} size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                      <p className="text-gray-400 text-sm">{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-white font-semibold mb-4">شبکه‌های اجتماعی</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <social.icon className={social.color} size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">تماس سریع</h3>
              
              <div className="space-y-4">
                <a
                  href="tel:02112345678"
                  className="w-full btn-neon btn-neon-green py-3 rounded-lg inline-flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  تماس تلفنی
                </a>
                
                <a
                  href="mailto:info@namavaraan.ir"
                  className="w-full btn-neon btn-neon-blue py-3 rounded-lg inline-flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  ارسال ایمیل
                </a>
                
                <button className="w-full btn-neon btn-neon-pink py-3 rounded-lg inline-flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  چت آنلاین
                </button>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-8">فرم تماس</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">نام و نام خانوادگی *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      placeholder="نام خود را وارد کنید"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">ایمیل *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">شماره تماس</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">موضوع *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      required
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="product">سؤال درباره محصول</option>
                      <option value="order">پیگیری سفارش</option>
                      <option value="support">پشتیبانی فنی</option>
                      <option value="complaint">شکایت</option>
                      <option value="suggestion">پیشنهاد</option>
                      <option value="other">سایر</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">پیام *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green resize-none"
                    placeholder="پیام خود را اینجا بنویسید..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-neon btn-neon-green py-4 rounded-xl text-lg font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="loading-dots">در حال ارسال</span>
                  ) : (
                    <>
                      <Send size={20} />
                      ارسال پیام
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">موقعیت ما</h2>
            
            <div className="relative h-96 rounded-xl overflow-hidden">
              {/* Placeholder for map - in real implementation, use Google Maps or similar */}
              <div className="w-full h-full bg-gradient-to-br from-dark-300 to-dark-500 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-neon-blue mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-white mb-2">فروشگاه نام‌آوران</h3>
                  <p className="text-gray-400">تهران، خیابان ولیعصر، پلاک ۱۲۳۴</p>
                  <button className="mt-4 btn-neon btn-neon-blue px-6 py-2 rounded-lg">
                    مشاهده در نقشه
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-glow-pink mb-4">سؤالات متداول</h2>
            <p className="text-gray-400 text-lg">پاسخ سؤالات رایج در اینجا</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'چگونه می‌توانم سفارش خود را پیگیری کنم؟',
                answer: 'پس از ثبت سفارش، کد پیگیری برای شما ارسال می‌شود. می‌توانید از بخش پیگیری سفارش استفاده کنید.'
              },
              {
                question: 'آیا امکان مرجوعی کالا وجود دارد؟',
                answer: 'بله، تا ۷ روز پس از دریافت کالا می‌توانید آن را مرجوع کنید.'
              },
              {
                question: 'هزینه ارسال چقدر است؟',
                answer: 'برای سفارشات بالای ۵۰۰ هزار تومان، ارسال رایگان است. در غیر این صورت ۵۰ هزار تومان.'
              },
              {
                question: 'چه روش‌های پرداختی پذیرفته می‌شود؟',
                answer: 'تمام کارت‌های بانکی، درگاه‌های آنلاین و پرداخت در محل پذیرفته می‌شود.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}