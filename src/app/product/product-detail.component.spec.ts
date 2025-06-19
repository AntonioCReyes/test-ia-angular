import { render, screen } from '@testing-library/angular';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  it('should show product detail for given id', async () => {
    await render(ProductDetailComponent, {
      componentInputs: { id: 1 },
    });

    expect(await screen.findByText('Product 1')).toBeTruthy();
    expect(await screen.findByText('$ 1')).toBeTruthy();
  });
});
