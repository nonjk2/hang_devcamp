import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ReactNode, Suspense } from "react";

import { ModeToggle } from "@/components/DarkModeBtn";
import Provider from "./providers";
import { MSWComponent } from "@/lib/msw/MswHooks";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import ClipLoader from "react-spinners/ClipLoader";
import { authOption } from "@/lib/action/auth/authoption";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOption);
  // console.log("session : ", session);
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          fontSans.variable
        )}
      >
        <MSWComponent />
        <Provider>
          <ModeToggle />
          <Suspense fallback={<ClipLoader color="#36d7b7" />}>
            {children}
          </Suspense>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
