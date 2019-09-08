import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { ProductModel } from '../models/product/product.types';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { CardProducts } from '../models/product/product.types';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public cardProducts$: BehaviorSubject<Array<CardProducts>> = new BehaviorSubject([]);
  public processedProducts$: BehaviorSubject<Array<ProductModel>> = new BehaviorSubject([]);
  public totalCost: number;
  public itemsInCard: number;

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private productsService: ProductsService,
    private messageService: MessageService
  ) {
    this.authService.activeUser$.pipe(filter(user => !!user)).subscribe((user) => {
      this.updateCardStateForUser();
    });
  }

  public clearCard(): void {
    this.cardProducts$.next([]);
    this.updateCardStateForUser();
  }

  public removeAllItemsById(id: number): void {
    const index = this.cardProducts$.value.findIndex((cp => id === cp.id));
    if (index > -1) {
      this.cardProducts$.value.splice(index, 1);
      this.updateCardStateForUser();
      this.messageService.success('You have been removed items');
    }
  }

  public removeIfExist(id: number): void {
    const index = this.cardProducts$.value.findIndex((cp => id === cp.id));

    if (index > -1) {
      const count = this.cardProducts$.value[index].count--;
      if (count === 0) {
        this.removeAllItemsById(id);
      } else {
        this.messageService.success('You have been removed item');
        this.updateCardStateForUser();
      }
    }
  }

  public findCardProductById(id: number): CardProducts {
    return this.cardProducts$.value.find((cp => id === cp.id));
  }

  public addToCard(id: number): void {
    const product = this.findCardProductById(id);
    if (product) {
      product.count++;
    } else {
      const newCardProduct = {
        id,
        count: 1,
        pricePerOne: this.productsService.getProductById(id).price
      };
      const newCardProducts = [...this.cardProducts$.value, newCardProduct];
      this.cardProducts$.next(newCardProducts);
    }
    this.updateCardStateForUser();
  }

  public updateCardStateForUser(): void {
    LocalStorageService.stringifyItem(this.keyForUserCards, this.cardProducts$.value);
    this.loadProductsForCurrentUser();
    this.recalculateTotalCost();
    this.recalculateItemsInCard();
    this.loadAllProductFromCard();
  }

  private recalculateTotalCost(): void {
    this.totalCost = this.cardProducts$.value.reduce((a, b) => a + (b.pricePerOne * b.count), 0);
  }

  private recalculateItemsInCard(): void {
    this.itemsInCard = this.cardProducts$.value.reduce((a, b) => a + b.count, 0);
  }

  private get keyForUserCards(): string {
    return this.authService.activeUser$.value ? `productListFor${this.authService.activeUser$.value.login}` : null;
  }


  private loadAllProductFromCard(): void {
    const products = this.productsService.fetchProducts();
    this.processedProducts$.next(products.filter((product) =>
      this.cardProducts$.value.find((cp => product.id === cp.id))
    ).map(processedProduct => {
      processedProduct.count = this.findCardProductById(processedProduct.id).count;
      return processedProduct;
    }));
  }

  private loadProductsForCurrentUser(): void {
    this.cardProducts$.next(LocalStorageService
      .parseItem<Array<CardProducts>>(this.keyForUserCards) || []);
  }
}
