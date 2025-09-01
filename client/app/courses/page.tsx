'use client'
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react'
import Loader from '../components/Loader/Loader';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import { useTheme } from 'next-themes';
import CourseCard from '../components/Course/CourseCard';
import { styles } from '../styles/style';
import Footer from '../components/Footer';

type Props = Record<string, never>

const CoursesContent = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark'
  const searchParams = useSearchParams();
  const search = searchParams?.get('title');
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined);
  const { data: categoriesData } = useGetHeroDataQuery("Categories");
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  console.log(categoriesData);
  

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {
        isLoading ? (
          <Loader />
        ) : (
          <>
            <Header
              route={route}
              setRoute={setRoute}
              open={open}
              setOpen={setOpen}
              activeItem={1}
            />
            <div className={`w-[95%] mt-7 lg:mt-20 800px:w-[85%] m-auto min-h-[70vh] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <Heading 
                title={`All Courses - Elearning`}
                description="ELearning is a programing community,"
                keyword="Programing,Coding,Skills,Redux,MERN,Machine ,groth"
              />  
              <br />
              <div className={`w-full flex items-center flex-wrap ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                  className={`h-[35px] ${
                    category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                  } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                  onClick={() => setCategory("All")}
                >
                  All
                </div>
                {categories &&
                  categories.map((item: any, index: number) => (
                    <div key={index}>
                      <div
                        className={`h-[35px] ${
                          category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"
                        } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                        onClick={() => setCategory(item.title)} >
                        {item.title}
                      </div>
                    </div>
                  ))}
              </div>
              {courses && courses.length === 0 && (
                <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                  {search ? "No courses found!" : "No courses found in this category. Please try another one!"}
                </p>
              )}
              <br />
              <br />
              <div className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {courses &&
                  courses.map((item: any, index: number) => (
                    <CourseCard item={item} key={index} />
                  ))}
              </div>
            </div>
            <Footer />
          </>
        )
      }
    </div>
  );
}

const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CoursesContent />
    </Suspense>
  );
};

export default Page