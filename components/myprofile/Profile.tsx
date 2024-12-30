import { patchUser, uploadImg } from "@/service/api";
import { useAuthStore } from "@/service/authStore";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Profile() {
  const defImgSrc = 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/543/1735460535719/skeleton-user.png';
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setUser, user } = useAuthStore();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsFileSelected(true);
    }
  };

  const handleUserDataChange = async () => {
    try {
      let imageUrl = user?.image;
      if (selectedFile) {
        const uploadResponse = await uploadImg(selectedFile);
        imageUrl = uploadResponse;
        console.log('Uploaded image URL:', uploadResponse);
      }
      
      const imageToUse = String(imageUrl).includes('http') ? imageUrl : defImgSrc;
      console.log('Image URL to be used:', imageToUse);
      
      const response = await patchUser({ 
        image: imageToUse,
        nickname: inputValue || user?.nickname || '' 
      });

      if (response) {
        setUser({
          id: response.id,
          email: response.email,
          image: response.image,
          nickname: response.nickname,
        });

        console.log('User updated successfully');
        setIsFileSelected(false);
        setSelectedFile(null);
        setInputValue('');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  return (
    <div className="profileBox lg:w-[280px] lg:h-[530px] md:w-full md:h-[247px] w-full h-[241px] border rounded-lg p-5 md:px-10 md:py-6 lg:p-5 shadow-sm bg-white ">
      <div className="flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row lg:flex-col items-center">
          <div className="flex flex-row md:flex-row lg:flex-col items-center w-full">
            <div 
              className="relative lg:w-40 lg:h-40 md:w-20 md:h-20 w-[60px] h-[60px] rounded-full overflow-hidden aspect-square lg:mt-5 cursor-pointer"
              onClick={handleImageClick}
            >
              {isFileSelected ? (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-green-500 text-4xl">✓</span>
                </div>
              ) : (
                <Image
                  src={user?.image || '/default-profile.svg'}
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 60px, (max-width: 1024px) 80px, 164px"
                  className="object-cover"
                  priority
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div className="flex flex-col ml-4 md:ml-4 lg:ml-0 lg:mt-5 lg:text-center">
              <div className="text-lg font-bold text-gray-800 md:mt-0 lg:mt-4">
                {user?.nickname}
              </div>
              <div className="text-lg font-medium text-gray-500 mt-1 md:mt-0 lg:mt-2">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:mt-12 w-full md:mt-6 mt-4">
          <div className="text-lg font-medium text-gray-800">닉네임</div>
          <div className="w-full max-w-full flex flex-col md:flex-row lg:flex-col gap-2">
            <input
              placeholder={user?.nickname}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 min-w-0 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleUserDataChange}
              className="rounded-xl bg-[#6A42DB] text-white shrink-0 ml-auto
              lg:w-24 lg:h-[42px]
              md:w-[116px] md:h-[42px]
              w-[89px] h-[42px]"
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}