import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { ProductDataSource } from './product-data-source';
import { ProductService } from './product.service';

describe('ProductDataSource', () => {
  it('calls fetch on view range', async () => {
    const fetch = jest.fn().mockResolvedValue([]);
    const service = { loadSize: 20, total: 40, fetch } as ProductService;
    TestBed.configureTestingModule({ providers: [
      { provide: ProductService, useValue: service },
      ProductDataSource,
    ]});

    const dataSource = TestBed.inject(ProductDataSource);
    const viewChange = new BehaviorSubject<{start: number; end: number}>({start:0,end:20});
    const viewer: CollectionViewer = { viewChange };
    dataSource.connect(viewer).subscribe();
    await Promise.resolve();
    expect(fetch).toHaveBeenCalledWith(0, 20);
  });
});
