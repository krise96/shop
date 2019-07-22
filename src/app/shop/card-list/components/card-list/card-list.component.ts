import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../../core/services/card.service';
import { ProductModel } from '../../../../shared/models/product/product.model';
import { CardItemType } from '../../models/card-item.types';
import { DeleteOutput } from '../../../../shared/models/delete.output.types';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {

  constructor(private cardService: CardService) { }

  onRemove(deleteOutput: DeleteOutput) {
    if (!deleteOutput.multiple) {
      this.cardService.removeIfExist(deleteOutput.productId);
    } else {
      this.cardService.removeAllItemsById(deleteOutput.productId);
    }
  }

  productWithCount(product: ProductModel): CardItemType {
    return {
      product,
      count: this.cardService.getCountById(product.id)
    };
  }

  clear() {
    const confirmResult = confirm('Are you sure want to delete your card list?');
    if (confirmResult) {
      this.cardService.clearCard();
    }
  }
}
