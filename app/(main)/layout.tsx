'use client';

import Header from '@/components/common/Header';
import ProfileImage from '@/components/common/ProfileImage';
import {useAuthStore} from '@/service/authStore';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MainLayout({children}: {children: React.ReactNode}) {
  const {isLogin, user} = useAuthStore();
  const pathname = usePathname();
  const [defImgSrc, setDefImgSrc] = useState('/default-profile.svg');
  const isLandingPage = pathname === '/';

  useEffect(() => {
    if (user) {
      setDefImgSrc(user.image);
    }
  }, [user]);

  return (
    <div className="p-16pxr tablet:pt-24pxr tablet:px-20pxr bg-gray-100 min-h-screen">
      <Header>
        {isLandingPage ? (
          isLogin ? (
            <ProfileImage src={defImgSrc} />
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <button className="px-4 py-2 ">로그인</button>
              </Link>
              <Link href="/signup">
                <button className="px-4 py-2 ">회원가입</button>
              </Link>
            </div>
          )
        ) : isLogin ? (
          <ProfileImage src={defImgSrc}  />
        ) : (
          <div className="flex gap-2">
            <Link href="/login">
              <button className="px-4 py-2 ">로그인</button>
            </Link>
          </div>
        )}
      </Header>
      <main>{children}</main>
    </div>
  );
}
