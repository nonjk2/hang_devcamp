"use client";

import { formatPrice } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { useState } from "react";
import { Icons } from "../icon";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useCheckout } from "./CheckoutProvider";
import { Input } from "../ui/input";

interface HasCouponsAndPointInterface {
  coupons: Coupon[];
  point: number;
}

const CheckOutCouponComponent = ({
  coupons: userCouponData,
  point,
}: HasCouponsAndPointInterface) => {
  const [coupons, setCoupons] = useState<Coupon[]>(userCouponData);
  const [currentCoupons, setCurrentCoupons] = useState<Coupon>();
  const [lookUpCoupon, setLookUpCoupon] = useState<string>();
  const { checkoutInfo, updateCheckoutInfo } = useCheckout();
  const [pointValue, setPointValue] = useState(0);

  // 쿠폰선택핸들러
  const onValueChange: (value: string) => void = (e) => {
    let currentCoupon = coupons.find((coupons) => coupons.id === e);
    setCurrentCoupons(currentCoupon);
  };

  // 쿠폰적용핸들러
  const onClickCouponHandler = () => {
    const { totalCost } = checkoutInfo;
    let couponCost = 0;
    if (currentCoupons?.couponType === "fixedAmount") {
      couponCost = currentCoupons.couponValue;
    } else if (currentCoupons?.couponType === "percentDiscount") {
      couponCost = totalCost / currentCoupons.couponValue;
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
  // 쿠폰확인 핸들러
  const onClickCouponLookUpHandler = async () => {
    // 쿠폰 db 확인
    // const realCoupon = await superbase
    // if (lookUpCoupon === ) {
    // }
  };

  // 포인트 취소핸들러
  const onClickCloseHandler = () => {
    updateCheckoutInfo({ ...checkoutInfo, point: 0 });
    setPointValue(0);
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
                    <SelectItem value={e.id} key={e.id}>
                      {e.couponName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={onClickCouponHandler} className="focus:ring-0">
              쿠폰적용
            </Button>
          </div>
        </div>

        {/* 쿠폰 번호 입력 */}
        <div className="flex flex-col w-full gap-2">
          <span className="text-sm">쿠폰 번호</span>
          <div className="flex justify-between gap-2">
            <div className="grow">
              <Input
                placeholder="쿠폰 번호 입력"
                className="focus-visible:ring-0"
                value={lookUpCoupon}
                onChange={(e) => setLookUpCoupon(e.target.value)}
              />
            </div>
            <Button
              onClick={onClickCouponLookUpHandler}
              className="focus:ring-0"
            >
              번호 확인
            </Button>
          </div>
        </div>

        {/* 포인트 입력 */}
        <div className="flex flex-col w-full gap-2">
          <span className="text-sm">포인트</span>
          <div className="flex justify-between gap-2">
            <div className="flex grow border-border border justify-between">
              <Input
                placeholder="사용할 포인트 입력"
                className="grow focus-visible:ring-offset-0 focus-visible:ring-0  border-none"
                // value={pointValue}
                type="number"
                // onChange={onChangeHandler}
                defaultValue={pointValue}
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
            <Button onClick={onClickPointHandler} className="focus:ring-0">
              전액 사용
            </Button>
          </div>
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
      </CardContent>
    </Card>
  );
};
export default CheckOutCouponComponent;
