import "./globals.css";
import { ReactNode } from "react";
import ApolloWrapper from "@/components/ApolloWrapper";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Photo Blog",
  description: "Next.js + Supabase + Apollo + GraphQL",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
        <div>
          <hr />
          <Subscribe />
          <hr />
          <Footer />
        </div>
      </body>
    </html>
  );
}
