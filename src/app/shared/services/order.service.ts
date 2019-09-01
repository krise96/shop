import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';
import { CardProducts, Order } from '../models/product/product.model';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private authService: AuthService,
  ) {
  }

  get keyForStoreOrdersForUser(): string {
    return this.authService.activeUser ? `ordersFor${this.authService.activeUser.login}` : null;
  }

  public addOrder(cardProducts: Array<CardProducts>): void {
    const newOrder: Order = {
      cardItems: cardProducts,
      time: new Date(),
      status: 'NEW',
      owner: this.authService.activeUser
    };

    const orders = this.getOrdersForCurrentUser();
    orders.push(newOrder);
    LocalStorageService.stringifyItem(this.keyForStoreOrdersForUser, orders);
  }

  public getOrdersForCurrentUser(): Array<Order> {
    return LocalStorageService.parseItem<Array<Order>>(this.keyForStoreOrdersForUser) || [];
  }

  public addKeyToOrdersAdminKeys(keyToAdd: string): void {
    const adminKeys = this.orderKeys;
    if (!adminKeys.find((key => key === keyToAdd))) {
      adminKeys.push(keyToAdd);
      this.saveAdminKeys(adminKeys);
    }
  }

  public saveAdminKeys(keys: Array<string>): void {
    LocalStorageService.stringifyItem('adminKeys', keys);
  }

  public get orderKeys(): Array<string> {
    return LocalStorageService.parseItem<Array<string>>('ordersAdminKeys') || [];
  }
}
