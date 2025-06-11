import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Check,
  Shield,
  Truck
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Checkout() {
  const { state } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'zarinpal'
  });

  const shippingCost = state.total >= 500000 ? 0 : 50000;
  const totalWithShipping = state.total + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process payment
      alert('در حال انتقال به درگاه پرداخت...');
    }
  };

  const steps = [
    { id: 1, title: 'اطلاعات شخصی', icon: User },
    { id: 2, title: 'آدرس تحویل', icon: MapPin },
    { id: 3, title: 'پرداخت', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-glow-blue mb-4">تسویه حساب</h1>
          <p className="text-gray-400">تکمیل اطلاعات و پرداخت سفارش</p>
        </div>

        {/* Steps */}
        <div className="glass rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step >= stepItem.id 
                      ? 'border-neon-green bg-neon-green/20 text-neon-green' 
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    {step > stepItem.id ? (
                      <Check size={20} />
                    ) : (
                      <stepItem.icon size={20} />
                    )}
                  </div>
                  <div className="mr-3">
                    <h3 className={`font-semibold ${
                      step >= stepItem.id ? 'text-white' : 'text-gray-400'
                    }`}>
                      {stepItem.title}
                    </h3>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-6 rounded ${
                    step > stepItem.id ? 'bg-neon-green' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass rounded-xl p-8">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">اطلاعات شخصی</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">نام</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="نام خود را وارد کنید"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">نام خانوادگی</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="نام خانوادگی خود را وارد کنید"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">شماره تماس</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">ایمیل</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">آدرس تحویل</h2>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">آدرس کامل</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue resize-none"
                      placeholder="آدرس کامل خود را وارد کنید..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">شهر</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                        placeholder="تهران"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">کد پستی</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                        placeholder="۱۲۳۴۵۶۷۸۹۰"
                        required
                      />
                    </div>
                  </div>

                  <div className="glass-dark rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Truck className="text-neon-green" size={20} />
                      <span className="text-white font-semibold">اطلاعات ارسال</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      ارسال معمولی: ۲-۳ روز کاری
                      <br />
                      ارسال اکسپرس: ۱ روز کاری (هزینه اضافی)
                    </p>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">روش پرداخت</h2>
                  
                  <div className="space-y-4">
                    {[
                      { id: 'zarinpal', name: 'زرین‌پال', logo: '💳' },
                      { id: 'idpay', name: 'آیدی‌پی', logo: '🏦' },
                      { id: 'behpardakht', name: 'به‌پرداخت', logo: '💰' }
                    ].map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          formData.paymentMethod === method.id
                            ? 'border-neon-blue bg-neon-blue/10'
                            : 'border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="text-2xl">{method.logo}</span>
                        <span className="text-white font-semibold">{method.name}</span>
                      </label>
                    ))}
                  </div>

                  <div className="glass-dark rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="text-neon-green" size={20} />
                      <span className="text-white font-semibold">امنیت پرداخت</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      تمام پرداخت‌ها با استفاده از پروتکل‌های امنیتی SSL انجام می‌شود.
                      اطلاعات کارت شما محفوظ است.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="btn-neon btn-neon-blue px-6 py-3 rounded-lg"
                  >
                    مرحله قبل
                  </button>
                )}
                
                <button
                  type="submit"
                  className="btn-neon btn-neon-green px-8 py-3 rounded-lg mr-auto"
                >
                  {step === 3 ? 'پرداخت و تکمیل سفارش' : 'مرحله بعد'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">خلاصه سفارش</h3>
              
              <div className="space-y-4 mb-6">
                {state.items.map(item => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                      <p className="text-gray-400 text-xs">تعداد: {item.quantity}</p>
                      <p className="text-neon-green font-semibold text-sm">
                        {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-white/10 mb-6" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">جمع کل</span>
                  <span className="text-white">{state.total.toLocaleString('fa-IR')} تومان</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">هزینه ارسال</span>
                  <span className={shippingCost === 0 ? 'text-neon-green' : 'text-white'}>
                    {shippingCost === 0 ? 'رایگان' : `${shippingCost.toLocaleString('fa-IR')} تومان`}
                  </span>
                </div>

                <hr className="border-white/10" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">مبلغ نهایی</span>
                  <span className="text-neon-green">
                    {totalWithShipping.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-400 space-y-2">
                <p>• با تکمیل خرید، شما قوانین و مقررات را می‌پذیرید</p>
                <p>• امکان لغو سفارش تا ۲۴ ساعت پس از ثبت</p>
                <p>• گارانتی ۷ روزه بازگشت کالا</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}