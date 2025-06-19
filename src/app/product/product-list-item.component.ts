import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardContent,
  MatCardImage,
  MatCardTitle,
  MatCardFooter,
  MatCardActions,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Product } from './product';
import { ProductSkeletonComponent } from './product-skeleton.component';

@Component({
  selector: 'product-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgOptimizedImage,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardTitle,
    MatCardFooter,
    MatCardActions,
    MatButton,
    ProductSkeletonComponent,
  ],
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
      <mat-card class="item">
        <a [routerLink]="['/products', pr.id]">
          <img
            mat-card-image
            [ngSrc]="pr.imageUrl"
            alt="{{ pr.name }}"
            width="100"
            height="100"
          />
        </a>
        <mat-card-content>
          <h3 mat-card-title>{{ pr.name }}</h3>
        </mat-card-content>
        <mat-card-footer>
          <span>$ {{ pr.price }}</span>
        </mat-card-footer>
        <mat-card-actions>
          <a mat-button [routerLink]="['/products', pr.id]">View</a>
        </mat-card-actions>
      </mat-card>
    } @else {
      <product-skeleton></product-skeleton>
    }
  `,
})
export class ProductListItemComponent {
  product = input<Product>();
}
