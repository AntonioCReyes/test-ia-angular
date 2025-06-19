import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Product } from './product';
import { ProductDataSource } from './product-data-source';
import { ProductRowDataSource } from './product-row-data-source';
import { ProductListItemComponent } from './product-list-item.component';

@Component({
  selector: 'product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ScrollingModule, ProductListItemComponent],
  providers: [ProductDataSource, ProductRowDataSource],
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .viewport {
        height: 100%;
        width: 100%;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
    `,
  ],
  template: `
    <h2>Products</h2>
    <cdk-virtual-scroll-viewport itemSize="120" class="viewport">
      <div class="grid-container">
        <ng-container *cdkVirtualFor="let row of rowData; trackBy: trackByRow">
          @for (item of row; track trackByItem) {
            <product-list-item [product]="item"></product-list-item>
          }
        </ng-container>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
})
export class ProductListComponent {
  rowData = inject(ProductRowDataSource);

  trackByRow(index: number): number {
    return index;
  }
  trackByItem(index: number, item: Product | undefined): number | string {
    return item ? item.id : `skeleton-${index}`;
  }
}
