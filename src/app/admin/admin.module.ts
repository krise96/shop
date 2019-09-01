import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  NzButtonModule,
  NzCheckboxModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule, NzInputNumberModule,
  NzListModule, NzMenuModule,
  NzSelectModule
} from 'ng-zorro-antd';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminMainComponent,
    AdminProductComponent,
    AdminProductsComponent,
    AdminProductFormComponent
  ],
  imports: [
    AdminRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NzInputModule,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzCheckboxModule,
    NzListModule,
    SharedModule,
    NzIconModule,
    NzSelectModule,
    NzInputNumberModule,
    NzMenuModule,
  ]
})
export class AdminModule {
}
