import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Order, ProductModel } from '../../shared/models/product/product.model';
import { CardService } from '../../shared/services/card.service';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orders: Array<Order>;

  constructor(
    private orderService: OrderService,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    //this.orders = this.orderService;
  }

}
