import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductModel } from '../../../shared/models/product/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  // то, что используем в шаблоне должно быть public
  private products: Array<ProductModel>;
  private productsSubsrcibtion: Subscription;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productsSubsrcibtion = this.productService.fetchProdycts().subscribe((data) => {
      this.products = data;
    });
  }

  ngOnDestroy() {
    this.productsSubsrcibtion.unsubscribe();
  }

}
