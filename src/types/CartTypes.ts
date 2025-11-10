import type { Product } from './Product';

export interface CartItem {
  product: Product;
  productId: string
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  loading: boolean;
}

