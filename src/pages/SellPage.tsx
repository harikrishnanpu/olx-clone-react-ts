import { useState } from "react"
import type { SellFormData } from "../types/SellFormData";
import { FormProvider, useForm } from "react-hook-form";
import { SellPageCategorySection } from "../components/organisms/sellPage/SellPageCategorySection";
import { SellPageProductDetailsSection } from "../components/organisms/sellPage/SellPageProductDetails";
import { SellPageSummarySection } from "../components/organisms/sellPage/SellPageSummarySection";




function SellPage() {

    const [currSection, setCurrSection] = useState(0);

const methods = useForm<SellFormData>({
    defaultValues: {
    title: "",
  description: "",
  image: "",
  category: "Cameras",
  sold: false,
  createdAt: "",


  location: "",
  condition: "New",
  brand: "",

  kmDriven: 0,
  fuelType: "Petrol" ,
  transmission: "Manual",

  // Mobile or Laptop specs
  specs: {
    ram: "",
    storage: "",
    processor: "",
    screenSize: "",
  },

  // Property details
  bedrooms: 0,
  bathrooms: 0,
  areaSqFt: 0,

    },
    mode: "onSubmit",
  });


  const handleSubmit = () => {

  }

  return (
    <FormProvider {...methods}>
    <section className="px-4 py-5 items-center flex w-full mt-10">
        {currSection === 0 && <SellPageCategorySection setCurrSection={setCurrSection} />}
        {currSection === 1 && <SellPageProductDetailsSection setCurrSection={setCurrSection} />}
        {currSection === 2 && <SellPageSummarySection handleSubmit={handleSubmit} />}
    </section>
    </FormProvider>
  )

}

export default SellPage