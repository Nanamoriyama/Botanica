import "./globals.css";
import { ReactNode } from "react";
import ApolloWrapper from "@/components/ApolloWrapper";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Photo Blog",
  description: "Next.js + Supabase + Apollo + GraphQL",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <ApolloWrapper>{children}</ApolloWrapper>
          <div>
            <hr />
            <Subscribe />
            <hr />
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
