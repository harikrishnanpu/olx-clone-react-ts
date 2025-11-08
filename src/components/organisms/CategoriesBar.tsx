import { useState } from "react"
import { DropDown } from "../atoms/DropDown"
import { CategoryBarItem } from "../molecules/CategoryBarItem"




export const CategoriesBar = () => {

  const [isAllCategoryOpen, setIsAllCatgeoryOpen] = useState(false);

  const categories = [
    "Cars",
    "Motorcycles",
    "Mobile Phones",
    "Scooters",
    "Commercial & Other Vehicles"
  ]

  return ( 
    <div className="bg-white shadow-sm flex gap-4 py-2 items-center justify-around">
      <div className="font-bold" onClick={()=> setIsAllCatgeoryOpen(prev => !prev)}>
        <DropDown open={isAllCategoryOpen} labels={["All Categories"]}  />
      </div>
      <div className="hidden md:flex gap-4">
      {categories.map((cat,idx)=>(
        <CategoryBarItem key={idx} category={cat} />
      ))}
      </div>
      <div className="">
        <p className="border-l-2 border-gray-200 px-2 text-sm text-gray-500">{new Date().toDateString()}</p>
      </div>
    </div>
  )
}
