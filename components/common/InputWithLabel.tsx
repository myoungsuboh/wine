import React, {InputHTMLAttributes} from 'react';

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  wrapperClassName?: string;
  inputClassName?: string;
}

export default function InputWithLabel({label, error, wrapperClassName = '', inputClassName = '', ...inputProps}: InputWithLabelProps) {
  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      <label className="text-lg font-medium">{label}</label>
      <input
        className={`px-20pxr py-14pxr rounded-[12px] tablet:rounded-[16px] border border-gray-300 placeholder:text-gray-500  focus:outline-none ${inputClassName}`}
        {...inputProps}
      ></input>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
