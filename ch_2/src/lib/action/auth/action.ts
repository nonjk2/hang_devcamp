"use server";

import { SignformSchema, supabaseAnon, supabaseURL } from "@/lib/constant";
import { redirect } from "next/navigation";
import { setTimeout } from "timers/promises";
import { z } from "zod";
import { CombineFetch } from "..";
import { createClient } from "@supabase/supabase-js";
import { RoleTypeName, RoleTypeNameConvert } from "@/lib/types/enum";

export const SignAction = async (formData: z.infer<typeof SignformSchema>) => {
  const supabase = createClient(supabaseURL, supabaseAnon, {
    db: { schema: "next-auth" },
  });
  const body = {
    name: formData.이름,
    email: formData.이메일,
    phone: formData.연락처,
    role: formData.역할,
    password: formData.비밀번호,
  };

  const { email, password, role, phone, name } = body;

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      data: {
        name,
        role: RoleTypeNameConvert[role] ?? "user",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
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
