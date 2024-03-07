import { authOption } from "@/app/api/auth/[...nextauth]/route";
import AuthProfileForm from "@/components/AuthProfileForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOption);

  return (
    <section>
      {session ? (
        <>
          <AuthProfileForm session={session} />
        </>
      ) : (
        <></>
      )}
    </section>
  );
};
export default page;
