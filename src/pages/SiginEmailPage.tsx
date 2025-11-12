import { FormProvider, useForm } from "react-hook-form"
import type { SignInFormData } from "../types/SigninFormData"
import { UserEmailForm } from "../components/organisms/EmailSiginForm";
import { useAppDispatch } from "../hooks/hooks";
import { signInWithEmail } from "../store/slices/authSlice";
import { useNavigate } from "react-router";
import { useAppSelector } from "../hooks/hooks";




function SiginEmailPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.auth);

    const methods = useForm<SignInFormData>({
        defaultValues:{
            email: "",
            password: ""
        },
        mode: "onSubmit"
    });

  const handleSignIn = async (data: SignInFormData) => {
    const result = await dispatch(signInWithEmail({ email: data.email, password: data.password }));
    if (signInWithEmail.fulfilled.match(result)) {
      navigate('/');
    }
  };
    

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