import { render, screen } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  it('should display the first product after load', async () => {
    await render(ProductListComponent, {
      imports: [RouterTestingModule],
    });

    expect(await screen.findByText('Product 1')).toBeTruthy();
  });
});
