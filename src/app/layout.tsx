// app/layout.tsx (server component)
import { ReactNode } from "react";
import Providers from "./Providers"; // our client-only component

export const metadata = {
  title: "Degen Frontend",
  description: "A Next.js 13 + Chakra UI application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
