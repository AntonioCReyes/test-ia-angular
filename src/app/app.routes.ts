import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', loadComponent: () => ProductListComponent },
];
