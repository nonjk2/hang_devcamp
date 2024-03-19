import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const AdminCouponList = ({
  couponList,
}: {
  couponList: ResponseCoupontype[];
}) => {
  const CouponType = (coupon: ResponseCoupontype) => {
    switch (coupon.coupon_type) {
      case "fixedAmount":
        return {
          coupon_type: "정액제",
          coupon_value: coupon.coupon_value + "원",
        };
      case "percentDiscount":
        return {
          coupon_type: "정액률",
          coupon_value: coupon.coupon_value + "%",
        };
      default:
        return {
          coupon_type: "정액률",
          coupon_value: coupon.coupon_value + "원",
        };
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>내가 발급한 쿠폰</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {couponList &&
          couponList?.map((coupon) => (
            <Card key={coupon.id} className="w-1/3 px-0 hover:shadow-lg">
              <CardHeader className="text-blue-400 font-semibold">
                {coupon.coupon_name}
              </CardHeader>
              <CardContent className="text-sm">
                <div>쿠폰번호 : {coupon.coupon_number}</div>
                <div>쿠폰타입 : {CouponType(coupon).coupon_type}</div>
                <div>쿠폰할인율 : {CouponType(coupon).coupon_value}</div>
              </CardContent>
            </Card>
          ))}
      </CardContent>
    </Card>
  );
};
export default AdminCouponList;
