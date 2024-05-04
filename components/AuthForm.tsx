"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";

const formSchema = z.object({
  email: z.string().email({
    message: "Enter valid email address",
  }),
  password: z.string().min(8),
});

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="mb-5 cursor-pointer items-center flex gap-1">
          <Image src="/icons/logo.svg" alt="logo" width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomInput
                form={form}
                name="email"
                isEmail={true}
                isRequired={true}
                isPass={false}
                title="Email Address"
                placeholder="Enter your email"
              />
              <CustomInput
                form={form}
                name="password"
                isEmail={false}
                isRequired={true}
                isPass={true}
                title="Password"
                placeholder="Enter your password"
              />
              <Button type="submit" className="form-btn">
                Submit
              </Button>
            </form>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;