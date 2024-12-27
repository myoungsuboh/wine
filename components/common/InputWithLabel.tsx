import React, {InputHTMLAttributes} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  register?: UseFormRegisterReturn;
}

export default function InputWithLabel({
  label,
  error,
  wrapperClassName = '',
  labelClassName = '',
  inputClassName = '',
  register,
  ...inputProps
}: InputWithLabelProps) {
  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      <label className={`text-lg font-medium ${labelClassName}`}>{label}</label>
      <input
        className={`px-20pxr py-14pxr rounded-[12px] tablet:rounded-[16px] border border-gray-300 placeholder:text-gray-500  focus:outline-none ${inputClassName}`}
        {...register}
        {...inputProps}
      ></input>
      {error && <p className="text-red-500 text-xs tablet:text-sm">{error}</p>}
    </div>
  );
}
