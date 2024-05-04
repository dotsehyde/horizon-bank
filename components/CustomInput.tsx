import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";

const CustomInput = ({
  form,
  name,
  title,
  isPass = false,
  isEmail = false,
  isRequired = false,
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
                required={isRequired}
                type={isEmail ? "email" : isPass ? "password" : "text"}
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
  isEmail?: boolean;
  isRequired?: boolean;
  name: string;
  isPass?: boolean;
  title: string;
  placeholder: string;
}
