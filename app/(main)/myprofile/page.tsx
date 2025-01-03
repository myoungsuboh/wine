"use client";
import { useState, useEffect, useMemo } from "react";
import Profile from "@/components/myprofile/Profile";
import PageLayout from "@/components/common/PageLayout";
import { useRouter } from "next/navigation";
import Reviews from "@/components/myprofile/Reviews";
import { getUserReviews, getUserWines } from '@/service/api';
import EmptyContent from "@/components/common/EmptyContent";
import Wines from "@/components/myprofile/Wines";
import { useAuthStore } from "@/service/authStore";

export default function MyProfile() {
  const { isLogin, user } = useAuthStore();
  const router  = useRouter();
  const [pageType, setPageType] = useState('REVIEWS'); //REVIEWS or WINES
  const [totalCount, setTotalCount] = useState(0);
  const [reviewsData, setReviewsData] = useState([]);
  const [winesData, setWinesData] = useState([]);

  const fetchUserReviews = () => {
    getUserReviews(10).then(data => {
      setTotalCount(data.totalCount);
      setReviewsData(data.list);
    });
  };

  const fetchUserWines = () => {
    getUserWines(10).then(data => {
      setTotalCount(data.totalCount);
      setWinesData(data.list);
    });
  };

  console.log(user)

  useEffect(() => {
    const authStorage = localStorage.getItem('auth-storage');
    const storageUserData = JSON.parse(authStorage || '{}');
    if (!storageUserData.state?.user && isLogin === false) {
      router.push('/login');
    } 
  }, [isLogin, user]);

  useMemo(() => {
    if(user) {
      if (pageType === 'REVIEWS') {
        fetchUserReviews();
      }
      if (pageType === 'WINES') {
        fetchUserWines();
      }
    }
  }, [pageType]);

  return (
    <PageLayout>
      <div className="mt-9">
        <div className="flex flex-col lg:flex-row w-full gap-8 md:gap-10 lg:gap-14">
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <Profile />
          </div>
          <div className="w-full lg:w-[800px]">
            <div className="flex flex-row justify-between items-center mb-4">
              <div className="flex gap-5">
                <button
                  className={`text-[20px] font-bold ${pageType === 'REVIEWS' ? 'text-gray-800' : 'text-gray-400'}`}
                  onClick={() => setPageType('REVIEWS')}
                >
                  내가 쓴 후기
                </button>
                <button
                  className={`text-[20px] font-bold ${pageType === 'WINES' ? 'text-gray-800' : 'text-gray-400'}`}
                  onClick={() => setPageType('WINES')}
                >
                  내가 등록한 와인
                </button>
              </div>
              <div>
                <span className="text-purple-100 text-[14px]">총 {totalCount}개</span>
              </div>
            </div>
            {pageType === 'REVIEWS' ? (
              reviewsData.length > 0 ? (
                <Reviews fetchReviews={fetchUserReviews} reviewsData={reviewsData} />
              ) : (
                <EmptyContent content="내가 쓴 후기가" />
              )
            ) : winesData.length > 0 ? (
              <Wines fetchWines={fetchUserWines} winesData={winesData} />
            ) : (
              <EmptyContent content="내가 등록한 와인이" />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
