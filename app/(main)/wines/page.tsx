'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {fetchWines} from '@/service/wineservice';
import WineFilter from '@/components/common/Winefilter';
import WineList from '@/components/common/Winelist';
import WineSlider from '@/components/common/wineslider';
import SearchBar from '@/components/common/SearchBar';
import WineRegisterModal from '@/components/common/WineRegister';
import {AnimatePresence, motion} from 'framer-motion';

type WineType = 'Red' | 'White' | 'Sparkling';

interface Wine {
  id: number;
  name: string;
  region: string;
  country: string;
  price: number;
  rating: number;
  type: WineType;
  description: string;
  image: string;
}

interface Filters {
  wineType: WineType;
  priceRange: [number, number];
  rating: string;
}

const Page: React.FC = () => {
  const [wineList, setWineList] = useState<Wine[]>([]);
  const [filteredWineList, setFilteredWineList] = useState<Wine[]>([]);
  const [recommendedWines, setRecommendedWines] = useState<Wine[]>([]);
  const [filters, setFilters] = useState<Filters>({
    wineType: 'Red', // 기본값을 'Red'로 설정
    priceRange: [0, 74000],
    rating: '전체',
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const wines = await fetchWines(10, {
        type: filters.wineType ?? 'Red',
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        rating: filters.rating === '전체' ? undefined : parseFloat(filters.rating.split(' - ')[1]),
      });
      setWineList(wines);
      setFilteredWineList(wines);
      setRecommendedWines(wines.slice(0, 6));
    } catch (error) {
      console.error('Error fetching wine data:', error);
      alert('데이터를 가져오는 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filtered = wineList.filter(wine => wine.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredWineList(filtered);
  }, [searchQuery, wineList]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="min-h-screen py-6">
      <div className="container mx-auto" style={{maxWidth: '1140px'}}>
        {/* 추천 와인 슬라이더 */}
        <div className="mb-[40px]">
          <WineSlider wines={recommendedWines} />
        </div>

        <div className="flex gap-8">
          {/* 필터 컴포넌트 */}
          <aside
            className="w-[284px] hidden lg:block sticky top-4"
            style={{
              maxHeight: 'calc(100vh - 4rem)',
              overflow: 'auto',
              marginTop: '110px', // 필터와 추천 와인의 간격 유지
            }}
          >
            <WineFilter onFilterChange={handleFilterChange} />
            {/* 와인 등록 모달 버튼 */}
            <button onClick={() => setShowRegisterModal(true)} className="w-full py-3 mt-6 bg-purple-600 text-white font-bold text-sm rounded-lg">
              와인 등록하기
            </button>
          </aside>

          {/* 와인 리스트 */}
          <section className="flex-grow">
            <div className="mb-[30px] flex justify-between items-center">
              {' '}
              {/* 간격을 좁혀서 30px로 설정 */}
              <SearchBar
                value={searchQuery}
                onSearch={handleSearch}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="와인을 검색해 보세요"
              />
            </div>
            <div>
              <AnimatePresence>
                {filteredWineList.length > 0 ? (
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="space-y-6">
                    <WineList wines={filteredWineList} />
                  </motion.div>
                ) : (
                  <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>

      {/* 와인 등록 모달 */}
      {showRegisterModal && <WineRegisterModal onClose={() => setShowRegisterModal(false)} />}
    </main>
  );
};

export default Page;
