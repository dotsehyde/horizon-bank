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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const formSchema = (type: string) =>
  z.object({
    email: z.string().email({
      message: "Enter valid email address",
    }),
    password: z.string().min(8),
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address1: type === "sign-in" ? z.string().optional() : z.string().max(50),
    state:
      type === "sign-in" ? z.string().optional() : z.string().min(2).max(2),
    city: type === "sign-in" ? z.string().optional() : z.string().max(50),
    postalCode:
      type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(3),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),
  });

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const authSchema = formSchema(type);
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      city: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    setIsLoading(true);
    try {
      //Signup with appwrite
      //create plaid token
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const res = await signIn({
          email: data.email,
          password: data.password,
        });
        // if (res) {
        //   router.push("/");
        // }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      form={form}
                      name="firstName"
                      title="First Name"
                      placeholder=""
                    />
                    <CustomInput
                      form={form}
                      name="lastName"
                      title="Last Name"
                      placeholder=""
                    />
                  </div>
                  <CustomInput
                    form={form}
                    name="address1"
                    title="Address"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    form={form}
                    name="city"
                    title="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      form={form}
                      name="state"
                      title="State"
                      placeholder="ex. NY"
                    />
                    <CustomInput
                      form={form}
                      name="postalCode"
                      title="Postal Code"
                      placeholder="ex. 11101"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      form={form}
                      name="dateOfBirth"
                      title="Date of birth"
                      placeholder="YYY-MM-DD"
                    />
                    <CustomInput
                      form={form}
                      name="ssn"
                      title="SSN"
                      placeholder="ex. 11101"
                    />
                  </div>
                </>
              )}
              <CustomInput
                form={form}
                name="email"
                type="email"
                title="Email Address"
                placeholder="Enter your email"
              />
              <CustomInput
                form={form}
                name="password"
                type="password"
                title="Password"
                placeholder="Enter your password"
              />
              <div className="flex flex-col gap-4">
                <Button disabled={isLoading} type="submit" className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
