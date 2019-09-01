import { Injectable } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductModel } from '../../shared/models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService {


  constructor(private productsService: ProductsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProductModel {
    return this.productsService.getProductById(+route.params.productID);
  }
}
