import CheckOutSkeleton from "@/components/ui/skeleton/CheckOutSkeleton";
import { ReactNode, Suspense } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex bg-background">
      <div className="m-auto max-w-screen-lg p-14 gap-4 flex max-sm:flex-col">
        <Suspense fallback={<CheckOutSkeleton />}>{children}</Suspense>
      </div>
    </section>
  );
};
export default layout;
