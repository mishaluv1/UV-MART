import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private cartOpen = signal(false);

  readonly items = this.cartItems.asReadonly();
  readonly isCartOpen = this.cartOpen.asReadonly();

  readonly totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  readonly discount = computed(() =>
    this.cartItems().reduce(
      (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity,
      0
    )
  );

  readonly total = computed(() => this.subtotal());

  toggleCart(): void {
    this.cartOpen.update(v => !v);
  }

  openCart(): void {
    this.cartOpen.set(true);
  }

  closeCart(): void {
    this.cartOpen.set(false);
  }

  addToCart(product: Product, quantity = 1, color = '', size = ''): void {
    this.cartItems.update(items => {
      const existing = items.find(
        i => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
      );
      if (existing) {
        return items.map(i =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...items, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    this.cartOpen.set(true);
  }

  removeFromCart(index: number): void {
    this.cartItems.update(items => items.filter((_, i) => i !== index));
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(index);
      return;
    }
    this.cartItems.update(items =>
      items.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}