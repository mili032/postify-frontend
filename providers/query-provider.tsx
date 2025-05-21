"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSX } from "react";

const query_client = new QueryClient({});

export const QueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <QueryClientProvider client={query_client}>{children}</QueryClientProvider>
  );
};
