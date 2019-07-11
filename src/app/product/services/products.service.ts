import { Injectable } from '@angular/core';

import { ProductModel, ProductTypes } from '../../shared/models/product/product.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  fetchProdycts(): Observable<Array<ProductModel>> {
    return new Observable((observer) => {
      observer.next(this.products);
      observer.complete();
    });
  }

  get products(): Array<ProductModel> {
    return [
      {
        id: 0,
        category: ProductTypes.Apple,
        name: 'Iphone 5S',
        description: `The iPhone 5S (stylized and marketed as iPhone 5s) is a smartphone
         that was designed and marketed by Apple Inc. It is the seventh generation of the
         iPhone, succeeding the iPhone 5. The device was unveiled on September 10, 2013,
         at Apple's Cupertino headquarters. It was released on
         September 20, 2013, along with its lower-cost counterpart, the iPhone 5C.[15]`,
        isAvailable: false,
        price: 150
      },
      {
        id: 1,
        category: ProductTypes.Apple,
        name: 'Test phone',
        description: `The iPhone 5S (stylized and marketed as iPhone 5s) is a smartphone
         that was designed and marketed by Apple Inc. It is the seventh generation of the
         iPhone, succeeding the iPhone 5. The device was unveiled on September 10, 2013,
         at Apple's Cupertino headquarters. It was released on
         September 20, 2013, along with its lower-cost counterpart, the iPhone 5C.[15]`,
        isAvailable: true,
        price: 150
      },
      {
        id: 2,
        category: ProductTypes.Apple,
        name: 'Iphone 6S',
        description: `The iPhone 5S (stylized and marketed as iPhone 5s) is a smartphone
         that was designed and marketed by Apple Inc. It is the seventh generation of the
         iPhone, succeeding the iPhone 5. The device was unveiled on September 10, 2013,
         at Apple's Cupertino headquarters. It was released on
         September 20, 2013, along with its lower-cost counterpart, the iPhone 5C.[15]`,
        isAvailable: false,
        price: 600
      },
      {
        id: 3,
        category: ProductTypes.Xiaomi,
        name: 'Redmi Note',
        description: `The Xiaomi Redmi Note 3 is a smartphone developed by Xiaomi Inc.
        It is a part of the Xiaomi's low-end Redmi smartphone line, and has three variants.

        The MediaTek variant (codename hennessey) was released on November 24, 2015.[4]
         The Snapdragon variant (codename kenzo) was launched on February, 2016.[5]
         Redmi Note 3 Special Edition[6] (codename kate) was launched on June 2016, it
         features an upgraded modem and new housing, all the specifications except
         modem are the same as in kenzo.`,
        isAvailable: true,
        price: 600
      }
    ];
  }
}
