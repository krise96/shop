import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverDirective } from './directives/hover.directive';
import { OrderPipe } from './pipes/order.pipe';



@NgModule({
  declarations: [HoverDirective, OrderPipe],
  imports: [
    CommonModule
  ],
  exports: [HoverDirective, OrderPipe]
})
export class SharedModule { }
