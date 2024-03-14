import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex max-w-screen-lg p-14 m-auto bg-slate-100 gap-4 max-sm:flex-col">
      {children}
    </section>
  );
};
export default layout;
