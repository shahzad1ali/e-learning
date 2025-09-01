'use client';
import React from 'react';
import Heading from '../utils/Heading';
import AdminSidebar from '../admin/sidebar/AdminSidebar';
import AdminProtected from '../hooks/adminProtected';
import DashboardHero from '../admin/sidebar/DashboardHero';
import { useTheme } from 'next-themes';

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

        <div
          className={`flex h-[200vh] ${
            isDark ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>

          <div className="w-[85%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
















// 'use client';
// import React from 'react';
// import Heading from '../utils/Heading';
// import AdminSidebar from '../admin/sidebar/AdminSidebar'
// import AdminProtected from '../hooks/adminProtected';
// import DashboardHero from '../admin/sidebar/DashboardHero'
// import { useTheme } from 'next-themes';

// type Props = {}

// const Page = (props: Props) => {
//    const { theme } = useTheme();
//   const isDark = theme === "dark";
//   return (
//     <div>
//       <AdminProtected>
//          <Heading 
//         title="ELearning - Admin"
//         description="ELearning is a platform for students to learn and get help from teachers"
//         keyword="Programming,MERN,Redux,Machine Learning"
//       />
      
//       <div className={`flex h-[200vh] ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//         <div className="1500px:w-[16%] w-1/5">
//           <AdminSidebar />
//         </div>
        
//         <div className="w-[85%]">
//           <DashboardHero isDashboard={true} />
//         </div>
//       </div>
//       </AdminProtected>
//      </div>
//   );
// }

// export default Page;
