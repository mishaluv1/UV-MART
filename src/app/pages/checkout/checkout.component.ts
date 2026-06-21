import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { fadeIn, fadeInUp, fadeInLeft, fadeInRight } from '../../animations/animations';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    animations: [fadeIn, fadeInUp, fadeInLeft, fadeInRight],
})
export class CheckoutComponent {
    cartService = inject(CartService);
    fb = inject(FormBuilder);

    currentStep = signal<'shipping' | 'payment' | 'review' | 'success'>('shipping');
    orderPlaced = signal(false);
    orderNumber = signal('');
    paymentMethod = signal<'card' | 'cod'>('card');

    shippingForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        country: ['US', Validators.required],
    });

    paymentForm = this.fb.group({
        cardName: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        expiry: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });

    steps = [
        { key: 'shipping', label: 'Shipping', icon: 'local_shipping' },
        { key: 'payment', label: 'Payment', icon: 'credit_card' },
        { key: 'review', label: 'Review', icon: 'checklist' },
    ];

    currentStepIndex = computed(() => this.steps.findIndex(s => s.key === this.currentStep()));

    setPaymentMethod(method: 'card' | 'cod'): void {
        this.paymentMethod.set(method);
        if (method === 'cod') {
            this.paymentForm.reset();
        }
    }

    goToStep(step: 'shipping' | 'payment' | 'review'): void {
        if (step === 'payment' && this.currentStep() === 'shipping' && this.shippingForm.invalid) {
            this.shippingForm.markAllAsTouched();
            return;
        }
        if (step === 'review' && this.currentStep() === 'payment') {
            if (this.paymentMethod() === 'card' && this.paymentForm.invalid) {
                this.paymentForm.markAllAsTouched();
                return;
            }
        }
        this.currentStep.set(step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    backStep(): void {
        const idx = this.currentStepIndex();
        if (idx > 0) {
            this.goToStep(this.steps[idx - 1].key as 'shipping' | 'payment' | 'review');
        }
    }

    nextStep(): void {
        const idx = this.currentStepIndex();
        if (idx < this.steps.length - 1) {
            this.goToStep(this.steps[idx + 1].key as 'shipping' | 'payment' | 'review');
        }
    }

    placeOrder(): void {
        this.orderPlaced.set(true);
        this.orderNumber.set('UV-MART-' + Math.random().toString(36).substring(2, 10).toUpperCase());
        this.currentStep.set('success');
        this.cartService.clearCart();
    }

    getFieldError(form: any, field: string): string {
        const control = form.get(field);
        if (control?.touched && control?.errors) {
            if (control.errors['required']) return 'This field is required';
            if (control.errors['email']) return 'Invalid email address';
            if (control.errors['pattern']) return 'Invalid format';
        }
        return '';
    }
}