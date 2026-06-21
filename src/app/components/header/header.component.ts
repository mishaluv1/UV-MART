import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { fadeIn, slideInOut, overlayFade } from '../../animations/animations';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, CartSidebarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeIn, slideInOut, overlayFade],
})
export class HeaderComponent {
  cartService = inject(CartService);
  scrolled = false;
  mobileMenuOpen = false;
  searchOpen = false;
  searchQuery = '';

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
    if (this.searchOpen) {
      setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
    }
  }

  closeSearch(): void {
    this.searchOpen = false;
    this.searchQuery = '';
  }
}