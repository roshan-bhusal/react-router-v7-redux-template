import { useQuery } from "@tanstack/react-query";
import type { TestComponentData } from "../types";
import { useGenericQuery } from "../../../common/api/hooks/useGenericQuery";
import { httpFetch } from "~/common/api/httpClient";
// 1) Provide a typed fetch function
async function fetchSomething(): Promise<TestComponentData> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!res.ok) throw new Error("Network response was not ok");
  // Cast to the expected shape
  return res.json() as Promise<TestComponentData>;
}

/**
 * This hook uses React Query to fetch data.
 * We pass an object with { queryKey, queryFn }
 * to avoid TS overload confusion.
 */
export function useFetchSomething() {
  return useQuery<TestComponentData, Error>({
    queryKey: ["something"],
    queryFn: fetchSomething,
  });
}

// Or you can

// app/features/test/hooks/useFetchSomething.ts

async function fetchPost() {
  return httpFetch<TestComponentData>(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
}

export function useFetchSomething2() {
  return useGenericQuery<TestComponentData>({
    queryKey: ["test", "post", 1],
    queryFn: fetchPost,
    staleTime: 1000 * 60, // can override default
  });
}
