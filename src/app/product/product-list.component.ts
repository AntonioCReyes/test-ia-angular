import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <h2>Products</h2>
    <ul>
      @for (product of products(); track product.id) {
        <li>
          <a [routerLink]="['/products', product.id]">
            <img
              [ngSrc]="product.imageUrl"
              alt="{{ product.name }}"
              width="50"
              height="50"
            />
            {{ product.name }}
          </a>
        </li>
      }
    </ul>
  `,
})
export class ProductListComponent {
  private service = inject(ProductService);
  products = this.service.products;
}
