'use client';
import React, {useState} from 'react';
import {Box, Button} from '@mui/material';
import Modal from '@/components/common/modal';
import SearchBar from '@/components/common/searchBar';
import Slider from '@/components/common/Slider';

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

  const handleSliderChange = (e: React.SyntheticEvent | Event, value: number | number[]) => {
    console.log(`slider - ${value}`);
  };

  return (
    <>
      Component 페이지 입니다.
      <br />
      <ul>
        <li>
          <Button onClick={handleOpenModal}>Modal Open</Button>
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
        <li className="w-[37.5rem] m-[1.25rem]">
          <SearchBar placeholder="와인을 검색해보세요" onSearch={handleSearch} />
          <p>검색어: {searchResult}</p>
        </li>
        <li>
          <Box className="w-full h-100">
            <Slider style={{width: '30.688rem', height: '0.5rem', margin: 10}} defaultValue={50} min={0} max={100} onChange={handleSliderChange} />
          </Box>
        </li>
      </ul>
    </>
  );
}
