"use client";
import { JSX, useState } from "react";
import { Button } from "@/components/ui";
import { LucideIcon, icons } from "lucide-react";
import Image from "next/image";
import buttons from "./buttons.json";

type ButtonProps = {
  id: number;
  name: string;
  title: string;
  icon: keyof typeof icons;
};
const buttons_list = buttons as ButtonProps[];

export const Sidebar = (): JSX.Element => {
  return (
    <section
      className={`w-full px-5 max-w-[15rem] bg-[#FAFAFA] py-5 border-r max-md:hidden`}
    >
      <div className={`sticky top-5`}>
        <Image
          src={`/logo.svg`}
          alt={`logo`}
          width={150}
          height={100}
          className={``}
        />
        <SidebarMenu />
      </div>
    </section>
  );
};

const SidebarMenu = (): JSX.Element => {
  const [activeButton, setActiveButton] = useState<string | null>("dashboard");

  return (
    <div className={`flex flex-col gap-1 mt-10`}>
      {(buttons_list || [])?.map(({ id, icon, title, name }) => {
        const Icon = icons?.[icon] as LucideIcon;
        return (
          <Button
            onClick={() => setActiveButton(name)}
            variant={`default`}
            key={id}
            name={name}
            className={`justify-start h-[3rem] ${activeButton === name ? `bg-primary text-primary-foreground font-semibold` : `bg-[#FAFAFA] shadow-none text-muted-foreground hover:bg-primary hover:text-primary-foreground`}`}
          >
            <Icon strokeWidth={3} />
            <span className={`text-sm font-semibold`}>{title}</span>
          </Button>
        );
      })}
    </div>
  );
};

const SidebarFooter = (): JSX.Element => {
  return <></>;
};
