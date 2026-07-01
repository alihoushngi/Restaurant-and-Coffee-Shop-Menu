"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import FoodCard from "@/components/features/FoodCard";
import FoodModal from "@/components/features/FoodModal";
import OrderInvoiceModal from "@/components/features/OrderInvoiceModal";
import PageShell from "@/components/layout/PageShell";
import Header from "@/components/ui/Header";
import { useFavorites } from "@/hooks/useFavorites";
import { menuFoods } from "@/lib/menu/utils";
import type { FavoriteEntry, Food } from "@/types/menu";

export default function FavoritesPage() {
  const { favorites, addToFavorites, removeFromFavorites, getQuantity } =
    useFavorites();
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const favoriteFoods = useMemo(() => {
    return favorites
      .map((entry) => {
        const food = menuFoods.find((item) => item.id === entry.foodId);
        return food
          ? ({ ...entry, food } as FavoriteEntry & { food: Food })
          : null;
      })
      .filter((entry): entry is FavoriteEntry & { food: Food } =>
        Boolean(entry),
      );
  }, [favorites]);

  return (
    <PageShell>
      <Header title="لیست سفارش" subtitle="غذاهایی که برای سفارش انتخاب کردی" />
      {favoriteFoods.length === 0 ? (
        <section className="rounded-[28px] bg-white p-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-zinc-800">
            هنوز موردی را به لیست سفارش اضافه نکردی
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            از منوی اصلی غذاهای موردنظر را به لیست سفارش اضافه کن.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
          >
            بازگشت به منو
          </Link>
        </section>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[24px] bg-white p-4 shadow-sm">
            <div>
              <p className="text-sm text-zinc-500">تعداد آیتم‌ها</p>
              <p className="text-lg font-bold text-zinc-900">
                {favoriteFoods.reduce(
                  (total, item) => total + item.quantity,
                  0,
                )}{" "}
                عدد
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsInvoiceOpen(true)}
              className="rounded-full bg-[#7a394a] px-4 py-2 text-sm font-semibold text-white"
            >
              مشاهده فاکتور
            </button>
          </div>
          <section className="grid gap-4 md:grid-cols-2">
            {favoriteFoods.map((entry) => (
              <FoodCard
                key={entry.foodId}
                food={entry.food}
                quantity={entry.quantity}
                onAddToOrder={() => addToFavorites(entry.foodId)}
                onRemoveFromOrder={() => removeFromFavorites(entry.foodId)}
                onOpen={() => setSelectedFood(entry.food)}
              />
            ))}
          </section>
        </>
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
      <OrderInvoiceModal
        isOpen={isInvoiceOpen}
        items={favoriteFoods}
        onClose={() => setIsInvoiceOpen(false)}
      />
    </PageShell>
  );
}
