import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Product } from './product';
import { ProductDataSource } from './product-data-source';
import { ProductSkeletonComponent } from './product-skeleton.component';
import { ProductListItemComponent } from './product-list-item.component';

@Component({
  selector: 'product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollingModule, ProductSkeletonComponent, ProductListItemComponent],
  providers: [ProductDataSource],
  styles: [
    `
      .viewport {
        height: 100%;
        width: 100%;
      }

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
    <h2>Products</h2>
    <cdk-virtual-scroll-viewport itemSize="120" class="viewport">
      <div *cdkVirtualFor="let item of dataSource; trackBy: trackByItem" class="item">
        @if (item) {
          <product-list-item [product]="item"></product-list-item>
        } @else {
          <product-skeleton></product-skeleton>
        }
      </div>
    </cdk-virtual-scroll-viewport>
  `,
})
export class ProductListComponent {
  dataSource = inject(ProductDataSource);

  trackByItem(index: number, item: Product | undefined) {
    return item ? item.id : `skeleton-${index}`;
  }
}
