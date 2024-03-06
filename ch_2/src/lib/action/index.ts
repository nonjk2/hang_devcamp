import { handleHttpError, isError } from "./errorhandle";
export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;
const domain = process.env.EUNDOL_DOMAIN
  ? ensureStartsWith(process.env.EUNDOL_DOMAIN, "https://")
  : "http://localhost:9090";
const key = process.env.EUNDOLFRONT_ACCESS_TOKEN!;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: any;
  cache?: RequestCache;
  path?: string;
};
export async function CombineFetch<T>({
  path,
  method = "GET",
  headers,
  body,
  cache = "default",
}: FetchOptions): Promise<{
  status: number;
  body: T | { message: string };
}> {
  const endpoint = `${domain}${path}`;
  console.log(body);
  console.log(endpoint);
  try {
    const result = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        // "X-Eundol-Token": key,
        ...headers,
      },
      body: JSON.stringify(body),
      cache,
    });
    if (!result.ok) {
      return handleHttpError(result);
    }

    const ResponseBody = await result.json();

    // if (ResponseBody.errors) {
    //   throw ResponseBody.errors[0];
    // }

    return {
      status: result.status,
      body: ResponseBody,
    };
  } catch (e) {
    if (isError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
      };
    }

    throw {
      error: e,
    };
  }
}
