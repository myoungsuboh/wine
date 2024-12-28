'use client';

import {InputHTMLAttributes} from 'react';
import Search from './Search';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (query: string) => void;
}

export default function SearchBar({onSearch, ...inputProps}: SearchBarProps) {
  const handleSearch = () => {
    const query = String(inputProps.value || '').trim(); // value가 undefined인 경우 빈 문자열로 처리

    if (query) {
      onSearch(query);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-between items-center p-[0.875rem] px-[0.9375rem] tablet:px-[1.25rem] gap-[0.625rem] w-full tablet:w-[24.75rem] pc:w-[50rem] h-[2.375rem] tablet:h-[3rem] bg-white border-[1px] border-gray-300 rounded-full">
      <Search />
      <input
        className="flex-grow text-lg font-regular placeholder:text-gray-500 focus:outline-none"
        onKeyDown={handleKeyPress}
        onChange={inputProps.onChange}
        value={inputProps.value || ''}
        {...inputProps}
      />
    </div>
  );
}
