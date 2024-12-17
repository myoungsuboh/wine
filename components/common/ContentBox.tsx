import React from 'react';

interface ContentBoxType {
  className?: string;
  children: React.ReactNode;
}
export default function ContentBox({className, children, ...props}: ContentBoxType) {
  return (
    <div className={`border-2 border-gray-300 border-solid rounded-md w-[21.438rem] h-auto lg:w-[44rem] xl:w-[50rem] ${className}`} {...props}>
      {children}
    </div>
  );
}
