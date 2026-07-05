import cakeodesser from "@/assets/category/cakeodesser.png";
import main from "@/assets/category/main.png";
import noshidanigarm from "@/assets/category/noshidanigarm.png";
import noshidanisard from "@/assets/category/noshidanisard.png";
import pasta from "@/assets/category/pasta.png";
import pishQaza from "@/assets/category/pish.png";
import pitzaha from "@/assets/category/pitzaha.png";
import qahve from "@/assets/category/qahve.png";
import qelyon from "@/assets/category/qelyan.png";
import salad from "@/assets/category/salad.png";
import sandwich from "@/assets/category/sandwich.png";
import shakeoesmoti from "@/assets/category/sheykoesmoti.png";
import sobhane from "@/assets/category/sobhane.png";

export const categories = [
  {
    id: "appetizer",
    title: "پیش غذا",
    icon: pishQaza,
    description: "انتخابی سبک و خوش‌طعم برای شروع",
    availability: { type: "always" },
  },
  {
    id: "salad",
    title: "سالاد",
    icon: salad,
    description: "سالاد‌های تازه و پرانرژی برای هر سلیقه",
    availability: { type: "always" },
  },
  {
    id: "pizza",
    title: "پیتزا ها",
    icon: pitzaha,
    description: "پیتزای خوش‌طعم و داغ برای هر لحظه",
    availability: { type: "always" },
  },
  {
    id: "pasta",
    title: "پاستاها و نودل",
    icon: pasta,
    description: "پاستا و نودل‌های خوش‌طعم و پرکالری",
    availability: { type: "always" },
  },
  {
    id: "main",
    title: "غذای اصلی",
    icon: main,
    description: "غذاهای اصلی با کیفیت و طعم ماندگار",
    availability: {
      type: "hours",
      availableFrom: "11:00",
      availableTo: "23:00",
    },
  },
  {
    id: "sandwich",
    title: "ساندویچ",
    icon: sandwich,
    description: "ساندویچ‌های پرشور و خوش‌طعم",
    availability: {
      type: "hours",
      availableFrom: "11:00",
      availableTo: "23:00",
    },
  },
  {
    id: "coffee",
    title: "قهوه",
    icon: qahve,
    description: "کافه‌ای از بهترین دانه‌های عربیکا",
    availability: { type: "always" },
  },
  {
    id: "hot-drinks",
    title: "نوشیدنی های گرم",
    icon: noshidanigarm,
    description: "انتخابی گرم و آرام‌بخش برای آن لحظه",
    availability: { type: "always" },
  },
  {
    id: "cold-drinks",
    title: "نوشیدنی های سرد",
    icon: noshidanisard,
    description: "انتخابی خنک و تازه برای هوای گرم",
    availability: {
      type: "always",
    },
  },
  {
    id: "cake-dessert",
    title: "کیک و دسر",
    icon: cakeodesser,
    description: "کیک و دسرهای تازه و خوش‌عطر",
    availability: {
      type: "always",
    },
  },
  {
    id: "shake-smoothie",
    title: "شیک و اسموتی",
    icon: shakeoesmoti,
    description: "شیک و اسموتی‌های خوش‌طعم و پرانرژی",
    availability: { type: "always" },
  },
  {
    id: "hookah",
    title: "قلیان ها",
    icon: qelyon,
    description: "قلیان با طعم‌های خاص و آرامش‌بخش",
    availability: { type: "always" },
  },
  {
    id: "breakfast",
    title: "صبحانه",
    icon: sobhane,
    description: "صبحانه‌ای سبک و خوش‌طعم",
    availability: {
      type: "always",
    },
  },
];
