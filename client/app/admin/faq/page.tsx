'use client';
import React from 'react';
import Heading from '../../utils/Heading';
import AdminSidebar from '../sidebar/AdminSidebar';
import { useTheme } from 'next-themes';
import AdminProtected from '../../hooks/adminProtected';
import DashboardHero from '../sidebar/DashboardHero';
import EditFaq from '../../components/Admin/Customization/EditFaq';

const Page = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div>
      <AdminProtected>
        <Heading
          title="ELearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keyword="Programming,MERN,Redux,Machine Learning"
        />
        <div className={`flex h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <EditFaq />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;








// 'use client'

// import Heading from '../../utils/Heading'
// import React from 'react'
// import AdminSidebar from '../sidebar/AdminSidebar'
// import { useTheme } from 'next-themes'
// import AdminProtected from '../../hooks/adminProtected'
// import DashboardHero from '../sidebar/DashboardHero'
// import EditFaq from "../../components/Admin/Customization/EditFaq"


// type Props = {}

// const page = (props: Props) => {
//       const { theme } = useTheme();
//       const isDark = theme === "dark";
//   return (
//     <div>
//         <AdminProtected>
//       <Heading 
//         title="ELearning - Admin"
//         description="ELearning is a platform for students to learn and get help from teachers"
//         keyword="Programming,MERN,Redux,Machine Learning"
//       />
//       <div className={`flex h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//         <div className="1500px:w-[16%] w-1/5">
//           <AdminSidebar />
//         </div>
//         <div className="w-[85%]">
//           <DashboardHero />
//           <EditFaq />
//         </div>
//       </div>
//       </AdminProtected>
//     </div>
//   )
// }

// export default page