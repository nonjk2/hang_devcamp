"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState, useTransition } from "react";
import NextArrow from "./icon/NextArrow";
import { Passwordfields, Signfields, SignformSchema } from "@/lib/constant";
import SignFormItem from "./SignFormItem";
import { SignAction } from "@/lib/action/auth/action";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { signIn } from "next-auth/react";

export function ProfileForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignformSchema>>({
    resolver: zodResolver(SignformSchema),
    defaultValues: {
      이름: "",
      이메일: "",
      연락처: "",
      // 역할: "",
      비밀번호: "",
      비밀번호확인: "",
    },
  });

  const onSubmit = form.handleSubmit(
    (values: z.infer<typeof SignformSchema>) => {
      startTransition(async () => {
        switch (currentStep) {
          case 1:
            setCurrentStep(2);
            break;
          case 2:
            {
              const register = await SignAction(values);
              if (register.message === "회원가입성공") {
                toast({
                  description: register.message,
                  duration: 2000,
                });
                try {
                  const res = await signIn("credentials", {
                    email: values.이메일,
                    password: values.비밀번호,
                    callbackUrl: "/home",
                  });
                  if (res?.ok) {
                    // router.push("/home");
                  }
                } catch (error) {
                  throw error;
                }
              } else if (register.message === "이메일이 중복 되었습니다.") {
                form.setError("이메일", {
                  message: register.message,
                });
                toast({
                  description: register.message,
                  variant: "destructive",
                  duration: 2000,
                });
                setCurrentStep(1);
              }
            }
            break;
          default:
            break;
        }
      });
    }
  );

  const handleNextStep = async () => {
    const { trigger } = form;
    const isStep1Valid = await trigger(["이름", "이메일", "연락처", "역할"]);
    if (currentStep === 1 && isStep1Valid) {
      return setCurrentStep(2);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="relative overflow-hidden">
          <div
            className={`transition-transform w-full duration-500 space-y-4 ${
              currentStep === 1 ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {Signfields.map(({ name, placeholder }) => (
              <SignFormItem
                form={form}
                name={name}
                key={name}
                placeholder={placeholder}
                type="text"
              />
            ))}
            <SignFormItem
              form={form}
              name={"역할"}
              type="select"
              options={[
                { label: "일반사용자", value: "일반사용자" },
                { label: "관리자", value: "관리자" },
              ]}
              placeholder="역할을 선택해주세요"
            />
          </div>

          <div
            className={`space-y-4 transition-transform duration-500 absolute top-0 right-0 left-0 w-full ${
              currentStep === 1 ? "translate-x-[120%]" : "translate-x-0"
            }`}
          >
            {Passwordfields.map(({ name }) => (
              <SignFormItem
                form={form}
                name={name}
                key={name}
                type="password"
              />
            ))}
          </div>

          {currentStep === 1 ? (
            <div className="flex gap-2 justify-between">
              <Button
                type="button"
                onClick={() => router.back()}
                className="font-bold mt-3"
                variant={"ghost"}
              >
                {"이전"}
              </Button>
              <Button
                type="button"
                onClick={handleNextStep}
                className="font-bold mt-3"
              >
                {"다음 단계로"}
                <NextArrow />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button type="submit" className="mt-3" disabled={isPending}>
                계정 등록하기
              </Button>
              <Button
                type="button"
                className="hover:bg-accent hover:text-accent-foreground clear-none mt-3"
                onClick={() => setCurrentStep(1)}
                variant={"ghost"}
              >
                이전 단계로
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
}
