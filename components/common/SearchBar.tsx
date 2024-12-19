'use client';

import {useState} from 'react';
// import Image from 'next/image';
import Search from './search';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({placeholder, onSearch}: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
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
        type="text"
        className="flex-grow text-lg font-regular placeholder:text-gray-500 focus:outline-none"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
