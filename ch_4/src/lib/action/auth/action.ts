"use server";

import { SignformSchema } from "@/lib/constant";
import { z } from "zod";
import { RoleTypeNameConvert } from "@/lib/types/enum";
import { checkUserExists, createUser } from "./user";
import { CombineFetch } from "..";
import { revalidatePath, revalidateTag } from "next/cache";
import { setTimeout } from "timers/promises";

export const SignAction = async (formData: z.infer<typeof SignformSchema>) => {
  const {
    이름: name,
    이메일: email,
    연락처: phone,
    역할: role,
    비밀번호: password,
  } = formData;
  try {
    const existingUser = await checkUserExists(email);
    if (existingUser) {
      return { message: "이메일이 중복 되었습니다." };
    }
    const newUser = await createUser({
      email,
      password,
      name,
      role: RoleTypeNameConvert[role] ?? "user",
    });
    console.log("newUser : ", newUser);

    return { message: "회원가입성공" };
  } catch (error) {
    console.error("회원가입 오류 : ", error);
    return { message: "회원가입오류" };
  }
  // redirect("/");
  // const res = await CombineFetch<any>({
  //   path: "/api/users",
  //   body,
  //   method: "POST",
  // });

  // if (res.status === "success") {
  //   await setTimeout(2000);
  // }
};

export const onClickCouponLookUpHandler = async (
  userId: string,
  prevState: any,
  formData: FormData
): Promise<responseObject> => {
  "use server";
  const couponsNumber = (formData.get("coupon") as string) ?? "";

  try {
    const res = await CombineFetch<
      { message: string },
      { couponsNumber: string; userId: string }
    >({
      path: "/api/coupon/user",
      method: "POST",
      body: {
        couponsNumber,
        userId,
      },
    });
    if (res.status === "success") {
      revalidatePath("/checkout");
      revalidateTag("coupons");
      if (res.data.message !== "쿠폰이 등록되었습니다") {
        return { message: res.data.message, status: "failure" };
      }
      return { message: res.data.message, status: res.status };
    } else {
      return { message: res.error, status: res.status };
    }
  } catch (error) {
    throw error;
  }
};
