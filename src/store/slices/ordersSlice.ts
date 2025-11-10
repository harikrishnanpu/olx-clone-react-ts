import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, fetchUserOrders } from '../../services/firestore';
import toast from 'react-hot-toast';
import type {
  OrderItem,
  ShippingAddress,
  OrdersState,
} from '../../types/OrderTypes';

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  submitting: false,
};

export const createOrderInFirestore = createAsyncThunk(
  'orders/createOrder',
  async (
    {
      userId,
      items,
      shippingAddress,
      totalAmount,
    }: {
      userId: string;
      items: OrderItem[];
      shippingAddress: ShippingAddress;
      totalAmount: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const orderId = await createOrder({
        userId,
        items,
        shippingAddress,
        totalAmount,
        status: 'pending',
      });
      toast.success('Order placed successfully!');
      return orderId;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create order';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserOrdersFromFirestore = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId: string, { rejectWithValue }) => {
    try {
      const orders = await fetchUserOrders(userId);
      return orders;
      
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch orders';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderInFirestore.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createOrderInFirestore.fulfilled, (state) => {
        state.submitting = false;
        state.error = null;
      })
      .addCase(createOrderInFirestore.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchUserOrdersFromFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrdersFromFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchUserOrdersFromFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = ordersSlice.actions;
export default ordersSlice.reducer;

