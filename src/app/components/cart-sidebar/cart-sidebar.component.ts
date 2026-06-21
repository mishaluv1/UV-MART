import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { slideInOut, overlayFade, fadeIn, staggerList } from '../../animations/animations';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss'],
  animations: [slideInOut, overlayFade, fadeIn, staggerList],
})
export class CartSidebarComponent {
  cartService = inject(CartService);
}