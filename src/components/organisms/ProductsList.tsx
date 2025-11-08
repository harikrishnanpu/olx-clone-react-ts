import { sampleProducts } from "../../mock/data"
import type { Product } from "../../types/Product"
import { Button } from "../atoms/Button"
import { ProductCard } from "../atoms/ProductCard"



export const ProductsList = () => {
  return (
    <div className="mt-4 w-full items-center flex flex-col">
    <div className=" grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {
          sampleProducts.map((prod: Product)=> (
            <ProductCard product={prod} key={prod.id} />
          ))
        }
    </div>
    <div>
        <Button btnText="Load more" />
    </div>
    </div>
  )
}
