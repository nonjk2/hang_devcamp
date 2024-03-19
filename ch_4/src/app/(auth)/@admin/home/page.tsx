import { authOption } from "@/lib/action/auth/authoption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOption);
  if (session?.user.role === "admin") {
    redirect("/dashboard");
  }
  return null;
};
export default page;
