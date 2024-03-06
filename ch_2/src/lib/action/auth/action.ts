"use server";

import { SignformSchema } from "@/lib/constant";
import { redirect } from "next/navigation";
import { setTimeout } from "timers/promises";
import { z } from "zod";
import { CombineFetch } from "..";

export const SignAction = async (formData: z.infer<typeof SignformSchema>) => {
  // try {
  // } catch (error) {}
  // redirect("/home");
  const body = {
    name: formData.이름,
    email: formData.이메일,
    phone: formData.연락처,
    rule: formData.역할,
    password: formData.비밀번호,
  };

  const res = await CombineFetch<any>({
    path: "/api/users",
    body,
    method: "POST",
  });
  if (res.status === 200) {
    await setTimeout(2000);
  }
};
