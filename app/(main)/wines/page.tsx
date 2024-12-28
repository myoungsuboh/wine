'use client';

import React, {useState, useEffect} from 'react';
import WineFilter from '@/components/common/Winefilter';
import WineList from '@/components/common/Winelist';
import WineSlider from '@/components/common/wineslider';
import SearchBar from '@/components/common/SearchBar'; // 검색창 컴포넌트

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

const Page: React.FC = () => {
  const [wineList, setWineList] = useState<Wine[]>([]);
  const [filteredWineList, setFilteredWineList] = useState<Wine[]>([]);
  const [recommendedWines, setRecommendedWines] = useState<Wine[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFilterChange = (filters: {wineType: WineType; priceRange: [number, number]; rating: string}) => {
    const {wineType, priceRange, rating} = filters;

    const filtered = wineList.filter(wine => {
      const matchesType = wine.type === wineType;
      const matchesPrice = wine.price >= priceRange[0] && wine.price <= priceRange[1];
      const matchesRating =
        rating === '전체' ||
        (rating === '4.5 - 5.0' && wine.rating >= 4.5) ||
        (rating === '4.5 - 4.0' && wine.rating >= 4.0 && wine.rating < 4.5) ||
        (rating === '4.0 - 3.5' && wine.rating >= 3.5 && wine.rating < 4.0) ||
        (rating === '3.5 - 3.0' && wine.rating >= 3.0 && wine.rating < 3.5);

      return matchesType && matchesPrice && matchesRating;
    });

    setFilteredWineList(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchWineData = async () => {
      try {
        const response = await fetch('/api/wines');
        if (!response.ok) {
          throw new Error('Failed to fetch wine data');
        }
        const data: Wine[] = await response.json();
        setWineList(data);
        setFilteredWineList(data);
        setRecommendedWines(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching wine data:', error);
      }
    };

    fetchWineData();
  }, []);

  useEffect(() => {
    const filtered = wineList.filter(wine => {
      const matchesSearch = wine.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });

    setFilteredWineList(filtered);
  }, [searchQuery, wineList]);

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        {/* 추천 와인 슬라이더 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">이번 달 추천 와인</h2>
          <WineSlider wines={recommendedWines} />
        </div>

        {/* 검색창 */}
        <div className="mb-8">
          <SearchBar value={searchQuery} onSearch={handleSearch} placeholder="와인을 검색해 보세요" />
        </div>

        {/* 와인 필터 */}
        <WineFilter onFilterChange={handleFilterChange} />

        {/* 와인 리스트 */}
        <div className="mt-8">
          {filteredWineList.length > 0 ? <WineList wines={filteredWineList} /> : <p className="text-center text-gray-500">검색 결과가 없습니다.</p>}
        </div>
      </div>
    </main>
  );
};

export default Page;
