"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import FoodCard from "@/components/features/FoodCard";
import FoodModal from "@/components/features/FoodModal";
import PageShell from "@/components/layout/PageShell";
import CategoryTabs from "@/components/ui/CategoryTabs";
import Header from "@/components/ui/Header";
import { useFavorites } from "@/hooks/useFavorites";
import {
  getFoodsByCategory,
  getSubcategoriesForCategory,
  isAvailabilityActive,
  menuCategories,
  menuFoods,
} from "@/lib/menu/utils";
import type { Food } from "@/types/menu";

export default function Home() {
  const { favorites, addToFavorites, removeFromFavorites, getQuantity } =
    useFavorites();

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState("appetizer");
  const [activeSubcategories, setActiveSubcategories] = useState<
    Record<string, string>
  >({});
  const [query] = useState("");

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const activeCategory = menuCategories.find(
      (category) => category.id === activeCategoryId,
    );

    if (activeCategory) {
      const section = sectionRefs.current[activeCategory.id];

      if (section) {
        const y = section.getBoundingClientRect().top + window.pageYOffset - 80;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }
  }, [activeCategoryId]);

  const availabilityMap = useMemo(() => {
    return Object.fromEntries(
      menuCategories.map((category) => {
        const foods = getFoodsByCategory(category.id);

        const hasAnyAvailableFood = foods.some((food) =>
          isAvailabilityActive(food.availability),
        );

        return [
          category.id,
          hasAnyAvailableFood || isAvailabilityActive(category.availability),
        ];
      }),
    );
  }, []);

  const categoriesWithFoods = useMemo(() => {
    return menuCategories.map((category) => ({
      category,
      foods: getFoodsByCategory(category.id),
    }));
  }, []);

  const visibleCategories = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("fa-IR");

    return categoriesWithFoods.filter(({ category, foods }) => {
      if (activeCategoryId === "popular") return false;

      if (activeCategoryId && category.id !== activeCategoryId) {
        return false;
      }

      if (!normalized) return true;

      return foods.some((food) => {
        return (
          food.name.toLocaleLowerCase("fa-IR").includes(normalized) ||
          category.title.toLocaleLowerCase("fa-IR").includes(normalized)
        );
      });
    });
  }, [activeCategoryId, categoriesWithFoods, query]);

  const handleSelectCategory = (id: string) => {
    setActiveCategoryId(id);

    const subs = getSubcategoriesForCategory(id);

    setActiveSubcategories((prev) => ({
      ...prev,
      [id]: prev[id] || subs[0]?.id,
    }));
  };

  return (
    <PageShell>
      <Header
        title="منوی رایو"
        subtitle="تجربه‌ای سبک و سریع از سفارش‌های محبوب"
      />

      <section className="rounded-[20px] border border-[#7a394a] bg-[#7a394a]/70 p-3 text-sm leading-6 text-white shadow-sm">
        <p className="font-semibold">نکته مهم</p>
        <p className="mt-1 text-[13px]">
          فقط پنج‌شنبه و جمعه شب‌ها، مدت استفاده از میز حداکثر ۲ ساعته. در سایر
          زمان‌ها محدودیتی که نداریم هیچ، خوشحال می‌شیم بیشتر میزبانتون باشیم ☺️
        </p>
      </section>

      <CategoryTabs
        categories={menuCategories}
        activeCategoryId={activeCategoryId}
        onSelect={handleSelectCategory}
        availabilityMap={availabilityMap}
      />

      {activeCategoryId === "popular" ? (
        <section className="rounded-[28px] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900">محبوب‌ترین‌ها</h2>
            <span className="text-sm text-zinc-500">
              {favorites.reduce((total, item) => total + item.quantity, 0)} مورد
              در لیست سفارش
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {menuFoods
              .filter((food) => food.isPopular)
              .filter((food) => isAvailabilityActive(food.availability))
              .slice(0, 8)
              .map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  quantity={getQuantity(food.id)}
                  onAddToOrder={() => addToFavorites(food.id)}
                  onRemoveFromOrder={() => removeFromFavorites(food.id)}
                  onOpen={() => setSelectedFood(food)}
                />
              ))}
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          {visibleCategories.map(({ category, foods }) => {
            const subcategories = getSubcategoriesForCategory(category.id);

            const activeSubcategory =
              activeSubcategories[category.id] || subcategories?.[0]?.id;

            const visibleFoods = foods
              .filter((food) => {
                if (!query.trim()) return true;

                const normalized = query.trim().toLocaleLowerCase("fa-IR");

                return (
                  food.name.toLocaleLowerCase("fa-IR").includes(normalized) ||
                  category.title.toLocaleLowerCase("fa-IR").includes(normalized)
                );
              })
              .sort((first, second) => {
                const firstAvailable = isAvailabilityActive(first.availability);
                const secondAvailable = isAvailabilityActive(
                  second.availability,
                );

                if (firstAvailable === secondAvailable) return 0;

                return firstAvailable ? -1 : 1;
              });

            const foodsToRender =
              subcategories.length > 0
                ? visibleFoods.filter(
                    (food) => food.subcategoryId === activeSubcategory,
                  )
                : visibleFoods;

            return (
              <div
                key={category.id}
                ref={(element) => {
                  sectionRefs.current[category.id] = element;
                }}
                className="rounded-[28px] bg-white p-4 shadow-sm"
              >
                <div className="mb-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-zinc-900">
                      {category.title}
                    </h3>

                    <span className="text-sm text-zinc-500">
                      {foodsToRender.length} گزینه
                    </span>
                  </div>

                  {subcategories.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {subcategories.map((subcategory) => {
                        const isActive = activeSubcategory === subcategory.id;

                        return (
                          <button
                            key={subcategory.id}
                            type="button"
                            onClick={() =>
                              setActiveSubcategories((prev) => ({
                                ...prev,
                                [category.id]: subcategory.id,
                              }))
                            }
                            className={`shrink-0 rounded-full px-3 py-2 text-xs font-medium transition ${
                              isActive
                                ? "bg-[#496a65] text-white"
                                : "bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            {subcategory.title}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {foodsToRender.length === 0 ? (
                  <p className="rounded-2xl bg-zinc-50 p-3 text-sm text-zinc-500">
                    هیچ گزینه‌ای پیدا نشد.
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {foodsToRender.map((food) => (
                      <FoodCard
                        key={food.id}
                        food={food}
                        quantity={getQuantity(food.id)}
                        onAddToOrder={() => addToFavorites(food.id)}
                        onRemoveFromOrder={() => removeFromFavorites(food.id)}
                        onOpen={() => setSelectedFood(food)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

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
