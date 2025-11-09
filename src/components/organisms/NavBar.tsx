import { Heart } from 'lucide-react';
import logo from '../../assets/logo.svg';
import Language from '../molecules/Language';
import { Location } from '../molecules/Location';
import { SearchBar } from '../molecules/SearchBar';
import LoginButton from '../atoms/LoginButton';
import { SellButton } from '../atoms/SellButton';
import { useNavigate } from 'react-router';

export const NavBar = ({openLoginModal}:{openLoginModal: ()=> void}) => {

  const navigate = useNavigate();

  return (
    <nav className='bg-gray-100 p-3 w-full flex items-center justify-around'>
        <img onClick={()=> navigate('/')} src={logo} className='w-14 h-12 cursor-pointer' />
        <Location />
        <SearchBar />
        <Language />
        <Heart className='cursor-pointer hover:bg-blue-100 rounded-2xl ' />
        <LoginButton handleClick={openLoginModal} />
        <SellButton />
    </nav>
  )
}
