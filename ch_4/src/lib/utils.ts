import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatPrice(price: string) {
  return new Intl.NumberFormat("ko-KR", {
    currency: "KRW",
    minimumFractionDigits: 0,
  }).format(parseInt(price));
}

export function calculatePoints(totalPay: number): number {
  const rate = 3.5 / 100;
  let points = totalPay * rate;
  points = Math.round(points / 100) * 100;
  return points;
}
