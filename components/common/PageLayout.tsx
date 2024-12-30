import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="w-full mx-auto 
      max-w-[343px] 
      md:max-w-full 
      lg:max-w-[1140px]
    ">
      {children}
    </div>
  );
}