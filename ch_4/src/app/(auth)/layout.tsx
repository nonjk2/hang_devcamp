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
  if (!session?.user) {
    <main>{children}</main>;
  }
  return <main>{session?.user.role === "admin" ? admin : children}</main>;
};
export default layout;
