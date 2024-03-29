import { cn } from "@/lib/utils";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ReactNode, Suspense } from "react";

import { ModeToggle } from "@/components/DarkModeBtn";
import Provider from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          fontSans.variable
        )}
      >
        <Provider>
          <ModeToggle />
          <Suspense>{children}</Suspense>
        </Provider>
      </body>
    </html>
  );
}
