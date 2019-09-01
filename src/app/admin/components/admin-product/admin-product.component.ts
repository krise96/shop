import { Component, ViewChild } from '@angular/core';
import { ProductModel } from '../../../shared/models/product/product.model';
import { AdminProductFormComponent } from '../admin-product-form/admin-product-form.component';
import { ProductsService } from '../../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import uuid from 'uuid';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {
  @ViewChild(AdminProductFormComponent, {static: false}) productForm: AdminProductFormComponent;
  product: ProductModel;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe(({product}) => {
      this.product = product;
      console.log(product);
    });
  }

  public createProduct(product: ProductModel): void {
    this.productsService.addNewProduct(uuid(), product);
  }

  public updateProduct(product: ProductModel): void {
    this.productsService.updateProduct(product);
  }
}
