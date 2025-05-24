"use client";
import { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib";
import { Card, CardContent } from "@/components/ui";

type PostsList = {
  page_id: number;
};

type Post = {
  message: string;
  id: string;
  created_time: string;
};

export const PostsList = ({ page_id }: PostsList): JSX.Element => {
  const { data: all_posts, isLoading: is_loading_posts } = useQuery({
    queryKey: [`posts_facebook_list`, page_id],
    queryFn: async (): Promise<Post[]> => {
      return get(`/facebook/page/${page_id}/all-posts`)
        ?.then((res) => res?.payload)
        ?.catch((err) => console.error(err));
    },
  });

  if (is_loading_posts) {
    return (
      <div className={`flex flex-col gap-5 w-full m-5`}>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div
              key={index}
              className={`p-4 mb-2 bg-slate-200 rounded-lg animate-pulse w-full`}
            ></div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex flex-col m-5 gap-5 w-full`}>
      {all_posts?.map(({ message, id, created_time }) => {
        const local_date = new Date(created_time).toLocaleDateString("sr-Latn");

        return (
          <Card
            key={id}
            className={`hover:shadow-sm transition-all duration-300 shadow-none`}
          >
            <CardContent>
              <p className={`text-gray-800`}>{message}</p>
              <p className={`text-sm text-gray-500 mt-2`}>
                Objavljeno: {local_date}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
