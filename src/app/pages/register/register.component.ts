import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { fadeIn, fadeInUp } from '../../animations/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeIn, fadeInUp],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  showPassword = signal(false);
  showConfirm = signal(false);

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    agreeTerms: [false, Validators.requiredTrue],
  });

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.router.navigate(['/']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}