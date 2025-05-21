import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className={`grid grid-cols-2 gap-10 max-lg:h-[90dvh] max-lg:px-2`}>
        {children}
        <div className={`max-lg:hidden col-span-1 flex`}>
          <Image
            src={`/login-image-clock.svg`}
            alt={`Postify`}
            width={0}
            height={0}
            className={`w-full object-cover ml-auto`}
            quality={100}
            sizes={`100vw`}
          />
        </div>
      </div>
    </main>
  );
}
