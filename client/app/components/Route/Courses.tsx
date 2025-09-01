import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import React from 'react';
import CourseCard from '../Course/CourseCard';
import { useTheme } from 'next-themes';

interface Thumbnail {
  url?: string;
}

interface Lecture {
  title?: string;
  duration?: number;
}

interface Course {
  _id: string;
  name?: string;
  thumbnail?: Thumbnail;
  ratings?: number;
  purchased?: number;
  price?: number;
  estimatedPrice?: number;
  courseData?: Lecture[];
}

const Courses: React.FC = () => {
  const {theme} = useTheme();
  const isDark = theme === 'dark'
  const { data, isLoading, isError } = useGetUsersAllCoursesQuery({});
  const courses: Course[] = data?.courses ?? [];

  if (isLoading) return <div className="text-center py-10">Loading courses...</div>;
  if (isError) return <div className="text-center py-10 text-red-600">Failed to load courses.</div>;

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`w-[90%] text-center justify-center pt-32 800px:w-[80%] m-auto ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h1 className={`*:text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          Expand Your Career <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-500 hover:from-purple-600 hover:to-blue-500">
  Opportunity
</span>
 <br />
          Opportunity With Our Courses
        </h1>
        <br />
        <br />
        <div className={`p-6 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          {courses.map((item) => (
            <CourseCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
