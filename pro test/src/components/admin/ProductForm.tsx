import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2, Upload } from 'lucide-react';
import { Product } from '../../types';

interface ProductFormProps {
  product?: Product;
  onSave: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  categories: Array<{ id: string; name: string; slug: string }>;
  brands: Array<{ id: string; name: string; slug: string }>;
}

export default function ProductForm({ product, onSave, onCancel, categories, brands }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    category: product?.category || '',
    brand: product?.brand || '',
    stockCount: product?.stockCount || 0,
    images: product?.images || [''],
    features: product?.features || [''],
    specifications: product?.specifications || {},
    colors: product?.colors || [''],
    sizes: product?.sizes || [''],
    badge: product?.badge || ''
  });

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' || name === 'stockCount' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleArrayChange = (field: 'images' | 'features' | 'colors' | 'sizes', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'images' | 'features' | 'colors' | 'sizes') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'images' | 'features' | 'colors' | 'sizes', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey]: newSpecValue
        }
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([k]) => k !== key)
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== ''),
      features: formData.features.filter(feature => feature.trim() !== ''),
      colors: formData.colors.filter(color => color.trim() !== ''),
      sizes: formData.sizes.filter(size => size.trim() !== ''),
      inStock: formData.stockCount > 0,
      rating: product?.rating || 0,
      reviews: product?.reviews || 0
    };

    onSave(productData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          {product ? 'ویرایش محصول' : 'افزودن محصول جدید'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 glass rounded-lg hover:bg-red-500/20 transition-colors"
        >
          <X size={20} className="text-red-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="glass-dark rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">اطلاعات پایه</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">نام محصول *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                placeholder="نام محصول را وارد کنید"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">برند *</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full glass rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-green"
                required
              >
                <option value="">انتخاب برند</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.slug}>{brand.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">دسته‌بندی *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full glass rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-pink"
                required
              >
                <option value="">انتخاب دسته‌بندی</option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">برچسب</label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleInputChange}
                className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                placeholder="مثل: فروش ویژه، جدید"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-white font-semibold mb-2">توضیحات *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green resize-none"
              placeholder="توضیحات کامل محصول را وارد کنید"
              required
            />
          </div>
        </div>

        {/* Pricing and Stock */}
        <div className="glass-dark rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">قیمت و موجودی</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">قیمت (تومان) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                placeholder="0"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">قیمت اصلی (تومان)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">موجودی *</label>
              <input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleInputChange}
                className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                placeholder="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="glass-dark rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">تصاویر محصول</h3>
          
          <div className="space-y-4">
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleArrayChange('images', index, e.target.value)}
                  className="flex-1 glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  placeholder="آدرس تصویر (URL)"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('images', index)}
                  className="p-3 glass rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addArrayItem('images')}
              className="btn-neon btn-neon-green px-4 py-2 rounded-lg inline-flex items-center gap-2"
            >
              <Plus size={16} />
              افزودن تصویر
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="glass-dark rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">ویژگی‌ها</h3>
          
          <div className="space-y-4">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleArrayChange('features', index, e.target.value)}
                  className="flex-1 glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                  placeholder="ویژگی محصول"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('features', index)}
                  className="p-3 glass rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addArrayItem('features')}
              className="btn-neon btn-neon-green px-4 py-2 rounded-lg inline-flex items-center gap-2"
            >
              <Plus size={16} />
              افزودن ویژگی
            </button>
          </div>
        </div>

        {/* Specifications */}
        <div className="glass-dark rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">مشخصات فنی</h3>
          
          <div className="space-y-4">
            {Object.entries(formData.specifications).map(([key, value]) => (
              <div key={key} className="flex gap-3">
                <input
                  type="text"
                  value={key}
                  readOnly
                  className="w-1/3 glass rounded-lg px-4 py-3 text-white bg-gray-700"
                />
                <input
                  type="text"
                  value={value}
                  readOnly
                  className="flex-1 glass rounded-lg px-4 py-3 text-white bg-gray-700"
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(key)}
                  className="p-3 glass rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            ))}
            
            <div className="flex gap-3">
              <input
                type="text"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                className="w-1/3 glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                placeholder="نام مشخصه"
              />
              <input
                type="text"
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
                className="flex-1 glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                placeholder="مقدار"
              />
              <button
                type="button"
                onClick={addSpecification}
                className="p-3 btn-neon btn-neon-pink rounded-lg"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Colors and Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colors */}
          <div className="glass-dark rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">رنگ‌ها</h3>
            
            <div className="space-y-4">
              {formData.colors.map((color, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleArrayChange('colors', index, e.target.value)}
                    className="flex-1 glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                    placeholder="نام رنگ"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('colors', index)}
                    className="p-3 glass rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('colors')}
                className="btn-neon btn-neon-blue px-4 py-2 rounded-lg inline-flex items-center gap-2"
              >
                <Plus size={16} />
                افزودن رنگ
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="glass-dark rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">سایزها</h3>
            
            <div className="space-y-4">
              {formData.sizes.map((size, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => handleArrayChange('sizes', index, e.target.value)}
                    className="flex-1 glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green"
                    placeholder="سایز"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('sizes', index)}
                    className="p-3 glass rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('sizes')}
                className="btn-neon btn-neon-green px-4 py-2 rounded-lg inline-flex items-center gap-2"
              >
                <Plus size={16} />
                افزودن سایز
              </button>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-neon btn-neon-pink px-6 py-3 rounded-lg inline-flex items-center gap-2"
          >
            <X size={16} />
            لغو
          </button>
          <button
            type="submit"
            className="btn-neon btn-neon-green px-6 py-3 rounded-lg inline-flex items-center gap-2"
          >
            <Save size={16} />
            {product ? 'بروزرسانی' : 'ذخیره'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}