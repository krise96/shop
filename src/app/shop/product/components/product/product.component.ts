import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { ProductModel } from '../../../../shared/models/product/product.model';
import { Observable, Subscription } from 'rxjs';
import { CardService } from '../../../../core/services/card.service';
import { OrderPipe } from '../../../../shared/pipes/order.pipe';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public products: Array<ProductModel>;
  public asyncTitle = new Observable(subscriber => subscriber.next('Mega super title!'));
  private productsSubscription: Subscription;

  constructor(
    private productService: ProductsService, private cardService: CardService,
    private order: OrderPipe
  ) {
  }

  ngOnInit() {
    this.productsSubscription = this.productService.fetchProducts().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  sortProducts(field: string, direction: boolean) {
    this.products = this.order.transform(this.products, field, direction);
  }
}
