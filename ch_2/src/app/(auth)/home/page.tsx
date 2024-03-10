import AuthProfileForm from "@/components/AuthProfileForm";
import { authOption } from "@/lib/action/auth/authoption";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOption);

  return (
    <section>
      <AuthProfileForm session={session!} />
    </section>
  );
};
export default page;
