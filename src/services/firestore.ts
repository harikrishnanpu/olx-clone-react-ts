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
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase.config";
import type { Product, ProductCategory } from "../types/Product";
import type { SellFormData } from "../types/SellFormData";
import type {
  OrderItem,
  ShippingAddress,
  OrderStatus,
  Order,
} from "../types/OrderTypes";
import type { CartItem } from "../types/CartTypes";

const PRODUCTS_COLLECTION = "products";
const ORDERS_COLLECTION = "orders";
const CARTS_COLLECTION = "carts";





  export const submitProduct = async (
        formData: SellFormData,
        userId: string,
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

          const docRef = await addDoc(
            collection(db, PRODUCTS_COLLECTION),
            productData
          );
          
          return docRef.id;
        } catch (err) {
             if(err instanceof Error){
            throw err;
          }
        }
      };

  export const fetchProducts = async (
        limitCount?: number
      ): Promise<Product[]> => {
        try {


          let q = query(
            collection(db, PRODUCTS_COLLECTION),
            orderBy("createdAt", "desc")
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
              createdAt: data.createdAt?.toDate?.()?.toISOString()
            } as Product);
          });

          return products;
        } catch (err) {
           if(err instanceof Error){
            throw err;
          }
        }
      };

      export const fetchProductsByCategory = async (
        category: ProductCategory,
        limitCount?: number
      ): Promise<Product[]>  => {
        try {
          let q = query(
            collection(db, PRODUCTS_COLLECTION),
            orderBy("createdAt", "desc")
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
                createdAt:
                  data.createdAt?.toDate?.()?.toISOString() ||
                  data.createdAt ||
                  new Date().toISOString(),
              } as Product);
            }
          });

          return products;
        } catch (err) {
         if(err instanceof Error){
            throw err;
          }
        }
      };

      export const fetchProductById = async (
        productId: string
      ): Promise<Product | Error> => {
        try {

          const productRef = doc(db, PRODUCTS_COLLECTION, productId);
          const productSnap = await getDoc(productRef);

          if (productSnap.exists()) {
            const data = productSnap.data();
            return {
              id: productSnap.id,
              ...data,
              createdAt:
                data.createdAt?.toDate?.()?.toISOString() ||
                data.createdAt ||
                new Date().toISOString(),
            } as Product;
          }
          return null;
        } catch (err) {
            if(err instanceof Error){
            throw err;
          }
        }
      };


export const saveCartToFirestore = async (userId: string, items: CartItem[]): Promise<void> => {
  const cartRef = doc(db, CARTS_COLLECTION, userId);
  const cartSnap = await getDoc(cartRef);
  
  const cartData = {
    userId,
    items: items.map(item => ({
      productId: item.product.id,
      product: item.product,
    })),
    updatedAt: Timestamp.now(),
  };

  if (cartSnap.exists()) {
    await updateDoc(cartRef, cartData);
  } else {
    await setDoc(cartRef, {
      ...cartData,
      createdAt: Timestamp.now(),
    });
  }
};

export const fetchCartFromFirestore = async (userId: string): Promise<CartItem[]> => {
  try {
    const cartRef = doc(db, CARTS_COLLECTION, userId);
    const cartSnap = await getDoc(cartRef);
    
    if (cartSnap.exists()) {
      const data = cartSnap.data();
      return (data.items || []).map((item: { product: Product; productId: string }) => ({
        product: item.product,
      }));
    }

    return [];
  } catch {
    return [];
  }
};

export const clearCartFromFirestore = async (userId: string): Promise<void> => {
  try {
    const cartRef = doc(db, CARTS_COLLECTION, userId);
    await updateDoc(cartRef, {
      items: [],
      updatedAt: Timestamp.now(),
    });
  } catch (err) {
    if(err instanceof Error){
      console.log(err.message);
    }
  }
};


export const removeItemFromCartFirestore = async (itemId: string, userId: string): Promise<void> => {
  try{

    const cartRef = doc(db, CARTS_COLLECTION, userId);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      throw new Error("Cart not found for this user.");
    }

    const cartData = cartSnap.data();
    const currentItems = cartData.items || [];

    const updatedItems = currentItems.filter(
      (item: CartItem) => item.productId !== itemId
    );

    console.log("UPDATEDITEMS",updatedItems)

    await updateDoc(cartRef, {
      items: updatedItems,
      updatedAt: new Date(),
    });

  }catch(err){
    if(err instanceof Error){
      throw err;
    }
  }
}

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

    const soldOutProducts: string[] = [];

    for (const item of orderData.items) {
      const productRef = doc(db, PRODUCTS_COLLECTION, item.productId);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        soldOutProducts.push(item.product.title);
        continue;
      }

      const productData = productSnap.data() as Product;
      if (productData.sold === true) {
        soldOutProducts.push(item.product.title);
      }
    }

    if (soldOutProducts.length > 0) {
      throw new Error(`Some products are sold out: ${soldOutProducts.join(", ")}`);
    }

          const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderDoc);
          
          orderData.items.map(async (item) => {
            const productRef = doc(db, PRODUCTS_COLLECTION, item.productId);
            await updateDoc(productRef, { sold: true });
          })
          
          
          return docRef.id;
        } catch (err) {
          console.log(err);
          throw err;
        }
      };

      export const fetchUserOrders = async (userId: string): Promise<Order[]> => {
        try {

              const q = query(
                collection(db, ORDERS_COLLECTION),
                where("userId", "==", userId),
                orderBy("createdAt", "desc")
              );

          const querySnapshot = await getDocs(q);
          const orders: Order[] = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            orders.push({
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate?.()?.toISOString(),
              updatedAt: data.updatedAt?.toDate?.()?.toISOString()
            } as Order);
          });

          return orders;
        } catch (err) {
                if(err instanceof Error){
            throw err;
          }
        }
      };
