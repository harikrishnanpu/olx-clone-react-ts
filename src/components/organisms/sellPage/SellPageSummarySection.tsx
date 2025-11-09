import { useFormContext } from "react-hook-form"
import { ImageUpload } from "../../atoms/ImageUpload"
import { Button } from "../../atoms/Button";
import type { SellFormData } from "../../../types/SellFormData";
import { useEffect } from "react";
import { Divider } from "../../atoms/Divider";






export const SellPageSummarySection = ({handleSubmit}:{handleSubmit: ()=> void}) => {

    const { setValue, trigger, formState:{errors}, register, getValues } = useFormContext<SellFormData>();

    const handleImageUpload = (url: string | null) => {
        setValue('image', url as string);
    }

    useEffect(() => {
    register("image", { required: "Image is required" });
  }, [register]);

    const handleNextClick = async () => {
       const ok = await trigger('image')
       if(ok) handleSubmit();
    }

  return (

    <div className="border border-gray-400 px-8 py-10 rounded-md w-full md:w-1/2 mx-auto">
        <h1 className="font-bold mb-5">Product Summary:</h1>
        <ImageUpload onUploadComplete={handleImageUpload}  />
        {errors.image && <p className="text-red-600 text-xs mt-1">{errors.image.message}</p>}
        <Divider text="Product info" />
        <p className="text-sm">Product: <span className="font-bold text-blue-700 ">{getValues('title')}</span></p>
        <p className="text-sm">Category: <span className="font-bold text-blue-700 ">{getValues('category')}</span></p>
        <p className="text-sm">Description: <span className="font-bold text-blue-700 ">{getValues('description')}</span></p>
        <p className="text-sm">Price: <span className="font-bold text-blue-700 ">{getValues('price')}</span></p>
        <p className="text-sm">Location: <span className="font-bold text-blue-700 ">{getValues('location')}</span></p>
        <Button handleClick={handleNextClick} btnText="Submit" />
    </div>

  )
}
