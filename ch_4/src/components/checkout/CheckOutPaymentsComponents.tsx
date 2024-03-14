"use client";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { useRef, useEffect, useState, useMemo } from "react";
import {
  CheckOutAccountComponent,
  CheckOutFinalPayAgreeComponent,
  CheckOutPaymentComponent,
} from ".";
import { useCheckout } from "./CheckoutProvider";

const CheckOutPaymentsComponents = () => {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const { checkoutInfo } = useCheckout();
  const { couponCost, items, point, totalCost, deliveryCost } = checkoutInfo;
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  const [totalPrice, setTotalPrice] = useState(
    totalCost - couponCost - point + deliveryCost
  );
  const totalPrices = useMemo(
    () => totalCost - couponCost - point + deliveryCost,
    [couponCost, deliveryCost, point, totalCost]
  );

  useEffect(() => {
    setTotalPrice(totalPrices);
  }, [totalPrices]);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(
        process.env.NEXT_PUBLIC_TOSSPAYMENT_CLIENTKEY || "",
        process.env.NEXT_PUBLIC_TOSSPAYMENT_SECRETKEY || ""
      );

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        totalPrice
      );

      paymentWidget.renderAgreement("#agreement", {
        variantKey: "AGREEMENT",
      });

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(
      totalPrice,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [totalPrice]);

  const onClickPaymentHandler = async () => {
    const paymentWidget = paymentWidgetRef.current;
    if (paymentWidget) {
      const paymentAgreement = paymentWidget.renderAgreement("#agreement");
      if (!paymentAgreement.getAgreementStatus().agreedRequiredTerms) return;
    }

    try {
      const res = await paymentWidget
        ?.requestPayment({
          orderId: "asdasd",
          orderName: "토스 티셔츠 외 2건",
          customerName: "김토스",
          customerEmail: "customer123@gmail.com",
          // successUrl: `${window.location.origin}/success`,
          // failUrl: `${window.location.origin}/fail`,
        })
        .then((data) => console.log());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CheckOutAccountComponent />
      <CheckOutPaymentComponent />
      <CheckOutFinalPayAgreeComponent onClickPayment={onClickPaymentHandler} />
    </>
  );
};
export default CheckOutPaymentsComponents;