import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [ItemComponent, ProductComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ItemComponent, ProductComponent],
})
export class ProductModule { }
