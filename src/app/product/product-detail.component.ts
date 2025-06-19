import { Component, ChangeDetectionStrategy, computed, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { ProductService } from './product.service';

@Component({
  selector: 'product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, MatCard],
  template: `
    @if (product(); as p) {
      <mat-card>
        <mat-card-content>
          <img
            [ngSrc]="p.imageUrl"
            alt="{{ p.name }}"
            width="200"
            height="200"
          />
          <h2>{{ p.name }}</h2>
          <p>Tags: {{ p.tags.join(', ') }}</p>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-content>
          <p>Price: {{ p.price }}</p>
          <p>Rating: {{ p.rate }}</p>
          <p>{{ p.description }}</p>
        </mat-card-content>
      </mat-card>
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
