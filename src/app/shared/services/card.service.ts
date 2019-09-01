import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Order, ProductModel } from '../models/product/product.model';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { CardProducts } from '../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public cardProducts: Array<CardProducts>;
  public processedProducts: Array<ProductModel>;
  public totalCost: number;
  public itemsInCard: number;

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private productsService: ProductsService,
    private messageService: MessageService
  ) {
    this.loadProductsForCurrentUser();
    this.loadAllProductFromCard();
    this.recalculateTotalCost();
    this.recalculateItemsInCard();
  }

  public clearCard(): void {
    this.cardProducts = [];
    this.updateCardStateForUser();
  }

  public removeAllItemsById(id: number): void {
    const index = this.cardProducts.findIndex((cp => id === cp.id));
    if (index > -1) {
      this.cardProducts.splice(index, 1);
      this.updateCardStateForUser();
      this.messageService.success('You have been removed items');
    }
  }

  public removeIfExist(id: number): void {
    const index = this.cardProducts.findIndex((cp => id === cp.id));

    if (index > -1) {
      const count = this.cardProducts[index].count--;
      if (count === 0) {
        this.removeAllItemsById(id);
      } else {
        this.messageService.success('You have been removed item');
        this.updateCardStateForUser();
      }
    }
  }

  public findCardProductById(id: number): CardProducts {
    return this.cardProducts.find((cp => id === cp.id));
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
      this.cardProducts.push(newCardProduct);
    }
    this.updateCardStateForUser();
  }

  public updateCardStateForUser(): void {
    LocalStorageService.stringifyItem(this.keyForUserCards, this.cardProducts);
    this.loadProductsForCurrentUser();
    this.recalculateTotalCost();
    this.recalculateItemsInCard();
  }

  private recalculateTotalCost(): void {
    this.totalCost = this.cardProducts.reduce((a, b) => a + (b.pricePerOne * b.count), 0);
  }

  private recalculateItemsInCard(): void {
    this.itemsInCard = this.cardProducts.reduce((a, b) => a + b.count, 0);
  }

  private get keyForUserCards(): string {
    return this.authService.activeUser ? `productListFor${this.authService.activeUser.login}` : null;
  }


  private loadAllProductFromCard(): void {
    const products = this.productsService.fetchProducts();
    this.processedProducts = products.filter((product) =>
      this.cardProducts.find((cp => product.id === cp.id))
    ).map(processedProduct => {
      processedProduct.count = this.findCardProductById(processedProduct.id).count;
      return processedProduct;
    });
  }

  private loadProductsForCurrentUser(): void {
    this.cardProducts = LocalStorageService
      .parseItem<Array<CardProducts>>(this.keyForUserCards) || [];
  }
}
