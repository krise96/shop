import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product/product.types';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() product: ProductModel;
  @Output() buy = new EventEmitter<number>();

  constructor(private authService: AuthService) {
  }


  onBuy(id: number) {
    this.buy.emit(id);
  }

}
