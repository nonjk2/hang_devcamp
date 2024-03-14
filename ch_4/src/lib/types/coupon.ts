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

interface ResponseCoupontype {
  id: number;
  coupon_name: string;
  coupon_description: string;
  coupon_number: string;
  use: boolean;
  coupon_value: number;
  coupon_type: "fixedAmount" | "percentDiscount";
  issued_by: string;
}

interface finalCoupon {
  id: number;
  coupon_number: string;
}

interface UserCoupon {
  id: number;
  user_id: string;
  coupon_id: number;
  coupon_use: boolean;
  coupons: ResponseCoupontype;
}
