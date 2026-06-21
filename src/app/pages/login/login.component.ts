import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { fadeIn, fadeInUp } from '../../animations/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeIn, fadeInUp],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  showPassword = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Simulate login
      this.router.navigate(['/']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}