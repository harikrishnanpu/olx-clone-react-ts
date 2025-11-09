



export const Divider = ({text}:{text?: string}) => {
  return (
    <div className="my-8 flex items-center text-center w-full ml-[10%]">
        <div className="border-b border-gray-600 w-1/4"></div>
        <p className="w-1/4  text-xs font-medium text-gray-600">{text}</p>
        <div className="border-b border-gray-600 w-1/4"></div>
    </div>
  )
}
