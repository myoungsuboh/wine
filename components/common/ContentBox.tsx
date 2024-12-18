import React from 'react';

interface ContentBoxType {
  className?: string;
  children: React.ReactNode;
}
export default function ContentBox({className, children, ...props}: ContentBoxType) {
  return (
    <div className={`border border-gray-300 border-solid rounded-[1rem] ${className}`} {...props}>
      {children}
    </div>
  );
}
