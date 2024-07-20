import React, { forwardRef, useRef, SelectHTMLAttributes, Ref  } from "react";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: React.ReactNode;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className = "", children, ...props }, ref) => {
    const inputRef = ref || useRef<HTMLSelectElement>(null);

    return (
      <select
        {...props}
        className={
          "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
          className
        }
        ref={inputRef as Ref<HTMLSelectElement>}
      >
        {children}
      </select>
    );
  }
);

export default SelectInput;