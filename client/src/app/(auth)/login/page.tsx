"use client";

import { cn } from "cn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginSchema } from "./_lib/login.schema";
import { useApi } from "@/lib/apiClient";
import axios from "axios";

export default function page({ className }: React.ComponentProps<"form">) {
  const { setAuth } = useAuthStore();
  const {
    execute: LoginRequest,
    loading: LoginLoading,
    data: LoginData,
    error: LoginError,
  } = useApi(async (payload: any) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
      payload,
      {
        withCredentials: true,
      },
    );
    return response.data;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const result = await LoginRequest(data);
      
      setAuth(result?.user, result?.accessToken)
    } catch (err) {
      console.error("API call failed", err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" {...register("email")} type="email" placeholder="m@example.com" />
            {errors.email?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.email.message)}
              </p>
            )}
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" {...register("password")} type="password" required />
            {errors.password?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.password.message)}
              </p>
            )}
          </Field>
          <Field>
            <Button disabled={LoginLoading} type="submit">
              Login
            </Button>
            {LoginError && (
              <p className="text-sm text-red-500 mt-1">
                {String(LoginError)}
              </p>
            )}
          </Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
