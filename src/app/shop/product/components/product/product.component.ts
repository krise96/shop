import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../shared/services/products.service';
import { ProductModel } from '../../../../shared/models/product/product.types';
import { Observable } from 'rxjs';
import { CardService } from '../../../../shared/services/card.service';
import { OrderPipe } from '../../../../shared/pipes/order.pipe';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public products: Array<ProductModel>;
  public asyncTitle = new Observable(subscriber => subscriber.next('Mega super title!'));

  constructor(
    public cardService: CardService,
    private productService: ProductsService,
    private order: OrderPipe
  ) {
  }

  ngOnInit(): void {
    this.products = this.productService.fetchProducts();
  }

  public sortProducts(field: string, direction: boolean) {
    this.products = this.order.transform(this.products, field, direction);
  }
}
