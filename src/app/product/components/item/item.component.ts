import { Component, OnInit, Input } from '@angular/core';
import { ProductTypes } from 'src/app/shared/models/product/product.model';
import { CardService } from 'src/app/shared/services/card/card.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() price: string;
  @Input() category: ProductTypes;
  @Input() isAvailable: boolean;

  constructor(private cardService: CardService) {
  }

  ngOnInit() {
    console.log('isAvailable', this.isAvailable, typeof this.isAvailable);
  }

  buttonText(id: number) {
    return this.cardService.isThisProductInCard(id) ? 'Remove from card' : 'Buy';
  }

  onBuy(id: number) {
    this.cardService.addToCardProducts(id);
  }

}
