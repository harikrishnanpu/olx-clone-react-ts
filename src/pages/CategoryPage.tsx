import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProductsByCategoryFromFirestore } from "../store/slices/productsSlice";
import { ProductsList } from "../components/organisms/ProductsList";
import type { ProductCategory } from "../types/Product";

const categoryMap: Record<string, ProductCategory> = {
  vehicles: "Vehicles",
  furniture: "Furniture",
  electronics: "Electronics",
  properties: "Properties",
  fashion: "Fashion",
  cameras: "Cameras",
  others: "Others",
};

function CategoryPage() {
  const { categoryname } = useParams<{ categoryname: string }>();
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (categoryname && categoryname !== "product") {
      const normalizedCategory = categoryname.toLowerCase();
      const productCategory = categoryMap[normalizedCategory];
      
      if (productCategory) {
        dispatch(fetchProductsByCategoryFromFirestore({ category: productCategory }));
      }
    }
  }, [categoryname, dispatch]);

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  const categoryDisplayName = categoryname 
    ? categoryMap[categoryname.toLowerCase()] || categoryname 
    : "Category";

  return (
    <section className="px-2 mt-5">
      <h2 className="text-lg font-bold">{categoryDisplayName}</h2>
      <ProductsList products={products} />
    </section>
  );
}

export default CategoryPage;

