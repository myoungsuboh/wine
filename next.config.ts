import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    // 외부 이미지 호스트 도메인 허용 설정
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'], // 허용할 도메인 추가
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com', // 허용할 외부 호스트
        pathname: '/**', // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
