import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({children}: HeaderProps) {
  return (
    <header className="w-[21.438rem] h-[3.125rem] tablet:w-[44rem] tablet:h-[4.375rem] pc:w-[71.25rem] pc:h-[4.375rem] bg-black text-white px-[1.25rem] tablet:px-[3.75rem] pc:px-[3.75rem] flex justify-between items-center rounded-xl tablet:rounded-2xl pc:rounded-2xl">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={52} height={15} />
      </Link>
      <div>{children}</div>
    </header>
  );
}
