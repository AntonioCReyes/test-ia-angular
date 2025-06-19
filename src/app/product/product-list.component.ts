import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  computed,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Product } from './product';
import { ProductService } from './product.service';
import { ProductSkeletonComponent } from './product-skeleton.component';

@Component({
  selector: 'product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage, ScrollingModule, ProductSkeletonComponent],
  styles: [
    `
      .viewport {
        height: 400px;
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
      (scrolledIndexChange)="onScroll($event)"
    >
      <div
        *cdkVirtualFor="let item of items(); trackBy: trackByItem"
        class="item"
      >
        @if (item) {
          <a [routerLink]="['/products', item.id]" class="link">
            <img
              [ngSrc]="item.imageUrl"
              alt="{{ item.name }}"
              width="100"
              height="100"
            />
            <span>{{ item.name }}</span>
          </a>
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

  onScroll(index: number) {
    const threshold = this.products().length - 5;
    if (index >= threshold && this.service.hasMore() && !this.loading()) {
      this.service.loadMore();
    }
  }

  trackByItem(index: number, item: Product | undefined) {
    return item ? item.id : `skeleton-${index}`;
  }
}
