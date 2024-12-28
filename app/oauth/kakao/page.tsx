'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

const KakaoCallback = () => {
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      //   localStorage.setItem('authCode', code as string);
      window.opener.postMessage({type: 'authCode', authCode: code}, '*');
      window.close();
    }
  }, [pathname]);

  return;
};

export default KakaoCallback;
