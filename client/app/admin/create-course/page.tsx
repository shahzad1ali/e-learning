  'use client';
import React from 'react';
import Heading from '@/app/utils/Heading';
import AdminSidebar from '../sidebar/AdminSidebar';
import DashboardHeader from '../sidebar/DashboardHeader';
import CreateCourse from '../../components/Admin/Course/CreateCourse';
import { useTheme } from 'next-themes';

const Page = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div>
      <Heading
        title="ELearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keyword="Programming,MERN,Redux,Machine Learning"
      />
      <div className={`flex ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default Page;




















// "use client"
// import Heading from '@/app/utils/Heading'
// import React from 'react'
// import AdminSidebar from '../sidebar/AdminSidebar'
// import DashboardHeader from '../sidebar/DashboardHeader'
// import CreateCourse from "../../components/Admin/Course/CreateCourse"
// import { useTheme } from 'next-themes'
// type Props = {}

// const page = (props: Props) => {
//      const { theme } = useTheme();
//   const isDark = theme === "dark";
//   return (
//     <div>
//          <Heading 
//         title="ELearning - Admin"
//         description="ELearning is a platform for students to learn and get help from teachers"
//         keyword="Programming,MERN,Redux,Machine Learning"
//       />
//       <div className={`flex ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//         <div className="1500px:w-[16%] w-1/5">
//         <AdminSidebar />
//         </div>
//         <div className="w-[85%]">
//             <DashboardHeader />
//             <CreateCourse />
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default page