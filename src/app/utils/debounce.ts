export function debounce<Args extends unknown[]>(func: (...args: Args) => void, wait: number): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Args): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}