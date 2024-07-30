"use client";
import { SignIn, SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  //   useEffect(() => {
  //     if (isSignedIn) {
  //       router.replace("/dashboard");
  //     }
  //   }, [isSignedIn]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInButton />
    </div>
  );
}

export default HomePage;
