import { useFormContext } from "react-hook-form"
import { InputBox } from "../atoms/InputBox"
import type { SignInFormData } from "../../types/SigninFormData"
import { Button } from "../atoms/Button"
import { useAppSelector } from "../../hooks/hooks"

export const UserEmailForm = ({handleSubmit}:{handleSubmit: ()=> void}) => {
    const {register, formState:{errors} } = useFormContext<SignInFormData>();
    const { loading } = useAppSelector((state) => state.auth);

  return (
    <div className="border border-gray-200 px-10 py-10 flex flex-col w-3/4 sm:w-2/4 lg:w-2/5">
      <div className="border-2 px-4 py-2 rounded border-blue-800">
        <InputBox type="email" placeholder="Email" {...register('email',{required: "email is required", validate: val=> val.trim().length >= 4 || 'enter a valid email'})} />
      </div>
      {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
       <div className="border-2 px-4 py-2 rounded mt-6 border-blue-800">
        <InputBox type="password" placeholder="Password" {...register('password',{required: "password is required", validate: val=> val.trim().length >= 6 || 'enter a valid password'})} />
       </div>
      {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
       <Button btnText="Sign In" handleClick={handleSubmit} loading={loading} />
    </div>
  )
}
