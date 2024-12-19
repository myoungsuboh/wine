import React from 'react';

interface InputBoxProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  error?: string;
  wrapperClassName?: string;
  inputClassName?: string;
}

export default function InputBox({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  error,
  wrapperClassName = '',
  inputClassName = '',
}: InputBoxProps) {
  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      <label className="text-lg font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`px-20pxr py-14pxr rounded-[12px] tablet:rounded-[16px] border border-gray-300 placeholder:text-gray-500  focus:outline-none ${inputClassName}`}
      ></input>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
