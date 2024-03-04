"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import NextArrow from "./icon/NextArrow";
import { Passwordfields, Signfields, SignformSchema } from "@/lib/constant";
import SignFormItem from "./SignFormItem";

export function ProfileForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const form = useForm<z.infer<typeof SignformSchema>>({
    resolver: zodResolver(SignformSchema),
    mode: "all",
    defaultValues: {
      이름: "",
      이메일: "",
      연락처: "",
      // 역할: "",
      비밀번호: "",
      비밀번호확인: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignformSchema>) {
    switch (currentStep) {
      case 1:
        return () => {
          setCurrentStep(2);
        };
      case 2:
        alert(
          JSON.stringify({
            email: values.이메일,
            phone: values.연락처,
            username: values.이름,
            role: values.역할,
            password: values.비밀번호,
            confirmPassword: values.비밀번호확인,
          })
        );

      default:
        break;
    }
  }

  const handleNextStep = async () => {
    const { trigger } = form;
    const isStep1Valid = await trigger(["이름", "이메일", "연락처", "역할"]);
    if (currentStep === 1 && isStep1Valid) {
      setCurrentStep(2);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative overflow-hidden"
        >
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
            className={`transition-transform duration-500 absolute top-0 right-0 left-0 w-full ${
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
            <Button
              type="button"
              onClick={handleNextStep}
              className="font-bold mt-3"
            >
              {"다음 단계로"}
              <NextArrow />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button type="submit" className="mt-3">
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
