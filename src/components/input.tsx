import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentProps<"input"> {}

export const Input = (props: InputProps) => {
  const { className, ...inputProps } = props;

  return (
    <input
      {...inputProps}
      className={twMerge(
        "py-2 px-3 rounded-sm bg-neutral-100 border border-neutral-400 w-full",
        className
      )}
    />
  );
};

interface TextareaProps extends ComponentProps<"textarea"> {}

export const Textarea = (props: TextareaProps) => {
  const { className, ...otherProps } = props;

  return (
    <textarea
      {...otherProps}
      className={twMerge(
        "py-2 px-3 rounded-sm bg-neutral-100 border border-neutral-400 w-full",
        className
      )}
    />
  );
};

interface SelectProps extends ComponentProps<"select"> {}

export const Select = (props: SelectProps) => {
  const { className, ...otherProps } = props;

  return (
    <select
      {...otherProps}
      className={twMerge(
        "py-2 px-3 rounded-sm bg-neutral-100 border border-neutral-400 w-full",
        className
      )}
    >
      {props.children}
    </select>
  );
};
