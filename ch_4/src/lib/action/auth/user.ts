import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { CombineFetch } from "..";
const bcrypt = require("bcryptjs");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface UserFormData {
  email: string;
  password: string;
  name: string;
  role: string;
}
export async function checkUserExists(email: string) {
  const { data: user, error } = await supabase
    .schema("next_auth")
    .from("users")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (error && error.message !== "No rows found") {
    throw error;
  }

  return user;
}

export async function createUser({
  email,
  password,
  name,
  role,
}: UserFormData) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const { data, error } = await supabase
    .schema("next_auth")
    .from("users")
    .insert({
      email,
      password: hashedPassword,
      name,
      role,
    });

  if (error) {
    throw error;
  }

  return data;
}
export async function getUserByEmail(email: string) {
  const { data: user, error } = await supabase
    .schema("next_auth")
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user:", error);
    throw error;
  }

  return user;
}

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role,
    };
  } catch (error) {
    console.error("Authentication error : ", error);
    return null;
  }
}
export async function userAddDeliveryAddress(
  addressInfo: UserAddress
): Promise<{ message: "주소가 설정되었습니다" | "다시 시도 하세요" }> {
  try {
    const { data, error } = await supabase
      .from("user_addresses")
      .insert(addressInfo)
      .maybeSingle();
    if (error) {
      console.error("Error fetching user:", error);
      throw error;
    }

    return { message: "주소가 설정되었습니다" };
  } catch (error) {
    console.error("Authentication error : ", error);
    return { message: "다시 시도 하세요" };
  }
}

export async function userGetDeliveryAddress(
  id: string
): Promise<UserAddressResponse[]> {
  try {
    const { data, error } = await supabase
      .from("user_addresses")
      .select("*")
      .eq("user_id", id);

    if (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function adminAddCoupon(
  coupon: Pick<
    Coupon,
    "couponValue" | "couponNumber" | "couponDescription" | "couponType"
  > & { user: string }
): Promise<{
  message:
    | "쿠폰이 등록되었습니다"
    | "다시 시도 하세요"
    | "쿠폰번호가 중복되었습니다.";
}> {
  try {
    const { data, error } = await supabase
      .from("coupons")
      .insert({
        coupon_name: coupon.couponDescription,
        coupon_description: coupon.couponDescription,
        coupon_number: coupon.couponNumber,
        coupon_value: coupon.couponValue,
        coupon_type: coupon.couponType,
        issued_by: coupon.user,
      })
      .maybeSingle();
    if (error?.code === "23505") {
      return { message: "쿠폰번호가 중복되었습니다." };
    }
    if (error) {
      console.error("Error fetching user:", error);
      throw error;
    }

    return { message: "쿠폰이 등록되었습니다" };
  } catch (error) {
    console.error("Authentication error : ", error);
    return { message: "다시 시도 하세요" };
  }
}

//관리자가 발행한 쿠폰
export async function getMyCoupons(id: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("issued_by", id);
    if (error) {
      console.error("쿠폰 Error fetching user:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("쿠폰 Authentication error : ", error);
    return { message: "다시 시도 하세요" };
  }
}

// 유저가 가진쿠폰
// export async function usersHasCoupons(
//   id: string
// ): Promise<{ message: string; data?: UserCoupon[] }> {
//   try {
//     const { data, error } = await supabase
//       .from("user_coupons")
//       .select(
//         `
//         *,
//         coupons (
//           *
//         )
//         `
//       )
//       .eq("user_id", id)
//       .eq("coupon_use", false); // 사용되지 않은 쿠폰만 조회

//     if (error) {
//       console.error("Error fetching unused user coupons:", error);
//       return { message: "다시 시도 하세요" };
//     }
//     return { message: "사용되지 않은 쿠폰 정보 조회 성공", data };
//   } catch (error) {
//     console.error("Error retrieving unused user coupons:", error);
//     return {
//       message: "서버 오류로 사용되지 않은 쿠폰 정보 조회에 실패했습니다.",
//     };
//   }
// }

export async function usersHasCoupons(
  id: string
): Promise<{ message: string; data?: UserCoupon[] }> {
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  try {
    const response = await CombineFetch<UserCoupon[], null>({
      path: `${supabaseURL}/rest/v1/user_coupons?select=*,coupons(*)&user_id=eq.${id}&coupon_use=eq.false`,
      headers: {
        apikey: supabaseKey,
        // Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      next: { tags: ["coupons"] },
      cache: "no-store",
      db: true,
      method: "GET",
    });

    if (response.status === "failure") {
      // 서버에서 오류 응답을 받은 경우

      return { message: response.error };
    }
    return {
      message: "사용되지 않은 쿠폰 정보 조회 성공",
      data: response.data,
    };
  } catch (error) {
    console.error("Error retrieving unused user coupons:", error);
    return {
      message: "서버 오류로 사용되지 않은 쿠폰 정보 조회에 실패했습니다.",
    };
  }
}

// 쿠폰 확인후 등록
export async function userAddCoupon({
  couponsNumber,
  userId,
}: {
  couponsNumber: string;
  userId: string;
}): Promise<{
  message:
    | "쿠폰이 등록되었습니다"
    | "다시 시도 하세요"
    | "쿠폰 등록 오류"
    | "없는 쿠폰번호입니다."
    | "이미 등록된 쿠폰입니다.";
}> {
  const { data: coupon, error: couponFindError } = await supabase
    .from("coupons")
    .select("id")
    .eq("coupon_number", couponsNumber)
    .single();

  if (couponFindError || !coupon) {
    return { message: "없는 쿠폰번호입니다." };
  }

  const { data: existingUserCoupon, error: existingUserCouponError } =
    await supabase
      .from("user_coupons")
      .select("id")
      .eq("user_id", userId)
      .eq("coupon_id", coupon.id)
      .maybeSingle();

  if (existingUserCouponError) {
    return { message: "다시 시도 하세요" };
  }

  if (existingUserCoupon) {
    return { message: "이미 등록된 쿠폰입니다." };
  }

  const { error: userCouponError } = await supabase
    .from("user_coupons")
    .insert([{ user_id: userId, coupon_id: coupon.id, coupon_use: false }]);

  if (userCouponError) {
    return { message: "쿠폰 등록 오류" };
  }
  revalidatePath("/checkout");
  return { message: "쿠폰이 등록되었습니다" };
}
