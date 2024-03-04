"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import NextArrow from "./icon/NextArrow";

const formSchema = z
  .object({
    이름: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
    이메일: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
    연락처: z
      .string()
      .regex(/^[0-9]{10,11}$/, { message: "연락처는 11자리여야 합니다." }),
    역할: z.enum(["관리자", "일반사용자"], {
      required_error: "역할을 선택해주세요.",
    }),
    비밀번호: z
      .string()
      .min(8, { message: "비밀번호는 8 자리 이상이어야합니다." })
      .optional(),
    비밀번호확인: z
      .string()
      .min(8, { message: "비밀번호는 8 자리 이상이어야합니다." })
      .optional(),
  })
  .refine((data) => data.비밀번호 === data.비밀번호확인, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["비밀번호확인"],
  });

const fields = [
  {
    name: "이름",
    placeholder: "홍길동",
  },
  {
    name: "이메일",
    placeholder: "hello@sparta-devcamp.com",
  },
  {
    name: "연락처",
    placeholder: "01000000000",
  },
];
const Passwordfields = [
  {
    name: "비밀번호",
  },
  {
    name: "비밀번호확인",
  },
];
export function ProfileForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
  }
  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);
  const handleNextStep = () => {
    // 현재 단계가 1단계이고 필수 필드가 모두 입력되었는지 확인
    const { watch } = form;
    form.handleSubmit(onSubmit)();

    if (
      currentStep === 1 &&
      watch("이름") &&
      watch("이메일") &&
      watch("연락처") &&
      watch("역할")
    ) {
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
            {fields.map(({ name, placeholder }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as "이름" | "이메일" | "연락처"}
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className={error && "text-red-600"}>
                      {field.name}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    {error && <FormMessage>{error.message}</FormMessage>}
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name={"역할"}
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <FormItem>
                  <FormLabel className={error && "text-red-600"}>
                    {name}
                  </FormLabel>
                  <FormControl className="w-full">
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={"역할을 선택해주세요"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="일반사용자">일반사용자</SelectItem>
                        <SelectItem value="관리자">관리자</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
              )}
            />
          </div>

          <div
            className={`transition-transform duration-500 absolute top-0 right-0 left-0 w-full ${
              currentStep === 2 ? "translate-x-0" : "-translate-x-[120%]"
            }`}
          >
            {Passwordfields.map(({ name }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as "비밀번호" | "비밀번호확인"}
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className={error && "text-red-600"}>
                      {field.name}
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    {error && <FormMessage>{error.message}</FormMessage>}
                  </FormItem>
                )}
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
