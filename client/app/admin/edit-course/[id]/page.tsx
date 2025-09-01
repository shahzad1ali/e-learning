"use client"
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminSidebar from '../../sidebar/AdminSidebar'
import DashboardHeader from '../../sidebar/DashboardHeader'
import EditCourse from "../../../components/Admin/Course/EditCourse"
import { useTheme } from 'next-themes'

const Page = ({ params }: any) => {
  // unwrap params
  const { id } = React.use(params);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div>
      <Heading 
        title="ELearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keyword="Programming,MERN,Redux,Machine Learning"
      />
      <div className={`flex ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  )
}

export default Page;
















// "use client"
// import Heading from '@/app/utils/Heading'
// import React from 'react'
// import AdminSidebar from '../../sidebar/AdminSidebar'
// import DashboardHeader from '../../sidebar/DashboardHeader'
// import EditCourse from "../../../components/Admin/Course/EditCourse"
// import { useTheme } from 'next-themes'
// type Props = {}

// const page = ({params}: any) => {
//     const id = params?.id;
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
//             {/* <CreateCourse /> */}
//             <EditCourse id={id} />
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default page



