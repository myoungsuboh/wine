'use client';
import React, {useState} from 'react';
import {Box} from '@mui/material';
import Modal from '@/components/common/modal';
import ContentBox from '@/components/common/ContentBox';
import Button from '@/components/common/Button';
import SearchBar from '@/components/common/searchBar';
import StarRating from '@/components/common/starRating';

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  bgcolor: '#FFFFFF',
  p: 4,
  borderRadius: '16px',
};

export default function TestComponent() {
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string>('');

  const handleOpenModal = () => {
    setModalStatus(true);
  };

  const handleSearch = (query: string) => {
    console.log('검색어: ', query);
    setSearchResult(query);
  };

  return (
    <>
      Component 페이지 입니다.
      <br />
      <ul>
        <li>
          <Button style={{borderRadius: '9999px', backgroundColor: '#6A42DB'}} onClick={handleOpenModal}>
            Modal Open
          </Button>
          <Modal open={modalStatus} onClose={() => setModalStatus(false)}>
            <Box sx={modalBoxStyle}>모달 테스트입니다.</Box>
          </Modal>
        </li>
        <li>
          <div className="text-lg font-semibold">
            <p>폰트 테스트</p>
          </div>
          <div className="bg-gray-100 text-purple-100 text-lg font-medium">색상 테스트</div>
        </li>
        <li>
          <ContentBox>
            <div className="p-10 w-full pc:w-[50rem] h-auto">컨텐츠 박스 테스트입니다.</div>
          </ContentBox>
        </li>
        <li className="w-[37.5rem] m-[1.25rem]">
          <SearchBar placeholder="와인을 검색해보세요" onSearch={handleSearch} />
          <p>검색어: {searchResult}</p>
        </li>
        <li>
          <StarRating
            value={4.5}
            text="Sentinel Carbernet Sauvignon 2016"
            layout="column"
            starSize="24px"
            containerClassName="w-[120px] gap-4"
            textClassName="text-5xl"
          />
          <StarRating
            value={3.3}
            text="47개의 후기"
            layout="row"
            starSize="14"
            containerClassName="gap-4"
            textClassName="text-3xl"
            descriptionClassName="text-xs"
          />
        </li>
      </ul>
    </>
  );
}
