import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from './product';

@Component({
  selector: 'product-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage],
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        box-sizing: border-box;
        height: 120px;
      }
    `,
  ],
  template: `
    <a [routerLink]="['/products', product().id]">
      <img
        [ngSrc]="product().imageUrl"
        alt="{{ product().name }}"
        width="100"
        height="100"
      />
      <span>{{ product().name }}</span>
    </a>
  `,
})
export class ProductListItemComponent {
  product = input.required<Product>();
}
