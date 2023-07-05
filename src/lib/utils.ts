import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { z } from "zod";

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

export const japaneseDateFormatRegExp =
  /^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})$/;

export const JapaneseDateFormatSchema = z
  .string()
  .regex(japaneseDateFormatRegExp, {
    message: "Invalid Japanese date format. Expected format: 'YYYYMMDD'.",
  })
  .refine((value) => {
    const match = japaneseDateFormatRegExp.exec(value);
    if (!match) throw new Error("Invalid date format. Must be YYYYMMDD.");

    const { year, month, day } = match.groups ?? {};
    const parsedYear = parseInt(year ?? "", 10);
    const parsedMonth = parseInt(month ?? "", 10);
    const parsedDay = parseInt(day ?? "", 10);

    // Validate month
    if (parsedMonth < 1 || parsedMonth > 12) {
      throw new Error(
        `Invalid month. Must be between 01 and 12. But got ${parsedMonth}.`
      );
    }

    // Validate day based on the month
    const daysInMonth = new Date(parsedYear, parsedMonth, 0).getDate();
    if (parsedDay < 1 || parsedDay > daysInMonth) {
      throw new Error(
        `Invalid day. Must be between 01 and ${daysInMonth} for month ${parsedMonth}. But got ${parsedDay}.`
      );
    }

    return true;
  });
