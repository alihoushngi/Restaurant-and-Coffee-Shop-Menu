"use client";

import { useEffect, useState } from "react";

import { getAllFavorites, saveFavorites } from "@/lib/menu/utils";
import { showToast } from "@/lib/toast";
import type { FavoriteEntry } from "@/types/menu";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(getAllFavorites());
    setHydrated(true);
  }, []);

  const addToFavorites = (foodId: string, quantity = 1) => {
    if (quantity <= 0) return;

    setFavorites((current) => {
      const exists = current.find((item) => item.foodId === foodId);
      const next = exists
        ? current.map((item) =>
            item.foodId === foodId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...current, { foodId, quantity, addedAt: new Date().toISOString() }];

      saveFavorites(next);
      showToast("به لیست سفارش اضافه شد");
      return next;
    });
  };

  const removeFromFavorites = (foodId: string, quantity = 1) => {
    setFavorites((current) => {
      const exists = current.find((item) => item.foodId === foodId);
      if (!exists) return current;

      const next = current
        .map((item) => {
          if (item.foodId !== foodId) return item;
          const nextQuantity = item.quantity - quantity;
          return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
        })
        .filter((item): item is FavoriteEntry => Boolean(item));

      saveFavorites(next);
      if (
        next.length !== current.length ||
        next.some((item) => item.foodId !== foodId)
      ) {
        showToast("از لیست سفارش حذف شد");
      }
      return next;
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
    saveFavorites([]);
  };

  const isFavorite = (foodId: string) =>
    favorites.some((item) => item.foodId === foodId);
  const getQuantity = (foodId: string) =>
    favorites.find((item) => item.foodId === foodId)?.quantity ?? 0;

  return {
    favorites,
    hydrated,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
    getQuantity,
  };
}
