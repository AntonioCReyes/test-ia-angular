import { Component, ChangeDetectionStrategy, computed, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProductService } from './product.service';

@Component({
  selector: 'product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    @if (product(); as p) {
      <h2>{{ p.name }}</h2>
      <img
        [ngSrc]="p.imageUrl"
        alt="{{ p.name }}"
        width="200"
        height="200"
      />
      <p>Price: {{ p.price }}</p>
      <p>Rating: {{ p.rate }}</p>
      <p>Tags: {{ p.tags.join(', ') }}</p>
      <p>{{ p.description }}</p>
    } @else {
      <p>Product not found</p>
    }
  `,
})
export class ProductDetailComponent {
  id = input<number>();
  private service = inject(ProductService);
  product = computed(() => this.service.getProductById(Number(this.id())));
}
