import { ProfileForm } from "@/components/SignForm";
import { Signfields } from "@/lib/constant";

export default function Home() {
  return (
    <article className="container flex items-center justify-center min-h-screen">
      <div className="flex flex-col m-auto rounded-lg border ring-slate-50 ring-0 w-[380px]">
        <div className="flex flex-col p-6">
          <span className="text-2xl font-semibold leading-none tracking-tight">
            계정을 생성합니다
          </span>
          <p className="text-sm text-muted-foreground mt-1.5">
            필수 정보를 입력헤볼게요.
          </p>
        </div>
        <div className="p-6 pt-0">
          <ProfileForm />
        </div>
      </div>
    </article>
  );
}
