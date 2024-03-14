"use client";
import { FormEventHandler, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Paytype =
  | "무통장 입금"
  | "신용카드"
  | "가상계좌"
  | "토스페이"
  | "핸드폰 결제";

const CheckOutPaymentComponent = () => {
  const [payState, setPayState] = useState<Paytype>("신용카드");
  const onChangeHandler = (e: Paytype) => {
    // setPayState(e.target)
    setPayState(e);
  };

  const switchRender = () => {
    switch (payState) {
      case "가상계좌":
        return <>{payState}</>;
      case "무통장 입금":
        return <>{payState}</>;
      case "신용카드":
        return <>{payState}</>;
      case "토스페이":
        return <>{payState}</>;
      case "핸드폰 결제":
        return <>{payState}</>;

      default:
        return null;
    }
  };

  return (
    <Card className="rounded-none min-w-[350px]">
      <CardHeader>
        <CardTitle className="text-lg">결제 방법</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={onChangeHandler}
          defaultValue="신용카드"
          className="flex mt-1 w-full flex-wrap gap-0"
        >
          <div className="flex w-1/2 items-center gap-2 py-2 px-2">
            <RadioGroupItem value={"신용카드"} id="r1" />
            <Label htmlFor="r1">신용카드</Label>
          </div>

          <div className="flex w-1/2 items-center gap-2 py-2 px-2 ">
            <RadioGroupItem value={"가상계좌"} id="r2" />
            <Label htmlFor="r2">가상계좌</Label>
          </div>

          <div className="flex w-1/2 items-center gap-2 py-2 px-2 ">
            <RadioGroupItem value={"무통장 입금"} id="r3" />
            <Label htmlFor="r3">무통장 입금</Label>
          </div>
          <div className="flex w-1/2 items-center gap-2 py-2 px-2 ">
            <RadioGroupItem value={"핸드폰 결제"} id="r4" />
            <Label htmlFor="r4">핸드폰 결제</Label>
          </div>
          <div className="flex w-1/2 items-center gap-2 py-2 px-2 ">
            <RadioGroupItem value={"토스페이"} id="r5" />
            <Label htmlFor="r5">토스페이</Label>
          </div>
        </RadioGroup>

        <div className="flex items-center justify-center mt-1">
          {switchRender()}
        </div>
      </CardContent>
    </Card>
  );
};
export default CheckOutPaymentComponent;
