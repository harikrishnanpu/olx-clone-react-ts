import { useState } from "react"
import { DropDown } from "../atoms/DropDown"



const Language = () => {

    const [isLanguageOpen , setIsLanguageOpen ] = useState(false);
    const labels = [
        "English",
        "Malayalam"
    ]
  return (
    <div className="relative" onClick={()=> setIsLanguageOpen(prev => !prev)}>
        <DropDown open={isLanguageOpen} labels={labels} />
    {isLanguageOpen && <div className="bg-white absolute top-12 w-full left-0 right-0 shadow-sm">
        {
            labels.map((label, idx)=> (
        <div key={idx} className="px-5 py-3 flex gap-3 items-center cursor-pointer hover:bg-blue-100">
            <p className="uppercase text-xs text-gray-600 mt-2">{label}</p>
        </div>
            ))
        }
    </div>}
    </div>
  )
}

export default Language