"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";

import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "../ui/checkbox";

const CheckOutFinalPayAgreeComponent = ({
  onClickPayment,
}: {
  onClickPayment: () => void;
}) => {
  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    purchaseTerms: false,
  });

  // const handleAllAgreeChange = (checked: CheckedState) => {
  //   if (checked === "indeterminate") return;
  //   setAllAgreed(checked);
  //   setAgreements({
  //     purchaseTerms: checked,
  //   });
  // };

  // const handleAgreementChange = (checked: CheckedState) => {
  //   if (checked === "indeterminate") return;
  //   setAgreements({
  //     purchaseTerms: checked,
  //   });

  //   if (agreements.purchaseTerms) {
  //     setAllAgreed(false);
  //   }
  // };
  return (
    <Card className="rounded-none min-w-[350px] p-0">
      {/* <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Checkbox
            id="allAgree"
            className="border-border"
            checked={allAgreed}
            onCheckedChange={handleAllAgreeChange}
          />
          <label
            htmlFor="allAgree"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            전체 동의
          </label>
        </CardTitle>
      </CardHeader> */}
      <CardContent className="p-0">
        <div
          id="agreement"
          style={{ width: "100%", fontSize: "14px", padding: 0 }}
        />
        {/* <div className="flex pl-6 gap-2">
          <Checkbox
            id="purchaseTerms"
            name="purchaseTerms"
            className="border-border"
            checked={agreements.purchaseTerms}
            onCheckedChange={handleAgreementChange}
          />
          <label
            htmlFor="purchaseTerms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            구매 조건확인 및 결제 진행에 대한 동의
          </label>
        </div> */}
      </CardContent>
      <CardFooter className="p-0">
        <div
          className="font-bold w-full flex items-center justify-center cursor-pointer bg-blue-600 text-white p-3"
          onClick={onClickPayment}
        >
          결제하기
        </div>
      </CardFooter>
    </Card>
  );
};
export default CheckOutFinalPayAgreeComponent;
