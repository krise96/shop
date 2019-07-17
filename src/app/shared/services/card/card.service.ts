import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardProducts: Array<number>;
  constructor() {
    this.productsFromLS();
  }

  isThisProductInCard(productId: number): boolean {
    return this.cardProducts.findIndex((element) => (element === productId)) !== -1;
  }

  get productList(): Array<number> {
    return JSON.parse(localStorage.getItem('products'));
  }

  addToCardProducts(productId: number) {
    this.cardProducts.push(productId);
    localStorage.setItem('products', JSON.stringify(this.cardProducts));
  }

  cardCount(): number {
    const arr: Array<number> = JSON.parse(localStorage.getItem('products')) || [];
    return arr.length;
  }

  getCountById(productId: number): number {
    return this.cardProducts.filter((el) => el === productId).length;
  }

  removeIfExist(productId: number): void {
    const index = this.cardProducts.indexOf(productId);
    if (index > -1) {
      this.cardProducts.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(this.cardProducts));
    }
  }

  private productsFromLS() {
    this.cardProducts = JSON.parse(localStorage.getItem('products')) || [];
  }
}
