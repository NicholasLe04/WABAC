import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`
        w-full px-3 py-2 rounded-md border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
        placeholder:text-gray-400
        ${props.className || ''}
      `}
    />
  );
});

Input.displayName = 'Input';

export { Input }; 