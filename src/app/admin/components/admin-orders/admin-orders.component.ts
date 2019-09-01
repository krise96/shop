import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order, ProductModel } from '../../../shared/models/product/product.model';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  public userOrders: Array<Array<Order>>;
  private destroy$ = new Subject();

  constructor(
    private orderService: OrderService,
    private productService: ProductsService,
  ) { }

  ngOnInit() {
    this.orderService.ordersForAllUsers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(userOrders => {
        userOrders.forEach(orders => {
          orders.forEach((order) => {
            order.products = order.cardItems.map(card => {
              const product = this.getProductByOrderId(card.id);
              product.count = card.count;
              return product;
            });
          });
          return orders;
        });
        this.userOrders = userOrders;
      });
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  public getProductByOrderId(id: number): ProductModel {
    return this.productService.getProductById(id);
  }

}
