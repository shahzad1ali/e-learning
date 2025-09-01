import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

export const navItemsData = [
  { name: 'Home', url: '/' },
  { name: 'Courses', url: '/courses' },
  { name: 'About', url: '/about' },
  { name: 'Policy', url: '/policy' },
  { name: 'FAQ', url: '/faq' },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  closeSidebar?: () => void;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile, closeSidebar }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMobileClick = (url: string) => {
    router.push(url);
    if (closeSidebar) closeSidebar();
  };

  const getLinkStyle = (index: number) => {
    const base = 'text-[18px] font-Poppins transition-colors duration-300';
    const active = 'text-[#37a39a] font-medium';
    const inactive =
      mounted && theme === 'dark' ? 'text-white' : 'text-black';

    return `${index === activeItem ? active : inactive} ${base}`;
  };

  if (!mounted) return null; // prevent mismatch by delaying rendering

  return (
    <>
      {!isMobile && (
        <div className="flex">
          {navItemsData.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={getLinkStyle(index) + ' px-6'}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {isMobile && (
        <div className="mt-5 space-y-5">
          {navItemsData.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMobileClick(item.url)}
              className={`${index === activeItem
                ? 'text-[#37a39a]'
                : mounted && theme === 'dark'
                ? 'text-white'
                : 'text-black'
              } text-[18px] text-center cursor-pointer font-Poppins font-400 transition-colors duration-300`}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
