import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { onClickCouponLookUpHandler } from "@/lib/action/auth/action";

import { useState, useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingButton = (props: any) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} aria-disabled={pending}>
      {pending ? <ClipLoader color="#36d7b7" size={20} /> : "번호 확인"}
    </Button>
  );
};

const LookUpCoupons = ({ user }: { user: authUser }) => {
  const updateUserWithId = onClickCouponLookUpHandler.bind(null, user.id);
  const [formState, formAction] = useFormState(updateUserWithId, {
    message: "",
    status: "",
  });
  const defaultState = "";
  const [inputVaule, setInputVaule] = useState(defaultState);
  const { toast } = useToast();

  useEffect(() => {
    if (formState.status === "failure") {
      toast({
        duration: 2000,
        description: formState?.message,
        variant: "destructive",
      });
    } else if (formState.status === "success") {
      toast({
        duration: 2000,
        description: formState?.message,
      });
    }
    setInputVaule(defaultState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);
  return (
    <div className="flex flex-col w-full gap-2">
      <span className="text-sm">쿠폰 번호</span>
      <div className="flex justify-between gap-2">
        <form action={formAction} className="flex w-full gap-2">
          <Input
            placeholder="쿠폰 번호 입력"
            className="focus-visible:ring-0 grow"
            name="coupon"
            type="text"
            value={inputVaule}
            onChange={(e) => setInputVaule(e.target.value)}
          />

          <LoadingButton type="submit" className="focus:ring-0 min-w-20" />
        </form>
      </div>
    </div>
  );
};

export default LookUpCoupons;
