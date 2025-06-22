import { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return (
    <textarea
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

Textarea.displayName = 'Textarea';

export { Textarea }; 