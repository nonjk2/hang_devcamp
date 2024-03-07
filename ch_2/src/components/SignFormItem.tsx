"use client";

import { ReactElement, ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import DynamicInput from "./ui/dynamicInput";

interface Option {
  value: string;
  label: string;
}

interface SignFormItemProps {
  name: string;
  form: any;
  placeholder?: string;
  type?: "text" | "password" | "select";
  options?: Option[];
  disabled?: boolean;
}

const SignFormItem = ({
  name,
  form,
  placeholder = "",
  options,
  type = "text",
  disabled = false,
}: SignFormItemProps) => {
  const renderFormControl = (
    type: string,
    field: any,
    placeholder: string,
    options?: Option[]
  ): ReactElement => {
    switch (type) {
      case "select":
        return (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "text":
        return (
          <DynamicInput
            {...field}
            label={name}
            ref={field.ref}
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            autoFocus={false}
          />
        );
      case "password":
      default:
        return (
          <DynamicInput
            {...field}
            label={name}
            ref={field.ref}
            placeholder={placeholder}
            type={type}
            // autoFocus={false}
            autoComplete={`${type !== "password"}`}
          />
        );
    }
  };
  return (
    <FormField
      key={name}
      control={form.control}
      name={name as "이름" | "이메일" | "연락처" | "비밀번호" | "비밀번호확인"}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormControl>
            {renderFormControl(type, field, placeholder, options)}
          </FormControl>
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
export default SignFormItem;
