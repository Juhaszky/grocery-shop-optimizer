import { Routes } from '@angular/router';
import { authGuard } from '../auth-guard';
import { AuthLayout } from '../auth-layout/auth-layout';
import { Auth } from '../auth-layout/auth/auth';
import { MainLayout } from '../main-layout/main-layout';
import { Home } from '../home/home';
import { Products } from './products/products';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: '', component: Auth },
    ],
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      { path: 'products', component: Products}
    ],
  }
];
