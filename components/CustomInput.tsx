import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";

const CustomInput = ({
  form,
  name,
  title,
  type = "text",
  placeholder,
}: CustomInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{title}:</FormLabel>
          <div className="flex w-full">
            <FormControl>
              <Input
                type={type}
                {...field}
                placeholder={placeholder}
                className="input-class"
              />
            </FormControl>
          </div>
          <FormMessage className="form-message mt-2" />
        </div>
      )}
    />
  );
};

export default CustomInput;

interface CustomInputProps {
  form: any;
  type?: string;
  name: string;
  isPass?: boolean;
  title: string;
  placeholder: string;
}
