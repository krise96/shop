export enum ProductTypes {
    Apple,
    Samsung,
    Xiaomi,
    Huawei,
}

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ProductTypes;
  isAvailable: boolean;
}
