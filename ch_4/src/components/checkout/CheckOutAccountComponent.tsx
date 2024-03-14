"use client";

import { calculatePoints, formatPrice } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useCheckout } from "./CheckoutProvider";

const CheckOutAccountComponent = () => {
  const { checkoutInfo } = useCheckout();
  const { couponCost, items, point, totalCost, deliveryCost } = checkoutInfo;
  const TotalReduceCost = () => {
    let totalReduce = totalCost - couponCost - point + deliveryCost;

    return totalReduce;
  };
  const rewardPoint = calculatePoints(totalCost + deliveryCost);
  return (
    <Card className="rounded-none min-w-[350px]">
      <CardHeader>
        <CardTitle className="text-lg">최종 결제금액</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col mt-1">
        <div className="flex justify-between">
          <div className="text-sm text-gray-400">상품 가격</div>
          <div className="text-sm">{formatPrice(String(totalCost))}원</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-400">쿠폰 할인</div>
          <div className="text-sm">-{formatPrice(String(couponCost))}원</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-400">포인트 사용</div>
          <div className="text-sm">-{formatPrice(String(point))}원</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-400">배송비</div>
          <div className="text-sm">+{formatPrice(String(deliveryCost))}원</div>
        </div>
        <div className="relative mt-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
        <div className="flex justify-between pt-4 pb-2">
          <div className="text-base text-primary font-medium">총 결제금액</div>
          <div className="text-base font-semibold text-blue-500">
            {formatPrice(String(TotalReduceCost()))}원
          </div>
        </div>
      </CardContent>
      <div className="w-full bg-slate-100 p-4 px-6 text-sm font-medium">
        <span className="text-blue-500">
          {formatPrice(String(rewardPoint))}
        </span>
        <span> 포인트 적립예정</span>
      </div>
    </Card>
  );
};
export default CheckOutAccountComponent;
