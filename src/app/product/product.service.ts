import { Injectable, signal } from '@angular/core';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsSignal = signal<Product[]>([
    {
      id: 1,
      name: 'Item A',
      price: 10,
      imageUrl: 'https://picsum.photos/seed/product-1/200/200',
      rate: 4,
      tags: ['popular', 'new'],
      description: 'A great item for everyday use.',
    },
    {
      id: 2,
      name: 'Item B',
      price: 20,
      imageUrl: 'https://picsum.photos/seed/product-2/200/200',
      rate: 5,
      tags: ['sale'],
      description: 'An even better item with premium features.',
    },
  ]);

  products = this.productsSignal.asReadonly();

  getProductById(id: number): Product | undefined {
    return this.productsSignal().find((p) => p.id === id);
  }
}
