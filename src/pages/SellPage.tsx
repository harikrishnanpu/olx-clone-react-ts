import { useState } from "react"
import type { SellFormData } from "../types/SellFormData";
import { FormProvider, useForm } from "react-hook-form";
import { SellPageCategorySection } from "../components/organisms/sellPage/SellPageCategorySection";
import { SellPageProductDetailsSection } from "../components/organisms/sellPage/SellPageProductDetails";
import { SellPageSummarySection } from "../components/organisms/sellPage/SellPageSummarySection";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { submitProductToFirestore } from "../store/slices/productsSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";




function SellPage() {

    const [currSection, setCurrSection] = useState(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { submitting } = useAppSelector((state) => state.products);

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/');
      }
    }, [isAuthenticated, navigate]);

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

  specs: {
    ram: "",
    storage: "",
    processor: "",
    screenSize: "",
  },

  bedrooms: 0,
  bathrooms: 0,
  areaSqFt: 0,

  seller: {
    name: "",
    selledProducts: 0,
    createdAt: "",
  }

    },
    mode: "onSubmit",
  });


  const handleSubmit = async () => {
    if (!user) {
      return;
    }

    const formData = methods.getValues();
    
    const sellerData = {
      name: user.displayName || 'user123',
      selledProducts: 0,
      createdAt: new Date().toISOString(),
    };

    const completeFormData: SellFormData = {
      ...formData,
      createdAt: new Date().toISOString(),
      seller: sellerData,
    };

    try {


      await dispatch(
        submitProductToFirestore({
          formData: completeFormData,
          userId: user.uid,
          userName: sellerData.name,
        })
      ).unwrap();
      
      methods.reset();
      navigate('/');
    } catch (err) {
      if(err instanceof Error){
        toast.error(err.message)
      }
    }

  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <FormProvider {...methods}>
    <section className="px-4 py-5 items-center flex w-full mt-10">
        {currSection === 0 && <SellPageCategorySection setCurrSection={setCurrSection} />}
        {currSection === 1 && <SellPageProductDetailsSection setCurrSection={setCurrSection} />}
        {currSection === 2 && (
          <SellPageSummarySection 
            handleSubmit={handleSubmit} 
            submitting={submitting}
          />
        )}
    </section>
    </FormProvider>
  )

}

export default SellPage