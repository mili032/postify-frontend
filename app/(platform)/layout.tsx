import { Sidebar, Header } from "@/components/shared";

const PlatformLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className={`flex gap-10 min-h-svh`}>
      <Sidebar />
      <div className={`flex-1 my-5 max-md:px-2 md:mr-10`}>
        <Header />
        <div className={`overflow-y-auto`}>{children}</div>
      </div>
    </div>
  );
};

export default PlatformLayout;
