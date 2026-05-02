import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.HomePage) },
  { path: 'email', loadComponent: () => import('./pages/email/email').then(m => m.EmailPage) },
  { path: 'translator', loadComponent: () => import('./pages/translator/translator').then(m => m.TranslatorPage) },
  { path: '**', redirectTo: '' }
];
