export enum ProductTypes {
    Apple,
    Samsung,
    Xiaomi,
    Huawei,
}

export interface ProductModel {
  name: string;
  description: string;
  price: number;
  category: ProductTypes;
  isAvailable: boolean;
}