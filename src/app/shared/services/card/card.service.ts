import { Injectable } from '@angular/core';
import { ProductsService } from '../../../product/services/products.service';
import { Subscription } from 'rxjs';
import { ProductModel } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public cardProducts: Array<ProductModel>;
  private cardProductIds: Array<number>;
  private productsSubscription: Subscription;

  constructor(private productService: ProductsService) {
    this.productsFromLS();
    this.loadProducts();
  }

  get fullPrice(): number {
    return this.cardProducts.reduce((a, b) => a + (b.price * this.getCountById(b.id)), 0);
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
    });
  }

  isThisProductInCard(productId: number): boolean {
    return this.cardProductIds.findIndex((element) => (element === productId)) !== -1;
  }

  addToCardProductIds(productId: number) {
    this.cardProductIds.push(productId);
    localStorage.setItem('products', JSON.stringify(this.cardProductIds));
    this.loadProducts();
  }

  cardCount(): number {
    const arr: Array<number> = JSON.parse(localStorage.getItem('products')) || [];
    return arr.length;
  }

  getCountById(productId: number): number {
    return this.cardProductIds.filter((el) => el === productId).length;
  }

  removeIfExist(productId: number): void {
    const index = this.cardProductIds.indexOf(productId);
    if (index > -1) {
      this.cardProductIds.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(this.cardProductIds));
      this.loadProducts();
    }
  }

  private productsFromLS() {
    this.cardProductIds = JSON.parse(localStorage.getItem('products')) || [];
  }
}
