export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  colors: ProductColor[];
  sizes: string[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  createdAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  icon: string;
  productCount: number;
}

export interface Review {
  id: number;
  productId: number;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}