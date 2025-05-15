export async function fetchWithError<T = unknown>(promise: Promise<T>): Promise<[T | undefined, Error | undefined]> {
  try {
    const data: T = await promise
    return [data, undefined];
  } catch (err) {
    return [undefined, err as Error];
  }
}
