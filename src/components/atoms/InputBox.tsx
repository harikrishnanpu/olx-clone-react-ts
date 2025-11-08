

export const InputBox = ({placeholder}: {placeholder: string}) => {
  return (
    <div className="w-full px-2">
        <input placeholder={placeholder} className="bg-white outline-none border-none focus:outline-none focus:border-none w-full" />
    </div>
  )
}
