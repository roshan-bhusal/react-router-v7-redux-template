// common fetch or axios instance
// app/common/api/httpClient.ts
export async function httpFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // Add auth tokens or other headers here if needed
      ...options?.headers,
    },
  });

  if (!response.ok) {
    // Optionally parse response for error details
    const errorText = await response.text();
    throw new Error(errorText || "Network response was not ok");
  }

  return response.json() as Promise<T>;
}
