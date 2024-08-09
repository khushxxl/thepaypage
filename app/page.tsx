import Features from "@/components/landingPageComponents/Features";
import Footer from "@/components/landingPageComponents/Footer";
import Hero from "@/components/landingPageComponents/Hero";
import SignupForm from "@/components/landingPageComponents/SignupForm";
import { SignIn, SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

function HomePage() {
  //   useEffect(() => {
  //     if (isSignedIn) {
  //       router.push("/dashboard");
  //     }
  //   }, [isSignedIn]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center max-w-[100%]  w-full mx-auto">
      <Hero />
      <Features />
      <SignupForm />
      <Footer />
    </div>
  );
}

export default HomePage;
