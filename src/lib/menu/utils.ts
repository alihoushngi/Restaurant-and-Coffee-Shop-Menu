import type {
  Category,
  Food,
  FoodDetail,
  MenuAvailability,
} from "@/types/menu";

import categories from "@/data/categories.json";
import foodDetails from "@/data/food-details.json";
import { foodList } from "@/data/foods";

export const menuCategories = categories as Category[];
export const menuFoods = foodList as Food[];
export const menuFoodDetails = foodDetails as FoodDetail[];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
    maximumFractionDigits: 0,
  }).format(price);

export const toPersianDigits = (value: string | number) => {
  const map = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  } as Record<string, string>;

  return String(value).replace(/[0-9]/g, (digit) => map[digit] || digit);
};

export const isTimeInRange = (time: string, from: string, to: string) => {
  const toMinutes = (value: string) => {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const current = toMinutes(time);
  const start = toMinutes(from);
  const end = toMinutes(to);

  return current >= start && current <= end;
};

export const isAvailabilityActive = (
  availability: MenuAvailability,
  currentTime = new Date(),
) => {
  if (availability.type === "always") return true;

  if (!availability.availableFrom || !availability.availableTo) return false;

  const time = `${currentTime.getHours().toString().padStart(2, "0")}:${currentTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return isTimeInRange(
    time,
    availability.availableFrom,
    availability.availableTo,
  );
};

export const getCategoryById = (id: string) =>
  menuCategories.find((category) => category.id === id);

export const getFoodDetailById = (foodId: string) =>
  menuFoodDetails.find((detail) => detail.foodId === foodId);

export const getFoodsByCategory = (categoryId: string) =>
  menuFoods.filter((food) => food.categoryId === categoryId);

export const getSubcategoriesForCategory = (categoryId: string) => {
  const map: Record<string, Array<{ id: string; title: string }>> = {
    pizza: [
      { id: "large", title: "پیتزا بزرگ (30 سانت)" },
      { id: "junior", title: "پیتزا جونیور (23 سانت)" },
    ],
    coffee: [
      { id: "espresso-base", title: "پایه اسپرسو" },
      { id: "drip", title: "قهوه دمی" },
      { id: "cold-espresso", title: "پایه اسپرسو (سرد)" },
    ],
    "hot-drinks": [
      { id: "milk-base", title: "برپایه شیر" },
      { id: "tea-herbal", title: "دمنوش و چایی" },
      { id: "hot-espresso", title: "پایه اسپرسو" },
    ],
    "cold-drinks": [
      { id: "mocktail", title: "ماکتیل" },
      { id: "soda", title: "سرد نوش" },
      { id: "cold-espresso", title: "پایه اسپرسو (سرد)" },
    ],
    "shake-smoothie": [
      { id: "shake", title: "شیک" },
      { id: "smoothie", title: "اسموتی" },
    ],
  };

  return map[categoryId] ?? [];
};

export const getAllFavorites = () => {
  if (typeof window === "undefined") return [];

  const stored = window.localStorage.getItem("avoli-order-items");

  if (!stored) {
    const legacy = window.localStorage.getItem("avoli-favorites");
    if (!legacy) return [];

    const parsed = JSON.parse(legacy) as Array<string | { foodId: string }>;
    return parsed.map((item) => {
      if (typeof item === "string") {
        return { foodId: item, quantity: 1, addedAt: new Date().toISOString() };
      }

      return {
        foodId: item.foodId,
        quantity: 1,
        addedAt: new Date().toISOString(),
      };
    });
  }

  return JSON.parse(stored) as Array<{
    foodId: string;
    quantity: number;
    addedAt: string;
  }>;
};

export const saveFavorites = (
  favorites: Array<{ foodId: string; quantity: number; addedAt: string }>,
) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("avoli-order-items", JSON.stringify(favorites));
};
