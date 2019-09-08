import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product/product.types';
import { initProducts } from './mocks';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productList: Array<ProductModel> = null;

  constructor() {
    this.initProductsService();
  }

  public fetchProducts(): Array<ProductModel> {
    return [...this.productList];
  }

  public addNewProduct(id: number, newProduct: ProductModel): void {
    this.productList.push(newProduct);
    this.saveCurrentState();
  }

  public updateProduct(product: ProductModel) {
    let productToUpdate = this.getProductById(product.id);
    if (productToUpdate) {
      productToUpdate = product;
      this.saveCurrentState();
    } else {
      console.error('ProductsService: Can\'t find product with id: ', product.id);
    }
  }

  public getProductById(id: number): ProductModel {
    return this.productList.find((p) => p.id === id);
  }

  private initProductsService(): void {
    this.productList = LocalStorageService.parseItem<Array<ProductModel>>('productsList');
    if (!this.productList) {
      this.feelLocalStorage();
    }
  }

  private feelLocalStorage(): void {
    this.saveCurrentState(initProducts);
    this.initProductsService();
  }

  private saveCurrentState(initPhones?: Array<ProductModel>) {
    const productsToAdd = initPhones || this.productList;
    LocalStorageService.stringifyItem('productsList', productsToAdd);
  }
}
