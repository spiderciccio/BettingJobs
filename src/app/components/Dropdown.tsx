import { useClickOutside } from "@/app/hooks/clickOutside";

import ChevronDownIcon from "@/app/components/icons/ChevronDownIcon";

interface Props {
  open: boolean;
  title: string;
  contentClassName?: string;
  children: Readonly<React.ReactNode>;
  onChange: (open: boolean) => void;
}

export default function Dropdown({
  title,
  open,
  children,
  contentClassName,
  onChange,
}: Props) {
  const ref = useClickOutside(() => {
    onChange(false);
  }, open);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="inline-flex items-center px-3 py-1 whitespace-nowrap rounded-full border text-sm cursor-pointer select-none duration-200 bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
        onClick={() => {
          onChange(!open);
        }}
      >
        {title}
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${
            open ? "[transform:rotateX(180deg)]" : "[transform:rotateX(0deg)]"
          }`}
        />
      </button>
      <div
        className={`${contentClassName || "absolute"}
          z-10 mt-2 rounded-md shadow-lg bg-white text-black ring-1 ring-black/5 p-4 duration-200 ease-out origin-top ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
      >
        {children}
      </div>
    </div>
  );
}
