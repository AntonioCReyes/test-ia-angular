import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', loadComponent: () => ProductListComponent },
  { path: 'products/:id', loadComponent: () => ProductDetailComponent },
];
