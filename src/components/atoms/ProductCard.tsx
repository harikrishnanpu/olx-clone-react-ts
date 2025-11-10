import { useNavigate } from "react-router"
import type { Product } from "../../types/Product"




export const ProductCard = ({product}: {product: Product}) => {

  const navigate = useNavigate();

  return (
    <div onClick={()=> navigate(`/product/${product.id}`)} className="border relative border-gray-400 p-2 rounded cursor-pointer">
        <img className="h-40 sm:h-50" src={product.image} alt={product.title} />
        {product.featured && !product.sold && <p className="bg-yellow-400 font-bold text-xs w-20 text-center absolute top-42 rounded left-4">Featured</p>}
        {product.sold && <p className="bg-red-400 font-bold text-xs w-20 text-center absolute top-2 rounded left-2">Sold out</p>}
        <div className="p-2">
            <h3 className="font-bold text-lg">₹{product.price}</h3>
            {product.category == "Vehicles" && <p className="text-gray-800 text-sm">{product.year} - {product?.kmDriven} Km</p>}
            {product.category == "Electronics" &&  <p className="text-sm text-gray-800">{product.specs?.ram}</p>}
            {product.category == "Properties" && <p className="text-sm text-gray-800">{product.propertyType}</p>}
            <p className="text-sm text-gray-500">{product.title}</p>
        </div>
        <div className="flex justify-between px-2">
            <p className="text-xs text-gray-400">{product.location}</p>
          <p className="text-xs text-gray-400">{new Date(product.createdAt).toLocaleDateString()}</p>
        </div>
        {product.featured && !product.sold && <div className="absolute left-0 bottom-0 w-2 h-26 bg-yellow-500">
        </div> }
    </div>
  )
}
