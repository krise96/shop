import { Injectable } from '@angular/core';
import {  ProductModel } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardProducts: Array<number>;
  constructor() {
    this.productsFromLS();
  }

  isThisProductInCard(productId: number): boolean {
    return this.cardProducts.findIndex((element) => (element === productId)) !== -1 ? true : false;
  }

  get productList(): Array<number> {
    return JSON.parse(localStorage.getItem('products'));
  }
  addToCardProducts(productId: number) {
    if (!this.removeIfExist(productId)) {
      this.cardProducts.push(productId);
    }
    localStorage.setItem('products', JSON.stringify(this.cardProducts));
  }

  cardCount(): number {
    const arr: Array<number> = JSON.parse(localStorage.getItem('products'));
    return arr.length || 0;
  }

  private removeIfExist(productId: number): boolean {
    const index = this.cardProducts.findIndex((element) => (element === productId));
    if (index > -1) {
      this.cardProducts.splice(index, 1);
      return true;
    }
    return false;
  }

  private productsFromLS() {
    this.cardProducts = JSON.parse(localStorage.getItem('products')) || [];
  }
}
