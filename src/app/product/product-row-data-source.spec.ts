import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { ProductRowDataSource } from './product-row-data-source';
import { ProductDataSource } from './product-data-source';
import { Product } from './product';

describe('ProductRowDataSource', () => {
  it('groups products into rows of four', async () => {
    const products: (Product | undefined)[] = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 } as Product));
    const connect = jest.fn().mockReturnValue(of(products));
    const base = { connect, disconnect: jest.fn() } as unknown as ProductDataSource;

    TestBed.configureTestingModule({ providers: [
      { provide: ProductDataSource, useValue: base },
      ProductRowDataSource,
    ]});

    const dataSource = TestBed.inject(ProductRowDataSource);
    const viewChange = new BehaviorSubject<{start:number; end:number}>({start:0,end:1});
    const viewer: CollectionViewer = { viewChange };
    const result = await dataSource.connect(viewer).toPromise();
    expect(result).toEqual([[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }], [{ id: 5 }]]);
  });
});
