import Image from 'next/image';
import bannerImage from '@/public/banner.png';
import bannerImageMobile from '@/public/banner_m.png';
import sectionImage1 from '@/public/section1.png';
import sectionImage2 from '@/public/section2.png';
import sectionImage3 from '@/public/section3.png';
import sectionImage1Mobile from '@/public/section1_m.png';
import sectionImage2Mobile from '@/public/section2_m.png';
import sectionImage3Mobile from '@/public/seciton3_m.png';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-6 pc:mt-20">
        <Image src={bannerImageMobile} alt="banner" className="tablet:hidden" />
        <Image src={bannerImage} alt="banner" className="hidden tablet:block" />
      </div>
      <div className="flex flex-col mt-12 justify-center items-center gap-12 tablet:gap-24 tablet:mt-20 pc:mt-40">
        <Image src={sectionImage1Mobile} alt="section1" className="tablet:hidden" />
        <Image src={sectionImage1} alt="section1" className="hidden tablet:block" />
        <Image src={sectionImage2Mobile} alt="section2" className="tablet:hidden" />
        <Image src={sectionImage2} alt="section2" className="hidden tablet:block" />
        <Image src={sectionImage3Mobile} alt="section3" className="tablet:hidden" />
        <Image src={sectionImage3} alt="section3" className="hidden tablet:block" />
      </div>
    </div>
  );
}
