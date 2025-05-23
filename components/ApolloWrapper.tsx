"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo-client";

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
