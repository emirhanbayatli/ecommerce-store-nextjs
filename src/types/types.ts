export type CartItem = {
  id: string;
  quantity: number;
  stripePriceId?: string;
};

export interface Product {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  discountPercentage: number;
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
  images: string[];
  thumbnail: string;
  stripeProductId?: string;
  stripePriceId?: string;
  status: Status;
}
export enum Status {
  standard = "Standard",
  explore = "Explore",
  featured = "Featured",
}

export enum Category {
  Smartphones = "Smartphones",
  Laptops = "Laptops",
  Tablets = "Tablets",
  Smartwatches = "Smartwatches",
  Headphones = "Headphones",
  Speakers = "Speakers",
  Cameras = "Cameras",
  ComputerAccessories = "Computer Accessories",
  GamingConsoles = "Gaming Consoles",
  NetworkingDevices = "Networking Devices",
  WearableTech = "Wearable Tech",
  SmartHomeDevices = "Smart Home Devices",
}

export enum Tags {
  smartphones = "Smartphones",
  tablets = "Tablets",
  laptops = "Laptops",
  desktops = "Desktops",
  smartwatches = "Smartwatches",
  headphones = "Headphones",
  earbuds = "Earbuds",
  speakers = "Speakers",
  cameras = "Cameras",
  gaming_consoles = "Gaming Consoles",
  controllers = "Controllers",
  computer_accessories = "Computer Accessories",
  keyboards = "Keyboards",
  mice = "Mice",
  monitors = "Monitors",
  printers = "Printers",
  networking_devices = "Networking Devices",
  routers = "Routers",
  smart_home_devices = "Smart Home Devices",
  wearables = "Wearables",
  drones = "Drones",
  chargers = "Chargers",
}

export const allTags = Object.values(Tags);

export const allCategories = Object.values(Category);
export const allStatus = Object.values(Status);

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
export interface OrderProps {
  id: string;
  userName: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
}
