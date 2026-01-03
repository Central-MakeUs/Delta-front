import { button } from "./button.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "lg";
}

const Button = ({ size, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${button({ size })}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
