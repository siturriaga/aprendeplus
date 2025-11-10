import { cn } from "../../lib/cn";

type ButtonIntent = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "sm";

interface ButtonProps {
  intent?: ButtonIntent;
  size?: ButtonSize;
  className?: string;
  children?: import("react").ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (event: unknown) => void;
  [key: string]: unknown;
}

const intentClasses: Record<ButtonIntent, string> = {
  primary: "bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary",
  secondary: "bg-white text-base shadow-subtle hover:-translate-y-0.5 focus-visible:ring-primary",
  ghost: "bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary"
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-base",
  sm: "px-4 py-2 text-sm"
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export const Button: import("react").FC<ButtonProps> = ({
  intent = "primary",
  size = "md",
  className,
  children,
  ...props
}) => (
  <button className={cn(baseClasses, intentClasses[intent], sizeClasses[size], className)} {...props}>
    {children}
  </button>
);
