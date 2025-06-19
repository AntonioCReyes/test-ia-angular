import { ProductService } from './product.service';

describe('ProductService', () => {
  it('fetch returns a slice of products', async () => {
    const service = new ProductService();
    const items = await service.fetch(0, 3);
    expect(items).toHaveLength(3);
    expect(items[0].id).toBe(1);
    expect(items[2].id).toBe(3);
  });

  it('getProductById returns the correct product', () => {
    const service = new ProductService();
    const product = service.getProductById(5);
    expect(product?.id).toBe(5);
  });
});
