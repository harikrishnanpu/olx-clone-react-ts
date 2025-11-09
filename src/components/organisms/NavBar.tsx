import { Heart, User, ShoppingCart } from 'lucide-react';
import logo from '../../assets/logo.svg';
import Language from '../molecules/Language';
import { Location } from '../molecules/Location';
import { SearchBar } from '../molecules/SearchBar';
import LoginButton from '../atoms/LoginButton';
import { SellButton } from '../atoms/SellButton';
import { useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { signOutUser } from '../../store/slices/authSlice';

export const NavBar = ({openLoginModal}:{openLoginModal: ()=> void}) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items: cartItems } = useAppSelector((state) => state.cart);

  const handleSignOut = async () => {
    await dispatch(signOutUser());
    navigate('/');
  };

  return (
    <nav className='bg-gray-100 p-3 w-full flex items-center justify-around'>
        <img onClick={()=> navigate('/')} src={logo} className='w-14 h-12 cursor-pointer' />
        <Location />
        <SearchBar />
        <Language />
        <Heart className='cursor-pointer hover:bg-blue-100 rounded-2xl ' />
        {isAuthenticated ? (
          <>
            <div className='relative' onClick={() => navigate('/checkout')}>
              <ShoppingCart className='cursor-pointer hover:bg-blue-100 rounded-2xl p-1' size={24} />
              {cartItems.length > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {cartItems.length}
                </span>
              )}
            </div>
            <div className='relative group'>
              <User className='cursor-pointer hover:bg-blue-100 rounded-full p-1' size={24} />
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'>
                <div className='px-4 py-2 border-b'>
                  <p className='text-sm font-semibold'>{user?.displayName || user?.email}</p>
                </div>
                <button
                  onClick={() => navigate('/my-orders')}
                  className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                >
                  My Orders
                </button>
                <button
                  onClick={handleSignOut}
                  className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                >
                  Sign Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <LoginButton handleClick={openLoginModal} />
        )}
        <SellButton />
    </nav>
  )
}
