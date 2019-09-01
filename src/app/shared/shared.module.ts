import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverDirective } from './directives/hover.directive';
import { OrderPipe } from './pipes/order.pipe';
import { KeysPipe } from './pipes/keys.pipe';



@NgModule({
  declarations: [HoverDirective, OrderPipe, KeysPipe],
  imports: [
    CommonModule
  ],
  exports: [HoverDirective, OrderPipe, KeysPipe]
})
export class SharedModule { }
