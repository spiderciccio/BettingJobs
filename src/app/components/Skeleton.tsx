export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`${className} animate-pulse bg-gray-700 rounded-md`}
      aria-label="Loading image"
      role="status"
    />
  );
}
