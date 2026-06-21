import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { fadeIn, fadeInUp, staggerList, scaleIn, fadeInLeft, fadeInRight } from '../../animations/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeIn, fadeInUp, staggerList, scaleIn, fadeInLeft, fadeInRight],
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);

  featuredProducts = this.productService.products().filter(p => p.featured);
  bestSellers = this.productService.products().filter(p => p.bestSeller);
  newArrivals = this.productService.products().filter(p => p.newArrival);
  categories = this.productService.categories();

  promoEnd = new Date(Date.now() + 3 * 86400000).toISOString();

  stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '8K+', label: 'Products' },
    { value: '99%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support' },
  ];

  testimonials = [
    { name: 'Sarah Johnson', role: 'Verified Buyer', avatar: 'https://i.pravatar.cc/150?img=1', text: 'Absolutely love shopping here! The quality is outstanding and delivery is lightning fast. UV-MART has become my go-to for everything.' },
    { name: 'Mark Williams', role: 'Premium Member', avatar: 'https://i.pravatar.cc/150?img=3', text: 'The curation of products is exceptional. Every item I\'ve purchased has exceeded my expectations. The customer service is top-notch too.' },
    { name: 'Emily Chen', role: 'Fashion Enthusiast', avatar: 'https://i.pravatar.cc/150?img=5', text: 'I\'m obsessed with their fashion collection! The quality and style are unmatched. Plus, their return policy makes shopping stress-free.' },
    { name: 'David Kim', role: 'Tech Reviewer', avatar: 'https://i.pravatar.cc/150?img=7', text: 'As a tech enthusiast, I appreciate the detailed product specs and honest reviews. Found some amazing deals on the latest gadgets here.' },
  ];

  brands = [
    { name: 'TechPro', logo: '◆' },
    { name: 'StyleCo', logo: '◇' },
    { name: 'HomeEase', logo: '◈' },
    { name: 'SportMax', logo: '◆' },
    { name: 'BeautyLab', logo: '◇' },
    { name: 'BookWorm', logo: '◈' },
  ];

  ngOnInit(): void { }
}