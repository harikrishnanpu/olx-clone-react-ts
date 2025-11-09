import { FormProvider, useForm } from "react-hook-form"
import type { SignInFormData } from "../types/SigninFormData"
import { UserEmailForm } from "../components/organisms/EmailSiginForm";
import { useAppDispatch } from "../store/hooks";
import { signInWithEmail } from "../store/slices/authSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";




function SiginEmailPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

    const methods = useForm<SignInFormData>({
        defaultValues:{
            email: "",
            password: ""
        },
        mode: "onSubmit"
    });

  const handleSignIn = async (data: SignInFormData) => {
    try {
      await dispatch(signInWithEmail({ email: data.email, password: data.password }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
    

  return (
    <FormProvider {...methods}>
    <div className="flex flex-col items-center justify-center my-30 w-full">
        <h4 className="my-5 font-bold text-xl">Sign <span className="text-blue-800">In</span></h4>
        <UserEmailForm handleSubmit={methods.handleSubmit(handleSignIn)} />
        {loading && <p className="text-blue-600 mt-2">Signing in...</p>}
    </div>
    </FormProvider>
  )
}

export default SiginEmailPage