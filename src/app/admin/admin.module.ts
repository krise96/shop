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
  NzSelectModule, NzTagModule
} from 'ng-zorro-antd';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { SharedModule } from '../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    AdminMainComponent,
    AdminProductComponent,
    AdminProductsComponent,
    AdminProductFormComponent,
    AdminOrdersComponent
  ],
  imports: [
    AdminRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NzInputModule,
    FormsModule,
    // Может быть стоит собрать все Nz модули в какой-то один модуль и его подключать там,
    // где нужны эти компоненты
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
    NzTagModule,
  ]
})
export class AdminModule {
}
