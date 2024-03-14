"use client";
import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("asdf");
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        require("@/lib/mocks/browser");
      }
    }
  }, []);

  return null;
};
