import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product/product.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() product: ProductModel;
  @Output() buy = new EventEmitter<number>();

  onBuy(id: number) {
    this.buy.emit(id);
  }

}
