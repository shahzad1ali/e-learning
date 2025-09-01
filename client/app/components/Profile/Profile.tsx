'use client';
import React, { FC, useEffect, useState } from 'react';
import SideBarProfile from './SideBarProfile';
import { useTheme } from 'next-themes';
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword"
import CourseCard from '../Course/CourseCard';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [courses,setCourses] = useState([]);
  const { data,isLoading } = useGetUsersAllCoursesQuery(undefined, {})
  const { theme } = useTheme();
  const isDark = theme === 'dark';
    const [logout,setLogout] = useState(false);
  const {} = useLogOutQuery(undefined,{
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses.map((userCourse: any) => data.courses.find((course: any) => course._id === userCourse._id)).filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  return (
    <div className={`w-[100%] flex pl-30 mx-auto pt-6  ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      } `}>
      <div
        className={`800px:w-[60px] 400px:w-[20px] w-[30%] mt-[70px] h-[410px] rounded-2xl ${ theme === "dark"  ? 'bg-slate-900 border-[#ffffff1d] shadow-sm'
            : 'bg-white border-[#00000014] shadow-xl' }`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          logOutHandler={logOutHandler}
          setActive={setActive}
        />
       
      </div>
      <div className="w-[100%]">
       {
          active === 1 && (
            <div className="w-full h-full bg-transparent mt-[40px]">
                          <ProfileInfo avatar={avatar} user={user} />
            </div>
          )
        }
         {
          active === 2 && (
            <div className="w-full h-full bg-transparent mt-[40px]">
                          <ChangePassword />
            </div>
          )
        }
           {
          active === 3 && (
            <div className="w-full h-full pl-7 px-2 800px:pl-8 bg-transparent mt-[40px]">
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] ">
             {
              courses && courses.map((item: any,index: number) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))}
              </div>
              {courses.length === 0 && (
                <h1 className="text-center text-[19px] font-bold">
                  You don't have any purchased courses!
                </h1>
              )}
                          <ChangePassword />
            </div>
          )
        }
      </div>
      
    </div>
  );
};

export default Profile;
