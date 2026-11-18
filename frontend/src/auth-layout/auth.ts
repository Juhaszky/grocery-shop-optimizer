import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = signal<userData | null>(null);
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this.user() !== null);
  router = inject(Router);
  login(userData: userData) {
    this.setUserData(userData);
    this.router.navigate(['']);
  }
  private setUserData(userData: userData) {
    this._user.set({
      name: 'asd',
    });
  }
}
