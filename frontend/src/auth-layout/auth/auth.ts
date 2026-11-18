import { Component, computed, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { AuthService } from '../auth';

interface AuthFormModel {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  imports: [FormField],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private authService = inject(AuthService);

  readonly isLogin = signal(true);
  readonly showPassword = signal(false);

  readonly title = computed(() => (this.isLogin() ? 'Welcome back' : 'Create an account'));
  readonly subtitle = computed(() =>
    this.isLogin()
      ? 'Sign in to continue planning your groceries.'
      : 'Start saving time and money on every shop.',
  );
  readonly submitLabel = computed(() => (this.isLogin() ? 'Sign in' : 'Sign up'));

  private readonly model = signal<AuthFormModel>({ name: '', email: '', password: '' });

  readonly authForm = form(this.model, (p) => {
    required(p.name, { message: 'Please enter your name.', when: () => !this.isLogin() });
    required(p.email, { message: 'Please enter your email.' });
    email(p.email, { message: 'Please enter a valid email address.' });
    required(p.password, { message: 'Please enter your password.' });
    minLength(p.password, 8, { message: 'Password must be at least 8 characters.' });
  });

  toggleMode() {
    this.isLogin.update((v) => !v);
    this.showPassword.set(false);
  }

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    await submit(this.authForm, async (f) => {
      const { name, email } = f().value();
      //MOCK
      this.authService.login({ name: name || email });
      this.model.update((m) => ({ ...m, password: '' }));
    });
  }
}
