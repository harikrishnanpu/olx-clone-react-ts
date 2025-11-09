import { useState } from "react"
import { DropDown } from "../atoms/DropDown"
import { IconSearch } from "../atoms/icons"
import { LocateFixed, MapPin } from "lucide-react";



export const Location = () => {

  const [isDropDownOpen, setIsDropDropDrownOpen] = useState(false);

  const labels= ["India","pakistan"]
  return (
    <div onClick={()=> setIsDropDropDrownOpen(prev => !prev)} className="bg-white border-2 relative rounded-sm border-black items-center md:flex w-66 px-2 ml-3 py-2 hidden">
      <IconSearch className="w-6" />
      <DropDown labels={labels} open={isDropDownOpen} />
          {isDropDownOpen && <div className="bg-white absolute top-14 w-full left-0 right-0 shadow-sm z-20">
        <div className="flex justify-center p-4 border-gray-200 gap-4 cursor-pointer px-2 hover:bg-blue-100">
        <LocateFixed color="oklch(62.3% 0.214 259.815)" />
        <p className="font-bold text-blue-500 text-sm text-center">Use current location</p>
        </div>
        <div className="px-2 mb-2">
            <p className="uppercase text-xs text-gray-400 mt-2">Popular Locations</p>
        </div>
        {
            labels.map((label, idx)=> (
        <div key={idx} className="px-5 py-3 flex gap-3 items-center cursor-pointer hover:bg-blue-100">
            <MapPin color="#4a5162" />
            <p className="uppercase text-xs text-gray-600 mt-2">{label}</p>
        </div>
            ))
        }
    </div>}
    </div>
  )
}
