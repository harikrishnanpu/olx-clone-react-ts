import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Product';
import type { CartItem, CartState } from '../../types/CartTypes';
import { saveCartToFirestore, fetchCartFromFirestore } from '../../services/firestore';

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  loading: false,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + item.product.price;
  }, 0);
};

export const loadCartFromFirestore = createAsyncThunk(
  'cart/loadCart',
  async (userId: string) => {
    const items = await fetchCartFromFirestore(userId);
    return items;
  }
);

export const saveCartAsync = createAsyncThunk(
  'cart/saveCart',
  async ({ userId, items }: { userId: string; items: CartItem[] }) => {
    await saveCartToFirestore(userId, items);
    return items;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; userId?: string }>) => {
      if (action.payload.product.sold) {
        return;
      }

      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (!existingItem) {
        state.items.push({
          product: action.payload.product,
        });
        state.totalAmount = calculateTotal(state.items);
      }
    },

    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload.productId
      );
      state.totalAmount = calculateTotal(state.items);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalAmount = calculateTotal(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCartFromFirestore.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCartFromFirestore.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalAmount = calculateTotal(state.items);
        state.loading = false;
      })
      .addCase(loadCartFromFirestore.rejected, (state) => {
        state.loading = false;
      })
      .addCase(saveCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveCartAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveCartAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;

