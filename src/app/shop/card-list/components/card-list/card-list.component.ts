import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../../core/services/card.service';
import { ProductModel } from '../../../../shared/models/product/product.model';
import { CardItemType } from '../../models/card-item.types';
import { DeleteOutput } from '../../../../shared/models/delete.output.types';
import { OrderPipe } from '../../../../shared/pipes/order.pipe';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  public products: Array<CardItemType>;

  constructor(
    private cardService: CardService,
    private order: OrderPipe
  ) { }

  ngOnInit(): void {
    this.products = this.cardService.cardProductsWithCount;
  }

  onRemove(deleteOutput: DeleteOutput) {
    if (!deleteOutput.multiple) {
      this.cardService.removeIfExist(deleteOutput.productId);
    } else {
      this.cardService.removeAllItemsById(deleteOutput.productId);
    }
  }

  sortProducts(field: string, direction: boolean) {
    this.products = this.order.transform(this.cardService.cardProductsWithCount, field, direction);
  }

  clear() {
    const confirmResult = confirm('Are you sure want to delete your card list?');
    if (confirmResult) {
      this.cardService.clearCard();
    }
  }
}
