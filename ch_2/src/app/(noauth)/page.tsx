import { ProfileForm } from "@/components/SignForm";
import SignInForm from "@/components/SignInForm";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">로그인</CardTitle>
      </CardHeader>
      <div className="p-6 pt-0">
        <SignInForm />
      </div>
    </>
  );
};
export default page;
