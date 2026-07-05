import { StaticImageData } from "next/image";

export interface MenuAvailability {
  type: "always" | "hours";
  availableFrom?: string;
  availableTo?: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  image?: string;
  availability: MenuAvailability;
  description?: string;
}

export interface Food {
  id: string;
  categoryId: string;
  name: string;
  image: StaticImageData;
  shortDescription: string;
  price: number;
  isPopular: boolean;
  favoriteEnabled: boolean;
  availability: MenuAvailability;
  subcategoryId?: string;
}

export interface FoodDetail {
  foodId: string;
  description: string;
  ingredients: string[];
  preparationTime: number;
}

export interface FavoriteRecord {
  foodId: string;
  addedAt: string;
}

export interface FavoriteEntry {
  foodId: string;
  quantity: number;
  addedAt: string;
}
