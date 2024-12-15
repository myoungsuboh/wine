import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({children}) => {
  return (
    <header className="w-[343px] h-[50px] lg:w-[704px] lg:h-[70px] xl:w-[1140px] xl:h-[70px] bg-[#101318] text-white px-[20px] lg:px-[60px] xl:px-[60px] flex justify-between items-center rounded-xl lg:rounded-2xl xl:rounded-2xl">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={52} height={15} />
      </Link>
      <div>{children}</div>
    </header>
  );
};

export default Header; 
