// React - Query Client + SSR handling if needed
// app/common/api/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // e.g., staleTime: 1000 * 60,
        // or other global defaults
        retry: 1,
      },
    },
  });
}
