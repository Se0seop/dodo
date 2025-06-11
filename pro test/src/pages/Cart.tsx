import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft,
  Gift,
  Percent
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const shippingCost = state.total >= 500000 ? 0 : 50000;
  const totalWithShipping = state.total + shippingCost;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-12"
            >
              <ShoppingBag size={80} className="text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">سبد خرید شما خالی است</h2>
              <p className="text-gray-400 mb-8">
                محصولاتی که دوست دارید را به سبد خرید اضافه کنید
              </p>
              <Link
                to="/products"
                className="btn-neon btn-neon-green px-8 py-4 text-lg rounded-xl inline-flex items-center gap-2"
              >
                شروع خرید
                <ArrowLeft size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-glow-blue mb-4">سبد خرید</h1>
          <p className="text-gray-400">{state.count} محصول در سبد خرید شما</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex gap-6">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                    
                    {(item.size || item.color) && (
                      <div className="flex gap-4 mb-3">
                        {item.color && (
                          <span className="text-sm text-gray-400">رنگ: {item.color}</span>
                        )}
                        {item.size && (
                          <span className="text-sm text-gray-400">اندازه: {item.size}</span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center glass rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-white/10 transition-colors"
                          >
                            <Minus size={16} className="text-neon-blue" />
                          </button>
                          <span className="px-4 py-2 text-white font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-white/10 transition-colors"
                          >
                            <Plus size={16} className="text-neon-green" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 glass rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>

                      <div className="text-left">
                        <div className="text-xl font-bold text-neon-green">
                          {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                        </div>
                        <div className="text-sm text-gray-400">
                          {item.price.toLocaleString('fa-IR')} × {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-2"
              >
                <Trash2 size={16} />
                پاک کردن همه
              </button>
              
              <Link
                to="/products"
                className="text-neon-blue hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                ادامه خرید
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">خلاصه سفارش</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">جمع کل ({state.count} محصول)</span>
                  <span className="text-white font-semibold">
                    {state.total.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">هزینه ارسال</span>
                  <span className={`font-semibold ${shippingCost === 0 ? 'text-neon-green' : 'text-white'}`}>
                    {shippingCost === 0 ? 'رایگان' : `${shippingCost.toLocaleString('fa-IR')} تومان`}
                  </span>
                </div>

                {state.total < 500000 && (
                  <div className="glass-dark rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="text-neon-green" size={16} />
                      <span className="text-sm text-neon-green font-semibold">ارسال رایگان</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {(500000 - state.total).toLocaleString('fa-IR')} تومان تا ارسال رایگان
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-neon-green to-neon-blue h-2 rounded-full"
                        style={{ width: `${(state.total / 500000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <hr className="border-white/10" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">مبلغ نهایی</span>
                  <span className="text-neon-green">
                    {totalWithShipping.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="کد تخفیف"
                    className="flex-1 glass rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  />
                  <button className="btn-neon btn-neon-pink px-4 py-2 rounded-lg">
                    <Percent size={16} />
                  </button>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-neon btn-neon-green py-4 rounded-xl text-lg font-semibold text-center block"
              >
                ادامه فرآیند خرید
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                    پرداخت امن
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    ارسال سریع
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-pink rounded-full"></div>
                    گارانتی اصالت
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                    ۷ روز ضمانت
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}