"use client";

import { useForm } from "react-hook-form";
import { cn } from "cn";
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
import { signupSchema } from "./_lib/signup.schema";
import { generateNumericUsername } from "./_lib/userNameGenerator";
import { useApi } from "@/lib/apiClient";
import { signupRequest } from "@/lib/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function page() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const {
    execute: SignupRequest,
    loading: SignupLoading,
    data: SignupData,
    error: SignupError,
  } = useApi(async (payload: any) => {
    return signupRequest(payload);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    let userName;

    if (data.fullName) {
      userName = generateNumericUsername(data.fullName);
    }

    const payload = {
      ...data,
      userName,
    };

    try {
      const result = await SignupRequest(payload);

      setAuth(result.user, result.accessToken);
      router.replace("/dashboard");
    } catch (err) {
      console.error("API call failed", err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6")}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Fill in the form below to create your account
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input
              id="fullName"
              {...register("fullName")}
              type="text"
              placeholder="John Doe"
            />
            {errors.fullName?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.fullName.message)}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="m@example.com"
            />
            {errors.email?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.email.message)}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" {...register("password")} type="password" />
            {errors.password?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.password.message)}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              {...register("confirmPassword")}
              type="password"
            />
            {errors.confirmPassword?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.confirmPassword.message)}
              </p>
            )}
          </Field>
          <Field>
            <Button type="submit" disabled={SignupLoading}>
              Create Account
            </Button>
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
