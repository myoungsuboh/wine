import React, {useState} from 'react';

const tagOptions = [
  '체리',
  '베리',
  '오크',
  '바닐라',
  '후추',
  '제빵',
  '풀',
  '사과',
  '복숭아',
  '시트러스',
  '트로피컬',
  '미네랄',
  '꽃',
  '담뱃잎',
  '흙',
  '초콜릿',
  '스파이스',
  '카라멜',
  '가죽',
];

const TagSelector: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 태그 선택 핸들러
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
      {/* 제목 */}
      <h2 className="text-lg font-bold mb-4">기억에 남는 향이 있나요?</h2>

      {/* 태그 선택 영역 */}
      <div className="flex flex-wrap gap-2">
        {tagOptions.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-1 text-sm rounded-full border ${
              selectedTags.includes(tag) ? 'bg-purple-700 text-white' : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
