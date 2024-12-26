// Reusable hooks for queries
// app/common/api/hooks/useGenericQuery.ts
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

/**
 * A generic wrapper that allows passing in query keys
 * and a fetch function, applying some global logic if needed.
 */
export function useGenericQuery<TData, TError = unknown>(
  options: UseQueryOptions<TData, TError, TData>
): UseQueryResult<TData, TError> {
  // Possibly do some logging, error translation, or auto retries
  return useQuery<TData, TError>({
    retry: 1,
    ...options,
  });
}
