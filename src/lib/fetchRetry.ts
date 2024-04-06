export async function fetchRetry(
  url: RequestInfo,
  options?: RequestInit & { retries?: number; retryDelay?: number },
): Promise<Response> {
  const { retries = 3, retryDelay = 1000, ...fetchOptions } = options || {};
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) throw new Error("Fetch failed");
      return response;
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, retryDelay * 2 ** attempt),
      );
      attempt++;
    }
  }

  throw new Error("All fetch attempts failed");
}
