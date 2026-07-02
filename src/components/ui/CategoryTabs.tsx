/* eslint-disable no-unused-vars */
"use client";

import type { Category } from "@/types/menu";
import { useEffect, useRef } from "react";

interface CategoryTabsProps {
  availabilityMap?: Record<string, boolean>;
  activeCategoryId: string;
  onSelect: (_id: string) => void;
  categories: Category[];
}

const CategoryTabs = ({
  categories,
  activeCategoryId,
  onSelect,
  availabilityMap = {},
}: CategoryTabsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeBtn = containerRef.current?.querySelector(
      `[data-id="${activeCategoryId}"]`,
    ) as HTMLElement | null;

    if (activeBtn && containerRef.current) {
      const container = containerRef.current;

      const offsetLeft =
        activeBtn.offsetLeft -
        container.offsetWidth / 2 +
        activeBtn.offsetWidth / 2;

      container.scrollTo({
        left: offsetLeft,
        behavior: "smooth",
      });
    }
  }, [activeCategoryId]);

  return (
    <div className="sticky top-0 z-50 mb-4">
      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto rounded-2xl bg-white/70 p-2 backdrop-blur-md"
      >
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          const isAvailable = availabilityMap[category.id] ?? true;

          return (
            <button
              key={category.id}
              type="button"
              data-id={category.id}
              onClick={() => onSelect(category.id)}
              className={`
                flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition
                ${
                  isActive
                    ? "bg-[#496a65] text-white shadow"
                    : isAvailable
                      ? "bg-white text-zinc-800 shadow-sm hover:bg-zinc-50"
                      : "bg-zinc-100 text-zinc-400"
                }
              `}
            >
              <span>{category.icon}</span>
              <span>{category.title}</span>

              {/* optional availability dot */}
              {!isAvailable && (
                <span className="ml-1 h-2 w-2 rounded-full bg-red-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
