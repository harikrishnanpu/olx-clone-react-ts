import { useEffect } from "react";
import type { Product } from "../../types/Product"
import { Button } from "../atoms/Button"
import { ProductCard } from "../atoms/ProductCard"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProductsFromFirestore } from "../../store/slices/productsSlice";
import { Loading } from "./Loading";



export const ProductsList = ({ searchQuery }: {  products?: Product[],  searchQuery?: string | null}) => {
  
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
      dispatch(fetchProductsFromFirestore({limitCount: 20, order: 'asc'}));
  }, [dispatch]);

  const handleLoadMore = () => {
      dispatch(fetchProductsFromFirestore({limitCount: 20, order: 'asc'}));
  };

  const filteredProducts = searchQuery ? products.filter((product) => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()) ) : products;

  if (loading && filteredProducts.length === 0 ) {
    return (
      <Loading count={15} />
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="mt-30 w-full items-center flex flex-col justify-center">
        <p className="text-gray-600">
          {searchQuery ? `No products foud for ${searchQuery}` : "No products available"}
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
      <div>
        <Button 
          btnText="Load more" 
          handleClick={handleLoadMore}
          loading={loading}
        />
      </div>
    </div>
  )
}
