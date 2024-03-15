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
import CheckOutPaymentsComponents from "@/components/checkout/CheckOutPaymentsComponents";
import { authOption } from "@/lib/action/auth/authoption";
import {
  userGetDeliveryAddress,
  usersHasCoupons,
} from "@/lib/action/auth/user";
import { mockData } from "@/lib/mocks/mockData";
import { getServerSession } from "next-auth";
import { cache } from "react";
import { setTimeout } from "timers/promises";

const userDeliveryAddress = cache(async (userId: string) =>
  userGetDeliveryAddress(userId)
);

const userHasGetCoupons = cache(async (userId: string) =>
  usersHasCoupons(userId)
);
const CheckOutPage = async () => {
  const userSession = await getServerSession(authOption);
  if (!userSession) {
    return null;
  }
  const userHasCoupons = await userHasGetCoupons(userSession.user.id);
  const userdelAddress: UserAddressResponse[] = await userDeliveryAddress(
    userSession.user.id
  );

  return (
    <CheckoutProvider productData={mockData}>
      <div className="flex flex-col gap-4 grow">
        <CheckOutItemsComponent />
        <CheckOutUserInfoComponent user={userSession.user} />
        <CheckOutUserAddressComponent
          user={userSession.user}
          Addresses={userdelAddress}
        />
        <CheckOutCouponComponent
          point={2300}
          coupons={userHasCoupons.data?.map((e) => e.coupons)!}
          user={userSession.user}
        />
      </div>
      <div className="flex flex-col gap-4">
        <CheckOutPaymentsComponents />
      </div>

      {/* <CheckOutItemsComponent />
      <CheckOutItemsComponent /> */}
    </CheckoutProvider>
  );
};
export default CheckOutPage;
