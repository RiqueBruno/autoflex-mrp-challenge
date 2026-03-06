import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className={`relative w-full ${className}`}>
        <input
          ref={ref}
          placeholder=" "
          className={`block w-full px-3 pt-5 pb-2 text-gray-900 bg-transparent border rounded-md appearance-none focus:outline-none focus:ring-0 peer transition-colors
            ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-600"}
          `}
          {...props}
        />
        <label
          className={`absolute text-sm duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 bg-white px-1
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:bg-white
            ${error ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600"}
          `}
        >
          {label}
        </label>
        {error && (
          <span className="text-xs text-red-500 mt-1 block">{error}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
