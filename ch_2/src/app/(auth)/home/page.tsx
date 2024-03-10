import { authOption } from "@/app/api/auth/[...nextauth]/route";
import AuthProfileForm from "@/components/AuthProfileForm";
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
