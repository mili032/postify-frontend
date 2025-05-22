"use client";

import { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { get, handleAuth } from "@/lib";
import { Avatar, AvatarFallback } from "@/components/ui";
import { HeaderUser } from "@/components/shared";

export const Header = (): JSX.Element => {
  const { data: user, isLoading } = useQuery({
    queryKey: [`user`],
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
  });

  if (isLoading) {
    return (
      <div className={`h-10 w-full bg-slate-200 animate-pulse rounded-md`} />
    );
  }

  return (
    <div
      className={`flex items-center justify-between sticky top-0 z-50 py-3 bg-white border-b`}
    >
      <h2 className={`text-[1.5625rem] font-semibold`}>Dashboard</h2>
      <div className={`flex items-center`}>
        <div className={`flex items-center gap-2 rounded-md`}>
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
      </div>
    </div>
  );
};
