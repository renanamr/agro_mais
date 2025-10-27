import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: '**', redirectTo: '' }
];