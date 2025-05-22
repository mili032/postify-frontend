"use client";
import { srLatn as sr } from "date-fns/locale";
import { format } from "date-fns";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Calendar,
} from "@/components/ui";
import { ChevronRight } from "lucide-react";
import { SectionCard } from "@/app/(platform)/_components/shared";

export const UpcomingPosts = () => {
  const upcomingPosts = [
    {
      date: "24/05",
      time: "10:00",
      platform: "Instagram",
      title: "Nova objava za letnju akciju",
    },
    {
      date: "25/05",
      time: "18:00",
      platform: "Facebook",
      title: "Giveaway najava",
    },
    {
      date: "25/05",
      time: "18:00",
      platform: "Facebook",
      title: "Giveaway najava",
    },
    {
      date: "25/05",
      time: "18:00",
      platform: "Facebook",
      title: "Giveaway najava",
    },
    {
      date: "25/05",
      time: "18:00",
      platform: "Facebook",
      title: "Giveaway najava",
    },
    {
      date: "25/05",
      time: "18:00",
      platform: "Facebook",
      title: "Giveaway najava",
    },
  ];

  const scheduledDates = upcomingPosts.map((post) => {
    const [day, month] = post.date.split("/").map(Number);
    const year = new Date().getFullYear();
    return new Date(year, month - 1, day);
  });

  return (
    <SectionCard
      card_header={{
        header_card_title: "📅 Zakazane objave",
        header_card_description: `Prikaz budućih objava na društvenim mrežama.`,
        children: (
          <Button variant={`link`} className={`text-secondary text-sm !px-0`}>
            Pogledaj sve
            <ChevronRight className={`text-secondary`} />
          </Button>
        ),
      }}
      card_content={{
        children: (
          <>
            <ul
              className={`divide-y divide-border w-full border-r max-h-[20.313rem] overflow-y-auto hide-scrollbar`}
            >
              {upcomingPosts.map((post, idx) => (
                <TooltipProvider key={idx}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li
                        className={`text-sm flex px-5 justify-between py-3 hover:bg-accent transition-all duration-200 ease-in-out cursor-pointer`}
                      >
                        <div>
                          <p className={`font-medium`}>{post.title}</p>
                          <p className={`text-muted-foreground text-left`}>
                            {post.platform}
                          </p>
                        </div>
                        <span
                          className={`text-xs text-muted-foreground self-center`}
                        >
                          {post.date} u {post.time}h
                        </span>
                      </li>
                    </TooltipTrigger>
                    <TooltipContent>Kliknite da vidite objavu</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </ul>
            <Calendar
              locale={sr}
              mode="single"
              onSelect={() => {}}
              modifiers={{
                selected: (date) => {
                  return scheduledDates.some(
                    (d) =>
                      d.getFullYear() === date.getFullYear() &&
                      d.getMonth() === date.getMonth() &&
                      d.getDate() === date.getDate(),
                  );
                },
                today: () => false,
              }}
              modifiersClassNames={{
                selected: "bg-primary text-primary-foreground",
                today: "bg-accent text-accent-foreground",
              }}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                return date <= yesterday;
              }}
            />
          </>
        ),
      }}
    />
  );
};
