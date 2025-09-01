'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from 'recharts';
import Loader from '../../Loader/Loader';
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { styles } from '@/app/styles/style';
import { useTheme } from 'next-themes';

// Define the type for analytics data
interface AnalyticsData {
  name: string;
  uv: number;
}

const CourseAnalytics = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  // Initialize analyticsData with specific type
  const analyticsData: AnalyticsData[] = data
    ? data.courses.last12Months.map((item: { month: string; count: number }) => ({
        name: item.month,
        uv: item.count,
      }))
    : [];

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`h-screen ${isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'}`}>
          <div className={`mt-[30px] ${isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'}`}>
            <h1
              className={`${styles.title} ${
                isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'
              } px-5 !text-start`}
            >
              Courses Analytics
            </h1>
            <p
              className={`${styles.label} ${
                isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'
              } px-5`}
            >
              Last 12 months analytics data
            </p>
          </div>

          <div className="w-full h-[90%] pb-10 flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, 'auto']} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;















// import React from "react";
// import {
//   BarChart,
//   Bar,
//   ResponsiveContainer,
//   XAxis,
//   Label,
//   YAxis,
//   LabelList,
// } from "recharts";
// import Loader from "../../Loader/Loader";
// import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
// import { styles } from "@/app/styles/style";
// import { useTheme } from "next-themes";

// type Props = {};

// const CourseAnalytics = (props: Props) => {
//     const {theme} = useTheme();
//     const isDark = theme === "dark";

//   const { data, isLoading } = useGetCoursesAnalyticsQuery({});

//   // const analyticsData = [
//   //     { name: 'Jun 2023', uv: 3 },
//   //     { name: 'July 2023', uv: 2 },
//   //     { name: 'August 2023', uv: 5 },
//   //     { name: 'Sept 2023', uv: 7 },
//   //     { name: 'October 2023', uv: 2 },
//   //     { name: 'Nov 2023', uv: 5 },
//   //     { name: 'December 2023', uv: 7 },
//   //   ];

//   const analyticsData: any = [];

//   data &&
//     data.courses.last12Months.forEach((item: any) => {
//       analyticsData.push({ name: item.month, uv: item.count });
//     });

//   const minValue = 0;

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className={`h-screen ${isDark ? "bg-[#111C43] text-white" : "bg-white text-black"}`}>
//           <div className={`mt-[30px] ${isDark ? "bg-[#111C43] text-white" : "bg-white text-black"}`}>
//             <h1 className={`${styles.title} ${isDark ? "bg-[#111C43] text-white" : "bg-white text-black"} px-5 !text-start`}>
//               Courses Analytics
//             </h1>
//             <p className={`${styles.label} ${isDark ? "bg-[#111C43] text-white" : "bg-white text-black"} px-5`}>
//               Last 12 months analytics data{" "}
//             </p>
//           </div>

//           <div className="w-full h-[90%] pb-10 flex items-center justify-center">
//             <ResponsiveContainer width="90%" height="50%">
//               <BarChart width={150} height={300} data={analyticsData}>
//                 <XAxis dataKey="name">
//                   <Label offset={0} position="insideBottom" />
//                 </XAxis>
//                 <YAxis domain={[minValue, "auto"]} />
//                 <Bar dataKey="uv" fill="#3faf82">
//                   <LabelList dataKey="uv" position="top" />
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CourseAnalytics;