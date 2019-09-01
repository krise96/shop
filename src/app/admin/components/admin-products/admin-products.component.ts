import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductModel } from '../../../shared/models/product/product.model';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  public products: Array<ProductModel>;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.products = this.productService.fetchProducts();
  }
}
