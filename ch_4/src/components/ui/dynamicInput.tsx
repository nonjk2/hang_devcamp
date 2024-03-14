import { InputHTMLAttributes, forwardRef, useEffect, useState } from "react";
import { Input } from "./input";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  type?: "text" | "password" | "email";
  placeholder: string;
  disabled?: boolean;
  id: string;
  autoFocus?: boolean;
  validationMessages?: string;
  validation?: boolean;
  required?: boolean;
}

const DynamicInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      label,
      type = "text",
      placeholder,
      disabled = false,
      onBlur,
      id,
      // onFocus,
      autoFocus = false,
      step,
      validationMessages,
      validation,
      required = false,
      ...props
    },
    ref
  ) => {
    const [active, setActive] = useState(false);

    return (
      <div
        className="w-full flex flex-col relative"
        onMouseUp={() => {
          // onFocus && step === 3 && onFocus(id, step);
          // setId(id);
        }}
      >
        <label
          htmlFor={id}
          className={`border rounded ${
            active || (disabled && value.length > 0) ? "border-blue-300" : ""
          } transition-all flex-row
        ${disabled ? "bg-background" : "bg-background"} 
        `}
        >
          <div className="absolute flex-row w-full h-full justify-between">
            <div
              className={`truncate input-transition leading-6 transition-all ${
                disabled || value.length >= 1 || active
                  ? "text-xs pt-2"
                  : "text-[17px] pt-4"
              } ${
                active || (disabled && value.length > 0) ? "text-blue-500" : ""
              } transition-all flex-row pl-2 pr-2`}
            >
              {label}
            </div>
          </div>
          <div className="overflow-hidden pt-3 px-2 pb-2 flex-row flex-grow flex-shrink-0 mt-4">
            <div className="flex flex-row items-center w-full text-[17px] leading-6 bg-background">
              <Input
                ref={ref}
                disabled={disabled}
                required={required}
                autoFocus={autoFocus}
                type={type}
                placeholder={active ? placeholder : ""}
                onFocus={() => setActive(true)}
                onBlur={(e) => {
                  setActive(false);
                  if (onBlur) {
                    onBlur(e);
                  }
                }}
                className={`${
                  !active && "placeholder:hidden"
                } grow cursor-text h-5 w-full outline-none border-none appearance-none resize-none bg-background ${
                  disabled ? "text-primary" : "text-primary"
                }`}
                id={id}
                {...props}
              />
            </div>
          </div>
        </label>
      </div>
    );
  }
);
DynamicInput.displayName = "DynamicInput";
export default DynamicInput;
