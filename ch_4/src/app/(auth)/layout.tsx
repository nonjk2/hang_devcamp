import { authOption } from "@/lib/action/auth/authoption";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

const layout = async ({
  children,
  admin,
}: {
  children: ReactNode;
  admin: ReactNode;
}) => {
  const session = await getServerSession(authOption);
  const isAdmin = session?.user.role === "admin";
  console.log("isAdmin : ", isAdmin);
  if (isAdmin) {
    return <main>{admin}</main>;
  }
  return <main>{children}</main>;
};
export default layout;
