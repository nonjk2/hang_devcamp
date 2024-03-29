import { adminAddCoupon } from "@/lib/action/auth/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const response = await adminAddCoupon(body);

  return NextResponse.json(response);
};
