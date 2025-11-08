import { sampleProducts } from "../../mock/data"
import type { Product } from "../../types/Product"
import { ProductCard } from "../atoms/ProductCard"



export const ProductsList = () => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {
            sampleProducts.map((prod: Product)=> (
                <ProductCard product={prod} key={prod.id} />
            ))
        }
    </div>
  )
}
