import { FormProvider, useForm } from "react-hook-form"
import type { SignInFormData } from "../types/SigninFormData"
import { UserEmailForm } from "../components/organisms/EmailSiginForm";




function SiginEmailPage() {

    const methods = useForm<SignInFormData>({
        defaultValues:{
            email: "",
            password: ""
        },
        mode: "onSubmit"
    });

  const handleSignIn = (data: SignInFormData) => {
    try {
      console.log("Form submitted:", data);
    } catch (err) {
      console.error(err);
    }
  };
    

  return (
    <FormProvider {...methods}>
    <div className="flex flex-col items-center justify-center my-30 w-full">
        <h4 className="my-5 font-bold text-xl">Sign <span className="text-blue-800">In</span></h4>
        <UserEmailForm handleSubmit={methods.handleSubmit(handleSignIn)} />
    </div>
    </FormProvider>
  )
}

export default SiginEmailPage