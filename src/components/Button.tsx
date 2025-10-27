import { ReactNode } from "react";
import { css, html } from "react-strict-dom";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  return (
    <html.button
      style={{
        ...style.base,
        ...(variant === "primary" && style.primary),
        ...(variant === "secondary" && style.secondary),
        ...(variant === "danger" && style.danger),
        ...(disabled && style.disabled),
      }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </html.button>
  );
}

const style = css.create({
  base: {
    padding: "10px",
    paddingInline: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    borderWidth: 0,
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    display: "inline-block",
    textAlign: "center",
  },
  primary: {
    backgroundColor: {
      default: "#007bff",
      ":hover": "#0056b3",
      ":active": "#004085",
    },
    color: "white",
  },
  secondary: {
    backgroundColor: {
      default: "#6c757d",
      ":hover": "#5a6268",
      ":active": "#343a40",
    },
    color: "white",
  },
  danger: {
    backgroundColor: {
      default: "#dc3545",
      ":hover": "#c82333",
    },
    color: "white",
  },
  disabled: {
    backgroundColor: "#e0e0e0",
    color: "#a0a0a0",
    cursor: "not-allowed",
  },
});
