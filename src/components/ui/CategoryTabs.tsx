"use client";

import type { FC } from "react";

import type { Category } from "@/types/menu";

interface CategoryTabsProps {
  categories: Category[];
  activeCategoryId: string;
  onSelect: (id: string) => void;
  availabilityMap?: Record<string, boolean>;
}

const CategoryTabs: FC<CategoryTabsProps> = ({
  categories,
  activeCategoryId,
  onSelect,
  availabilityMap = {},
}) => {
  // const isPopularActive = activeCategoryId === "popular";

  return (
    <div className="sticky top-0 z-20 -mx-1 overflow-x-auto bg-[#f5f7ff] px-1 py-3">
      <div className="flex min-w-max gap-2">
        {/* <button
          type="button"
          onClick={() => onSelect("popular")}
          className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition ${
            isPopularActive
              ? "bg-[#7a394a] text-white shadow"
              : "bg-[#9d5367] text-white shadow-sm"
          }`}
        >
          <span>⭐</span>
          <span>محبوب‌ترین‌ها</span>
        </button> */}

        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          const isAvailable = availabilityMap[category.id] ?? true;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition ${
                isActive
                  ? "bg-[#496a65] text-white shadow"
                  : isAvailable
                    ? "bg-[#ffffff] text-black shadow-sm"
                    : "bg-zinc-100 text-zinc-400"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
