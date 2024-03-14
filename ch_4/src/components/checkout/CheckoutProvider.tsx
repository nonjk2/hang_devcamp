"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface CheckOutInfo {
  items: Product[];
  totalCost: number;
  couponCost: number;
  point: number;
  deliveryCost: number;
}

interface CheckOutContextInterface {
  checkoutInfo: CheckOutInfo;
  updateCheckoutInfo: (info: CheckOutInfo) => void;
}
const CheckoutContext = createContext<CheckOutContextInterface>({
  checkoutInfo: {
    items: [],
    totalCost: 0,
    couponCost: 0,
    point: 0,
    deliveryCost: 0,
  },
  updateCheckoutInfo: () => {},
});

const CheckoutProvider = ({
  children,
  productData,
}: {
  productData: Product[];
  children: ReactNode;
}) => {
  const initialTotalCost = productData.reduce(
    (total, item) => total + parseInt(item.product_info.price),
    0
  );
  const [checkoutInfo, setCheckoutInfo] = useState<CheckOutInfo>({
    items: productData,
    totalCost: initialTotalCost,
    couponCost: 0,
    point: 0,
    deliveryCost: 2500,
  });

  const updateCheckoutInfo = (info: CheckOutInfo) => {
    setCheckoutInfo((prevInfo) => ({
      ...prevInfo,
      ...info,
    }));
  };
  const value = {
    checkoutInfo,
    updateCheckoutInfo,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);

export default CheckoutProvider;
