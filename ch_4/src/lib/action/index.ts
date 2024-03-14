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

type Success<T> = {
  status: "success";
  data: T;
};

type Failure = {
  status: "failure";
  error: string;
};

type Result<T> = Success<T> | Failure;

export async function CombineFetch<T>({
  path,
  method = "GET",
  headers,
  body,
  cache = "default",
}: FetchOptions): Promise<Result<T>> {
  const endpoint = `${domain}${path}`;
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
      return {
        status: "failure",
        error:
          (await handleHttpError(result)).body.message ||
          "Fetch request failed",
      };
    }

    const ResponseBody: T = await result.json();
    return { status: "success", data: ResponseBody };
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
