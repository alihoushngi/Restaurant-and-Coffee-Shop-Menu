"use client";

import { useMemo, useState } from "react";

import FoodCard from "@/components/features/FoodCard";
import FoodModal from "@/components/features/FoodModal";
import PageShell from "@/components/layout/PageShell";
import Header from "@/components/ui/Header";
import SearchInput from "@/components/ui/SearchInput";
import { useFavorites } from "@/hooks/useFavorites";
import { getCategoryById, menuFoods } from "@/lib/menu/utils";
import type { Food } from "@/types/menu";

export default function SearchPage() {
  const { addToFavorites, removeFromFavorites, getQuantity } = useFavorites();
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const filteredFoods = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("fa-IR");
    if (!normalized) return menuFoods;

    return menuFoods.filter((food) => {
      const categoryTitle =
        getCategoryById(food.categoryId)?.title.toLocaleLowerCase("fa-IR") ??
        "";
      return (
        food.name.toLocaleLowerCase("fa-IR").includes(normalized) ||
        categoryTitle.includes(normalized)
      );
    });
  }, [query]);

  return (
    <PageShell>
      <Header title="جستجو" subtitle="نام غذا یا دسته‌بندی را وارد کن" />
      <SearchInput value={query} onChange={setQuery} />
      <section className="grid gap-4 md:grid-cols-2">
        {filteredFoods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            quantity={getQuantity(food.id)}
            onAddToOrder={() => addToFavorites(food.id)}
            onRemoveFromOrder={() => removeFromFavorites(food.id)}
            onOpen={() => setSelectedFood(food)}
          />
        ))}
      </section>
      <FoodModal
        food={selectedFood}
        quantity={selectedFood ? getQuantity(selectedFood.id) : 0}
        onClose={() => setSelectedFood(null)}
        onAddToOrder={() => selectedFood && addToFavorites(selectedFood.id)}
        onRemoveFromOrder={() =>
          selectedFood && removeFromFavorites(selectedFood.id)
        }
      />
    </PageShell>
  );
}
