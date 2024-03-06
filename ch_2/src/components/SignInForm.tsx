"use client";
import { SignInFormSchema } from "@/lib/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { CardContent, CardFooter } from "./ui/card";
import { Icons } from "./icon";
import SignFormItem from "./SignFormItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      이메일: "",
      비밀번호: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignInFormSchema>) => {
    console.log(values);
  };

  const handleSignInStep = async () => {
    const { trigger } = form;
    const isStep1Valid = await trigger(["이메일"]);
    if (currentStep === 1 && isStep1Valid) {
      return setCurrentStep(2);
    }
  };
  return (
    <>
      <CardContent className="grid gap-4 pb-4">
        {currentStep === 1 && (
          <>
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  또는
                </span>
              </div>
            </div>
          </>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative overflow-hidden"
          >
            <div
              className={`transition-transform w-full duration-500 space-y-4 `}
            >
              <SignFormItem
                form={form}
                name={"이메일"}
                type="text"
                disabled={currentStep === 2}
              />

              <SignFormItem form={form} name={"비밀번호"} type="password" />
            </div>

            <div
              className={`space-y-4 transition-transform duration-500 absolute top-0 right-0 left-0 w-full`}
            ></div>
          </form>
          <CardFooter className="w-full flex flex-col gap-2 pb-0 px-0">
            {currentStep === 1 ? (
              <>
                <Button
                  className="w-full"
                  type="button"
                  onClick={handleSignInStep}
                >
                  다음
                </Button>
                <Button
                  className="w-full"
                  onClick={() => router.push("/signup")}
                >
                  회원가입
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full" type="submit">
                  로그인
                </Button>
                <Button className="w-full" onClick={() => setCurrentStep(1)}>
                  이전
                </Button>
              </>
            )}
          </CardFooter>
        </Form>
      </CardContent>
    </>
  );
};
export default SignInForm;
