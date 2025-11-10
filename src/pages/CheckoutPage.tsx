import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { createOrderInFirestore } from '../store/slices/ordersSlice';
import { clearCart, removeFromCart } from '../store/slices/cartSlice';
import { clearCartFromFirestore, removeItemFromCartFirestore } from '../services/firestore';
import { Button } from '../components/atoms/Button';
import { InputBox } from '../components/atoms/InputBox';
import { ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import type { ShippingAddress } from '../types/OrderTypes';

interface CheckoutFormData extends ShippingAddress {}

function CheckoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { submitting } = useAppSelector((state) => state.orders);

  const methods = useForm<CheckoutFormData>({
    defaultValues: {
      name: user?.displayName || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    },
    mode: 'onSubmit',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  if (!isAuthenticated || !user) {
    navigate('/');
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl font-bold mb-4">Your cart is empty</p>
          <Button btnText="Continue Shopping" handleClick={() => navigate('/')} />
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    try {

    await dispatch(
      createOrderInFirestore({
        userId: user.uid,

        items: items.map((item) => ({
          productId: item.product.id,
          product: item.product,
        })),

        shippingAddress: data,
        totalAmount: items.reduce((total, item) => total + item.product.price, 0),
      })
    ).unwrap();

    dispatch(clearCart());
    await clearCartFromFirestore(user.uid);
    navigate('/my-orders');

    } catch (err) {
      if(err instanceof Error){
        toast.error(err.message)
      }
    }
  };


  const removeItem = async (id: string) =>{
    try{
      dispatch(removeFromCart({productId: id}))
      await removeItemFromCartFirestore(id,user.uid);
      toast.success('item remoed successfully')
    }catch(err){
      if(err instanceof Error){
        toast.error(err.message)
      }
    }
  }

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-800 hover:text-blue-600"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>

      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <div className="border-2 px-4 py-2 rounded border-blue-800">
                  <InputBox
                    type="text"
                    placeholder="Full Name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 3,
                        message: 'Name must be at least 3 characters',
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: 'Name can only contain letters and spaces',
                      },
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <div className="border-2 px-4 py-2 rounded border-blue-800">
                  <InputBox
                    type="tel"
                    placeholder="Phone Number"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Please enter a valid 10-digit Indian phone number',
                      },
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <div className="border-2 px-4 py-2 rounded border-blue-800">
                  <InputBox
                    type="text"
                    placeholder="Address"
                    {...register('address', {
                      required: 'Address is required',
                      minLength: {
                        value: 10,
                        message: 'Address must be at least 10 characters',
                      },
                    })}
                  />
                </div>
                {errors.address && (
                  <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <div className="border-2 px-4 py-2 rounded border-blue-800">
                  <InputBox
                    type="text"
                    placeholder="City"
                    {...register('city', {
                      required: 'City is required',
                      minLength: {
                        value: 2,
                        message: 'City must be at least 2 characters',
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: 'City can only contain letters and spaces',
                      },
                    })}
                  />
                </div>
                {errors.city && (
                  <p className="text-red-600 text-xs mt-1">{errors.city.message}</p>
                )}
              </div>

              <div>
                <div className="border-2 px-4 py-2 rounded border-blue-800">
                  <InputBox
                    type="text"
                    placeholder="State"
                    {...register('state', {
                      required: 'State is required',
                      minLength: {
                        value: 2,
                        message: 'State must be at least 2 characters',
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: 'State can only contain letters and spaces',
                      },
                    })}
                  />
                </div>
                {errors.state && (
                  <p className="text-red-600 text-xs mt-1">{errors.state.message}</p>
                )}
              </div>

              <div>
                <div className="border-2 px-4 py-2 rounded border-blue-800">
                  <InputBox
                    type="text"
                    placeholder="Pincode"
                    {...register('pincode', {
                      required: 'Pincode is required',
                      pattern: {
                        value: /^[1-9][0-9]{5}$/,
                        message: 'Please enter a valid 6-digit pincode',
                      },
                    })}
                  />
                </div>
                {errors.pincode && (
                  <p className="text-red-600 text-xs mt-1">{errors.pincode.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`font-bold border-2 rounded-sm px-3 py-3 w-full ${
                  submitting
                    ? 'bg-gray-400 cursor-not-allowed text-gray-600 border-gray-400'
                    : 'cursor-pointer text-blue-800 hover:bg-blue-50 border-blue-800'
                }`}
              >
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </FormProvider>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="border border-gray-300 rounded p-4">
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className={`flex justify-between items-center border p-2 rounded border-gray-300 ${item.product.sold ? 'opacity-50' : ''}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{item.product.title}</p>
                      {item.product.sold && (
                        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">SOLD OUT</span>
                      )}
                    </div>
                  </div>
                  <p className="font-bold mx-2">₹{item.product.price}</p>
                  <p onClick={()=> removeItem(item.product.id)}  className='text-red-500 text-xs cursor-pointer'>remove</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-xl">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

