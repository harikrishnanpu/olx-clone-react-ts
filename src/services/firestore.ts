import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase.config';
import type { Product, ProductCategory } from '../types/Product';
import type { SellFormData } from '../types/SellFormData';
import type {
  OrderItem,
  ShippingAddress,
  OrderStatus,
  Order,
} from '../types/OrderTypes';

const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';

export const submitProduct = async (
  formData: SellFormData,
  userId: string,
  userName: string,
  userEmail: string
): Promise<string> => {
  try {
    const productData = {
      ...formData,
      createdAt: Timestamp.now(),
      userId,
      seller: {
        ...formData.seller,
        email: userEmail,
      },
    };

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting product:', error);
    throw error;
  }
};

export const fetchProducts = async (limitCount?: number): Promise<Product[]> => {
  try {
    let q = query(
      collection(db, PRODUCTS_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || new Date().toISOString(),
      } as Product);
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (
  category: ProductCategory,
  limitCount?: number
): Promise<Product[]> => {
  try {
    let q = query(
      collection(db, PRODUCTS_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.category === category) {
        products.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || new Date().toISOString(),
        } as Product);
      }
    });

    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const fetchProductById = async (productId: string): Promise<Product | null> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const data = productSnap.data();
      return {
        id: productSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || new Date().toISOString(),
      } as Product;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const updateProduct = async (
  productId: string,
  updates: Partial<Product>
): Promise<void> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, updates);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const createOrder = async (orderData: {
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  status: OrderStatus;
}): Promise<string> => {
  try {
    const orderDoc = {
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderDoc);
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const fetchUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt || new Date().toISOString(),
      } as Order);
    });

    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

