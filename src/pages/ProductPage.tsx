import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { ChevronRight, CircleUserRound, Heart, Share2 } from "lucide-react";
import { Button } from "../components/atoms/Button";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchProductByIdFromFirestore } from "../store/slices/productsSlice";
import { addToCart, saveCartAsync } from "../store/slices/cartSlice";
import toast from "react-hot-toast";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentProduct, loading } = useAppSelector((state) => state.products);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items, loading: cartLoading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdFromFirestore(id));
    }
  }, [id, dispatch]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }
    if (currentProduct?.sold) {
      toast.error("This product is sold out and cannot be added to cart");
      return;
    }
    if (currentProduct && user) {
      const existingItem = items.find(item => item.product.id === currentProduct.id);
      if (!existingItem) {
        dispatch(addToCart({ product: currentProduct, userId: user.uid }));
        const updatedItems = [...items, { product: currentProduct }];
        await dispatch(saveCartAsync({ userId: user.uid, items: updatedItems }));
        toast.success("Added to cart!");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl font-bold mb-4">Product not found</p>
          <Button btnText="Go Home" handleClick={() => navigate('/')} />
        </div>
      </div>
    );
  }

  const product = currentProduct;

  return (
    <div className="py-2 px-4 sm:px-20 md:flex justify-between gap-2 mt-5 items-center">
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
          <div className="flex gap-4 items-center cursor-pointer">
          <CircleUserRound size={30} className="text-gray-600" />
          <div className="">
          <p className="text-sm text-gray-600">Posted by: <span className="font-bold text-blue-800 ">{product?.seller.name}</span></p>
          <p className="text-md text-gray-600 font-medium">Member Since: {new Date(product?.seller.createdAt as string).toLocaleDateString()}</p>
          </div>
          <ChevronRight className="ml-auto " />
          </div>

          <div className="border-l mt-5 mx-auto w-30 text-center border-r border-gray-400">
            <p className="text-sm font-bold text-blue-800">{product?.seller.selledProducts}</p>
            <p className="text-sm text-gray-600">Items Listed</p>
          </div>

          <div className="w-full">
          <Button handleClick={()=>{}} btnText="Chat with seller" />
          </div>
        </div>

        <div className="border px-4 py-4 border-gray-300 rounded w-full mt-2 items-center">
          {product.sold ? (
            <div className="w-full">
              <div className="bg-red-600 text-white text-center py-3 rounded font-bold">
                SOLD OUT
              </div>
              <p className="text-center text-gray-600 text-sm mt-2">This product is no longer available</p>
            </div>
          ) : (
            <Button color="yellow" btnText="Add to Cart" handleClick={handleAddToCart} loading={cartLoading} />
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductPage;
