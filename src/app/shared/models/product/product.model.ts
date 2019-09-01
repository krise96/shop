import { UserModel } from '../user/user.model';

export enum ProductTypes {
    Apple = 'Apple',
    Samsung = 'Samsung',
    Xiaomi = 'Xiaomi',
    Huawei = 'Huawei',
}

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ProductTypes;
  isAvailable: boolean;
  count: number;
}

export interface CardProducts {
  id: number;
  count: number;
  pricePerOne: number;
}

export interface Order {
  cardItems: Array<CardProducts>;
  products?: Array<ProductModel>;
  time: Date;
  status: string;
  owner: UserModel;
}
