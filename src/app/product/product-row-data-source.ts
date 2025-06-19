import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './product';
import { ProductDataSource } from './product-data-source';

function chunkArray<T>(items: readonly T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

@Injectable()
export class ProductRowDataSource extends DataSource<(Product | undefined)[]> {
  private base = inject(ProductDataSource);
  private readonly perRow = 4;

  connect(viewer: CollectionViewer): Observable<(Product | undefined)[][]> {
    const adaptedViewer: CollectionViewer = {
      viewChange: viewer.viewChange.pipe(
        map((range) => ({
          start: range.start * this.perRow,
          end: range.end * this.perRow,
        }))
      ),
    };
    return this.base
      .connect(adaptedViewer)
      .pipe(map((items) => chunkArray(items, this.perRow)));
  }

  disconnect(): void {
    this.base.disconnect();
  }
}
