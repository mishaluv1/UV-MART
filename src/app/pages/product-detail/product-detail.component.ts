import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product, Review } from '../../models/product.model';
import { fadeIn, fadeInUp, fadeInLeft, fadeInRight, staggerList, scaleIn } from '../../animations/animations';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [fadeIn, fadeInUp, fadeInLeft, fadeInRight, staggerList, scaleIn],
})
export class ProductDetailComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  route = inject(ActivatedRoute);

  product = signal<Product | null>(null);
  relatedProducts = signal<Product[]>([]);
  productReviews = signal<Review[]>([]);

  selectedImage = signal(0);
  selectedColor = signal('');
  selectedSize = signal('');
  quantity = signal(1);
  activeTab = signal<'description' | 'reviews' | 'shipping'>('description');

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      const p = this.productService.getProductBySlug(slug);
      if (p) {
        this.product.set(p);
        this.relatedProducts.set(this.productService.getRelatedProducts(p));
        this.productReviews.set(this.productService.getReviewsForProduct(p.id));
        this.selectedColor.set(p.colors[0]?.name || '');
        this.selectedSize.set(p.sizes[0] || '');
        this.selectedImage.set(0);
        this.quantity.set(1);
      }
    });
  }

  addToCart(): void {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p, this.quantity(), this.selectedColor(), this.selectedSize());
    }
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  getAverageRating(): number {
    const reviews = this.productReviews();
    if (!reviews.length) return 0;
    return +(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }

  decrementQty(): void {
    this.quantity.set(Math.max(1, this.quantity() - 1));
  }

  incrementQty(): void {
    this.quantity.set(this.quantity() + 1);
  }
}