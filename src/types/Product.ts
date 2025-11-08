export type ProductCategory =
  | "Vehicles"
  | "Furniture"
  | "Electronics"
  | "Properties"
  | "Fashion"
  | "Cameras"
  | "Others";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  sold: boolean;
  createdAt: string;


  location?: string;
  condition?: "New" | "Used";
  brand?: string;
  year?: number;

  kmDriven?: number;
  fuelType?: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission?: "Manual" | "Automatic";

  // Mobile or Laptop specs
  specs?: {
    ram?: string;
    storage?: string;
    processor?: string;
    screenSize?: string;
  };

  // Property details
  propertyType?: "Apartment" | "Villa" | "Office" | "Shop";
  bedrooms?: number;
  bathrooms?: number;
  areaSqFt?: number;

  featured?: boolean;
}
