import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args));
};

export const japaneseDateToShortDate = (japaneseDate: string) => {
  const year = parseInt(japaneseDate.substring(0, 4));
  const month = parseInt(japaneseDate.substring(4, 6));
  const day = parseInt(japaneseDate.substring(6, 8));

  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
    }
  );

  return formattedDate;
};
