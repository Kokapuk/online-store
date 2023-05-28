export interface UserData {
  login: string;
}

export interface User extends UserData {
  _id: string;
}

export interface ProductData {
  name: string;
  price: number;
  imageUrl: string;
}

export interface Product extends ProductData {
  _id: string;
}

export interface PurchaseData {
  product: Product;
  quantity: number;
}

export interface Purchase extends PurchaseData {
  _id: string;
}
