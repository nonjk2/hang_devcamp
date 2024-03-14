"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { z } from "zod";
import { Counponfield, CouponSchemas } from "@/lib/constant";
import SignFormItem from "../SignFormItem";
import { CombineFetch } from "@/lib/action";
import { useToast } from "../ui/use-toast";

const AdminCouponSetting = ({ user }: { user: authUser }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof CouponSchemas>>({
    resolver: zodResolver(CouponSchemas),
    defaultValues: {
      쿠폰넘버: "",
      쿠폰설명: "",
      //   쿠폰타입 :
      쿠폰할인율: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof CouponSchemas>) => {
      const {
        쿠폰넘버: couponNumber,
        쿠폰설명: couponDescription,
        쿠폰타입: couponType,
        쿠폰할인율: couponValue,
      } = values;
      try {
        const res = await CombineFetch<
          { message: string },
          Pick<
            Coupon,
            "couponValue" | "couponNumber" | "couponDescription" | "couponType"
          > & { user: string }
        >({
          path: "/api/coupon",
          method: "POST",
          body: {
            couponDescription,
            couponType,
            couponNumber,
            couponValue: Number(couponValue),
            user: user.id,
          },
        });

        if (res.status === "success") {
          console.log(res.data.message);
          toast({
            description: res.data.message,
            variant: "destructive",
            duration: 2000,
          });
        }
      } catch (error) {
        throw error;
      }
    }
  );
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>쿠폰발급하기</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              {Counponfield.map(({ name, placeholder }) => (
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
                name={"쿠폰타입"}
                type="select"
                options={[
                  { label: "정액제", value: "fixedAmount" },
                  { label: "정률제", value: "percentDiscount" },
                ]}
                placeholder="쿠폰타입을 설정해주세요"
              />
              <Button type="submit">쿠폰등록</Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminCouponSetting;
