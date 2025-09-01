import Ratings from '@/app/utils/Ratings';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useMemo } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';

interface Thumbnail {
  url?: string;
}

interface Lecture {
  title?: string;
  duration?: number;
}

export interface Course {
  _id: string;
  name?: string;
  thumbnail?: Thumbnail;
  ratings?: number;
  purchased?: number;
  price?: number;
  estimatedPrice?: number;
  courseData?: Lecture[];
}

type Props = {
  item: Course;
  isProfile?: boolean;
};

const formatPrice = (n?: number) => {
  if (n == null) return '—';
  return `${n.toFixed(2)}$`;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const href = !isProfile ? `/course/${item._id}` : `/course-access/${item._id}`;
  const thumbnailSrc = item.thumbnail?.url ?? '/placeholder.png';

  // compute discount percent if applicable
  const discountLabel = useMemo(() => {
    if (
      item.price != null &&
      item.estimatedPrice != null &&
      item.estimatedPrice > 0 &&
      item.price < item.estimatedPrice
    ) {
      const diff = item.estimatedPrice - item.price;
      const percent = Math.round((diff / item.estimatedPrice) * 100);
      return `${percent}% OFF`;
    }
    return null;
  }, [item.price, item.estimatedPrice]);

  if (!item || !item._id) return null;

  return (
    <Link href={href} className={`block ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`w-full min-h-[54vh] relative overflow-hidden rounded-lg bg-white dark:bg-slate-800 border border-[#00000015] dark:border-[#ffffff1d] shadow-sm hover:shadow-md transition-transform duration-150 ease-in-out hover:scale-[1.01] p-3 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        {/* optional badge */}
        {discountLabel && (
          <div className={`absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] font-semibold px-2 py-1 rounded ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {discountLabel}
          </div>
        )}
        <div className={`w-full h-[160px] relative `}>
          <Image
            src={thumbnailSrc}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-md"
            alt={item.name ?? 'course thumbnail'}
            sizes="(max-width: 768px) 100vw, 500px"
            priority={false}
          />
        </div>
        <div className={`mt-3 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <h1 className={`font-Poppins text-[16px] font-semibold text-black dark:text-[#fff] line-clamp-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {item.name ?? 'Untitled Course'}
          </h1>
          <div className={`flex items-center justify-between mt-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className={`flex items-center gap-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <Ratings rating={item.ratings ?? 0} />
            </div>
            <h5
              className={`text-sm text-black dark:text-[#fff] ${isDark ? 'bg-black text-white' : 'bg-white text-black'} ${
                isProfile ? 'hidden 800px:inline' : ''
              }`}
            >
              {item.purchased != null ? item.purchased : 0} Students
            </h5>
          </div>
          <div className={`flex items-center justify-between mt-3 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className={`flex items-baseline gap-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <div className= {`text-lg font-bold text-black dark:text-[#fff] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {item.price === 0
                  ? 'free'
                  : item.price != null
                  ? formatPrice(item.price)
                  : '—'}
              </div>
              {item.estimatedPrice != null && item.price != null && item.estimatedPrice > item.price && (
                <div className={`text-[12px] line-through opacity-80 text-black dark:text-[#fff] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  {formatPrice(item.estimatedPrice)}
                </div>
              )}
            </div>
            <div className={`flex items-center gap-1 text-sm text-black dark:text-[#fff] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <AiOutlineUnorderedList size={18} />
              <span>
                {item.courseData?.length != null ? item.courseData.length : 0} Lectures
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
