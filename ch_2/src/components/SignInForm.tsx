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
import { signIn } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import ClipLoader from "react-spinners/ClipLoader";

const SignInForm = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      이메일: "",
      비밀번호: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof SignInFormSchema>) => {
      setIsLoading(true);
      try {
        const res = await signIn("credentials", {
          email: values.이메일,
          password: values.비밀번호,
          callbackUrl: "/home",
          redirect: false,
        });
        if (res?.ok) {
          return router.push("/home");
        }
        setIsLoading(false);
        setCurrentStep(1);
        form.reset();
        toast({
          description: "이메일 비밀번호를 확인해주세요",
          variant: "destructive",
        });
      } catch (error) {
        setIsLoading(false);
        throw new Error(error as any);
      }
    }
  );

  const handleSignInStep = async () => {
    const { trigger } = form;
    const isStep1Valid = await trigger(["이메일"]);

    if (currentStep === 1 && isStep1Valid) {
      setCurrentStep(2);
    }
  };

  const onClickSocialLogin = async (type: "google" | "github") => {
    setIsLoading(true);
    try {
      const res = await signIn(type, {
        redirect: false,
        callbackUrl: "/home",
      });

      if (res?.ok) {
        return router.push("/home");
      } else if (res?.ok) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      throw new Error(error as any);
    }
  };

  return (
    <>
      {isLoading ? (
        <CardContent className="flex items-center justify-center h-[300px] pb-4">
          <ClipLoader color="#36d7b7" />
        </CardContent>
      ) : (
        <CardContent className="grid gap-4 pb-4">
          {currentStep === 1 && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => onClickSocialLogin("github")}
                  disabled={isLoading}
                >
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => onClickSocialLogin("google")}
                  disabled={isLoading}
                >
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
            <form onSubmit={onSubmit} className="relative overflow-hidden">
              <div
                className={`transition-transform w-full duration-500 space-y-4 `}
              >
                <SignFormItem
                  form={form}
                  name={"이메일"}
                  type="text"
                  disabled={currentStep === 2}
                />

                {currentStep === 2 && (
                  <SignFormItem form={form} name={"비밀번호"} type="password" />
                )}
              </div>
              <CardFooter className="w-full flex flex-col gap-2 pb-0 px-0 pt-4 mt-2">
                {currentStep === 1 ? (
                  <>
                    <Button
                      className="w-full"
                      type="button"
                      onClick={handleSignInStep}
                      disabled={isLoading}
                    >
                      다음
                    </Button>
                    <Button
                      className="w-full"
                      type="button"
                      onClick={() => router.push("/signup")}
                      disabled={isLoading}
                    >
                      이메일로 회원가입
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full" type="submit">
                      로그인
                    </Button>
                    <Button
                      className="w-full"
                      type="button"
                      onClick={() => setCurrentStep(1)}
                    >
                      이전
                    </Button>
                  </>
                )}
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      )}
    </>
  );
};
export default SignInForm;
