import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from './product';
import {ProductSkeletonComponent} from './product-skeleton.component';

@Component({
  selector: 'product-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage, ProductSkeletonComponent],
  styles: [
    `
      .item {
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
    @if (product(); as pr) {
      <div class="item">
        <a [routerLink]="['/products', pr.id]">
          <img
            [ngSrc]="pr.imageUrl"
            alt="{{ pr.name }}"
            width="100"
            height="100"
          />
        </a>
        <span>{{ pr.name }}</span>
      </div>
    } @else {
      <product-skeleton></product-skeleton>
    }
  `,
})
export class ProductListItemComponent {
  product = input<Product>();
}
