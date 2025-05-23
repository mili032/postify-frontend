"use client";

import React, { JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components/ui";

type SectionCardProps = {
  card_header: {
    header_card_title: string;
    header_card_description: string;
    children: React.ReactNode;
  };
  card_content: {
    children: React.ReactNode;
  };
};
export const SectionCard = ({
  card_content,
  card_header,
}: SectionCardProps): JSX.Element => {
  const {
    header_card_title,
    header_card_description,
    children: header_children,
  } = card_header;

  const { children: content_children } = card_content;

  return (
    <Card className={`w-full shadow-none gap-0 pb-0 overflow-hidden`}>
      <CardHeader
        className={`flex max-md:flex-col md:items-center justify-between px-5`}
      >
        <div className={`space-y-1`}>
          <CardTitle className={`text-lg leading-tight`}>
            {header_card_title}
          </CardTitle>
          <CardDescription>{header_card_description}</CardDescription>
        </div>
        {header_children}
      </CardHeader>
      <Separator className={`mt-4`} />
      <CardContent className={`w-full px-0 flex`}>
        {content_children}
      </CardContent>
    </Card>
  );
};
