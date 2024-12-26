import { useQuery } from "@tanstack/react-query";
import type { TestComponentData } from "../types";

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
