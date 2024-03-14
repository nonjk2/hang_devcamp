import {
  CheckoutProvider,
  CheckOutItemsComponent,
  CheckOutUserInfoComponent,
  CheckOutUserAddressComponent,
  CheckOutCouponComponent,
  CheckOutAccountComponent,
  CheckOutPaymentComponent,
  CheckOutFinalPayAgreeComponent,
} from "@/components/checkout";
import { mockCoupons, mockData } from "@/lib/mocks/mockData";

const MOCK_USER: User = {
  email: "hong@gildong.com",
  id: "asdfsaf",
  image: null,
  nickname: "홍길동",
  phone: "01099999999",
  // address: null,
};

const MOCK_USER_HAS_POINTS = {
  coupons: mockCoupons,
  point: 2300,
};

const CheckOutPage = async () => {
  return (
    <CheckoutProvider productData={mockData}>
      <div className="flex flex-col gap-4 grow">
        <CheckOutItemsComponent />
        <CheckOutUserInfoComponent user={MOCK_USER} />
        <CheckOutUserAddressComponent user={MOCK_USER} />
        <CheckOutCouponComponent {...MOCK_USER_HAS_POINTS} />
      </div>
      <div className="flex flex-col gap-4">
        <CheckOutAccountComponent />
        <CheckOutPaymentComponent />
        <CheckOutFinalPayAgreeComponent />
      </div>

      {/* <CheckOutItemsComponent />
      <CheckOutItemsComponent /> */}
    </CheckoutProvider>
  );
};
export default CheckOutPage;
