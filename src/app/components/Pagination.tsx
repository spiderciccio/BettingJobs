interface Props {
  page: number;
  totalPage: number;
  className?: string;
  onChange: (newPage: number) => void;
}

export default function Pagination({
  className,
  page,
  totalPage,
  onChange,
}: Props) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <button
        className="px-3 py-1 rounded-lg border border-gray-600 text-gray-200 text-sm hover:bg-gray-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        type="button"
        onClick={() => onChange(page > 1 ? page - 1 : 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <span className="text-sm text-gray-300">
        Page <strong>{page}</strong> of <strong>{totalPage}</strong>
      </span>
      <button
        className="px-3 py-1 rounded-lg border border-gray-600 text-gray-200 text-sm hover:bg-gray-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        type="button"
        onClick={() => onChange(page >= totalPage ? totalPage : page + 1)}
        disabled={page === totalPage}
      >
        Next
      </button>
    </div>
  );
}
