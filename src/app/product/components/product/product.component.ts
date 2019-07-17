import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductModel } from '../../../shared/models/product/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  private products: Array<ProductModel>;
  private productsSubsrcribtion: Subscription;

  constructor(private productService: ProductsService) {
  }

  ngOnInit() {
    this.productsSubsrcribtion = this.productService.fetchProdycts().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnDestroy() {
    this.productsSubsrcribtion.unsubscribe();
  }

}
