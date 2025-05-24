"use client";

import { JSX } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "@/lib";
import { SectionCard } from "@/app/(platform)/_components/shared";
import {
  Button,
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@/components/ui";
import { ChevronRight, Pen, Plus, Trash } from "lucide-react";
import Link from "next/link";

type Page = {
  id: string;
  name: string;
  tasks: string[];
};

export const PagesList = (): JSX.Element => {
  const query_client = useQueryClient();
  const { data: pages, isLoading } = useQuery({
    queryKey: ["user_pages"],
    queryFn: async (): Promise<Page[]> => {
      return get(`/facebook/all-pages`)
        ?.then((res) => {
          return res?.payload;
        })
        ?.catch((err) => {
          console.error("Error fetching user pages:", err);
          return [];
        });
    },
  });

  const user = query_client
    .getQueryCache()
    .find({ queryKey: ["user"], exact: false })?.state?.data as
    | { token: string }
    | undefined;

  const FACEBOOK_APP_ID = "1296600068696051";
  const REDIRECT_URI = "https://api.twibbio.com/api/v1/auth/facebook/callback";

  const facebookLogin = () => {
    window.location.href = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=pages_show_list,pages_manage_posts&state=${user?.token}`;
  };

  return (
    <SectionCard
      card_header={{
        header_card_title: "Lista stranica",
        header_card_description:
          "Pregledajte sve stranice koje ste povezali sa vašim nalogom.",
        children: (
          <Button
            onClick={facebookLogin}
            variant={`default`}
            className={`h-[3rem] max-md:mt-2 max-md:w-full bg-primary text-primary-foreground`}
          >
            <Plus /> Dodajte stranicu
          </Button>
        ),
      }}
      card_content={{
        children: (
          <div className={`flex flex-col divide-y divide-border w-full`}>
            {isLoading ? (
              Array.from({ length: 10 }, (_, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 animate-pulse`}
                >
                  <div className={`w-1/2 bg-gray-200 h-6 rounded`} />
                  <div className={`w-1/4 bg-gray-200 h-6 rounded`} />
                </div>
              ))
            ) : (
              <Table>
                <TableHeader className={`**:px-5`}>
                  <TableRow>
                    <TableHead className={`w-[50%]`}>Naziv stranice</TableHead>
                    <TableHead className={`w-[30%]`}>ID stranice</TableHead>
                    <TableHead className={`w-[20%]`}>Akcije</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={`**:px-5`}>
                  {pages?.map((page) => {
                    return (
                      <TableRow key={page?.id}>
                        <TableCell>{page?.name}</TableCell>
                        <TableCell>{page?.id}</TableCell>
                        <TableCell>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={`link`}
                                className={`!px-0 text-foreground text-sm font-normal cursor-pointer data-[state=open]:underline`}
                              >
                                Upravljajte
                                <ChevronRight className={`!text-foreground`} />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className={`max-w-[13rem] w-full`}>
                              <div className={`flex flex-col gap-2`}>
                                <Button
                                  variant={`ghost`}
                                  className={`text-foreground text-sm justify-center font-normal cursor-pointer`}
                                  asChild
                                >
                                  <Link href={`/facebook/manage/${page?.id}`}>
                                    Upravljajte stranicom
                                    <Pen />
                                  </Link>
                                </Button>
                                <Separator className={``} />
                                <Button
                                  variant={`destructive`}
                                  className={`text-sm justify-center font-normal cursor-pointer`}
                                >
                                  Uklonite stranicu
                                  <Trash />
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        ),
      }}
    />
  );
};
