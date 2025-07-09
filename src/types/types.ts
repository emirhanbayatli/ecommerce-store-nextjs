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
  rating: number;
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
  meta: Meta;
  images: string;
  thumbnail: string;
}

export enum Category {
  fragrances = "fragrances",
  beauty = "beauty",
  groceries = "groceries",
  furniture = "furniture",
}
export enum Tags {
  mascara = "mascara",
  beauty = "beauty",
  eyeshadow = "eyeshadow",
  face_powder = "face_powder",
  lipstick = "lipstick",
  nail_polish = "nail_polish",
  fragrances = "fragrances",
  perfumes = "perfumes",
  furniture = "furniture",
  beds = "beds",
  sofas = "sofas",
  bedside_tables = "bedside_tables",
  office_chairs = "office_chairs",
  bathroom = "bathroom",
  fruits = "fruits",
  meat = "meat",
  pet_supplies = "pet_supplies",
  cat_food = "cat_food",
  dog_food = "dog_food",
  cooking_essentials = "cooking_essentials",
  vegetables = "vegetables",
  dairy = "dairy",
  seafood = "seafood",
  condiments = "condiments",
  desserts = "desserts",
  beverages = "beverages",
}

export const allTags = Object.values(Tags);

export const allCategories = Object.keys(Category);

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
