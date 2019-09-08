import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductTypes, ProductModel } from '../../../shared/models/product/product.types';
import { Router } from '@angular/router';

const nullProductModel = {
  id: null,
  category: null,
  name: '',
  description: '',
  isAvailable: null,
  price: null,
  count: null
};

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent {

  @ViewChild('form', {static: false}) form: NgForm;
  @Input() product: ProductModel = {...nullProductModel};
  @Input() saveButtonText: string;

  @Output() whenSubmit = new EventEmitter<ProductModel>();

  public categories = ProductTypes;

  constructor(private router: Router) {}

  public onSubmit(): void {
    this.whenSubmit.emit(this.product);
    this.router.navigateByUrl('/admin/products');
  }
}
