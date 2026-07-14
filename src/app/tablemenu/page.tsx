/* eslint-disable no-unused-vars */
"use client";

import FoodCard from "@/components/features/FoodCard";
import FoodModal from "@/components/features/FoodModal";
import PageShell from "@/components/layout/PageShell";
import CategoryTabs from "@/components/ui/CategoryTabs";
import { useDineInCategory } from "@/hooks/menu/useDineInCategory";
import { useDineInItems } from "@/hooks/menu/useDineInItems";
import { useFavorites } from "@/hooks/useFavorites";
import {
  getFoodsByCategory,
  getSubcategoriesForCategory,
  isAvailabilityActive,
  menuCategories,
} from "@/lib/menu/utils";
import type { Food } from "@/types/menu";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const categoryBg = [
  "bg-amber-50",
  "bg-emerald-50",
  "bg-blue-50",
  "bg-purple-50",
  "bg-pink-50",
  "bg-orange-50",
  "bg-slate-50",
];

export default function TableMenu() {
  const { addToFavorites, removeFromFavorites, getQuantity } = useFavorites();
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState("appetizer");
  const [activeSubcategories, setActiveSubcategories] = useState<
    Record<string, string>
  >({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { data, isLoading, isError, error } = useDineInCategory();

  console.log({
    data,
    isLoading,
    isError,
    error,
  });

  const categoriesWithFoods = useMemo(() => {
    return menuCategories.map((category) => ({
      category,
      foods: getFoodsByCategory(category.id),
    }));
  }, []);

  // ---------- SCROLL SPY ----------
  useEffect(() => {
    const sections = Object.entries(sectionRefs.current);
    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (
            !bestEntry ||
            entry.intersectionRatio > bestEntry.intersectionRatio
          ) {
            bestEntry = entry;
          }
        }
        if (!bestEntry) return;
        const id = bestEntry.target.getAttribute("data-category");
        if (id) setActiveCategoryId(id);
      },
      { root: null, threshold: [0.2, 0.4, 0.6, 0.8] },
    );

    sections.forEach(([_, el]) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (id: string) => {
    setActiveCategoryId(id);
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageShell>
      <CategoryTabs
        categories={menuCategories}
        activeCategoryId={activeCategoryId}
        onSelect={handleTabClick}
      />

      <section className="flex flex-col gap-6 mt-0">
        {categoriesWithFoods.map(({ category, foods }, index) => {
          const subcategories = getSubcategoriesForCategory(category.id);
          const activeSub =
            activeSubcategories[category.id] || subcategories?.[0]?.id;

          const visibleFoods = foods.filter((food) => {
            if (!activeSub || subcategories.length === 0) return true;
            return food.subcategoryId === activeSub;
          });

          return (
            <div
              key={category.id}
              data-category={category.id}
              ref={(el) => {
                sectionRefs.current[category.id] = el;
              }}
              className={`rounded-[28px] p-4 shadow-sm ${categoryBg[index % categoryBg.length]}`}
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-zinc-500 flex flex-col justify-start items-start gap-1">
                  <span className="text-lg font-bold text-zinc-900">
                    {category.title}
                  </span>
                  {visibleFoods.length} آیتم
                </div>
                <div className="text-lg font-bold text-zinc-900 flex justify-center items-center gap-1">
                  <Image
                    src={category.icon}
                    alt={category.title}
                    width={60}
                    height={60}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Subcategories */}
              {subcategories.length > 0 && (
                <div className="mb-4 flex gap-2 overflow-x-auto">
                  {subcategories.map((sub) => {
                    const isActive = activeSub === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() =>
                          setActiveSubcategories((prev) => ({
                            ...prev,
                            [category.id]: sub.id,
                          }))
                        }
                        className={`shrink-0 rounded-full px-3 py-1 text-xs transition ${
                          isActive
                            ? "bg-zinc-900 text-white"
                            : "bg-white text-zinc-600"
                        }`}
                      >
                        {sub.title}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Foods */}
              {visibleFoods.length === 0 ? (
                <p className="text-sm text-zinc-500 py-12 text-center">
                  در حال حاضر آیتمی در این بخش موجود نیست
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {visibleFoods.map((food) => {
                    const isAvailable = isAvailabilityActive(food.availability);

                    return (
                      <FoodCard
                        key={food.id}
                        food={food}
                        quantity={getQuantity(food.id)}
                        onAddToOrder={() => {
                          if (isAvailable) {
                            addToFavorites(food.id);
                          }
                        }}
                        onRemoveFromOrder={() => removeFromFavorites(food.id)}
                        onOpen={() => setSelectedFood(food)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <FoodModal
        food={selectedFood}
        quantity={selectedFood ? getQuantity(selectedFood.id) : 0}
        onClose={() => setSelectedFood(null)}
        onAddToOrder={() =>
          selectedFood &&
          isAvailabilityActive(selectedFood.availability) &&
          addToFavorites(selectedFood.id)
        }
        onRemoveFromOrder={() =>
          selectedFood && removeFromFavorites(selectedFood.id)
        }
      />
    </PageShell>
  );
}
