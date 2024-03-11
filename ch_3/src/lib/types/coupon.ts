interface defaultCoupon {
  id: string;
  couponName: string;
  couponDescription: string;
  couponNumber: string;
  use: boolean;
  couponValue: number;
}

interface FixedAmountCoupon extends defaultCoupon {
  couponType: "fixedAmount";
}

interface PercentDiscountCoupon extends defaultCoupon {
  couponType: "percentDiscount";
}

type Coupon = FixedAmountCoupon | PercentDiscountCoupon;
