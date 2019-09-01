import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../../shared/services/card.service';
import { DeleteOutput } from '../../../../shared/models/delete.output.types';
import { OrderPipe } from '../../../../shared/pipes/order.pipe';
import { ProductModel } from '../../../../shared/models/product/product.model';
import { OrderService } from '../../../../shared/services/order.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  public products: Array<ProductModel>;

  constructor(
    private cardService: CardService,
    private orderService: OrderService,
    private order: OrderPipe
  ) { }

  ngOnInit(): void {
    this.products = this.cardService.processedProducts;
  }

  public sortProducts(field: string, direction: boolean) {
    this.products = this.order.transform(
      this.cardService.cardProducts,
      field,
      direction
    );
  }

  public clear() {
    const confirmResult = confirm('Are you sure want to delete your card list?');
    if (confirmResult) {
      this.cardService.clearCard();
    }
  }

  public submitOrder() {
    this.orderService.addOrder(this.cardService.cardProducts);
    this.cardService.clearCard();
  }

  onRemove(deleteOutput: DeleteOutput) {
    if (!deleteOutput.multiple) {
      this.cardService.removeIfExist(deleteOutput.productId);
    } else {
      this.cardService.removeAllItemsById(deleteOutput.productId);
    }
  }
}
