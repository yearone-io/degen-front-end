// app/layout.tsx (server component)
import { ReactNode } from "react";
import Providers from "./Providers"; // our client-only component
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Degen Dispatch | Real-Time Token Analysis",
  description: "Track whale wallets and their transactions in real-time with Degen Dispatch",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}