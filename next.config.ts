import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'], // 외부 이미지 도메인 추가
  },
};

export default nextConfig;
