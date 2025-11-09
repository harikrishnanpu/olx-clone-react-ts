import { Outlet, useLocation, useNavigate } from "react-router"
import logo from '../assets/logo.svg';






function AuthLayout() {

    const navigate = useNavigate();
      const location = useLocation();

  const isSignInPage = location.pathname === "/signin/email"; 

  return (
    <div>
        <nav className='bg-gray-100 p-3 w-full flex justify-around items-center'>
        <img onClick={()=> navigate('/')} src={logo} className='w-14 h-12 cursor-pointer' />
        {!isSignInPage && <p onClick={()=> navigate('/signin/email')} className="font-bold text-sm cursor-pointer underline text-blue-800">Already have an Account ?</p>}
        {isSignInPage && <p onClick={()=> navigate('/signup/email')} className="font-bold text-sm cursor-pointer underline text-blue-800">Need to create a new Account ?</p>}
        </nav>
        <Outlet />
    </div>
  )
}

export default AuthLayout