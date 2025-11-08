import { Search } from "lucide-react"
import { InputBox } from "../atoms/InputBox"



export const SearchBar = () => {
  return (
    <div className="bg-white w-3/6 mx-2 border-2 border-black rounded-sm md:flex items-center hidden">
      <InputBox placeholder="Find Cars, Mobile Phones and More..." />
      <div className="bg-black py-3 w-12 cursor-pointer items-center flex">
        <Search className="mx-auto" color="#fff" />
      </div>
    </div>
  )
}
