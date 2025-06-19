import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';

@Injectable()
export class ProductDataSource extends DataSource<Product | undefined> {
  private service = inject(ProductService);
  readonly pageSize = this.service.loadSize;
  readonly length = this.service.total;

  private cached = Array.from<Product | undefined>({ length: this.length });
  private dataStream = new BehaviorSubject<(Product | undefined)[]>(this.cached);
  private fetchedPages = new Set<number>();
  private subscription = new Subscription();

  connect(viewer: CollectionViewer): Observable<(Product | undefined)[]> {
    this.subscription.add(
      viewer.viewChange.subscribe((range) => {
        const startPage = this.pageForIndex(range.start);
        const endPage = this.pageForIndex(range.end - 1);
        for (let page = startPage; page <= endPage; page++) {
          this.fetchPage(page);
        }
      })
    );
    return this.dataStream.asObservable();
  }

  disconnect(): void {
    this.subscription.unsubscribe();
    this.dataStream.complete();
  }

  private pageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);
    const start = page * this.pageSize;
    this.service.fetch(start, this.pageSize).then((items) => {
      this.cached.splice(start, items.length, ...items);
      this.dataStream.next(this.cached);
    });
  }
}
