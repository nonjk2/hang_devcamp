import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="container flex items-center justify-center min-h-screen">
      <Card className="w-[380px]">{children}</Card>
    </section>
  );
};
export default layout;
