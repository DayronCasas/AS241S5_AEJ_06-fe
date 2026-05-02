import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="brand-icon">⚡</span>
        <span class="brand-name">API<span class="brand-accent">Lab</span></span>
      </div>
      <div class="navbar-links">
        <a routerLink="/email" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">✉️</span>
          <span>Email Verifier</span>
        </a>
        <a routerLink="/translator" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">🌐</span>
          <span>Traductor</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      height: 60px;
      background: white;
      border-bottom: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 700;
      color: var(--gray-900);
    }
    .brand-icon { font-size: 20px; }
    .brand-accent { color: var(--primary); }
    .navbar-links {
      display: flex;
      gap: 4px;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: var(--radius-sm);
      font-size: 14px;
      font-weight: 500;
      color: var(--gray-600);
      transition: all 0.2s;
      &:hover { background: var(--gray-100); color: var(--gray-900); }
      &.active { background: var(--primary-light); color: var(--primary); }
    }
    .nav-icon { font-size: 16px; }
  `]
})
export class NavbarComponent {}
