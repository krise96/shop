import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverDirective } from './directives/hover.directive';
import { OrderPipe } from './pipes/order.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TimeToResponseInterceptor } from './interceptors/timeToResponse.interceptor';
import { NzModule } from './nzModule.module';



@NgModule({
  declarations: [HoverDirective, OrderPipe, KeysPipe],
  imports: [
    CommonModule,
    NzModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeToResponseInterceptor,
      multi: true
    }
  ],
  exports: [
    HoverDirective,
    OrderPipe,
    KeysPipe,
    NzModule]
})
export class SharedModule { }
