'use client';
import React, {useState} from 'react';
import {Box} from '@mui/material';
import Modal from '@/components/common/Modal';
import ContentBox from '@/components/common/ContentBox';
import Button from '@/components/common/Button';
import SearchBar from '@/components/common/SearchBar';
import StarRating from '@/components/common/StarRating';
import Slider from '@/components/common/Slider';
import InputWithLabel from '@/components/common/InputWithLabel';

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
  const [query, setQuery] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>('');

  const handleOpenModal = () => {
    setModalStatus(true);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (query: string) => {
    console.log('검색어: ', query);
    setSearchResult(query);
  };

  const handleSliderChange = (e: React.SyntheticEvent | Event, value: number | number[]) => {
    console.log(`slider - ${value}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (!inputValue) {
      setEmailError('이메일을 입력하세요');
    } else {
      setEmailError('');
    }
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
          <SearchBar value={query} onChange={handleSearchInputChange} placeholder="와인을 검색해보세요" onSearch={handleSearch} />
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
        <li>
          <Box className="w-full h-100">
            <Slider style={{width: '30.688rem', height: '0.5rem', margin: 10}} defaultValue={50} min={0} max={100} onChange={handleSliderChange} />
          </Box>
        </li>
        <li>
          <InputWithLabel
            label="이메일"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="이메일 입력"
            type="email"
            error={emailError}
            wrapperClassName="gap-10pxr"
            inputClassName="h-[42px] tablet:h-[48px] w-[303px] tablet:w-[400px]"
          />
        </li>
      </ul>
    </>
  );
}
