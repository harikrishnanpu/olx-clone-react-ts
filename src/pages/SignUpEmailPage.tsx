import { FormProvider, useForm } from "react-hook-form"
import { UserEmailSignupForm } from "../components/organisms/EmailSignupForm";
import type { SignUpFormData } from "../types/SignupFormData";
import { useAppDispatch } from "../hooks/hooks";
import { signUpWithEmail } from "../store/slices/authSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppSelector } from "../hooks/hooks";




function SignUpEmailPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

    const methods = useForm<SignUpFormData>({
        defaultValues:{
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onSubmit"
    });

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        methods.setError('confirmPassword', {
          type: 'manual',
          message: 'Passwords do not match'
        });
        return;
      }
      await dispatch(signUpWithEmail({ email: data.email, password: data.password }));
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
        <h4 className="my-5 font-bold text-xl">Sign <span className="text-blue-800">Up</span></h4>
        <UserEmailSignupForm handleSubmit={methods.handleSubmit(handleSignUp)} />
        {loading && <p className="text-blue-600 mt-2">Creating account...</p>}
    </div>
    </FormProvider>
  )
}

export default SignUpEmailPage