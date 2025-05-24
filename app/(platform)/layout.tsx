import { Sidebar, Header } from "@/components/shared";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PlatformLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const all_cookies = await cookies();
  const auth = all_cookies.get("Bearer");

  if (!auth) {
    redirect(`/login`);
  }

  return (
    <div className={`flex gap-10 min-h-svh`}>
      <Sidebar className={`max-md:hidden`} />
      <div className={`flex-1 my-2 md:my-5 max-md:px-2 md:mr-10`}>
        <Header />
        <div className={`overflow-y-auto`}>{children}</div>
      </div>
    </div>
  );
};

export default PlatformLayout;
