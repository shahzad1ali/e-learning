'use client';

import React from 'react';
import AdminProtected from '../../hooks/adminProtected';
import Heading from '../../utils/Heading';
import AdminSidebar from '../sidebar/AdminSidebar';
import { useTheme } from 'next-themes';
import DashboardHeader from '../sidebar/DashboardHeader';
import AllInvoices from '@/app/components/Admin/Order/AllInvoices';

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
          className={`flex h-screen ${
            isDark ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>

          <div className="w-[85%]">
            <DashboardHeader />
            <AllInvoices />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;














// 'use client'

// import React from 'react'
// import AdminProtected from '../../hooks/adminProtected';
// import Heading from '../../utils/Heading';
// import AdminSidebar from '../sidebar/AdminSidebar';
// import { useTheme } from 'next-themes';
// import DashboardHeader from '../sidebar/DashboardHeader';
// import AllInvoices from '@/app/components/Admin/Order/AllInvoices';



// type Props = {}

// const page = (props: Props) => {
//       const {theme} = useTheme();
//      const isDark = theme === "dark";


//   return (
//      <div>
//           <AdminProtected>
//              <Heading 
//             title="ELearning - Admin"
//             description="ELearning is a platform for students to learn and get help from teachers"
//             keyword="Programming,MERN,Redux,Machine Learning"
//           />
          
//           <div className={`flex h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//             <div className="1500px:w-[16%] w-1/5">
//               <AdminSidebar />
//             </div>
            
//             <div className="w-[85%]">
//               <DashboardHeader />
//               <AllInvoices />
//             </div>
//           </div>
//           </AdminProtected>
//          </div>
//   )
// }

// export default page