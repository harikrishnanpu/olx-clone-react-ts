import { useParams } from "react-router";
import { sampleProducts } from "../mock/data";
import { ChevronRight, CircleUserRound, Heart, Share2 } from "lucide-react";
import { Button } from "../components/atoms/Button";

function ProductPage() {
  const { id } = useParams();

  const product = sampleProducts.find((prod) => prod.id == id);

  return (
    <div className="py-2 px-4 sm:px-20 md:flex justify-between gap-2 mt-5 items-center">
      

      {/* page left section */}

      <div className="sm:w-2/4">

      <img
        src={product?.image}
        className="w-full sm:mx-auto rounded-sm"
        alt={product?.title}
        />

        <div className="border border-gray-300 rounded w-full mt-2 py-4 px-4">

          {product?.featured && <p className="bg-yellow-400 text-xs w-20 text-center rounded ">Featured</p>}
          <p className="font-bold text-lg mt-2">Details</p>

          {
            product?.category == "Electronics" &&
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              <p>{product.specs?.ram}</p>
              <p>{product.specs?.processor}</p>
              <p>{product.specs?.screenSize}</p>
              <p>{product.specs?.storage}</p>
            </div>
          }

                    {
            product?.category == "Vehicles" &&
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              <p>Km: {product?.kmDriven}</p>
              <p>Fuel: {product?.fuelType}</p>
              <p>Year: {product?.year}</p>
            </div>
          }


            {
            product?.category == "Properties" &&
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              <p>{product?.propertyType}</p>
              <p>Bedrooms: {product?.bedrooms}</p>
              <p>Bathroom: {product?.bathrooms}</p>
              <p>Sqft: {product?.areaSqFt}</p>
            </div>
          }

        <p className="font-bold text-sm mt-2">Description</p>

        <p>{product?.description}</p>




        </div>


        </div>

      {/* page right section */}
      <div className="sm:w-2/4 mb-auto">
        <div className="border border-gray-300 rounded w-full mt-2">
          <div className="w-full px-4 py-4">
            <div className="flex justify-between">
              <h3 className="font-bold text-2xl">₹ {product?.price}</h3>
              <div className="flex gap-4">
                <Share2 />
                <Heart />
              </div>
            </div>
            <p className="mt-2 text-gray-500 text-sm">{product?.description}</p>
            <div className="flex justify-between mt-2">
              <p className="text-xs text-gray-400">{product?.location}</p>
              <p className="text-xs text-gray-400">
                {new Date(product?.createdAt as string).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="border px-4 py-4 border-gray-300 rounded w-full mt-2 items-center">
          
          {/* seller details */}
          <div className="flex gap-4 items-center cursor-pointer">
          <CircleUserRound size={30} className="text-gray-600" />
          <div className="">
          <p className="text-sm text-gray-600">Posted by: <span className="font-bold text-blue-800 ">{product?.seller.name}</span></p>
          <p className="text-md text-gray-600 font-medium">Member Since: {new Date(product?.seller.createdAt as string).toLocaleDateString()}</p>
          </div>
          <ChevronRight className="ml-auto " />
          </div>

          {/* selled out count */}

          <div className="border-l mt-5 mx-auto w-30 text-center border-r border-gray-400">
            <p className="text-sm font-bold text-blue-800">{product?.seller.selledProducts}</p>
            <p className="text-sm text-gray-600">Items Listed</p>
          </div>

          {/* chat wqit seller btn */}
          <div className="w-full">
          <Button btnText="Chat with seller" />
          </div>
        </div>

        <div className="border px-4 py-4 border-gray-300 rounded w-full mt-2 items-center">
          
          <Button color="yellow" btnText="Add to Cart" />
        </div>

      </div>
    </div>
  );
}

export default ProductPage;
