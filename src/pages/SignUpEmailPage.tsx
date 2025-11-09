import { FormProvider, useForm } from "react-hook-form"
import { UserEmailSignupForm } from "../components/organisms/EmailSignupForm";
import type { SignUpFormData } from "../types/SignupFormData";




function SignUpEmailPage() {

    const methods = useForm<SignUpFormData>({
        defaultValues:{
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onSubmit"
    });

  const handleSignIn = (data: SignUpFormData) => {
    try {
      console.log("Form submitted:", data);
    } catch (err) {
      console.error(err);
    }
  };
    

  return (
    <FormProvider {...methods}>
    <div className="flex flex-col items-center justify-center my-30 w-full">
        <h4 className="my-5 font-bold text-xl">Sign <span className="text-blue-800">Up</span></h4>
        <UserEmailSignupForm handleSubmit={methods.handleSubmit(handleSignIn)} />
    </div>
    </FormProvider>
  )
}

export default SignUpEmailPage