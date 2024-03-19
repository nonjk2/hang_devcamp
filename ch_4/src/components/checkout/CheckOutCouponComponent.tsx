"use client";

import { formatPrice } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { ChangeEvent, useState } from "react";
import { Icons } from "../icon";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useCheckout } from "./CheckoutProvider";
import { Input } from "../ui/input";
import LookUpCoupons from "./childcomponent/LookUpCoupons";

interface HasCouponsAndPointInterface {
  coupons: ResponseCoupontype[];
  point: number;
  user: authUser;
}

const CheckOutCouponComponent = ({
  coupons,
  user,
  point,
}: HasCouponsAndPointInterface) => {
  const [currentCoupons, setCurrentCoupons] = useState<ResponseCoupontype>();
  const { checkoutInfo, updateCheckoutInfo } = useCheckout();
  const [pointValue, setPointValue] = useState(0);

  // 쿠폰선택핸들러
  const onValueChange: (value: string) => void = (e) => {
    let currentCoupon = coupons.find((coupons) => String(coupons.id) === e);
    setCurrentCoupons(currentCoupon);
  };

  // 쿠폰적용핸들러
  const onClickCouponHandler = () => {
    const { totalCost } = checkoutInfo;

    let couponCost = 0;
    if (currentCoupons?.coupon_type === "fixedAmount") {
      couponCost = currentCoupons.coupon_value;
    } else if (currentCoupons?.coupon_type === "percentDiscount") {
      couponCost = totalCost / currentCoupons.coupon_value;
    }
    updateCheckoutInfo({ ...checkoutInfo, couponCost });
  };
  // 포인트 전액 사용버튼 핸들러
  const onClickPointHandler = () => {
    if (!(checkoutInfo.totalCost > 10000 || point > 10000)) return;
    setPointValue(point);
    updateCheckoutInfo({ ...checkoutInfo, point });
  };
  // };

  // 포인트 취소핸들러
  const onClickCloseHandler = () => {
    updateCheckoutInfo({ ...checkoutInfo, point: 0 });
    setPointValue(0);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    while (inputValue.length > 1 && inputValue.startsWith("0")) {
      inputValue = inputValue.substring(1);
    }
    const value = Number(inputValue);
    if (value > point) {
      return setPointValue(point);
    }

    setPointValue(value);
  };

  return (
    <Card className="rounded-none min-w-[500px]">
      <CardHeader>
        <CardTitle className="text-lg">쿠폰/포인트</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 mt-3 flex-col">
        {/* 쿠폰 */}
        <div className="flex flex-col w-full gap-2">
          <span className="text-sm">쿠폰</span>
          <div className="flex justify-between gap-2">
            <div className="grow">
              <Select onValueChange={onValueChange}>
                <SelectTrigger className="w-full focus:ring-0">
                  <SelectValue placeholder="쿠폰을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"null"}>{"사용안함"}</SelectItem>
                  {coupons.map((e) => (
                    <SelectItem value={String(e.id)} key={e.id}>
                      {e.coupon_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={onClickCouponHandler}
              className="focus:ring-0 w-20"
            >
              쿠폰적용
            </Button>
          </div>
        </div>

        {/* 쿠폰 번호 입력 */}
        <LookUpCoupons user={user} />
        {/* 포인트 입력 */}
        <div className="flex flex-col w-full gap-2">
          <span className="text-sm">포인트</span>
          <div className="flex justify-between gap-2">
            <div className="flex grow border-border border justify-between">
              <Input
                placeholder="사용할 포인트 입력"
                className="grow focus-visible:ring-offset-0 focus-visible:ring-0  border-none"
                value={pointValue}
                type="number"
                onChange={onChangeHandler}
                // defaultValue={pointValue}
              />
              {pointValue !== 0 && (
                <div
                  className="flex items-center justify-center w-10 h-full cursor-pointer"
                  onClick={onClickCloseHandler}
                >
                  <Icons.close className="w-4 h-4" />
                </div>
              )}
            </div>
            <Button onClick={onClickPointHandler} className="focus:ring-0 w-20">
              전액 사용
            </Button>
          </div>
          <div className="flex flex-col">
            <div className="text-sm flex gap-1">
              <p>보유 포인트</p>
              <p className="font-semibold">{formatPrice(String(point))}</p>
            </div>
            <div className="text-sm flex text-gray-400">
              <p>5,000 포인트 이상 보유 및 10,000원 이상 구매시 사용가능</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CheckOutCouponComponent;
