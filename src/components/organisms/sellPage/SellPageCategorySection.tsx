import { useFormContext } from "react-hook-form";
import type { SellFormData } from "../../../types/SellFormData";
import type { ProductCategory } from "../../../types/Product";
import { sampleCategories } from "../../../mock/data";
import { ChevronRight } from "lucide-react";





export const SellPageCategorySection = ({setCurrSection}: {setCurrSection: React.Dispatch<React.SetStateAction<number>>}) => {


const { setValue } = useFormContext<SellFormData>();

  const handleSelect = (cat: ProductCategory) => {
    setValue("category", cat, { shouldDirty: true, shouldValidate: true });
    setCurrSection((prev) => prev + 1);
  };

  return (

    <div className="border border-gray-400 px-8 py-10 rounded-md w-full md:w-1/2 mx-auto">
        <h1 className="font-bold mb-5">Choose Category:</h1>
        {sampleCategories.map((cat,idx)=>(
            <div onClick={()=> handleSelect(cat)} className="flex px-4 justify-between py-4 cursor-pointer border-b border-gray-300 hover:bg-gray-100">
            <h2 key={idx} className="text-gray-700" >{cat}</h2>
            <ChevronRight />
            </div>
        ))}
    </div>

  )
}
