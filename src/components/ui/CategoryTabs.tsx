/* eslint-disable no-unused-vars */
"use client";

import { getCategoryIcon, sortCategories } from "@/lib/menu/utils";
import type { MenuCategory } from "@/types/menu";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

interface CategoryTabsProps {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelect: (id: string) => void;
}

const CategoryTabs = ({
  categories,
  activeCategoryId,
  onSelect,
}: CategoryTabsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  /**
   * فقط دسته های اصلی نمایش داده شوند
   * مثال:
   *
   * نوشیدنی های گرم
   *   ├ دمنوش و چایی
   *   ├ بر پایه شیر
   *
   * فقط نوشیدنی های گرم در تب نمایش داده می شود
   */
  const parentCategories = useMemo(() => {
    return sortCategories(
      categories.filter((category) => category.ParentId === null),
    );
  }, [categories]);

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
        className="
          flex
          gap-1
          overflow-x-auto
          rounded-2xl
          bg-[#7a394a]/90
          p-2
          backdrop-blur-md
        "
      >
        {parentCategories.map((category) => {
          const isActive = String(category.Id) === activeCategoryId;

          return (
            <button
              key={category.Id}
              type="button"
              data-id={category.Id}
              onClick={() => onSelect(String(category.Id))}
              className={`
                flex
                shrink-0
                items-center
                gap-1
                rounded-xl
                p-2
                text-sm
                font-semibold
                transition

                ${
                  isActive
                    ? "bg-[#496a65] text-white shadow"
                    : "bg-white text-zinc-800 shadow-sm hover:bg-zinc-50"
                }
              `}
            >
              <Image
                src={getCategoryIcon(category.Id)}
                alt={category.Title}
                width={30}
                height={30}
                className="
                  rounded-lg
                  object-cover
                "
                unoptimized
              />

              <span>{category.Title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
