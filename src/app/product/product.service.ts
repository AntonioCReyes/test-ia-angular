import { Injectable, signal } from '@angular/core';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsSignal = signal<Product[]>([
    { id: 1, name: 'Item A', price: 10 },
    { id: 2, name: 'Item B', price: 20 },
  ]);

  products = this.productsSignal.asReadonly();

  getProductById(id: number): Product | undefined {
    return this.productsSignal().find((p) => p.id === id);
  }
}
