import {Component, ChangeDetectionStrategy, inject, ViewEncapsulation} from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Product } from './product';
import { ProductDataSource } from './product-data-source';
import { ProductSkeletonComponent } from './product-skeleton.component';
import { ProductListItemComponent } from './product-list-item.component';

@Component({
  selector: 'product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ScrollingModule, ProductListItemComponent],
  providers: [ProductDataSource],
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper,
      .viewport {
        height: 100%;
        width: 100%;
      }

      .grid-container {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
    `,
  ],
  template: `
    <h2>Products</h2>
    <cdk-virtual-scroll-viewport itemSize="120" class="viewport">
      <div class="grid-container">
        <ng-container *cdkVirtualFor="let item of dataSource;">
            <product-list-item [product]="item"></product-list-item>
        </ng-container>
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
