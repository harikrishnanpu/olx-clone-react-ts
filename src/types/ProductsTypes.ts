import type { Product } from './Product';

export interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  submitting: boolean;
}

