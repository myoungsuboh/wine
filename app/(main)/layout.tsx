'use client';

import Header from '@/components/common/Header';
import ProfileImage from '@/components/common/ProfileImage';
import {useAuthStore} from '@/service/authStore';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

export default function MainLayout({children}: {children: React.ReactNode}) {
  const {isLogin} = useAuthStore();
  const pathname = usePathname();

  const isLandingPage = pathname === '/';

  return (
    <div>
      <Header>
        {isLandingPage ? (
          isLogin ? (
            <ProfileImage src="/default-profile.svg" />
          ) : (
            <div className="auth-buttons flex gap-2">
              <Link href="/login">
                <button className="login-btn px-4 py-2 text-white rounded">로그인</button>
              </Link>
              <Link href="/signup">
                <button className="signup-btn px-4 py-2 text-white rounded">회원가입</button>
              </Link>
            </div>
          )
        ) : isLogin ? (
          <ProfileImage src="/default-profile.svg" />
        ) : (
          <div className="auth-buttons flex gap-2">
            <Link href="/login">
              <button className="login-btn px-4 py-2 text-white rounded">로그인</button>
            </Link>
          </div>
        )}
      </Header>
      <main>{children}</main>
    </div>
  );
}
