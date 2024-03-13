"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

const CheckOutFinalPayAgreeComponent = () => {
  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    purchaseTerms: false,
  });

  const handleAllAgreeChange = (checked: CheckedState) => {
    if (checked === "indeterminate") return;
    setAllAgreed(checked);
    setAgreements({
      purchaseTerms: checked,
    });
  };

  const handleAgreementChange = (checked: CheckedState) => {
    if (checked === "indeterminate") return;
    setAgreements({
      purchaseTerms: checked,
    });

    if (agreements.purchaseTerms) {
      setAllAgreed(false);
    }
  };
  return (
    <Card className="rounded-none min-w-[350px]">
      <CardHeader>
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
      </CardHeader>
      <CardContent>
        <div className="flex pl-6 gap-2">
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
        </div>
      </CardContent>
    </Card>
  );
};
export default CheckOutFinalPayAgreeComponent;
