import { Component, ChangeDetectionStrategy, computed, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProductService } from './product.service';

@Component({
  selector: 'product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    @if (product(); as p) {
      <article class="detail">
        <header>
          <h2 class="name">{{ p.name }}</h2>
        </header>
        <figure class="preview">
          <img
            [ngSrc]="p.imageUrl"
            alt=""
            width="300"
            height="300"
          />
          <figcaption class="visually-hidden">{{ p.name }}</figcaption>
        </figure>
        <section class="meta">
          <p class="price">$ {{ p.price }}</p>
          <p class="rating">Rating: {{ p.rate }}</p>
          <ul class="tags">
            @for (tag of p.tags; track tag) {
              <li>{{ tag }}</li>
            }
          </ul>
          <p class="description">{{ p.description }}</p>
        </section>
      </article>
    } @else {
      <p>Product not found</p>
    }
  `,
  styles: [
    `
      .detail {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 1rem;
        align-items: start;
      }

      figure {
        margin: 0;
      }

      .meta {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .tags {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.5rem;
      }

      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
      }
    `
  ]
})
export class ProductDetailComponent {
  id = input<number>();
  private service = inject(ProductService);
  product = computed(() => this.service.getProductById(Number(this.id())));
}
