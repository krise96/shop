import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { AuthenticatedGuard } from '../shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { ProductResolverService } from './services/product-resolver.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminMainComponent,
    canActivate: [AuthenticatedGuard, RoleGuard],
    data: {shouldBeAdmin: true},
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        component: AdminProductsComponent
      },
      {
        path: 'products/add',
        component: AdminProductComponent
      },
      {
        path: 'products/edit/:productID',
        resolve: {
          product: ProductResolverService
        },
        component: AdminProductComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
