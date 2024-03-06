import { ProfileForm } from "@/components/SignForm";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">계정을 생성합니다</CardTitle>
        <CardDescription>필수 정보를 입력헤볼게요.</CardDescription>
      </CardHeader>
      <div className="p-6 pt-0">
        <ProfileForm />
      </div>
    </>
  );
};
export default page;
