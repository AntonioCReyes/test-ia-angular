import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  computed,
  viewChild,
} from '@angular/core';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Product } from './product';
import { ProductService } from './product.service';
import { ProductSkeletonComponent } from './product-skeleton.component';
import { ProductListItemComponent } from './product-list-item.component';

@Component({
  selector: 'product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollingModule, ProductSkeletonComponent, ProductListItemComponent],
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
    <cdk-virtual-scroll-viewport
      itemSize="120"
      class="viewport"
      (scrolledIndexChange)="onScroll()"
    >
      <div
        *cdkVirtualFor="let item of items(); trackBy: trackByItem"
        class="item"
      >
        @if (item) {
          <product-list-item [product]="item"></product-list-item>
        } @else {
          <product-skeleton></product-skeleton>
        }
      </div>
    </cdk-virtual-scroll-viewport>
  `,
})
export class ProductListComponent implements OnInit {
  private service = inject(ProductService);
  products = this.service.products;
  loading = this.service.loading;

  viewport = viewChild(CdkVirtualScrollViewport);

  skeletonCount = computed(() =>
    Math.min(this.service.loadSize, this.service.remaining())
  );

  items = computed(() => {
    const list: Array<Product | undefined> = [...this.products()];
    if (this.loading()) {
      list.push(
        ...Array.from({ length: this.skeletonCount() }, () => undefined)
      );
    }
    return list;
  });

  ngOnInit() {
    this.service.loadMore();
  }

  onScroll() {
    const end = this.viewport()?.getRenderedRange().end;
    const threshold = this.products().length - 5;
    if (end && end >= threshold && this.service.hasMore() && !this.loading()) {
      this.service.loadMore();
    }
  }

  trackByItem(index: number, item: Product | undefined) {
    return item ? item.id : `skeleton-${index}`;
  }
}
