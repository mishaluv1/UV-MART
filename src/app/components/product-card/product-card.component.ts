import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { scaleIn } from '../../animations/animations';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [scaleIn],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  cartService = inject(CartService);
  hovered = false;
  imageIndex = 0;

  get discountLabel(): string {
    return `-${this.product.discount}%`;
  }

  nextImage(): void {
    this.imageIndex = (this.imageIndex + 1) % this.product.images.length;
  }

  prevImage(): void {
    this.imageIndex = (this.imageIndex - 1 + this.product.images.length) % this.product.images.length;
  }
}