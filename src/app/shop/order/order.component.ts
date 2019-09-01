import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Order, ProductModel } from '../../shared/models/product/product.model';
import { CardService } from '../../shared/services/card.service';
import { ProductsService } from '../../shared/services/products.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  public orders: Array<Order>;
  private destroy$ = new Subject();

  constructor(
    private orderService: OrderService,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.orderService.ordersForCurrentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(orders => {
        orders.forEach(order => {
          order.products = order.cardItems.map(card => {
            const product = this.getProductByOrderId(card.id);
            product.count = card.count;
            return product;
          });
        });
        this.orders = orders;
      });
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  public getProductByOrderId(id: number): ProductModel {
    return this.productService.getProductById(id);
  }

}
