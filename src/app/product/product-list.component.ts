import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  computed,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
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
        *cdkVirtualFor="let product of products(); trackBy: trackById"
        class="item"
      >
        <a [routerLink]="['/products', product.id]" class="link">
          <img
            [ngSrc]="product.imageUrl"
            alt="{{ product.name }}"
            width="100"
            height="100"
          />
          <span>{{ product.name }}</span>
        </a>
      </div>
    </cdk-virtual-scroll-viewport>
    @if (loading()) {
      @for (_ of skeletonArray(); track $index) {
        <product-skeleton></product-skeleton>
      }
    }
  `,
})
export class ProductListComponent implements OnInit {
  private service = inject(ProductService);
  products = this.service.products;
  loading = this.service.loading;
  skeletonArray = computed(() => Array.from({ length: this.service.loadSize }, (_, i) => i));

  ngOnInit() {
    this.service.loadMore();
  }

  onScroll(index: number) {
    const threshold = this.products().length - 5;
    if (index >= threshold && this.service.hasMore() && !this.loading()) {
      this.service.loadMore();
    }
  }

  trackById(_: number, item: Product) {
    return item.id;
  }
}
