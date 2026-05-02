import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { ToastComponent } from './components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ToastComponent],
  template: `
    <app-navbar />
    <router-outlet />
    <app-toast />
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--bg);
    }
  `]
})
export class App {}
