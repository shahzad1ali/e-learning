import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";
import { useTheme } from "next-themes";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const { data: userData,refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);
  const {theme} = useTheme();
  const isDark = theme === 'dark'

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const dicountPercentenge =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

 return (
  <div>
    <div className={`w-[90%] 800px:w-[90%] m-auto py-5 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`w-full flex flex-col-reverse 800px:flex-row ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className={`w-full 800px:w-[65%] 800px:pr-5 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <h1 className={`text-[25px] font-Poppins font-[600] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {data.name}
          </h1>
          <div className={`flex items-center justify-between pt-3 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <Ratings rating={data.ratings} />
              <h5 className={`text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {data.reviews?.length} Reviews
              </h5>
            </div>
            <h5 className={`text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              {data.purchased} Students
            </h5>
          </div>

          <br />
          <h1 className={`text-[25px] font-Poppins font-[600] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            What you will learn from this course?
          </h1>
          <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {data.benefits?.map((item: any, index: number) => (
              <div className={`w-full flex 800px:items-center py-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} key={index}>
                <div className={`w-[15px] mr-1 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  <IoCheckmarkDoneOutline size={20} className={`text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} />
                </div>
                <p className={`pl-2 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  {item.title}
                </p>
              </div>
            ))}
            <br />
            <br />
          </div>

          <h1 className={`text-[25px] font-Poppins font-[600] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            What are the prerequisites for starting this course?
          </h1>
          {data.prerequisites?.map((item: any, index: number) => (
            <div className={`w-full flex 800px:items-center py-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} key={index}>
              <div className={`w-[15px] mr-1 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <IoCheckmarkDoneOutline size={20} className={`text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} />
              </div>
              <p className={`pl-2 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>{item.title}</p>
            </div>
          ))}
          <br />
          <br />

          <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <h1 className={`text-[25px] font-Poppins font-[600] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              Course Overview
            </h1>
            <CourseContentList data={data?.courseData} isDemo={true} />
          </div>
          <br />
          <br />

          <div className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <h1 className={`text-[25px] font-Poppins font-[600] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              Course Details
            </h1>
            <p className={`text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              {data.description}
            </p>
          </div>
          <br />
          <br />

          <div className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className={`800px:flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <Ratings rating={data?.ratings} />
              <div className={`mb-2 800px:mb-[unset] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} />
              <h5 className={`text-[25px] font-Poppins text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {Number.isInteger(data?.ratings) ? data?.ratings.toFixed(1) : data?.ratings.toFixed(2)}{" "}
                Course Rating • {data?.reviews?.length} Reviews
              </h5>
            </div>
            <br />

            {(data?.reviews && [...data.reviews].reverse()).map((item: any, index: number) => (
              <div className={`w-full pb-4 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} key={index}>
                <div className={`flex ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  <div className={`w-[50px] h-[50px] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <Image
                      src={item.user.avatar ? item.user.avatar.url : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"}
                      width={50}
                      height={50}
                      alt=""
                      className={`w-[50px] h-[50px] rounded-full object-cover ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
                    />
                  </div>
                  <div className={`hidden 800px:block pl-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                      <h5 className={`text-[18px] pr-2 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        {item.user.name}
                      </h5>
                      <Ratings rating={item.rating} />
                    </div>
                    <p className={`text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>{item.comment}</p>
                    <small className={`text-[#000000d1] dark:text-[#ffffff83] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                      {format(item.createdAt)} •
                    </small>
                  </div>
                  <div className={`pl-2 flex 800px:hidden items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <h5 className={`text-[18px] pr-2 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                      {item.user.name}
                    </h5>
                    <Ratings rating={item.rating} />
                  </div>
                </div>

                {item.commentReplies.map((i: any, index: number) => (
                  <div className={`w-full flex 800px:ml-16 my-5 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} key={index}>
                    <div className={`w-[50px] h-[50px] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                      <Image
                        src={i.user.avatar ? i.user.avatar.url : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"}
                        width={50}
                        height={50}
                        alt=""
                        className={`w-[50px] h-[50px] rounded-full object-cover ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
                      />
                    </div>
                    <div className={`pl-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                      <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        <h5 className={`text-[20px] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>{i.user.name}</h5>
                        <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                      </div>
                      <p className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>{i.comment}</p>
                      <small className={`text-[#ffffff83] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        {format(i.createdAt)} •
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={`w-full 800px:w-[35%] relative ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div className={`sticky top-[100px] left-0 z-50 w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
            <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <h1 className={`pt-5 text-[25px] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {data.price === 0 ? "Free" : data.price + "$"}
              </h1>
              <h5 className={`pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {data.estimatedPrice}$
              </h5>
              <h4 className={`pl-5 pt-4 text-[22px] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {discountPercentengePrice}% Off
              </h4>
            </div>

            <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              {isPurchased ? (
                <Link
                  className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
                  href={`/course-access/${data._id}`}
                >
                  Enter to Course
                </Link>
              ) : (
                <div
                  className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
                  onClick={handleOrder}
                >
                  Buy Now {data.price}$
                </div>
              )}
            </div>

            <br />
            <p className={`pb-1 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>• Source code included</p>
            <p className={`pb-1 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>• Full lifetime access</p>
            <p className={`pb-1 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>• Certificate of completion</p>
            <p className={`pb-3 800px:pb-1 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>• Premium Support</p>
          </div>
        </div>
      </div>
    </div>

    <>
      {open && (
        <div className={`w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div className={`w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className={`w-full flex justify-end ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <IoCloseOutline size={40} className={`text-black cursor-pointer ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={() => setOpen(false)} />
            </div>
            <div className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm setOpen={setOpen} data={data} user={user} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  </div>
);

};

export default CourseDetails;





















// import { styles } from "@/app/styles/style";
// import CoursePlayer from "@/app/utils/CoursePlayer";
// import Ratings from "@/app/utils/Ratings";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
// import { format } from "timeago.js";
// import CourseContentList from "../Course/CourseContentList";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckOutForm from "../Payment/CheckOutForm";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import Image from "next/image";
// import { VscVerifiedFilled } from "react-icons/vsc";
// import { useTheme } from "next-themes";

// type Props = {
//   data: any;
//   stripePromise: any;
//   clientSecret: string;
//   setRoute: any;
//   setOpen: any;
// };

// const CourseDetails = ({
//   data,
//   stripePromise,
//   clientSecret,
//   setRoute,
//   setOpen: openAuthModal,
// }: Props) => {
//   const {theme} = useTheme();
//       const isDark = theme === 'dark'
//   const { data: userData,refetch } = useLoadUserQuery(undefined, {});
//   const [user, setUser] = useState<any>();
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     setUser(userData?.user);
//   }, [userData]);

//   const dicountPercentenge =
//     ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

//   const discountPercentengePrice = dicountPercentenge.toFixed(0);

//   const isPurchased =
//     user && user?.courses?.find((item: any) => item._id === data._id);

//   const handleOrder = (e: any) => {
//     if (user) {
//       setOpen(true);
//     } else {
//       setRoute("Login");
//       openAuthModal(true);
//     }
//   };

//   return (
//     <div>
//       <div className={`w-[90%] 800px:w-[90%] m-auto py-5 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//         <div className={`w-full flex flex-col-reverse 800px:flex-row ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//           <div className={`w-full 800px:w-[65%] 800px:pr-5 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//             <h1 className={`text-[25px] font-Poppins font-[600] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//               {data.name}
//             </h1>
//             <div className={`flex items-center justify-between pt-3 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//               <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 <Ratings rating={data.ratings} />
//                 <h5 className={`text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                   {data.reviews?.length} Reviews
//                 </h5>
//               </div>
//               <h5 className={`text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 {data.purchased} Students
//               </h5>
//             </div>

//             <br />
//             <h1 className={`text-[25px] font-Poppins font-[600] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//               What you will learn from this course?
//             </h1>
//             <div>
//               {data.benefits?.map((item: any, index: number) => (
//                 <div
//                   className={`w-full flex 800px:items-center py-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
//                   key={index}
//                 >
//                   <div className={`w-[15px] mr-1 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                     <IoCheckmarkDoneOutline
//                       size={20}
//                       className={`text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
//                     />
//                   </div>
//                   <p className={`pl-2 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                     {item.title}
//                   </p>
//                 </div>
//               ))}
//               <br />
//               <br />
//             </div>
//             <h1 className={`text-[25px] font-Poppins font-[600] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//               What are the prerequisites for starting this course?
//             </h1>
//             {data.prerequisites?.map((item: any, index: number) => (
//               <div className={`w-full flex 800px:items-center py-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} key={index}>
//                 <div className={`w-[15px] mr-1 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                   <IoCheckmarkDoneOutline
//                     size={20}
//                     className={`text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
//                   />
//                 </div>
//                 <p className={`pl-2 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>{item.title}</p>
//               </div>
//             ))}
//             <br />
//             <br />
//             <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//               <h1 className={`text-[25px] font-Poppins font-[600] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 Course Overview
//               </h1>
//               <CourseContentList data={data?.courseData} isDemo={true} />
//             </div>
//             <br />
//             <br />
//             {/* course description */}
//             <div className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//               <h1 className={`text-[25px] font-Poppins font-[600] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 Course Details
//               </h1>
//               <p className={`text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 {data.description}
//               </p>
//             </div>
//             <br />
//             <br />
//             <div className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//               <div className={`800px:flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 <Ratings rating={data?.ratings} />
//                 <div className={`mb-2 800px:mb-[unset] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} />
//                 <h5 className={`text-[25px] font-Poppins text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                   {Number.isInteger(data?.ratings)
//                     ? data?.ratings.toFixed(1)
//                     : data?.ratings.toFixed(2)}{" "}
//                   Course Rating • {data?.reviews?.length} Reviews
//                 </h5>
//               </div>
//               <br />
//               {(data?.reviews && [...data.reviews].reverse()).map(
//                 (item: any, index: number) => (
//                   <div className={`w-full pb-4 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} key={index}>
//                     <div className={`flex ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                       <div className={`w-[50px] h-[50px] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                         <Image
//                           src={
//                             item.user.avatar
//                               ? item.user.avatar.url
//                               : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                           }
//                           width={50}
//                           height={50}
//                           alt=""
//                           className={`w-[50px] h-[50px] rounded-full object-cover ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
//                         />
//                       </div>
//                       <div className={`hidden 800px:block pl-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                         <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                           <h5 className={`text-[18px] pr-2 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                             {item.user.name}
//                           </h5>
//                           <Ratings rating={item.rating} />
//                         </div>
//                         <p className={`text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                           {item.comment}
//                         </p>
//                         <small className={`text-[#000000d1] dark:text-[#ffffff83] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                           {format(item.createdAt)} •
//                         </small>
//                       </div>
//                       <div className={`pl-2 flex 800px:hidden items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                         <h5 className={`text-[18px] pr-2 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                           {item.user.name}
//                         </h5>
//                         <Ratings rating={item.rating} />
//                       </div>
//                     </div>
//                     {item.commentReplies.map((i: any, index: number) => (
//                       <div className={`w-full flex 800px:ml-16 my-5 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} key={index}>
//                         <div className={`w-[50px] h-[50px] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                           <Image
//                             src={
//                               i.user.avatar
//                                 ? i.user.avatar.url
//                                 : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                             }
//                             width={50}
//                             height={50}
//                             alt=""
//                             className={`w-[50px] h-[50px] rounded-full object-cover ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
//                           />
//                         </div>
//                         <div className={`pl-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                           <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                             <h5 className={`text-[20px] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>{i.user.name}</h5>{" "}
//                             <VscVerifiedFilled className={`text-[#0095F6] ml-2 text-[20px] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} />
//                           </div>
//                           <p>{i.comment}</p>
//                           <small className={`text-[#ffffff83] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                             {format(i.createdAt)} •
//                           </small>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//           <div className={`w-full 800px:w-[35%] relative ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//             <div className={`sticky top-[100px] left-0 z-50 w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//               <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
//               <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 <h1 className={`pt-5 text-[25px] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                   {data.price === 0 ? "Free" : data.price + "$"}
//                 </h1>
//                 <h5 className={`pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                   {data.estimatedPrice}$
//                 </h5>

//                 <h4 className={`pl-5 pt-4 text-[22px] text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                   {discountPercentengePrice}% Off
//                 </h4>
//               </div>
//               <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 {isPurchased ? (
//                   <Link
//                     className={`${styles.button} ${isDark ? 'bg-black text-white' : 'bg-white text-black'} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
//                     href={`/course-access/${data._id}`}
//                   >
//                     Enter to Course
//                   </Link>
//                 ) : (
//                   <div
//                     className={`${styles.button} ${isDark ? 'bg-black text-white' : 'bg-white text-black'} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
//                     onClick={handleOrder}
//                   >
//                     Buy Now {data.price}$
//                   </div>
//                 )}
//               </div>
//               <br />
//               <p className={`pb-1 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 • Source code included
//               </p>
//               <p className={`pb-1 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 • Full lifetime access
//               </p>
//               <p className={`pb-1 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 • Certificate of completion
//               </p>
//               <p className={`pb-3 800px:pb-1 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 • Premium Support
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <>
//        {open && (
//   <div className={`w-full sm:mt-1 md:mt-5 lg:mt-16 h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center overflow-y-auto ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//     <div className={`w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3 my-10 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//       <div className={`w-full flex justify-end ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//         <IoCloseOutline
//           size={40}
//           className={`text-black cursor-pointer ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
//           onClick={() => setOpen(false)}
//         />
//       </div>
//       <div className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//         {stripePromise && clientSecret && (
//           <Elements stripe={stripePromise} options={{ clientSecret }}>
//             <CheckOutForm setOpen={setOpen} data={data} user={user} />
//           </Elements>
//         )}
//       </div>
//     </div>
//   </div>
// )}

//       </>
//     </div>
//   );
// };

// export default CourseDetails