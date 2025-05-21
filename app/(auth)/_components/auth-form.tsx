"use client";
import { JSX } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
} from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { post } from "@/lib";
import loginFields from "./login-fields.json";
import registerFields from "./register-fields.json";

const loginSchema = z.object({
  email: z.string().email("Email je obavezan"),
  password: z.string().min(6, "Lozinka je obavezna"),
});

const registerSchema = z
  .object({
    firstName: z.string().min(1, "Ime je obavezno"),
    lastName: z.string().min(1, "Prezime je obavezno"),
    email: z.string().email("Email je obavezan"),
    password: z.string().min(6, "Lozinka je obavezna"),
    confirmPassword: z.string().min(6, "Potvrda lozinke je obavezna"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lozinke se ne poklapaju",
    path: ["confirmPassword"],
  });

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;
type LoginFormProps = {
  email: string;
  password: string;
};
type RegisterFormProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Types
type AuthFormField = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
};

type AuthFormProps<T> = {
  title: string;
  description: string;
  fields: AuthFormField[];
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  redirectPath: string;
  onSubmit: (data: T) => void;
  isPending: boolean;
};

// Custom Hook
const useAuthForm = <T extends FieldValues>(
  schema: any,
  mutationFn: (data: T) => Promise<any>,
) => {
  const form = useForm<T>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: (res) => {
      toast.success(res.message, { richColors: true });
    },
    onError: (err: any) => {
      console.error("Auth error:", err);
      toast.error(err?.response?.data?.message, {
        richColors: true,
      });
    },
  });

  return { form, mutate, isPending };
};

// Shared Form Component
const AuthFormTemplate = <T,>({
  title,
  description,
  fields,
  buttonText,
  footerText,
  footerLinkText,
  redirectPath,
  onSubmit,
  isPending,
  form,
}: AuthFormProps<T> & { form: any }) => {
  const router = useRouter();
  const { handleSubmit, register } = form;

  return (
    <Card className="w-full">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-[1.7rem] font-semibold">{title}</CardTitle>
          <CardDescription className="text-base text-muted-foreground font-light -mt-1.5">
            {description}
          </CardDescription>
        </CardHeader>
        <Separator className="mt-5" />
        <CardContent className="mt-5">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {fields.map((f) => (
                <FormField
                  key={f.name}
                  control={form.control}
                  name={f.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">{f.label}</FormLabel>
                      <FormControl>
                        <Input
                          {...register(field.name)}
                          placeholder={f.placeholder}
                          type={f.type}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="submit"
                className="w-full h-[3rem]"
                disabled={isPending}
              >
                {isPending ? <Loader2 className="animate-spin" /> : buttonText}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="w-full flex items-center text-center justify-center mt-5">
          <p className="text-sm text-muted-foreground">
            {footerText}{" "}
            <Button
              variant="link"
              className="p-0 text-sm font-medium text-foreground"
              onClick={() => router.push(redirectPath)}
            >
              {footerLinkText}
            </Button>
          </p>
        </CardFooter>
      </div>
    </Card>
  );
};

// Main Component
export const AuthForm = (): JSX.Element => {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div className="max-lg:col-span-2 col-span-1 flex flex-col items-start mx-auto max-w-lg w-full py-10">
      <Image
        src="/logo.svg"
        alt="Postify"
        width={200}
        height={200}
        className="mb-15 max-lg:w-full max-lg:drop-shadow-2xl"
      />
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

// Login Form
const LoginForm = () => {
  const { form, mutate, isPending } = useAuthForm<LoginForm>(
    loginSchema,
    (data) =>
      post("/users/login", data).then((res) => {
        if (res) {
          window.location.href = "/dashboard";
          return res;
        }
      }),
  );

  return (
    <AuthFormTemplate
      title="Dobrodošli nazad"
      description="Unesite svoje podatke za prijavu kako biste nastavili sa radom."
      fields={loginFields}
      buttonText="Prijavite se"
      footerText="Nemate nalog?"
      footerLinkText="Registrujte se"
      redirectPath="/register"
      onSubmit={(data) => mutate(data as LoginFormProps)}
      isPending={isPending}
      form={form}
    />
  );
};

// Register Form
const RegisterForm = () => {
  const { form, mutate, isPending } = useAuthForm<RegisterForm>(
    registerSchema,
    (data) =>
      post("/users/signup", data).then((res) => {
        if (res) {
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);

          return res;
        }
      }),
  );

  return (
    <AuthFormTemplate
      title="Dobrodošli"
      description="Unesite svoje podatke kako biste se registrovali na našu platformu."
      fields={registerFields}
      buttonText="Registrujte se"
      footerText="Imate nalog?"
      footerLinkText="Ulogujte se"
      redirectPath="/login"
      onSubmit={(data) => mutate(data as RegisterFormProps)}
      isPending={isPending}
      form={form}
    />
  );
};
