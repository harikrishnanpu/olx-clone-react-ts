import { X } from "lucide-react"
import GoogleAuthButton from "../atoms/GoogleButton"
import loginEntryPointPost from '../../assets/loginEntryPointPost.webp'
import { Button } from "../atoms/Button"
import { useNavigate } from "react-router"
import { useAppDispatch } from "../../store/hooks"
import { signInWithGoogle } from "../../store/slices/authSlice"
import { useEffect } from "react"
import { useAppSelector } from "../../store/hooks"



export const Login = ({close}: {close: ()=> void}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const handleGoogleSignIn = async () => {
        await dispatch(signInWithGoogle());
    };

    useEffect(() => {
        if (isAuthenticated) {
            close();
        }
    }, [isAuthenticated, close]);

  return (
    <div className="bg-[#18181869] w-full  absolute top-0 bottom-0 left-0 right-0 items-center flex justify-center">
        <div className=" bg-white px-4 py-10 h-full sm:h-auto rounded-sm sm:w-1/3 items-center">
            <X onClick={close} className="ml-auto cursor-pointer" />
            <div className="px-12 text-center my-10 flex flex-col items-center">
                <img src={loginEntryPointPost} alt="loginentrypoint" className="w-30" />
                <p className="font-bold text-sm mt-2">Help us become one of the safest places to buy and sell</p>
            </div>
            <GoogleAuthButton disabled={false} title="Sigin with google"  handler={handleGoogleSignIn} />
            <Button handleClick={()=> navigate('/signin/email')} btnText="Signin with email" />
        </div>
    </div>
  )
}
