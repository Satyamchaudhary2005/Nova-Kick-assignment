export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductSize {
  size: string;
  inStock: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  discount: number;
  rating: number;
  stock: number;
  images: ProductImage[];
  sizes: ProductSize[];
  colors: ProductColor[];
  reviews: Review[];
  features: string[];
  specifications: { label: string; value: string }[];
  isNew: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  sortBy: string;
  search: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}
