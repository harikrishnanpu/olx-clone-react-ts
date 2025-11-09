import { useState } from "react"
import { useNavigate } from "react-router"
import { DropDown } from "../atoms/DropDown"
import { CategoryBarItem } from "../molecules/CategoryBarItem"
import type { ProductCategory } from "../../types/Product"

export const CategoriesBar = () => {
  const navigate = useNavigate();
  const [isAllCategoryOpen, setIsAllCatgeoryOpen] = useState(false);

  const categories: ProductCategory[] = [
    "Vehicles",
    "Electronics",
    "Furniture",
    "Properties",
    "Fashion",
    "Cameras",
    "Others"
  ];

  const categoryToSlug = (category: ProductCategory): string => {
    return category.toLowerCase();
  };

  const handleAllCategoriesClick = () => {
    navigate("/");
    setIsAllCatgeoryOpen(false);
  };

  return ( 
    <div className="bg-white shadow-sm flex gap-4 py-2 items-center justify-around">
      <div className="font-bold cursor-pointer" onClick={handleAllCategoriesClick}>
        <DropDown open={isAllCategoryOpen} labels={["All Categories"]}  />
      </div>
      <div className="hidden md:flex gap-4">
      {categories.map((cat,idx)=>(
        <CategoryBarItem key={idx} category={cat} categorySlug={categoryToSlug(cat)} />
      ))}
      </div>
      <div className="">
        <p className="border-l-2 border-gray-200 px-2 text-sm text-gray-500">{new Date().toDateString()}</p>
      </div>
    </div>
  )
}
