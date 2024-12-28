import React from 'react';

interface DropDownProps {
  buttons: {
    name: string;
    onClick: () => void;
  }[];
}

export default function DropDown({ buttons }: DropDownProps) {
  return (
    <div className="absolute right-0 mt-2 bg-white rounded-2xl border border-[#CFDBEA] p-1
      w-[101px] h-auto md:w-[126px]">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="w-full flex items-center justify-center text-[#2D3034] hover:bg-[#F1EDFC] hover:text-[#6A42DB] rounded-xl
            h-[40px] md:h-[46px] p-4"
        >
          {button.name}
        </button>
      ))}
    </div>
  );
}