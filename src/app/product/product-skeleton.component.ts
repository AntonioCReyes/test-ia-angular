import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardImage,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'product-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
  ],
  template: `
    <mat-card class="skeleton-item">
      <mat-card-content>
        <div class="skeleton-img"></div>
      </mat-card-content>
      <mat-card-content style="height: 16px">
        <span class="skeleton-text price"></span>
      </mat-card-content>
      <mat-card-actions>
        <span class="skeleton-btn"></span>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .skeleton-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-sizing: border-box;
        height: 250px;
        animation: pulse 1.5s infinite;
      }

      .skeleton-img {
        width: 100%;
        height: 150px;
        background: #ccc;
      }

      .skeleton-text {
        display: block;
        height: 16px;
        background: #ddd;
      }

      .skeleton-text.price {
        width: 40%;
      }

      .skeleton-btn {
        width: 100%;
        height: 36px;
        background: #ddd;
        border-radius: 4px;
      }


      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
        100% {
          opacity: 1;
        }
      }
    `,
  ],
})
export class ProductSkeletonComponent {}
