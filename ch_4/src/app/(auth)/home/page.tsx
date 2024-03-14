import AuthProfileForm from "@/components/AuthProfileForm";
import { Button } from "@/components/ui/button";
import { authOption } from "@/lib/action/auth/authoption";
import { getServerSession } from "next-auth";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOption);

  return (
    <section>
      {session ? (
        <AuthProfileForm session={session!} />
      ) : (
        <div className="flex gap-2 p-6">
          <Link href={"/"}>
            <Button variant={"default"}>로그인</Button>
          </Link>
        </div>
      )}
    </section>
  );
};
export default page;
