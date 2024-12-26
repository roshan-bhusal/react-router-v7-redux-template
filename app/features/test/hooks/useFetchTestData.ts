// app/features/test/hooks/useFetchTestData.ts
import { useGenericQuery } from "../../../common/api/hooks/useGenericQuery";
import { httpFetch } from "../../../common/api/httpClient";
import type { TestComponentData } from "../types";

async function fetchTestData(postId: number) {
  return httpFetch<TestComponentData>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
}

export function useFetchTestData(postId: number) {
  return useGenericQuery<TestComponentData>({
    queryKey: ["testData", postId],
    queryFn: () => fetchTestData(postId),
  });
}
