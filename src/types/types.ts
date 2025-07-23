export type CartItem = {
  id: number;
  quantity: number;
};

export interface Product {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  tags?: Tags[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: AvailabilityStatus;
  reviews?: Review[];
  returnPolicy: ReturnPolicy;
  minimumOrderQuantity: number;
  meta?: Meta;
  images: string;
  thumbnail: string;
}

export enum Category {
  Beauty = "Beauty",
  Fragrances = "Fragrances",
  MobileAccessories = "Mobile Accessories",
  Furniture = "Furniture",
  Groceries = "Groceries",
  HomeDecoration = "Home Decoration",
  KitchenAccessories = "Kitchen Accessories",
  Laptops = "Laptops",
  MensShirts = "Mens Shirts",
  MensShoes = "Mens Shoes",
  MensWatches = "Mens Watches",
}

export enum Tags {
  mascara = "Mascara",
  beauty = "Beauty",
  eyeshadow = "Eyeshadow",
  face_powder = "Face Powder",
  lipstick = "Lipstick",
  nail_polish = "Nail Polish",
  fragrances = "Fragrances",
  perfumes = "Perfumes",
  furniture = "Furniture",
  beds = "Beds",
  sofas = "Sofas",
  bedside_tables = "Bedside Tables",
  office_chairs = "Office chairs",
  bathroom = "Bathroom",
  fruits = "Fruits",
  meat = "Meat",
  pet_supplies = "Pet Supplies",
  cat_food = "Cat Food",
  dog_food = "Dog Food",
  cooking_essentials = "Cooking Essentials",
  vegetables = "Vegetables",
  dairy = "Dairy",
  seafood = "Seafood",
  condiments = "Condiments",
  desserts = "Desserts",
  beverages = "Beverages",
}

export const allTags = Object.keys(Tags);

export const allCategories = Object.values(Category);

export enum AvailabilityStatus {
  IN_STOCK = "In Stock",
  OUT_OF_STOCK = "Out of Stock",
}

export const allAvailabilityStatus = Object.values(AvailabilityStatus);

export enum ReturnPolicy {
  NO_RETURN = "No return policy",
  DAYS_7 = "7 days return policy",
  DAYS_14 = "14 days return policy",
  DAYS_30 = "30 days return policy",
  DAYS_60 = "60 days return policy",
  DAYS_90 = "90 days return policy",
}

export const allReturnPolicies = Object.values(ReturnPolicy);

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}
