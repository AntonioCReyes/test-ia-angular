import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'product-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton-item">
      <div class="skeleton-img"></div>
      <div class="skeleton-text"></div>
    </div>
  `,
  styles: [
    `
      .skeleton-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        box-sizing: border-box;
        height: 120px;
        animation: pulse 1.5s infinite;
        background: #eee;
      }

      .skeleton-img {
        width: 100px;
        height: 100px;
        background: #ccc;
      }

      .skeleton-text {
        width: 150px;
        height: 16px;
        background: #ddd;
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
