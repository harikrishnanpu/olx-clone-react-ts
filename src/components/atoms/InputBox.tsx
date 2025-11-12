import React from "react";

type InputBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  type?: string;
};

export const InputBox: React.FC<InputBoxProps> = ({ placeholder, type = "text", ...props }) => {
  return (
    <div className="w-full px-2">
      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className="bg-white outline-none border-none focus:outline-none focus:border-none w-full"
      />
    </div>
  );
};
