

export const InputBox = ({placeholder, type="text", ...props}: {placeholder: string, type?: string}) => {
  return (
    <div className="w-full px-2">
        <input type={type} {...props} placeholder={placeholder} className="bg-white outline-none border-none focus:outline-none focus:border-none w-full" />
    </div>
  )
}
