'use client';
import { styles } from '@/app/styles/style';
import { useTheme } from 'next-themes';
import { useGetHeroDataQuery } from '../../../../redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';

// Define the type for courseInfo
interface CourseInfo {
  name: string;
  description: string;
  price: string;
  estimatedPrice?: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
  categories: string;
}

// Define the type for a category
interface Category {
  _id: string;
  title: string;
}

interface Props {
  courseInfo: CourseInfo;
  setCourseInfo: (courseInfo: CourseInfo) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [dragging, setDragging] = useState(false);

  const { data } = useGetHeroDataQuery('Categories', {});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-28">
      <form onSubmit={handleSubmit} className={`${styles.label} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className={`h-[40px] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            name="name"
            required
            value={courseInfo.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack LMS platform with Next 13"
            className={`${styles.input} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
          />
        </div>

        <br />

        <div className="mt-4">
          <label className={`${styles.label} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            Course Description
          </label>
          <textarea
            name=""
            id=""
            cols={50}
            rows={5}
            placeholder="write something amazing ..."
            className={`${styles.input} !h-min !py-2 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
            value={courseInfo.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          />
        </div>
        <br />
        <div className={`w-full justify-between mb-4 flex ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div>
            <label className={`${styles.label} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} htmlFor="price">
              Course Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="29"
              className={`${styles.input} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
            />
          </div>
          <div className={`w-[50%] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <label className={`${styles.label} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} htmlFor="estimatedPrice">
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder="79"
              className={`${styles.input} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className={`w-[45%] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <label className={`${styles.label} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} htmlFor="tags">
              Course Tags
            </label>
            <input
              type="text"
              required
              name=""
              value={courseInfo.tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="MERN,Next 13,Socket io,tailwind css,LMS"
              className={`${styles.input} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              Course Categories
            </label>
            <select
              name=""
              id=""
              className={`${styles.input} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
              value={courseInfo.categories}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((item: Category) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className={`w-[45%] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <label className={`${styles.label} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              Course Level
            </label>
            <input
              type="text"
              name=""
              value={courseInfo.level}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              Demo Url
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
            />
          </div>
        </div>
        <br />
        <div className={`w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? 'bg-blue-500' : 'bg-transparent'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <Image
                src={courseInfo.thumbnail}
                alt="Course Thumbnail"
                width={500}
                height={300}
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className={`w-full flex items-center justify-end ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;















// import { styles } from '@/app/styles/style';
// import { useTheme } from 'next-themes';
// import { useGetHeroDataQuery } from "../../../../redux/features/layout/layoutApi";
// import React, {FC, useEffect, useState} from 'react'

// type Props = {
//   courseInfo: any;
//   setCourseInfo: (courseInfo: any) => void;
//   active: number;
//   setActive: (active: number) => void;
// }

// const CourseInformation:FC<Props> = ({courseInfo,setCourseInfo,active,setActive}) => {
//     const { theme } = useTheme();
//     const isDark = theme === "dark";
//     const [dragging,setDragging] = useState(false);

//       const { data } = useGetHeroDataQuery("Categories", {});
      
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     if (data) {
//       setCategories(data.layout.categories);
//     }
//   }, [data]);


//    const handleSubmit = (e: any) => {
// e.preventDefault();
//     setActive(active + 1);
//    };

//    const handleFileChange = (e: any) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         if (reader.readyState === 2) {
//           setCourseInfo({...courseInfo, thumbnail: reader.result });
//         }
//       }
//       reader.readAsDataURL(file);
//     }
//    }

//     const handleDragOver = (e: any) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = (e: any) => {
//     e.preventDefault();
//     setDragging(false);
//   };

//   const handleDrop = (e: any) => {
//     e.preventDefault();
//     setDragging(false);

//     const file = e.dataTransfer.files?.[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = () => {
//         setCourseInfo({ ...courseInfo, thumbnail: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//  return (
//   <div className={`w-[80%] m-auto mt-28`}>
//     <form onSubmit={handleSubmit} className={`${styles.label} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//       <div className={`h-[40px]  ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//         <label htmlFor="name">
//           Course Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           required
//           value={courseInfo.name}
//           onChange={(e: any) =>
//             setCourseInfo({ ...courseInfo, name: e.target.value })
//           }
//           id="name"
//           placeholder="MERN stack LMS platform with Next 13"
//           className={`${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//         />
//       </div>

//       <br />

//       <div className="mt-4">
//        <label className={`${styles.label} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>Course Description</label>
//        <textarea name='' id='' cols={50} rows={5} placeholder='write somthing amazing ...' className={`${styles.input} !h-min !py-2 ${isDark ? "bg-black text-white" : "bg-white text-black"}`} value={courseInfo.description} onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value})
//       }>

//        </textarea>
//       </div> 
//       <br />
//       <div className={`w-full justify-between mb-4 flex ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//          <div className=''>
//         <label className={`${styles.label} ${isDark ? "bg-black text-white" : "bg-white text-black"}`} htmlFor="name">
//           Course Price
//         </label>
//         <input
//           type="number"
//           name=""
//           required
//           value={courseInfo.price}
//           onChange={(e: any) =>
//             setCourseInfo({ ...courseInfo, price: e.target.value })
//           }
//           id="price"
//           placeholder="29"
//           className={`${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//         />
//       </div>
//           <div className={`w-[50%] ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//         <label className={`${styles.label} ${isDark ? "bg-black text-white" : "bg-white text-black"}`} htmlFor="name">
//           Estimated Price (optional)
//         </label>
//         <input
//           type="number"
//           name=""
//           required
//           value={courseInfo.estimatedPrice}
//           onChange={(e: any) =>
//             setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
//           }
//           id="price"
//           placeholder="79"
//           className={`${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//         />
//       </div>

//       </div>

//              {/* <br /> */}
//         <div className="w-full flex justify-between">
//           <div className={`w-[45%] ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//             <label className={`${styles.label} ${isDark ? "bg-black text-white" : "bg-white text-black"}`} htmlFor="email">
//               Course Tags
//             </label>
//             <input
//               type="text"
//               required
//               name=""
//               value={courseInfo.tags}
//               onChange={(e: any) =>
//                 setCourseInfo({ ...courseInfo, tags: e.target.value })
//               }
//               id="tags"
//               placeholder="MERN,Next 13,Socket io,tailwind css,LMS"
//               className={`
//             ${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//             />
//           </div>
//           <div className="w-[50%]">
//             <label className={`${styles.label} w-[50%] ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//               Course Categories
//             </label>
//             <select
//               name=""
//               id=""
//               className={`${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//               value={courseInfo.category}
//               onChange={(e: any) =>
//                 setCourseInfo({ ...courseInfo, categories: e.target.value })
//               }
//             >
//               <option value="">Select Category</option>
//               {categories &&
//                 categories.map((item: any) => (
//                   <option value={item.title} key={item._id}>
//                     {item.title}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>
//         <br />
//         <div className="w-full flex justify-between">
//           <div className={`w-[45%] ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//             <label className={`${styles.label} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>Course Level</label>
//             <input
//               type="text"
//               name=""
//               value={courseInfo.level}
//               required
//               onChange={(e: any) =>
//                 setCourseInfo({ ...courseInfo, level: e.target.value })
//               }
//               id="level"
//               placeholder="Beginner/Intermediate/Expert"
//               className={` ${isDark ? "bg-black text-white" : "bg-white text-black"}
//             ${styles.input}`}
//             />
//           </div>
//           <div className="w-[50%]">
//             <label className={`${styles.label} w-[50%] ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>Demo Url</label>
//             <input
//               type="text"
//               name=""
//               required
//               value={courseInfo.demoUrl}
//               onChange={(e: any) =>
//                 setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
//               }
//               id="demoUrl"
//               placeholder="eer74fd"
//               className={`
//             ${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//             />
//           </div>
//         </div>
//         <br />
//         <div className={`w-full ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//           <input
//             type="file"
//             accept="image/*"
//             id="file"
//             className={`hidden ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//             onChange={handleFileChange}
//           />
//           <label
//             htmlFor="file"
//             className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${isDark ? "bg-black text-white" : "bg-white text-black"} ${
//               dragging ? "bg-blue-500" : "bg-transparent"
//             }`}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//           >
//             {courseInfo.thumbnail ? (
//               <img
//                 src={courseInfo.thumbnail}
//                 alt=""
//                 className={`max-h-full w-full object-cover ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//               />
//             ) : (
//               <span className={`text-black dark:text-white ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//                 Drag and drop your thumbnail here or click to browse
//               </span>
//             )}
//           </label>
//         </div>
//         <br />
//         <div className={`w-full flex items-center justify-end ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//           <input
//             type="submit"
//             value="Next"
//             className={`w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer `}
//           />
//         </div>
//         <br />
//         <br />
//     </form>
//   </div>
// );

// }

// export default CourseInformation