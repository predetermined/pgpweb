import { ComponentProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = PropsWithChildren<ComponentProps<"button">>;

export const Button = (props: ButtonProps) => {
  const { className, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={twMerge(
        "py-2 px-3 bg-black border border-black text-white rounded-sm",
        className
      )}
    >
      {props.children}
    </button>
  );
};
