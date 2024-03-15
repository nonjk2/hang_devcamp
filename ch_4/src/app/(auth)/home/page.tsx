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
        <div className="px-10 max-w-7xl m-auto">
          <AuthProfileForm session={session!} />
          <div className="absolute w-screen h-screen top-0 left-0 -z-50">
            <div className="relative w-full h-full bg-cover bg-[url('https://img.freepik.com/free-photo/beautiful-mountain-lake-background-remix_53876-125213.jpg?w=1380&t=st=1710438252~exp=1710438852~hmac=82e1e82384726deacc1d7a18e055e5e1dba61b59c84a7f0641c82cf2d7c3afef')] -z-50 "></div>
            <div className="absolute inset-0 backdrop-blur-lg"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-2 p-6">
            <Link href={"/"}>
              <Button variant={"default"}>로그인</Button>
            </Link>
            <Link href={"/"}>
              <Button variant={"default"}>장바구니</Button>
            </Link>
          </div>

          {/* <ImageMenu /> */}
        </>
      )}
    </section>
  );
};
export default page;
