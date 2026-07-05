"use client";

import Image from "next/image";
import type { FC, KeyboardEvent, MouseEvent } from "react";

import { motion } from "framer-motion";

import AvailabilityIndicator from "@/components/ui/AvailabilityIndicator";
import BadgePopular from "@/components/ui/BadgePopular";
import {
  formatPrice,
  getCategoryById,
  isAvailabilityActive,
} from "@/lib/menu/utils";
import type { Food } from "@/types/menu";

interface FoodCardProps {
  food: Food;
  quantity: number;
  onAddToOrder: () => void;
  onRemoveFromOrder: () => void;
  onOpen: () => void;
}

const FoodCard: FC<FoodCardProps> = ({
  food,
  quantity,
  onAddToOrder,
  onRemoveFromOrder,
  onOpen,
}) => {
  const category = getCategoryById(food.categoryId);
  const isAvailable = isAvailabilityActive(food.availability);

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAddToOrder();
  };

  const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onRemoveFromOrder();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={handleCardKeyDown}
    >
      <div className="relative h-80 w-full bg-zinc-100">
        <Image
          src={food.image}
          alt={food.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <BadgePopular isPopular={food.isPopular} />
          <div className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-600 shadow-sm">
            {category?.title}
          </div>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/90 p-1 shadow-sm">
            {quantity > 0 ? (
              <>
                <button
                  type="button"
                  onClick={handleRemoveClick}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-lg font-semibold text-zinc-700"
                  aria-label="کاهش تعداد"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm font-semibold text-zinc-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleAddClick}
                  disabled={!food.favoriteEnabled || !isAvailable}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7a394a] text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="افزایش تعداد"
                >
                  +
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleAddClick}
                disabled={!food.favoriteEnabled || !isAvailable}
                className="rounded-full bg-[#7a394a] px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                افزودن
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 text-right">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-zinc-900">{food.name}</h3>
            <p className="mt-1 text-sm text-zinc-500">
              {food.shortDescription}
            </p>
          </div>
          <span className="text-sm font-semibold text-amber-600">
            {formatPrice(food.price)}
          </span>
        </div>
        <div className="mt-4">
          <AvailabilityIndicator availability={food.availability} />
        </div>
        {quantity > 0 ? (
          <p className="mt-2 text-sm font-medium text-[#496a65]">
            {quantity} عدد در لیست سفارش
          </p>
        ) : null}
        {!isAvailable ? (
          <p className="mt-2 text-sm font-medium text-rose-500">
            در حال حاضر قابل سفارش نیست
          </p>
        ) : null}
      </div>
    </motion.article>
  );
};

export default FoodCard;
