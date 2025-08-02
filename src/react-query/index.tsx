"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const ReactQueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 20 * 60 * 1000, // 10 minutes (formerly cacheTime)
        retry: 1,
        // refetchOnWindowFocus: false,
      },
    },
  }));
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
