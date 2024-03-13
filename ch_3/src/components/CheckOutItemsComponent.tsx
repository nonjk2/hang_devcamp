"use client";

import { useCheckout } from "./CheckoutProvider";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

const CheckOutItemsComponent = () => {
  const { checkoutInfo } = useCheckout();
  const checkOutItemsCombined = checkoutInfo.items.reduce<ProductWithCount[]>(
    (acc, item) => {
      const found = acc.find(
        (x) => x.product_info.productId === item.product_info.productId
      );
      if (found) {
        found.count += 1;
      } else {
        acc.push({ ...item, count: 1 });
      }
      return acc;
    },
    []
  );
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg">주문 상품 정보</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 mt-3">
        {checkOutItemsCombined.map((items) => (
          <div className="flex" key={items.id}>
            <div className="relative overflow-hidden w-24 h-24 rounded-sm">
              <Image
                src={items.product_info.image}
                fill
                className="absolute top-0 right-0 left-0 bottom-0 object-cover"
                alt={items.product_info.name}
              />
            </div>
            <div className="flex flex-col px-3 text-base leading-none py-1">
              <div className="text-primary">{items.product_info.name}</div>

              <div className="text-gray-400 text-sm">
                {items.product_info.size} - {items.count}개
              </div>
              <div className="text-primary font-bold py-1">
                {formatPrice(items.product_info.price) + "원"}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default CheckOutItemsComponent;
