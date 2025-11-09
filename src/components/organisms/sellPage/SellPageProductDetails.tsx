import { useFormContext } from "react-hook-form";
import { InputBox } from "../../atoms/InputBox";
import { Divider } from "../../atoms/Divider";
import { Button } from "../../atoms/Button";
import type { SellFormData } from "../../../types/SellFormData";

export const SellPageProductDetailsSection = ({
  setCurrSection,
}: { setCurrSection: React.Dispatch<React.SetStateAction<number>> }) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<SellFormData>();

  const handleNextButtonClick = async () => {
    const ok = await trigger(
      ["title", "description", "price", "year", "location"],
      { shouldFocus: true }
    );
    if (ok) setCurrSection((prev) => prev + 1);
  };

  return (
    <div className="border border-gray-400 px-8 py-10 rounded-md w-full md:w-1/2 mx-auto">
      <h1 className="font-bold mb-5">Product Details:</h1>

      <div className="border-2 my-2 border-gray-800 rounded p-2">
        <InputBox
          placeholder="Title"
          {...register("title", { required: "Product name is required" ,   validate: value => value.trim().length >= 4 || "Min 4 characters" },)}
        />
      </div>
        {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>}

      <div className="border-2 my-2 border-gray-800 rounded p-2">
        <InputBox
          placeholder="Description"
          aria-invalid={!!errors.description}
          {...register("description", { required: "Product description is required", validate: value => value.trim().length >= 4 || "Min 4 characters" })}
        />
      </div>
        {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description.message}</p>}

      <div className="border-2 my-2 border-gray-800 rounded p-2">
        <InputBox
          placeholder="Price"
          aria-invalid={!!errors.price}
          {...register("price", {
            required: "Product price is required",
            valueAsNumber: true,
            min: { value: 1, message: "Price must be at least 1" },
            validate: val => !isNaN(Number(val)) || "Price must be nnumber"
          })}
        />
      </div>
        {errors.price && <p className="text-red-600 text-xs mt-1">{errors.price.message}</p>}

      <Divider text="Product info" />

      <div className="border-2 my-2 border-gray-800 rounded p-2">
        <InputBox
          placeholder="Year"
          aria-invalid={!!errors.year}
          {...register("year", {
            required: "Product year is required",
            valueAsNumber: true,
            min: { value: 1990, message: "Invalid Year" },
            max: { value: new Date().getFullYear() , message: "Invalid Year" }
          })}
        />
      </div>
        {errors.year && <p className="text-red-600 text-xs mt-1">{errors.year.message}</p>}

      <div className="border-2 my-2 border-gray-800 rounded p-2">
        <InputBox
          placeholder="Location"
          aria-invalid={!!errors.location}
          {...register("location", { required: "Your location is required" })}
          />
      </div>
        {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location.message}</p>}

      <Button handleClick={handleNextButtonClick} btnText="Next" />
    </div>
  );
};
