import AuthProfileForm from "@/components/AuthProfileForm";
import AdminCouponList from "@/components/admin/AdminCouponList";
import AdminCouponSetting from "@/components/admin/AdminCouponSetting";
import { authOption } from "@/lib/action/auth/authoption";
import { getMyCoupons } from "@/lib/action/auth/user";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOption);
  const useIssuedCoupon = await getMyCoupons(session?.user.id!);
  return (
    <div className="px-10 max-w-7xl m-auto">
      <AuthProfileForm session={session!} />
      <div className="flex w-full gap-3">
        <AdminCouponSetting user={session?.user!} />
        <AdminCouponList couponList={useIssuedCoupon} />
      </div>
    </div>
  );
};
export default page;
