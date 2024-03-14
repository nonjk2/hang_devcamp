"use client";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MouseEventHandler } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RoleTypeName } from "@/lib/types/enum";
import { Button } from "./ui/button";
import Link from "next/link";

const AuthProfileForm = ({ session }: { session: Session }) => {
  const router = useRouter();
  const onClickHandelr: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    signOut({ redirect: false }).then(() => router.push("/"));
  };
  return (
    <div className="flex p-6 gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={session?.user?.image!} alt="@shadcn" />
            <AvatarFallback>load</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>프로필 메뉴</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem
              value="right"
              onClick={onClickHandelr}
              className="cursor-pointer"
            >
              로그아웃
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-col items-center justify-center">
        <span className="text-sm text-primary">{session?.user?.email}</span>
        {session?.user?.role && (
          <span className="text-sm text-primary">
            {RoleTypeName[session.user.role]}
          </span>
        )}
      </div>

      <Link href={"/checkout"}>
        <Button variant={"default"}>장바구니</Button>
      </Link>
    </div>
  );
};
export default AuthProfileForm;
