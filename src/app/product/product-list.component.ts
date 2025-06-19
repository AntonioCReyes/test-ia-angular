import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ProductService } from './product.service';

@Component({
  selector: 'product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage, MatGridList, MatGridTile],
  template: `
    <h2>Products</h2>
    <mat-grid-list #grid [cols]="cols()" rowHeight="2:1">
      @for (product of products(); track product.id) {
        <mat-grid-tile>
          <a [routerLink]="['/products', product.id]">
            <img
              [ngSrc]="product.imageUrl"
              alt="{{ product.name }}"
              width="100"
              height="100"
            />
            <span>{{ product.name }}</span>
          </a>
        </mat-grid-tile>
      }
    </mat-grid-list>
  `,
})
export class ProductListComponent implements AfterViewInit, OnDestroy {
  @ViewChild('grid', { static: true }) grid?: ElementRef<HTMLElement>;

  private service = inject(ProductService);
  products = this.service.products;

  cols = signal(2);
  private observer?: ResizeObserver;

  ngAfterViewInit() {
    const updateCols = () => {
      const width = this.grid?.nativeElement.clientWidth ?? 0;
      const min = 200;
      const computedCols = Math.max(1, Math.floor(width / min));
      this.cols.set(computedCols);
    };

    updateCols();
    if (this.grid) {
      this.observer = new ResizeObserver(updateCols);
      this.observer.observe(this.grid.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
