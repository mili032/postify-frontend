"use client";
import { srLatn as sr } from "date-fns/locale";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Calendar,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from "@/components/ui";
import { ChevronRight, Plus } from "lucide-react";
import { SectionCard } from "@/app/(platform)/_components/shared";
import { useState } from "react";

export const UpcomingPosts = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const upcoming_posts = [
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

  const scheduled_dates = upcoming_posts.map((post) => {
    const [day, month] = post.date.split("/").map(Number);
    const year = new Date().getFullYear();
    return new Date(year, month - 1, day);
  });

  return (
    <SectionCard
      card_header={{
        header_card_title: `📅 Zakazane objave`,
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
              {upcoming_posts.map((post, idx) => (
                <TooltipProvider key={idx}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li
                        className={`text-sm flex flex-col md:flex-row px-5 justify-between py-3 hover:bg-accent transition-all duration-200 ease-in-out cursor-pointer`}
                      >
                        <div>
                          <p className={`font-medium line-clamp-2`}>
                            {post.title}
                          </p>
                          <p className={`text-muted-foreground text-left`}>
                            {post.platform}
                          </p>
                        </div>
                        <span
                          className={`text-xs text-muted-foreground max-md:mt-2 md:self-center`}
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
              mode={`single`}
              onSelect={(date) => {
                if (!date) return;
                setSelectedDate(date);
                setOpenDialog(true);
              }}
              modifiers={{
                scheduled: (date) => {
                  return scheduled_dates.some(
                    (d) =>
                      d.getFullYear() === date.getFullYear() &&
                      d.getMonth() === date.getMonth() &&
                      d.getDate() === date.getDate(),
                  );
                },
                today: () => false,
              }}
              modifiersClassNames={{
                scheduled: `bg-primary text-primary-foreground`,
                today: `bg-accent text-accent-foreground`,
              }}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                return date <= yesterday;
              }}
            />

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader className={`max-md:text-left`}>
                  <DialogTitle>
                    Zakazane objave za{" "}
                    {selectedDate?.toLocaleDateString("sr-RS")}
                  </DialogTitle>
                  <DialogDescription>
                    Pregledajte sve zakazane objave za odabrani datum, ili
                    dodajte novu.
                  </DialogDescription>
                </DialogHeader>
                <div
                  className={`space-y-5 max-h-[20.625rem] overflow-y-auto hide-scrollbar`}
                >
                  {upcoming_posts
                    .filter((post) => {
                      const [day, month] = post.date.split("/").map(Number);
                      const year = new Date().getFullYear();
                      const postDate = new Date(year, month - 1, day);
                      return (
                        postDate.getFullYear() ===
                          selectedDate?.getFullYear() &&
                        postDate.getMonth() === selectedDate?.getMonth() &&
                        postDate.getDate() === selectedDate?.getDate()
                      );
                    })
                    .map((post, idx) => (
                      <div
                        key={idx}
                        className={`mt-2 bg-muted p-3 rounded-md flex items-center justify-between`}
                      >
                        <p className={`font-medium`}>{post.title}</p>
                        <p className={`text-sm text-muted-foreground`}>
                          {post.platform} • {post.time}h
                        </p>
                      </div>
                    ))}
                </div>
                <DialogFooter className={`mt-5`}>
                  <DialogClose asChild>
                    <Button
                      variant={`secondary`}
                      className={`text-white text-sm w-full`}
                    >
                      <Plus />
                      Dodaj novu objavu za izabrani datum
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        ),
      }}
    />
  );
};
