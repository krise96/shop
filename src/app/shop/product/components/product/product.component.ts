import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { ProductModel } from '../../../../shared/models/product/product.model';
import { Subscription } from 'rxjs';
import { CardService } from '../../../../core/services/card.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public products: Array<ProductModel>;
  private productsSubscription: Subscription;

  constructor(private productService: ProductsService, private cardService: CardService) {
  }

  ngOnInit() {
    this.productsSubscription = this.productService.fetchProducts().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
