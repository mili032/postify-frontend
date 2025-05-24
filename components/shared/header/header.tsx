"use client";
import { JSX, useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { get, handleAuth } from "@/lib";
import { Avatar, AvatarFallback } from "@/components/ui";
import { HeaderUser, Sidebar } from "@/components/shared";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = (): JSX.Element => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const pathname = usePathname();
  let slug = pathname?.split("/")[1];

  const [
    { data: user, isLoading: is_loading_user },
    { data: page, isLoading: is_loading_page },
  ] = useQueries({
    queries: [
      {
        queryKey: [`user`, pathname],
        queryFn: async (): Promise<HeaderUser | null> => {
          return get(`/users/verify-token`)
            ?.then(async (res) => {
              if (res) {
                const { ...payload }: HeaderUser = res?.payload;
                return payload;
              }
              return null;
            })
            .catch((e) => {
              console.error(e);

              if (e?.status === 401) {
                handleAuth(null, false);
              }
              return null;
            });
        },
        gcTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
      },
      {
        queryKey: [`page=${slug}`],
        queryFn: async () => {
          return get(`/pages?slug=${slug}`)
            ?.then(async (res) => {
              if (res) {
                return res;
              }
              return null;
            })
            .catch((e) => {
              console.error(e);

              if (e?.status === 401) {
                handleAuth(null, false);
              }
              return null;
            });
        },
        gcTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
      },
    ],
  });

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  return (
    <div
      className={`flex items-center justify-between sticky top-0 z-50 py-0 max-md:pb-2 md:py-3 bg-white border-b`}
    >
      {is_loading_page ? (
        <div
          className={`w-full md:w-[30rem] h-10 bg-slate-200 animate-pulse rounded-md`}
        />
      ) : (
        <div className={`space-y-1`}>
          <h2 className={`text-[1.5625rem] font-semibold`}>{page?.title}</h2>
          <p className={`text-base text-muted-foreground`}>
            {page?.description}
          </p>
        </div>
      )}
      <div className={`flex items-center max-md:hidden`}>
        {is_loading_user ? (
          <div
            className={`w-[10rem] h-10 bg-slate-200 animate-pulse rounded-md`}
          />
        ) : (
          <div className={`flex items-center gap-2`}>
            <Avatar>
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className={`text-sm font-medium`}>
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        )}
      </div>
      <div className={`md:hidden`}>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <Menu onClick={() => setSheetOpen(!sheetOpen)} size={24} />
          </SheetTrigger>
          <SheetContent>
            <Sidebar className={`!max-w-full !h-full`} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
