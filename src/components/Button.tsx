export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant: "primary" | "secondary";
}

export default function Button({
  label,
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${variant === "primary" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
    >
      {label}
    </button>
  );
}
