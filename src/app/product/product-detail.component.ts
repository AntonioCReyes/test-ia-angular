import { Component, Input, OnChanges } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'product-detail',
  standalone: true,
  template: `
    @if (product; as p) {
      <h2>{{ p.name }}</h2>
      <p>Price: {{ p.price }}</p>
    } @else {
      <p>Product not found</p>
    }
  `,
})
export class ProductDetailComponent implements OnChanges {
  @Input() id!: number;
  product?: Product;

  constructor(private service: ProductService) {}

  ngOnChanges() {
    this.product = this.service.getProductById(Number(this.id));
  }
}
