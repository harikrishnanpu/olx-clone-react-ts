

export const InputBox = ({placeholder, ...props}: {placeholder: string}) => {
  return (
    <div className="w-full px-2">
        <input {...props} placeholder={placeholder} className="bg-white outline-none border-none focus:outline-none focus:border-none w-full" />
    </div>
  )
}
