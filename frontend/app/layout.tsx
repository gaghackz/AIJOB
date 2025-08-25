import type { Metadata } from "next";
import { Geist, Geist_Mono,Roboto,Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({
  weight: ['900', '900'],
  variable: "--font-roboto",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  weight: ['400'],
  subsets:["latin"],
  variable:"--font-bebas"
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewIQ",
  description: "Take your interview preparation to the next level!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${roboto.variable} ${bebas.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
