import { Component, OnInit } from '@angular/core';
import { CardService } from '../shared/services/card/card.service';
import { ProductsService } from '../product/services/products.service';
import { ProductModel } from '../shared/models/product/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  private products: Array<ProductModel>;
  private cardProducts: Array<number>;
  private productsSubsrcibtion: Subscription;

  constructor(private cardService: CardService, private productService: ProductsService) { }

  ngOnInit() {
    // нет отписки
    this.productsSubsrcibtion = this.productService.fetchProdycts().subscribe((data) => {
      this.products = data;
    });
    this.cardProducts = this.cardService.productList; // не понял, где используется
  }

  get cardProductsItem(): Array<ProductModel> {
    return this.products.filter((product) => {
      return this.cardService.isThisProductInCard(product.id);
    });
  }

  get totalPrice(): number {
    return this.cardProductsItem.reduce((a, b) => a + b.price, 0);
  }

  onRemove(productId: number) {
    this.cardService.addToCardProducts(productId);
  }
}
