import { Injectable, signal } from '@angular/core';
import { Product } from './product';

function createProducts(count: number): Product[] {
  const tags = ['popular', 'new', 'sale', 'featured', 'limited'];
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: ((i * 17) % 100) + 1,
    imageUrl: `https://picsum.photos/seed/product-${i + 1}/200/200`,
    rate: ((i * 11) % 5) + 1,
    tags: [tags[i % tags.length]],
    description: `Description for product ${i + 1}.`,
  }));
}

const ALL_PRODUCTS = createProducts(1000);
const LOAD_SIZE = 20;

@Injectable({ providedIn: 'root' })
export class ProductService {
  private all = ALL_PRODUCTS;
  readonly loadSize = LOAD_SIZE;
  readonly total = ALL_PRODUCTS.length;

  private productsSignal = signal<Product[]>([]);
  products = this.productsSignal.asReadonly();

  async fetch(offset: number, limit: number): Promise<Product[]> {
    const start = offset;
    const end = Math.min(offset + limit, this.all.length);
    await new Promise((r) => setTimeout(r, 500));
    return this.all.slice(start, end);
  }

  getProductById(id: number): Product | undefined {
    return this.all.find((p) => p.id === id);
  }
}
