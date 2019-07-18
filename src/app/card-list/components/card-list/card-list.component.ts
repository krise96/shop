import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../shared/services/card/card.service';
import { ProductModel } from '../../../shared/models/product/product.model';
import { CardItemType } from '../../models/card-item.types';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  public products: Array<ProductModel>;

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.products = this.cardService.cardProducts;
    console.log('CardListComponent products', this.products);
  }

  onRemove(productId: number) {
    this.cardService.removeIfExist(productId);
  }

  productWithCount(product: ProductModel): CardItemType {
    return {
      product,
      count: this.cardService.getCountById(product.id)
    };
  }
}
