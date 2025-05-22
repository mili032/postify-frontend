import { JSX } from "react";
import { AuthForm } from "../_components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Index = async (): Promise<JSX.Element> => {
  const all_cookies = await cookies();
  const has_token = all_cookies.get("Bearer")?.value;

  if (has_token) {
    redirect(`/dashboard`);
  }

  return <AuthForm />;
};

export default Index;
