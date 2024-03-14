"use client";
import { Card } from "../ui/card";

const CheckOutPaymentComponent = () => {
  return (
    <Card className="rounded-none min-w-[350px]">
      <div className="flex w-full items-center justify-center">
        <div id="payment-widget" className="text-xs p-0 w-full bg-background" />
      </div>
    </Card>
  );
};
export default CheckOutPaymentComponent;
