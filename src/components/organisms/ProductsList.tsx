import { useEffect } from "react";
import type { Product } from "../../types/Product"
import { Button } from "../atoms/Button"
import { ProductCard } from "../atoms/ProductCard"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductsFromFirestore } from "../../store/slices/productsSlice";

interface ProductsListProps {
  products?: Product[];
  searchQuery?: string;
}

export const ProductsList = ({ products: propProducts, searchQuery }: ProductsListProps) => {
  const dispatch = useAppDispatch();
  const { products: storeProducts, loading } = useAppSelector((state) => state.products);

  const products = propProducts || storeProducts;

  useEffect(() => {
    if (!propProducts) {
      dispatch(fetchProductsFromFirestore(20));
    }
  }, [dispatch, propProducts]);

  const handleLoadMore = () => {
    if (!propProducts) {
      dispatch(fetchProductsFromFirestore());
    }
  };

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  if (loading && filteredProducts.length === 0 && !propProducts) {
    return (
      <div className="mt-4 w-full items-center flex flex-col">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="mt-4 w-full items-center flex flex-col">
        <p className="text-gray-600">
          {searchQuery ? `No products found for "${searchQuery}"` : "No products available"}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 w-full items-center flex flex-col">
    <div className=" grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {
          filteredProducts.map((prod: Product)=> (
            <ProductCard product={prod} key={prod.id} />
          ))
        }
    </div>
    {!propProducts && (
      <div>
        <Button 
          btnText={loading ? "Loading..." : "Load more"} 
          handleClick={handleLoadMore}
        />
      </div>
    )}
    </div>
  )
}
