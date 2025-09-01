'use client';

import React from 'react';
import Heading from '../../utils/Heading';
import AdminSidebar from '../sidebar/AdminSidebar';
import OrdersAnalytics from '../../components/Admin/Analytics/OrdersAnalytics';
import { useTheme } from 'next-themes';
import DashboardHeader from '../sidebar/DashboardHeader';

const OrdersAnalyticsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div>
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
          <OrdersAnalytics />
        </div>
      </div>
    </div>
  );
};

export default OrdersAnalyticsPage;












// 'use client'

// import React from 'react'
// import Heading from '../../utils/Heading';
// import AdminSidebar from '../sidebar/AdminSidebar';
// import OrdersAnalytics from '../../components/Admin/Analytics/OrdersAnalytics';
// import { useTheme } from 'next-themes';
// import DashboardHeader from '../sidebar/DashboardHeader';



// type Props = {}

// const page = (props: Props) => {
//       const {theme} = useTheme();
//      const isDark = theme === "dark";


//   return (
//      <div>
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
//               <OrdersAnalytics />
//             </div>
//           </div>
//          </div>
//   )
// }

// export default page