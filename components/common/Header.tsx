import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({children}: HeaderProps) {
  return (
    <header className="mx-auto max-w-[343px] tablet:max-w-[1140px] h-50pxr tablet:h-70pxr pc:h-70pxr bg-black text-white px-20pxr tablet:px-60pxr flex justify-between items-center rounded-xl tablet:rounded-2xl">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={52} height={15} />
      </Link>
      <div>{children}</div>
    </header>
  );
}
