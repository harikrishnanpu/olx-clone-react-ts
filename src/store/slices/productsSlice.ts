import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product, ProductCategory } from '../../types/Product';
import type { SellFormData } from '../../types/SellFormData';
import type { ProductsState } from '../../types/ProductsTypes';
import {
  submitProduct,
  fetchProducts,
  fetchProductsByCategory,
  fetchProductById,
} from '../../services/firestore';
import toast from 'react-hot-toast';

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  submitting: false,
};

  export const submitProductToFirestore = createAsyncThunk(
    'products/submitProduct',
    async (
      {
        formData,
        userId,
        userName,
      } : {
        formData: SellFormData;
        userId: string;
        userName: string;
      },
      { rejectWithValue }
    ) => {
      try {

        const productId = await submitProduct(formData, userId, userName);
        toast.success('Product submitted successfully!');
        return productId;

      } catch (err) {

        if(err instanceof Error){
          toast.error(err.message);
          return rejectWithValue(err.message);
        }
      }
    }
  );

  export const fetchProductsFromFirestore = createAsyncThunk(
    'products/fetchProducts',
    async ({limitCount, order}:{limitCount: number, order: 'asc' | 'desc'}, { rejectWithValue }) => {
      try {

        const products = await fetchProducts(limitCount,order);
        return products;
      } catch (err) {

        if(err instanceof Error){
          toast.error(err.message);
          return rejectWithValue(err.message);
        }

      }
    }
  );

  export const fetchProductByIdFromFirestore = createAsyncThunk(
    'products/fetchProductById',
    async (productId: string, { rejectWithValue }) => {
      try {

        const product = await fetchProductById(productId);
        if (!product) {
          return rejectWithValue('Product not found');
        }
        return product;

      } catch (err) {

        if(err instanceof Error){
          toast.error(err.message);
          return rejectWithValue(err.message);
        }


      }
    }
  );

  export const fetchProductsByCategoryFromFirestore = createAsyncThunk(
    'products/fetchProductsByCategory',
    async (
      { category, limitCount }: { category: ProductCategory; limitCount?: number },
      { rejectWithValue }
    ) => {
      try {

          const products = await fetchProductsByCategory(category, limitCount);
        return products;
      } catch (err) {

        if(err instanceof Error){
          toast.error(err.message);
          return rejectWithValue(err.message);
        }

      }
    }
  );

    const productsSlice = createSlice({
      
      name: 'products',
      initialState,

      reducers: {

        clearProducts: (state) => {
          state.products = [];
        },

        clearError: (state) => {
          state.error = null;
        },
      },

      extraReducers: (builder) => {
        builder

          .addCase(submitProductToFirestore.pending, (state) => {
            state.submitting = true;
            state.error = null;
          })
          .addCase(submitProductToFirestore.fulfilled, (state) => {
            state.submitting = false;
            state.error = null;
          })
          .addCase(submitProductToFirestore.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload as string;
          });

        builder
          .addCase(fetchProductsFromFirestore.pending, (state) => {
            state.loading = true;
            state.error = null;
          })


          .addCase(fetchProductsFromFirestore.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload || [];
            state.error = null;
          })


          .addCase(fetchProductsFromFirestore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });

        builder
          .addCase(fetchProductsByCategoryFromFirestore.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchProductsByCategoryFromFirestore.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload || [];
            state.error = null;
          })
          .addCase(fetchProductsByCategoryFromFirestore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });

        builder
          .addCase(fetchProductByIdFromFirestore.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchProductByIdFromFirestore.fulfilled, (state, action) => {
            state.loading = false;
            state.currentProduct = action.payload as Product;
            state.error = null;
          })
          .addCase(fetchProductByIdFromFirestore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.currentProduct = null;
          });
      },
    });

    export const { clearProducts, clearError } = productsSlice.actions;
    export default productsSlice.reducer;

