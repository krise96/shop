import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';
import { CardProducts, Order } from '../models/product/product.model';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public ordersForCurrentUser$: BehaviorSubject<Array<Order>> = new BehaviorSubject([]);
  public ordersForAllUsers$: BehaviorSubject<Array<Array<Order>>> = new BehaviorSubject([]);


  constructor(
    private authService: AuthService,
  ) {
    this.authService.activeUser$.pipe(filter(user => !!user)).subscribe(() => {
      this.update();
    });
  }

  public addOrder(cardProducts: Array<CardProducts>): void {
    const newOrder: Order = {
      cardItems: cardProducts,
      time: new Date(),
      status: 'NEW',
      owner: this.authService.activeUser$.value
    };

    const orders = [...this.ordersForCurrentUser$.value, newOrder];
    LocalStorageService.stringifyItem(this.getKeyForStoreOrdersForUser(), orders);
    this.addKeyToOrdersAdminKeys(this.authService.activeUser$.value.login);
    this.update();
  }

  public update(): void {
    this.getOrdersForCurrentUser();
    this.getOrderForEachUser();
  }

  public getOrdersForCurrentUser(): void {
    this.ordersForCurrentUser$
      .next(LocalStorageService
        .parseItem<Array<Order>>(this.getKeyForStoreOrdersForUser()) || []);
  }

  public addKeyToOrdersAdminKeys(keyToAdd: string): void {
    const adminKeys = this.orderKeys;
    if (!adminKeys.find((key => key === keyToAdd))) {
      adminKeys.push(keyToAdd);
      this.saveAdminKeys(adminKeys);
    }
  }

  public getOrderForEachUser(): void {
    this.ordersForAllUsers$.next(
      this.getAdminKeys().map(adminKey => this.getOrdersForByUser(this.getKeyForStoreOrdersForUser(adminKey)))
    );
  }

  public getAdminKeys(): Array<string> {
    return LocalStorageService.parseItem<Array<string>>('adminKeys') || [];
  }

  public saveAdminKeys(keys: Array<string>): void {
    LocalStorageService.stringifyItem('adminKeys', keys);
  }

  public get orderKeys(): Array<string> {
    return LocalStorageService.parseItem<Array<string>>('ordersAdminKeys') || [];
  }

  private getOrdersForByUser(key: string): Array<Order> {
    return LocalStorageService.parseItem<Array<Order>>(key) || [];
  }

  private getKeyForStoreOrdersForUser(user?: string): string {
    const search = user || this.authService.activeUser$.value.login;
    return search ? `ordersFor${search}` : null;
  }
}
