import { cn } from "@/utils";
import { ButtonHTMLAttributes } from "react";

type Props = {
  onClick?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  onClick,
  children,
  disabled,
  className,
}: Props) {
  console.log(disabled)
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "text-2xl px-6 py-3 rounded-lg font-bold bg-foreground border-2 hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
        className
      )}
    >
      {children}
    </button>
  );
}
