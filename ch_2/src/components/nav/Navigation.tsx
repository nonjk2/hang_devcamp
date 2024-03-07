"use client";
import { useSession } from "next-auth/react";
import AuthProfileForm from "../AuthProfileForm";

const Navigation = () => {
  const session = useSession();

  return (
    <header className="flex h-14 w-full justify-end">
      {/* nav */}
      {/* <AuthProfileForm /> */}
    </header>
  );
};
export default Navigation;
