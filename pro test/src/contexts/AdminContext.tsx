import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Category, Brand, Order, User, DashboardStats } from '../types';

interface AdminContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Brands
  brands: Brand[];
  addBrand: (brand: Omit<Brand, 'id'>) => void;
  updateBrand: (id: string, brand: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  
  // Orders
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  // Users
  users: User[];
  updateUserRole: (id: string, role: User['role']) => void;
  toggleUserStatus: (id: string) => void;
  
  // Dashboard
  dashboardStats: DashboardStats;
  
  // Loading states
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'دمبل قابل تنظیم ۲۰ کیلو',
    description: 'دمبل قابل تنظیم PowerMax با وزن قابل تغییر از ۲ تا ۲۰ کیلوگرم',
    price: 2500000,
    originalPrice: 3000000,
    images: ['https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg'],
    category: 'fitness',
    brand: 'PowerMax',
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviews: 124,
    features: ['وزن قابل تنظیم', 'دسته ضد لغزش', 'فولاد با کیفیت'],
    specifications: { 'وزن': '۲-۲۰ کیلوگرم', 'جنس': 'فولاد' },
    colors: ['مشکی', 'طوسی'],
    sizes: ['۱۰ کیلو', '۱۵ کیلو', '۲۰ کیلو'],
    badge: 'فروش ویژه',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  }
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'بدنسازی',
    slug: 'fitness',
    description: 'تجهیزات بدنسازی و فیتنس',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
    productCount: 45,
    isActive: true
  },
  {
    id: '2',
    name: 'دویدن',
    slug: 'running',
    description: 'کفش و لوازم دویدن',
    image: 'https://images.pexels.com/photos/2361952/pexels-photo-2361952.jpeg',
    productCount: 28,
    isActive: true
  }
];

const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Nike',
    slug: 'nike',
    logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    description: 'برند معتبر ورزشی',
    isActive: true
  },
  {
    id: '2',
    name: 'PowerMax',
    slug: 'powermax',
    logo: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg',
    description: 'تجهیزات بدنسازی حرفه‌ای',
    isActive: true
  }
];

const mockOrders: Order[] = [
  {
    id: '1001',
    customerId: '1',
    customerName: 'احمد رضایی',
    customerEmail: 'ahmad@example.com',
    items: [
      {
        productId: '1',
        productName: 'دمبل قابل تنظیم ۲۰ کیلو',
        productImage: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg',
        quantity: 1,
        price: 2500000
      }
    ],
    total: 2500000,
    status: 'pending',
    paymentStatus: 'paid',
    shippingAddress: 'تهران، خیابان ولیعصر',
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'احمد رضایی',
    email: 'ahmad@example.com',
    phone: '09123456789',
    role: 'user',
    isActive: true,
    createdAt: '2024-01-10',
    lastLogin: '2024-02-15'
  }
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(false);

  // Product management
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...productData, updatedAt: new Date().toISOString() }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  // Category management
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, categoryData: Partial<Category>) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...categoryData } : category
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  // Brand management
  const addBrand = (brandData: Omit<Brand, 'id'>) => {
    const newBrand: Brand = {
      ...brandData,
      id: Date.now().toString()
    };
    setBrands(prev => [...prev, newBrand]);
  };

  const updateBrand = (id: string, brandData: Partial<Brand>) => {
    setBrands(prev => prev.map(brand => 
      brand.id === id ? { ...brand, ...brandData } : brand
    ));
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => prev.filter(brand => brand.id !== id));
  };

  // Order management
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === id 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  // User management
  const updateUserRole = (id: string, role: User['role']) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, role } : user
    ));
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  // Dashboard stats
  const dashboardStats: DashboardStats = {
    totalSales: 12500000,
    totalOrders: 24,
    totalProducts: products.length,
    totalUsers: users.length,
    salesGrowth: 12,
    ordersGrowth: 8,
    recentOrders: orders.slice(0, 5),
    topProducts: products.slice(0, 5)
  };

  return (
    <AdminContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      brands,
      addBrand,
      updateBrand,
      deleteBrand,
      orders,
      updateOrderStatus,
      users,
      updateUserRole,
      toggleUserStatus,
      dashboardStats,
      isLoading
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}