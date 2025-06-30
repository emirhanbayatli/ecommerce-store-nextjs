export function Button({
  className = "",
  onClick,
  label,
}: {
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
