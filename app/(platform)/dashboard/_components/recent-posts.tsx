"use client";
import { JSX } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components/ui";
import { ChevronRight, Heart, MessageSquare, Share } from "lucide-react";
import { SectionCard } from "@/app/(platform)/_components/shared";

// Definicija tipa posta
type Post = {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
  likes: number;
  shares: number;
  platform: string;
  image: string;
  author?: string; // opcioni jer se ne koristi
};

export const RecentPosts = (): JSX.Element => {
  const posts: Omit<Post, "image" | "author">[] = [
    {
      id: 1,
      title: "Nova kolekcija jesen/zima stigla u prodavnice!",
      text: "Stigli su kaputi, čizme i aksesoari za ovu sezonu. Posetite nas i pronađite savršen stil za hladne dane ❄️🧥",
      createdAt: "2024-10-01",
      updatedAt: "2024-10-01",
      comments: 12,
      likes: 148,
      shares: 21,
      platform: "Facebook",
    },
    {
      id: 2,
      title: "📸 Pogled iza scene snimanja nove kampanje",
      text: "Naša ekipa je vredno radila da vam predstavi novu modnu kampanju. Swipe da vidiš kako je bilo iza kulisa!",
      createdAt: "2024-10-03",
      updatedAt: "2024-10-03",
      comments: 27,
      likes: 362,
      shares: 9,
      platform: "Instagram",
    },
    {
      id: 3,
      title: "Zašto se ponedeljkom osećamo bezvoljno? 🤔",
      text: "Novi blog je tu! Psiholozi objašnjavaju zašto su ponedeljci teški i kako da ih prebrodiš bez stresa. Link u komentaru.",
      createdAt: "2024-10-05",
      updatedAt: "2024-10-06",
      comments: 43,
      likes: 197,
      shares: 35,
      platform: "X",
    },
    {
      id: 4,
      title: "Pobednik našeg giveaway-a je...",
      text: "Hvala svima koji su učestvovali! 🥳 Čestitamo Jovani Petrović! Javi nam se u DM da preuzmeš nagradu 🎁",
      createdAt: "2024-10-07",
      updatedAt: "2024-10-07",
      comments: 88,
      likes: 510,
      shares: 54,
      platform: "Facebook",
    },
    {
      id: 5,
      title: "Ponuda koja se ne propušta - samo do nedelje!",
      text: "Uštedite 20% na sve proizvode uz kod: JESEN20. Važi samo do 13.10. 🛍️",
      createdAt: "2024-10-10",
      updatedAt: "2024-10-11",
      comments: 19,
      likes: 284,
      shares: 67,
      platform: "Instagram",
    },
  ];

  return (
    <SectionCard
      card_header={{
        header_card_title: "Poslednje objave",
        header_card_description: "Prikaz poslednjih objava sa svih platformi",
        children: (
          <Button variant="link" className="text-secondary text-sm !px-0">
            Pogledaj sve
            <ChevronRight className="text-secondary" />
          </Button>
        ),
      }}
      card_content={{
        children: (
          <div className={`flex flex-col gap-5 mt-5 px-5 pb-5 w-full`}>
            {posts.map((post) => (
              <RecentPost
                key={post.id}
                {...post}
                image={`https://placehold.co/150x150?text=${encodeURIComponent(
                  post.title,
                )}`}
              />
            ))}
          </div>
        ),
      }}
    />
  );
};

// Komponenta RecentPost sa ispravnim tipovima
const RecentPost = ({
  id,
  title,
  text,
  createdAt,
  updatedAt,
  author,
  image,
  comments,
  likes,
  shares,
  platform,
}: Post): JSX.Element => {
  return (
    <div className="flex max-md:overflow-hidden flex-col gap-2 border hover:shadow-sm p-2 rounded-md transition-all duration-200 ease-in-out cursor-pointer relative">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="flex flex-col max-md:max-w-[12.188rem]">
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-3 max-md:mt-1">
              {text}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end max-md:absolute max-md:bg-muted max-md:px-3 max-md:rounded-bl-lg max-md:py-0.5 max-md:top-0 max-md:right-0">
          <span className="text-xs text-muted-foreground">{platform}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex items-center *:px-2 pl-2 divide-x divide-border mt-2">
        <div className="flex items-center gap-1">
          <span className="text-xs !pl-0">{comments} Komentara</span>
          <MessageSquare strokeWidth={2} size={15} />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs">{likes} Lajkova</span>
          <Heart strokeWidth={2} size={15} />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs">{shares} Deljenja</span>
          <Share strokeWidth={2} size={15} />
        </div>
      </div>
    </div>
  );
};
