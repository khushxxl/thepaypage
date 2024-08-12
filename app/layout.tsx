import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppContextProvider from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
// import "@uploadthing/react/styles.css";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Pay Page",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <meta
            name="twitter:card"
            content="https://i.ibb.co/cx3mN2r/Screenshot-2024-08-05-at-23-11-59.png"
          />
          <meta name="twitter:site" content="https://thepaypage.vercel.app" />
          <meta name="twitter:title" content="💸 thepaypage" />
          <meta
            name="twitter:description"
            content="Integrating payments has always been a problem 😮‍💨, now integrate stripe with just few lines of code, no more api calls or code errors! Just that? No. Get a customizable page which you can design with our no-code designer 🪄"
          />
          <meta
            name="twitter:image"
            content="https://i.ibb.co/cx3mN2r/Screenshot-2024-08-05-at-23-11-59.png"
          />
        </Head>
        <AppContextProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
            <Toaster />
            <Analytics />
          </body>
        </AppContextProvider>
      </html>
    </ClerkProvider>
  );
}
