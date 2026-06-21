import { Injectable, signal } from '@angular/core';
import { Product, Category, Review } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly categories = signal<Category[]>(this.generateCategories());
  readonly products = signal<Product[]>(this.generateProducts());
  readonly reviews = signal<Review[]>(this.generateReviews());

  getProductBySlug(slug: string): Product | undefined {
    return this.products().find(p => p.slug === slug);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products().filter(p => p.category === category);
  }

  getRelatedProducts(product: Product, limit = 4): Product[] {
    return this.products()
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  }

  getReviewsForProduct(productId: number): Review[] {
    return this.reviews().filter(r => r.productId === productId);
  }

  private generateCategories(): Category[] {
    return [
      { id: 1, name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-1b8e72c9e7d9?w=400&h=400&fit=crop', icon: '📱', productCount: 42 },
      { id: 2, name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop', icon: '👗', productCount: 68 },
      { id: 3, name: 'Home & Living', slug: 'home-living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=400&fit=crop', icon: '🏠', productCount: 35 },
      { id: 4, name: 'Sports', slug: 'sports', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba378cf1?w=400&h=400&fit=crop', icon: '⚽', productCount: 24 },
      { id: 5, name: 'Beauty', slug: 'beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop', icon: '💄', productCount: 31 },
      { id: 6, name: 'Books', slug: 'books', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop', icon: '📚', productCount: 19 },
      { id: 7, name: 'Toys', slug: 'toys', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop', icon: '🧸', productCount: 15 },
      { id: 8, name: 'Groceries', slug: 'groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop', icon: '🛒', productCount: 53 },
    ];
  }

  private generateProducts(): Product[] {
    const items: Product[] = [];
    const categories = ['electronics', 'fashion', 'home-living', 'sports', 'beauty', 'books', 'toys', 'groceries'];
    const productNames: Record<string, string[]> = {
      electronics: ['Wireless Headphones Pro', 'Smart Watch Ultra', '4K Action Camera', 'Bluetooth Speaker X', 'Laptop Stand Pro', 'USB-C Hub 12-in-1', 'Mechanical Keyboard RGB', 'Wireless Mouse Ergo'],
      fashion: ['Leather Crossbody Bag', 'Classic Aviator Sunglasses', 'Premium Cotton T-Shirt', 'Slim Fit Chinos', 'Denim Jacket Vintage', 'Running Shoes Ultra', 'Wool Blend Scarf', 'Leather Belt Classic'],
      'home-living': ['Ceramic Plant Pot Set', 'LED String Lights Warm', 'Throw Pillow Velvet', 'Wall Art Canvas Print', 'Minimal Desk Lamp', 'Scented Candle Collection', 'Wooden Coasters Set', 'Macrame Wall Hanging'],
      sports: ['Yoga Mat Premium', 'Resistance Bands Set', 'Stainless Steel Water Bottle', 'Jump Rope Speed', 'Foam Roller', 'Gym Gloves Pro', 'Running Armband', 'Fitness Tracker Band'],
      beauty: ['Vitamin C Serum', 'Hyaluronic Acid Moisturizer', 'Retinol Night Cream', 'Face Mask Sheet Set', 'BB Cream SPF50', 'Lip Balm Collection', 'Hair Argan Oil', 'Eye Cream Anti-Aging'],
      books: ['Atomic Habits', 'The Psychology of Money', 'Deep Work', 'Sapiens: A Brief History', 'Thinking Fast and Slow', 'The Alchemist', 'Educated: A Memoir', 'Born a Crime'],
      toys: ['Building Blocks 1000pc', 'RC Stunt Car', 'Board Game Strategy', 'Plush Teddy Bear Giant', 'Puzzle 3D Globe', 'Magic Kit Deluxe', 'Science Experiment Kit', 'Art Supply Set Kids'],
      groceries: ['Organic Green Tea', 'Premium Coffee Beans', 'Dark Chocolate Bar', 'Mixed Nuts Roasted', 'Extra Virgin Olive Oil', 'Organic Honey Raw', 'Quinoa Organic', 'Protein Bars Variety'],
    };

    let id = 1;
    for (const cat of categories) {
      const names = productNames[cat] || [];
      for (let i = 0; i < names.length; i++) {
        const price = Math.floor(Math.random() * 200) + 10;
        const originalPrice = price + Math.floor(Math.random() * 80) + 10;
        items.push({
          id,
          name: names[i],
          slug: names[i].toLowerCase().replace(/\s+/g, '-'),
          description: `Experience premium quality with our ${names[i]}. Designed for comfort, style, and durability. Perfect for everyday use and makes an excellent gift.`,
          price,
          originalPrice,
          discount: Math.round(((originalPrice - price) / originalPrice) * 100),
          images: [
            `https://picsum.photos/seed/product${id}a/600/600`,
            `https://picsum.photos/seed/product${id}b/600/600`,
            `https://picsum.photos/seed/product${id}c/600/600`,
            `https://picsum.photos/seed/product${id}d/600/600`,
          ],
          category: cat,
          tags: [cat, 'trending', 'premium'],
          rating: +(Math.random() * 2 + 3).toFixed(1),
          reviews: Math.floor(Math.random() * 500) + 10,
          inStock: Math.random() > 0.1,
          colors: [
            { name: 'Black', hex: '#1a1a1a' },
            { name: 'White', hex: '#f5f5f5' },
            { name: 'Navy', hex: '#1e3a5f' },
            { name: 'Red', hex: '#dc2626' },
          ],
          sizes: ['S', 'M', 'L', 'XL'],
          featured: i < 4,
          bestSeller: i >= 2 && i < 6,
          newArrival: i >= 5,
          createdAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
        });
        id++;
      }
    }
    return items;
  }

  private generateReviews(): Review[] {
    const reviewers = [
      { user: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?img=1' },
      { user: 'James K.', avatar: 'https://i.pravatar.cc/150?img=2' },
      { user: 'Emily R.', avatar: 'https://i.pravatar.cc/150?img=3' },
      { user: 'Michael T.', avatar: 'https://i.pravatar.cc/150?img=4' },
      { user: 'Jessica L.', avatar: 'https://i.pravatar.cc/150?img=5' },
      { user: 'David W.', avatar: 'https://i.pravatar.cc/150?img=6' },
      { user: 'Amanda P.', avatar: 'https://i.pravatar.cc/150?img=7' },
      { user: 'Robert N.', avatar: 'https://i.pravatar.cc/150?img=8' },
    ];
    const comments = [
      'Absolutely love this product! Exceeded my expectations.',
      'Great quality for the price. Would buy again.',
      'Fast shipping and the product is exactly as described.',
      'Very happy with this purchase. Highly recommend!',
      'Good product but the color was slightly different from the picture.',
      'Perfect gift idea! The recipient loved it.',
      'Solid build quality and looks premium.',
      'Been using it for a month and it holds up really well.',
    ];

    const reviews: Review[] = [];
    let rid = 1;
    for (let pid = 1; pid <= 64; pid++) {
      const count = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < count; j++) {
        const r = reviewers[Math.floor(Math.random() * reviewers.length)];
        reviews.push({
          id: rid++,
          productId: pid,
          user: r.user,
          avatar: r.avatar,
          rating: Math.floor(Math.random() * 2) + 4,
          comment: comments[Math.floor(Math.random() * comments.length)],
          date: new Date(Date.now() - Math.random() * 90 * 86400000).toISOString(),
        });
      }
    }
    return reviews;
  }
}