import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../../shared/services/card.service';
import { DeleteOutput } from '../../../../shared/models/delete.output.types';
import { OrderPipe } from '../../../../shared/pipes/order.pipe';
import { ProductModel } from '../../../../shared/models/product/product.types';
import { OrderService } from '../../../../shared/services/order.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  public products: Array<ProductModel>;

  constructor(
    public cardService: CardService,
    private orderService: OrderService,
    private order: OrderPipe
  ) { }

  ngOnInit(): void {
    this.cardService.processedProducts$.subscribe(products => this.products = products);
  }

  public sortProducts(field: string, direction: boolean): void {
    this.products = this.order.transform(
      this.cardService.cardProducts$.value,
      field,
      direction
    );
  }

  public clear(): void {
    const confirmResult = confirm('Are you sure want to delete your card list?');
    if (confirmResult) {
      this.cardService.clearCard();
    }
  }

  public submitOrder(): void {
    this.orderService.addOrder(this.cardService.cardProducts$.value);
    this.cardService.clearCard();
  }

  public onRemove(deleteOutput: DeleteOutput): void {
    if (!deleteOutput.multiple) {
      this.cardService.removeIfExist(deleteOutput.productId);
    } else {
      this.cardService.removeAllItemsById(deleteOutput.productId);
    }
  }
}
