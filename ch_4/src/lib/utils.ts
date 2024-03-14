import { type ClassValue, clsx } from "clsx";
import { Address } from "react-daum-postcode";
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

export const handleComplete = (
  setAdress: (fullAdress: string, data: Address) => void,
  data: Address
) => {
  let fullAddress = data.address;
  let extraAddress = "";
  console.log(data);
  if (data.addressType === "R") {
    if (data.bname !== "") {
      extraAddress += data.bname;
    }
    if (data.buildingName !== "") {
      extraAddress +=
        extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    }
    fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  }
  console.log(fullAddress);
  setAdress(fullAddress, data);
};
