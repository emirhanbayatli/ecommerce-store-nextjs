export function Button({
  className = "",
  onClick,
  label,
}: {
  label: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: string;
}) {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
