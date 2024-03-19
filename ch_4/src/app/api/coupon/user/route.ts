import { userAddCoupon } from "@/lib/action/auth/user";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const response = await userAddCoupon(body);
  if (response.message === "쿠폰이 등록되었습니다") {
    revalidateTag("coupons");
  }

  return NextResponse.json(response);
};
