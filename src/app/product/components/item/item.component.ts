import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product/product.model';
import { CardService } from 'src/app/shared/services/card/card.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() product: ProductModel;

  constructor(private cardService: CardService) {
  }

  ngOnInit() {
    console.log('isAvailable', this.product.isAvailable, typeof this.product.isAvailable);
  }

  buttonText(id: number) {
    return this.cardService.isThisProductInCard(id) ? 'Remove from card' : 'Buy';
  }

  onBuy(id: number) {
    this.cardService.addToCardProducts(id);
  }

}
