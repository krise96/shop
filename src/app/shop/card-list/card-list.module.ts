import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './components/card-item/card-item.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { SharedModule } from '../../shared/shared.module';
import { OrderPipe } from '../../shared/pipes/order.pipe';



@NgModule({
  declarations: [CardItemComponent, CardListComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [OrderPipe],
  exports: [CardItemComponent, CardListComponent],
})
export class CardListModule { }
