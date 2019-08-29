import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Subscription } from 'rxjs';
import { ProductModel } from '../../shared/models/product/product.model';
import { LocalStorageService } from './local-storage.service';
import { CardItemType } from '../../shop/card-list/models/card-item.types';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public cardProducts: Array<ProductModel>;
  public cardProductIds: Array<number>;
  public totalCost = 0;

  private productsSubscription: Subscription;

  constructor(private productService: ProductsService, private localStorageService: LocalStorageService) {
    this.productsFromLS();
    this.loadProducts();
  }

  get cardProductsWithCount(): Array<CardItemType> {
    return this.cardProducts.map((product) => {
      return {
        product,
        count: this.getCountById(product.id)
      };
    });
  }

  recalculateTotalCost(): void {
    this.totalCost = this.cardProducts.reduce((a, b) => a + (b.price * this.getCountById(b.id)), 0);
  }

  clearCard(): void {
    this.cardProductIds = [];
    this.localStorageService.stringifyItem('products', []);
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    this.productsSubscription =
      this.productService.fetchProducts().subscribe((data) => {
        this.cardProducts = data.filter((product) =>
          this.isThisProductInCard(product.id)
        );
        this.recalculateTotalCost();
    });
  }

  isThisProductInCard(productId: number): boolean {
    return this.cardProductIds.findIndex((element) => (element === productId)) !== -1;
  }

  addToCardProductIds(productId: number, count: number = 1) {
    this.cardProductIds.push(...new Array(count).fill(productId));
    this.localStorageService.stringifyItem('products', this.cardProductIds);
    this.loadProducts();
  }

  cardCount(): number {
    const arr: Array<number> = this.localStorageService.parseItem<Array<number>>('products') || [];
    return arr.length;
  }

  getCountById(productId: number): number {
    return this.cardProductIds.filter((el) => el === productId).length;
  }

  removeAllItemsById(productId: number): void {
    let index = this.cardProductIds.indexOf(productId);
    while (index > -1) {
      this.cardProductIds.splice(index, 1);
      index = this.cardProductIds.indexOf(productId);
    }
    this.localStorageService.stringifyItem('products', this.cardProductIds);
    this.loadProducts();
  }

  removeIfExist(productId: number): void {
    const index = this.cardProductIds.indexOf(productId);
    if (index > -1) {
      this.cardProductIds.splice(index, 1);
      this.localStorageService.stringifyItem('products', this.cardProductIds);
      this.loadProducts();
    }
  }

  private productsFromLS() {
    this.cardProductIds = this.localStorageService.parseItem<Array<number>>('products') || [];
  }
}
