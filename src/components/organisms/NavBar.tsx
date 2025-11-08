import { Heart } from 'lucide-react';
import logo from '../../assets/logo.svg';
import Language from '../molecules/Language';
import { Location } from '../molecules/Location';
import { SearchBar } from '../molecules/SearchBar';
import LoginButton from '../atoms/LoginButton';
import { SellButton } from '../atoms/SellButton';

export const NavBar = () => {
  return (
    <nav className='bg-gray-100 p-3 w-full flex items-center justify-around'>
        <img src={logo} className='w-14 h-12' />
        <Location />
        <SearchBar />
        <Language />
        <Heart className='cursor-pointer hover:bg-blue-100 rounded-2xl ' />
        <LoginButton />
        <SellButton />
    </nav>
  )
}
