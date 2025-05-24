"use client";
import { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib";
import { SectionCard } from "@/app/(platform)/_components/shared";
import { AddPost } from "@/app/(platform)/facebook/manage/[pageId]/_components/add-post";
import { PostsList } from "@/app/(platform)/facebook/manage/[pageId]/_components/posts-list";

type PageProfile = {
  local: {
    id: number;
    userId: number;
    pageId: string;
    name: string;
    accessToken: string;
    tasks: string[];
    createdAt: string;
    updatedAt: string;
  };
  facebook: {
    id: string;
    name: string;
    access_token: string;
    picture: {
      data: {
        url: string;
      };
    };
    fan_count: number;
    link: string;
    category: string;
  };
};

export const PageProfile = ({ page_id }: { page_id: number }): JSX.Element => {
  const { data: page_profile, isLoading: is_loading_page } = useQuery({
    queryKey: [`page_profile`, page_id],
    queryFn: async (): Promise<PageProfile> => {
      return get(`/facebook/page/${page_id}`)
        ?.then((res) => res?.payload)
        ?.catch((err) => console.log(err));
    },
  });

  return (
    <div className={`mt-5 grid grid-cols-3 gap-5`}>
      <div className={`col-span-3 md:col-span-2`}>
        {is_loading_page ? (
          <div
            className={`col-span-2 w-full h-[40rem] rounded-lg bg-slate-200 animate-pulse`}
          ></div>
        ) : (
          <SectionCard
            card_header={{
              header_card_title: `Objave na stranici: ${page_profile?.facebook?.name}`,
              header_card_description: `Stranica ima ${page_profile?.facebook?.fan_count} pratitelja.`,
              children: <></>,
            }}
            card_content={{
              children: <PostsList page_id={page_id} />,
            }}
          />
        )}
      </div>
      <div className={`col-span-3 md:col-span-1`}>
        {is_loading_page ? (
          <div
            className={`col-span-2 w-full h-[40rem] rounded-lg bg-slate-200 animate-pulse`}
          ></div>
        ) : (
          <SectionCard
            card_header={{
              header_card_title: `Dodajte novu objavu`,
              header_card_description: `Objavite sadržaj na vašoj stranici.`,
              children: <></>,
            }}
            card_content={{
              children: (
                <AddPost
                  page_id={page_id}
                  avatar={page_profile?.facebook?.picture?.data?.url}
                  name={page_profile?.facebook?.name}
                />
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};
