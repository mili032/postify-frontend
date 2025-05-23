"use client";
import { JSX } from "react";
import { icons, LucideIcon } from "lucide-react";

type Card = {
  title: string;
  text: string;
  icon: string;
};

export const Cards = (): JSX.Element => {
  const data = [
    {
      id: 1,
      title: "Broj profila",
      text: "4",
      icon: "User",
    },
    {
      id: 2,
      title: "Broj postova",
      text: "24",
      icon: "FileText",
    },
    {
      id: 3,
      title: "Broj komentara",
      text: "12",
      icon: "MessageSquare",
    },
    {
      id: 4,
      title: "Broj lajkova",
      text: "100",
      icon: "Heart",
    },
    {
      id: 5,
      title: "Broj poruka",
      text: "50",
      icon: "Mail",
    },
    {
      id: 6,
      title: "Broj deljenja",
      text: "20",
      icon: "Share",
    },
  ];

  return (
    <div
      id={`some-element`}
      className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-5`}
    >
      {data?.map(({ id, title, text, icon }) => {
        return <Card key={id} icon={icon} text={text} title={title} />;
      })}
    </div>
  );
};

const Card = ({ text, icon, title }: Card): JSX.Element => {
  const Icon = icons?.[icon as keyof typeof icons] as LucideIcon;

  return (
    <div
      className={`rounded-lg border px-4 pt-8 pb-6 flex items-start justify-start hover:shadow-md transition-all duration-200 ease-in-out`}
    >
      <div
        className={`size-11 rounded-full bg-secondary p-2 flex items-center justify-center`}
      >
        <Icon strokeWidth={2} className={`text-white`} />
      </div>
      <div className={`flex flex-col ml-4`}>
        <h3 className={`text-sm font-normal text-muted-foreground`}>{title}</h3>
        <p className={`text-2xl font-semibold text-black`}>{text}</p>
      </div>
    </div>
  );
};
