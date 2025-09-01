'use client';
import { styles } from '@/app/styles/style';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loader from '../../Loader/Loader';
import { useTheme } from 'next-themes';
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { useMemo, useEffect } from 'react';

// Define the type for each item in last12Months
interface OrderAnalyticsItem {
  name?: string;
  month?: string;
  count?: number;
  Count?: number;
  total?: number;
}

// Define the type for analytics data used in the chart
interface AnalyticsData {
  name: string;
  Count: number;
}

interface Props {
  isDashboard?: boolean;
}

export default function OrdersAnalytics({ isDashboard }: Props) {
  const { resolvedTheme, theme } = useTheme();
  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  const { data, isLoading, error } = useGetOrdersAnalyticsQuery({});

  // Debug output: reveal actual shape in console
  useEffect(() => {
    console.group('OrdersAnalytics Debug');
    console.log('Raw API response:', data);
    if (data?.orders?.last12Months) {
      console.log('last12Months array:', data.orders.last12Months);
      const normalizedPreview = data.orders.last12Months.map((item: OrderAnalyticsItem, i: number) => {
        const name = item.name ?? item.month ?? `#${i + 1}`;
        const Count =
          typeof item.count === 'number'
            ? item.count
            : typeof item.Count === 'number'
            ? item.Count
            : typeof item.total === 'number'
            ? item.total
            : null;
        return { original: item, mapped: { name, Count } };
      });
      console.log('Normalized preview:', normalizedPreview);
    } else {
      console.warn('data.orders.last12Months is missing or not an array');
    }
    if (error) {
      console.error('RTK Query error:', error);
    }
    console.groupEnd();
  }, [data, error]);

  const analyticsData = useMemo(() => {
    if (!data?.orders?.last12Months || !Array.isArray(data.orders.last12Months)) {
      return [];
    }

    return data.orders.last12Months.map((item: OrderAnalyticsItem, idx: number) => {
      const name = item.name ?? item.month ?? `#${idx + 1}`;
      let Count: number;

      if (typeof item.count === 'number') {
        Count = item.count;
      } else if (typeof item.Count === 'number') {
        Count = item.Count;
      } else if (typeof item.total === 'number') {
        Count = item.total;
      } else {
        Count = 0;
      }

      return { name, Count };
    });
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'} ${
            isDashboard ? 'h-[30vh]' : 'h-screen'
          }`}
        >
          <div className={isDashboard ? 'mt-0 pl-16 mb-2' : 'mt-1'}>
            <h1
              className={`${styles.title} ${
                isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'
              } ${isDashboard ? '!text-[20px]' : ''} px-5 !text-start`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p
                className={`${styles.label} ${
                  isDark ? 'bg-[#111C43] text-white' : 'bg-white text-black'
                } px-5`}
              >
                Last 12 months analytics data
              </p>
            )}
          </div>

          {(!data || analyticsData.length === 0) && !isLoading ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-center">
                {error
                  ? 'Failed to load orders analytics. See console for details.'
                  : 'No orders analytics data available or format unexpected.'}
              </p>
            </div>
          ) : (
            <div
              className={`w-full ${!isDashboard ? 'h-[90%]' : 'h-full'} flex items-center justify-center`}
            >
              <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={isDashboard ? '100%' : '50%'}>
                <LineChart
                  data={analyticsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
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
                  {!isDashboard && <Legend />}
                  <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </>
  );
}

















// import { styles } from "@/app/styles/style";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import Loader from "../../Loader/Loader";
// import { useTheme } from "next-themes";
// import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
// import React, { useMemo, useEffect } from "react";

// type Props = {
//   isDashboard?: boolean;
// };

// export default function OrdersAnalytics({ isDashboard }: Props) {
//   const { resolvedTheme, theme } = useTheme();
//   const isDark = resolvedTheme === "dark" || theme === "dark";

//   const { data, isLoading, error } = useGetOrdersAnalyticsQuery({});

//   // Debug output: reveal actual shape in console
//   useEffect(() => {
//     console.group("OrdersAnalytics Debug");
//     console.log("Raw API response:", data);
//     if (data?.orders?.last12Months) {
//       console.log("last12Months array:", data.orders.last12Months);
//       const normalizedPreview = data.orders.last12Months.map((item: any, i: number) => {
//         const name = item.name ?? item.month ?? `#${i + 1}`;
//         const Count =
//           typeof item.count === "number"
//             ? item.count
//             : typeof item.Count === "number"
//             ? item.Count
//             : typeof item.total === "number"
//             ? item.total
//             : null;
//         return { original: item, mapped: { name, Count } };
//       });
//       console.log("Normalized preview:", normalizedPreview);
//     } else {
//       console.warn("data.orders.last12Months is missing or not an array");
//     }
//     if (error) {
//       console.error("RTK Query error:", error);
//     }
//     console.groupEnd();
//   }, [data, error]);

//   const analyticsData = useMemo(() => {
//     if (!data?.orders?.last12Months || !Array.isArray(data.orders.last12Months)) {
//       return [];
//     }

//     return data.orders.last12Months.map((item: any, idx: number) => {
//       const name = item.name ?? item.month ?? `#${idx + 1}`;
//       let Count: number;

//       if (typeof item.count === "number") {
//         Count = item.count;
//       } else if (typeof item.Count === "number") {
//         Count = item.Count;
//       } else if (typeof item.total === "number") {
//         Count = item.total;
//       } else {
//         Count = 0;
//       }

//       return { name, Count };
//     });
//   }, [data]);

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className={`${isDark ? "bg-[#111C43] text-white" : "bg-white text-black"} ${isDashboard ? "h-[30vh]" : "h-screen"}`}>
//           <div className={isDashboard ? "mt-0 pl-16 mb-2" : "mt-1"}>
//             <h1
//               className={`${styles.title} ${
//                 isDark ? "bg-[#111C43] text-white" : "bg-white text-black"
//               } ${isDashboard ? "!text-[20px]" : ""} px-5 !text-start`}
//             >
//               Orders Analytics
//             </h1>
//             {!isDashboard && (
//               <p
//                 className={`${styles.label} ${
//                   isDark ? "bg-[#111C43] text-white" : "bg-white text-black"
//                 } px-5`}
//               >
//                 Last 12 months analytics data
//               </p>
//             )}
//           </div>

//           {(!data || analyticsData.length === 0) && !isLoading ? (
//             <div className="flex-grow flex items-center justify-center">
//               <p className="text-center">
//                 {error
//                   ? "Failed to load orders analytics. See console for details."
//                   : "No orders analytics data available or format unexpected."}
//               </p>
//             </div>
//           ) : (
//             <div
//               className={`w-full ${
//                 !isDashboard ? "h-[90%]" : "h-full"
//               } flex items-center justify-center`}
//             >
//               <ResponsiveContainer
//                 width={isDashboard ? "100%" : "90%"}
//                 height={isDashboard ? "100%" : "50%"}
//               >
//                 <LineChart
//                   data={analyticsData}
//                   margin={{
//                     top: 5,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                   }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
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
//                   {!isDashboard && <Legend />}
//                   <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// }






















// import { styles } from "@/app/styles/style";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import Loader from "../../Loader/Loader";
// import { useTheme } from "next-themes";
// import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

// // const analyticsData = [
// //   {
// //     name: "Page A",
// //     Count: 4000,
// //   },
// //   {
// //     name: "Page B",
// //     Count: 3000,
// //   },
// //   {
// //     name: "Page C",
// //     Count: 5000,
// //   },
// //   {
// //     name: "Page D",
// //     Count: 1000,
// //   },
// //   {
// //     name: "Page E",
// //     Count: 4000,
// //   },
// //   {
// //     name: "Page F",
// //     Count: 800,
// //   },
// //   {
// //     name: "Page G",
// //     Count: 200,
// //   },
// // ];

// type Props = {
//   isDashboard?: boolean;
// };

// export default function OrdersAnalytics({ isDashboard }: Props) {

//     const {theme} = useTheme();
//         const isDark = theme === "dark";
//   const {data, isLoading } = useGetOrdersAnalyticsQuery({});

//   const analyticsData: any = [];

//   data &&
//     data.orders.last12Months.forEach((item: any) => {
//       analyticsData.push({ name: item.name, Count: item.count });
//     });

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
//           <div
//             className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[3px]"}
//           >
//             <h1
//               className={`${styles.title} ${isDark ? "bg-black text-white" : "bg-white text-black"} ${
//                 isDashboard && "!text-[20px]"
//               } px-5 !text-start`}
//             >
//               Orders Analytics
//             </h1>
//             {!isDashboard && (
//               <p className={`${styles.label} ${isDark ? "bg-black text-white" : "bg-white text-black"} px-5`}>
//                 Last 12 months analytics data{" "}
//               </p>
//             )}
//           </div>
//           <div
//             className={`w-full ${
//               !isDashboard ? "h-[90%]" : "h-full"
//             } flex items-center justify-center`}
//           >
//             <ResponsiveContainer
//               width={isDashboard ? "100%" : "90%"}
//               height={isDashboard ? "100%" : "50%"}
//             >
//               <LineChart
//                 width={500}
//                 height={300}
//                 data={analyticsData}
//                 margin={{
//                   top: 5,
//                   right: 30,
//                   left: 20,
//                   bottom: 5,
//                 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 {!isDashboard && <Legend />}
//                 <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }