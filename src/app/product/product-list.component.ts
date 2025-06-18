import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Products</h2>
    <ul>
      @for (product of products(); track product.id) {
        <li>
          <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
        </li>
      }
    </ul>
  `,
})
export class ProductListComponent {
  products = this.service.products;

  constructor(private service: ProductService) {}
}
