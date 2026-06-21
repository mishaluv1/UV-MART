import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { fadeIn, fadeInUp, staggerList } from '../../animations/animations';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [fadeIn, fadeInUp, staggerList],
})
export class CartComponent {
  cartService = inject(CartService);
  productService = inject(ProductService);

  recommendedProducts = this.productService.products().filter(p => p.featured).slice(0, 4);
}