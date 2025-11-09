import type { Product, ProductCategory } from "../types/Product";

export const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Maruti Suzuki Swift 2018 VXi",
    description:
      "Well-maintained Swift VXi with full service record, single owner, 45,000 km driven.",
    price: 420000,
    image: "https://placehold.co/600x400?text=Swift+2018",
    category: "Vehicles",
    sold: false,
    createdAt: "2025-11-07T10:30:00Z",
    brand: "Maruti Suzuki",
    year: 2018,
    kmDriven: 45000,
    fuelType: "Petrol",
    transmission: "Manual",
    condition: "Used",
    location: "Mumbai, India",
    featured: true,
    seller: {
      name: "anonymous pp",
      selledProducts: 10,
      createdAt: new Date().toISOString()
    }

  },
  {
    id: "2",
    title: "iPhone 13 (128 GB, Midnight)",
    description:
      "Almost new iPhone 13, box and charger included. Battery health 97%.",
    price: 54000,
    image: "https://placehold.co/600x400?text=iPhone+13",
    category: "Electronics",
    sold: false,
    createdAt: "2025-11-06T08:45:00Z",
    brand: "Apple",
    condition: "Used",
    specs: {
      ram: "4 GB",
      storage: "128 GB",
      processor: "A15 Bionic",
      screenSize: '6.1"',
    },
    location: "Delhi, India",
    featured: true,
        seller: {
      name: "anonymous pp",
      selledProducts: 10,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: "3",
    title: "Royal Enfield Classic 350 (2020)",
    description:
      "Classic 350 in mint condition, 2020 model, just 12,000 km run. All papers available.",
    price: 125000,
    image: "https://placehold.co/600x400?text=Royal+Enfield+350",
    category: "Vehicles",
    sold: false,
    createdAt: "2025-11-05T15:10:00Z",
    brand: "Royal Enfield",
    year: 2020,
    kmDriven: 12000,
    fuelType: "Petrol",
    transmission: "Manual",
    condition: "Used",
    location: "Pune, India",
        seller: {
      name: "anonymous pp",
      selledProducts: 10,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: "4",
    title: "Wooden 3-Seater Sofa Set",
    description:
      "Solid teak wood frame, high-quality cushions, barely used for 6 months.",
    price: 18000,
    image: "https://placehold.co/600x400?text=Sofa+Set",
    category: "Furniture",
    sold: false,
    createdAt: "2025-11-04T13:25:00Z",
    condition: "Used",
    location: "Bangalore, India",
        seller: {
      name: "anonymous pp",
      selledProducts: 10,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: "5",
    title: "HP Pavilion Gaming Laptop (Ryzen 5, 8GB, 512GB SSD)",
    description:
      "High-performance gaming laptop with RTX 3050 GPU, 144Hz display, RGB keyboard.",
    price: 69000,
    image: "https://placehold.co/600x400?text=HP+Pavilion",
    category: "Electronics",
    sold: false,
    createdAt: "2025-11-03T09:00:00Z",
    brand: "HP",
    specs: {
      ram: "8 GB",
      storage: "512 GB SSD",
      processor: "AMD Ryzen 5 5600H",
      screenSize: '15.6"',
    },
    condition: "Used",
    location: "Chennai, India",
        seller: {
      name: "anonymous pp",
      selledProducts: 10,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: "6",
    title: "2 BHK Apartment for Rent - Pune",
    description:
      "Spacious 2 BHK apartment with balcony, covered parking, and 24/7 water supply.",
    price: 25000,
    image: "https://placehold.co/600x400?text=2+BHK+Apartment",
    category: "Properties",
    sold: false,
    createdAt: "2025-11-02T17:45:00Z",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1050,
    condition: "Used",
    location: "Kothrud, Pune",
        seller: {
      name: "anonymous pp",
      selledProducts: 10,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: "7",
    title: "Samsung 50'' 4K Smart TV",
    description:
      "Crystal UHD 4K Smart TV, Alexa and Google Assistant support, 1.5 years old.",
    price: 34000,
    image: "https://placehold.co/600x400?text=Samsung+4K+TV",
    category: "Electronics",
    sold: true,
    createdAt: "2025-11-01T12:15:00Z",
    brand: "Samsung",
    specs: {
      screenSize: '50"',
    },
    condition: "Used",
    location: "Hyderabad, India",
        seller: {
      name: "anonymous pp",
      selledProducts: 10,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: "8",
    title: "Adidas Men’s Running Shoes (UK 9)",
    description:
      "Lightweight mesh material, premium cushioning, only worn twice.",
    price: 2500,
    image: "https://placehold.co/600x400?text=Adidas+Shoes",
    category: "Fashion",
    sold: false,
    createdAt: "2025-10-31T14:40:00Z",
    brand: "Adidas",
    condition: "Used",
    location: "Delhi, India",
        seller: {
      name: "anonymous pp",
      selledProducts: 10,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: "9",
    title: "Canon EOS 200D DSLR Camera",
    description:
      "18–55mm kit lens, 24.2 MP CMOS sensor, Wi-Fi enabled, great for vlogging.",
    price: 38000,
    image: "https://placehold.co/600x400?text=Canon+200D",
    category: "Cameras",
    sold: false,
    createdAt: "2025-10-30T16:00:00Z",
    brand: "Canon",
    condition: "Used",
    location: "Kochi, India",
        seller: {
      name: "anonymous pp",
      selledProducts: 10,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: "10",
    title: "Office Chair - Ergonomic Mesh Back",
    description:
      "Adjustable seat height, lumbar support, 360° swivel, smooth caster wheels.",
    price: 4500,
    image: "https://placehold.co/600x400?text=Office+Chair",
    category: "Furniture",
    sold: false,
    createdAt: "2025-10-29T18:20:00Z",
    condition: "Used",
    location: "Ahmedabad, India",
    seller: {
      name: "anonymous pp",
      selledProducts: 10,
      createdAt: new Date().toISOString()
    }
  },
];


export const sampleCategories: ProductCategory[] = [
  "Vehicles"
  ,"Furniture"
  ,"Electronics"
  ,"Properties"
  , "Fashion"
  , "Cameras"
  , "Others"
]