interface Props {
  checked: boolean;
  children?: Readonly<React.ReactNode>;
  label?: string;
  name: string;
  value: string;
  onChange: (checked: boolean) => void;
}

export default function Chips({
  checked,
  children,
  label,
  name,
  value,
  onChange,
}: Props) {
  return (
    <label
      className={`inline-flex items-center px-3 py-1 rounded-full border text-sm cursor-pointer select-none transition-colors duration-200
        ${
          checked
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
        }
      `}
    >
      <input
        type="checkbox"
        className="hidden"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      {label || children}
    </label>
  );
}
