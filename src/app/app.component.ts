import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Online Store</h1>
    <nav>
      <a routerLink="/products">Products</a>
    </nav>
    <router-outlet />
  `,
})
export class AppComponent {}
