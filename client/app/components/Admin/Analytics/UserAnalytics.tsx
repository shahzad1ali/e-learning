'use client';
import { styles } from '@/app/styles/style';
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Loader from '../../Loader/Loader';
import { useTheme } from 'next-themes';

// Define the type for each item in last12Months
interface UserAnalyticsItem {
  month: string;
  count: number;
}

// Define the type for analytics data used in the chart
interface AnalyticsData {
  name: string;
  count: number;
}

interface Props {
  isDashboard?: boolean;
}

const UserAnalytics = ({ isDashboard }: Props) => {
  const { resolvedTheme, theme } = useTheme();
  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: AnalyticsData[] = data?.users?.last12Months
    ? data.users.last12Months.map((item: UserAnalyticsItem) => ({
        name: item.month,
        count: item.count,
      }))
    : [];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'
      } ${!isDashboard ? 'py-6 px-4' : 'p-0'}`}
    >
      {isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col flex-grow">
          <div
            className={`mb-4 flex flex-col ${
              isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'
            } ${isDashboard ? 'pl-8' : 'pl-10'} space-y-1`}
          >
            <h1
              className={`${styles.title} ${
                isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'
              } !text-start ${isDashboard ? '!text-[20px]' : ''}`}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p
                className={`${styles.label} ${
                  isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'
                }`}
              >
                Last 12 months analytics data
              </p>
            )}
          </div>

          <div className="flex-grow mt-14 flex items-center justify-center px-4">
            <div
              className={`w-full max-w-[1000px] ${
                isDashboard ? 'h-[calc(70vh-70px)]' : 'h-[350px]'
              }`}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fill: isDark ? '#fff' : '#000' }}
                    stroke={isDark ? '#fff' : '#000'}
                  />
                  <YAxis
                    tick={{ fill: isDark ? '#fff' : '#000' }}
                    stroke={isDark ? '#fff' : '#000'}
                  />
                  <Tooltip
                    wrapperStyle={{
                      background: isDark ? '#1f2a55' : '#fff',
                      color: isDark ? '#fff' : '#000',
                      borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#4d62d9"
                    fill="#4d62d9"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
















// import { styles } from "@/app/styles/style";
// import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
// import React from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import Loader from "../../Loader/Loader";
// import { useTheme } from "next-themes";

// type Props = {
//   isDashboard?: boolean;
// };

// const UserAnalytics = ({ isDashboard }: Props) => {
//   const { resolvedTheme, theme } = useTheme();
//   // when using next-themes, resolvedTheme is safer for the actual applied theme
//   const isDark = resolvedTheme === "dark" || theme === "dark";

//   const { data, isLoading } = useGetUsersAnalyticsQuery({});

//   const analyticsData: { name: string; count: number }[] = [];

//   if (data && data.users && Array.isArray(data.users.last12Months)) {
//     data.users.last12Months.forEach((item: any) => {
//       analyticsData.push({ name: item.month, count: item.count });
//     });
//   }

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${
//         isDark ? "bg-[#111C43] text-white" : "bg-white text-black"
//       } ${!isDashboard ? "py-6 px-4" : "p-0"}`}
//     >
//       {isLoading ? (
//         <div className="flex-grow flex items-center justify-center">
//           <Loader />
//         </div>
//       ) : (
//         <div className="flex flex-col flex-grow">
//           <div
//             className={`mb-4 flex flex-col ${isDark ? "bg-[#111C43] text-white" : "bg-white text-black"} ${
//               isDashboard ? "pl-8" : "pl-10"
//             } space-y-1`}
//           >
//             <h1
//               className={`${styles.title} ${isDark ? "bg-[#111C43] text-white" : "bg-white text-black"} !text-start ${
//                 isDashboard ? "!text-[20px]" : ""
//               }`}
//             >
//               Users Analytics
//             </h1>
//             {!isDashboard && (
//               <p className={`${styles.label} ${isDark ? "bg-[#111C43] text-white" : "bg-white text-black"}`}>
//                 Last 12 months analytics data
//               </p>
//             )}
//           </div>

//           <div className="flex-grow mt-14 flex items-center justify-center px-4">
//             {/* Give parent a defined height so ResponsiveContainer can fill it */}
//             <div
//               className={`w-full max-w-[1000px] ${
//                 isDashboard ? "h-[calc(70vh-70px)]" : "h-[350px]"
//               }`}
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart
//                   data={analyticsData}
//                   margin={{
//                     top: 20,
//                     right: 30,
//                     left: 0,
//                     bottom: 0,
//                   }}
//                 >
//                   <XAxis
//                     dataKey="name"
//                     tick={{ fill: isDark ? "#fff" : "#000" }}
//                     stroke={isDark ? "#fff" : "#000"}
//                   />
//                   <YAxis
//                     tick={{ fill: isDark ? "#fff" : "#000" }}
//                     stroke={isDark ? "#fff" : "#000"}
//                   />
//                   <Tooltip
//                     wrapperStyle={{
//                       background: isDark ? "#1f2a55" : "#fff",
//                       color: isDark ? "#fff" : "#000",
//                       borderRadius: 6,
//                       border: "1px solid rgba(0,0,0,0.1)",
//                     }}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="count"
//                     stroke="#4d62d9"
//                     fill="#4d62d9"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserAnalytics;
