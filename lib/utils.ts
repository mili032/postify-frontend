"use client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const handleAuth = async (
  token: string | null,
  is_login: boolean = true,
) => {
  if (!token) {
    toast.error("Autorizacioni token nije pronađen.", {
      duration: 3000,
      description: "Molimo vas da se ponovo prijavite.",
      richColors: true,
    });

    Cookies.remove("Bearer");
    window.location.href = "/login";
    return;
  }

  if (is_login) {
    Cookies.set("Bearer", token, {
      expires: 7,
    });
    window.location.href = "/dashboard";
    return;
  }
};
