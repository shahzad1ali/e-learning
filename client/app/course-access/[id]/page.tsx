'use client'
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import CourseContent from "../../components/Course/CourseContent";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;

  const { isLoading, data, error } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find((item: any) => item._id === id);
      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} user={data?.user} />
        </div>
      )}
    </>
  );
};

export default Page;























// 'use client'
// import Loader from "@/app/components/Loader/Loader";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import { redirect } from "next/navigation";
// import { useEffect } from "react";
// import CourseContent from "../../components/Course/CourseContent"


// type Props = {
//   params: any;
//   user: any;
// };

// const page = ({ params }: Props) => {
//   const id = params.id;

//   const {isLoading,data,error} = useLoadUserQuery(undefined,{});

//   useEffect(() => {
//     if (data) {
//       const isPurchased = data.user.courses.find((item: any) => item._id === id);
//       if (!isPurchased) {
//         redirect("/");
//       }
//     }
// y
//     if (error) {
//       redirect("/");
//     }
//   }, [data, error]);

//   return (
//     <>
//       {
//       isLoading ? (
//         <Loader />
//       ) : (
//      <div>
//           <CourseContent id={id} user={data.user} />
//         </div>
//       )}
//     </>
//   );
// };

// export default page;