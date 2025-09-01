'use client';
import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

// Define the type for a link
interface Link {
  title: string;
  url: string;
}

// Define the type for a course content item
interface CourseContentItem {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  videoLength: string;
  links: Link[];
  suggestion?: string; // Add suggestion as an optional field
}

// Define the props interface
interface Props {
  active: number;
  setActive: (active: number) => void;
  courseContentData: CourseContentItem[];
  setCourseContentData: (courseContentData: CourseContentItem[]) => void;
  handleSubmit: () => void;
}

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handlleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed];
    updatedCollasped[index] = !updatedCollasped[index];
    setIsCollapsed(updatedCollasped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: '', url: '' });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: CourseContentItem) => {
    if (
      item.title === '' ||
      item.description === '' ||
      item.videoUrl === '' ||
      item.links[0].title === '' ||
      item.links[0].url === '' ||
      item.videoLength === ''
    ) {
      toast.error('Please fill all the fields first!');
    } else {
      let newVideoSection = '';

      if (courseContentData.length > 0) {
        const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent: CourseContentItem = {
        videoUrl: '',
        title: '',
        description: '',
        videoSection: newVideoSection,
        videoLength: '',
        links: [{ title: '', url: '' }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === ''
    ) {
      toast.error('Please fill all the fields first!');
    } else {
      setActiveSection(activeSection + 1);
      const newContent: CourseContentItem = {
        videoUrl: '',
        title: '',
        description: '',
        videoLength: '',
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: '', url: '' }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === ''
    ) {
      toast.error("section can't be empty!");
    } else {
      setActive(active + 1);
      handlleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: CourseContentItem, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <React.Fragment key={index}>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? 'mt-10' : 'mb-0'}`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === 'Untitled Section' ? 'w-[170px]' : 'w-min'
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}

                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? 'cursor-pointer' : 'cursor-no-drop'
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder="sdder"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={styles.label}>Video Length (in minutes)</label>
                      <input
                        type="number"
                        placeholder="20"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoLength = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="sdder"
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item.links.map((link: Link, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>Link {linkIndex + 1}</label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0 ? 'cursor-no-drop' : 'cursor-pointer'
                            } text-black dark:text-white text-[20px]`}
                            onClick={() => (linkIndex === 0 ? null : handleRemoveLink(index, linkIndex))}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code... (Link title)"
                          className={`${styles.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].title = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Source Code Url... (Link URL)"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].url = e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={() => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <br />
      <div className="w-full flex gap-3 items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;























// import { styles } from "@/app/styles/style";
// import React, { FC, useState } from "react";
// import { toast } from "react-hot-toast";
// import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
// import { BsLink45Deg, BsPencil } from "react-icons/bs";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// type Props = {
//   active: number;
//   setActive: (active: number) => void;
//   courseContentData: any;
//   setCourseContentData: (courseContentData: any) => void;
//   handleSubmit: any;
// };

// const CourseContent: FC<Props> = ({
//   courseContentData,
//   setCourseContentData,
//   active,
//   setActive,
//   handleSubmit: handlleCourseSubmit,
// }) => {
//   const [isCollapsed, setIsCollapsed] = useState(
//     Array(courseContentData.length).fill(false)
//   );

//   const [activeSection, setActiveSection] = useState(1);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//   };

//   const handleCollapseToggle = (index: number) => {
//     const updatedCollasped = [...isCollapsed];
//     updatedCollasped[index] = !updatedCollasped[index];
//     setIsCollapsed(updatedCollasped);
//   };

//   const handleRemoveLink = (index: number, linkIndex: number) => {
//     const updatedData = [...courseContentData];
//     updatedData[index].links.splice(linkIndex, 1);
//     setCourseContentData(updatedData);
//   };

//   const handleAddLink = (index: number) => {
//     const updatedData = [...courseContentData];
//     updatedData[index].links.push({ title: "", url: "" });
//     setCourseContentData(updatedData);
//   };

//   const newContentHandler = (item: any) => {
//     if (
//       item.title === "" ||
//       item.description === "" ||
//       item.videoUrl === "" ||
//       item.links[0].title === "" ||
//       item.links[0].url === "" ||
//       item.videoLength === ""
//     ) {
//       toast.error("Please fill all the fields first!");
//     } else {
//       let newVideoSection = "";

//       if (courseContentData.length > 0) {
//         const lastVideoSection =
//           courseContentData[courseContentData.length - 1].videoSection;

//         // use the last videoSection if available, else use user input
//         if (lastVideoSection) {
//           newVideoSection = lastVideoSection;
//         }
//       }
//       const newContent = {
//         videoUrl: "",
//         title: "",
//         description: "",
//         videoSection: newVideoSection,
//         videoLength: "",
//         links: [{ title: "", url: "" }],
//       };

//       setCourseContentData([...courseContentData, newContent]);
//     }
//   };

//   const addNewSection = () => {
//     if (
//       courseContentData[courseContentData.length - 1].title === "" ||
//       courseContentData[courseContentData.length - 1].description === "" ||
//       courseContentData[courseContentData.length - 1].videoUrl === "" ||
//       courseContentData[courseContentData.length - 1].links[0].title === "" ||
//       courseContentData[courseContentData.length - 1].links[0].url === ""
//     ) {
//       toast.error("Please fill all the fields first!");
//     } else {
//       setActiveSection(activeSection + 1);
//       const newContent = {
//         videoUrl: "",
//         title: "",
//         description: "",
//         videoLength: "",
//         videoSection: `Untitled Section ${activeSection}`,
//         links: [{ title: "", url: "" }],
//       };
//       setCourseContentData([...courseContentData, newContent]);
//     }
//   };

//   const prevButton = () => {
//     setActive(active - 1);
//   };

//   const handleOptions = () => {
//     if (
//       courseContentData[courseContentData.length - 1].title === "" ||
//       courseContentData[courseContentData.length - 1].description === "" ||
//       courseContentData[courseContentData.length - 1].videoUrl === "" ||
//       courseContentData[courseContentData.length - 1].links[0].title === "" ||
//       courseContentData[courseContentData.length - 1].links[0].url === ""
//     ) {
//       toast.error("section can't be empty!");
//     } else {
//       setActive(active + 1);
//       handlleCourseSubmit();
//     }
//   };

//   return (
//     <div className="w-[80%] m-auto mt-24 p-3">
//       <form onSubmit={handleSubmit}>
//         {courseContentData?.map((item: any, index: number) => {
//           const showSectionInput =
//             index === 0 ||
//             item.videoSection !== courseContentData[index - 1].videoSection;

//           return (
//             <>
//               <div
//                 className={`w-full bg-[#cdc8c817] p-4 ${
//                   showSectionInput ? "mt-10" : "mb-0"
//                 }`}
//                 key={index}
//               >
//                 {showSectionInput && (
//                   <>
//                     <div className="flex w-full items-center">
//                       <input
//                         type="text"
//                         className={`text-[20px] ${
//                           item.videoSection === "Untitled Section"
//                             ? "w-[170px]"
//                             : "w-min"
//                         } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
//                         value={item.videoSection}
//                         onChange={(e) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].videoSection = e.target.value;
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                       <BsPencil className="cursor-pointer dark:text-white text-black" />
//                     </div>
//                     <br />
//                   </>
//                 )}

//                 <div className="flex w-full items-center justify-between my-0">
//                   {isCollapsed[index] ? (
//                     <>
//                       {item.title ? (
//                         <p className="font-Poppins dark:text-white text-black">
//                           {index + 1}. {item.title}
//                         </p>
//                       ) : (
//                         <></>
//                       )}
//                     </>
//                   ) : (
//                     <div></div>
//                   )}

//                   {/* // arrow button for collasped video content */}
//                   <div className="flex items-center">
//                     <AiOutlineDelete
//                       className={`dark:text-white text-[20px] mr-2 text-black ${
//                         index > 0 ? "cursor-pointer" : "cursor-no-drop"
//                       }`}
//                       onClick={() => {
//                         if (index > 0) {
//                           const updatedData = [...courseContentData];
//                           updatedData.splice(index, 1);
//                           setCourseContentData(updatedData);
//                         }
//                       }}
//                     />
//                     <MdOutlineKeyboardArrowDown
//                       fontSize="large"
//                       className="dark:text-white text-black"
//                       style={{
//                         transform: isCollapsed[index]
//                           ? "rotate(180deg)"
//                           : "rotate(0deg)",
//                       }}
//                       onClick={() => handleCollapseToggle(index)}
//                     />
//                   </div>
//                 </div>
//                 {!isCollapsed[index] && (
//                   <>
//                     <div className="my-3">
//                       <label className={styles.label}>Video Title</label>
//                       <input
//                         type="text"
//                         placeholder="Project Plan..."
//                         className={`${styles.input}`}
//                         value={item.title}
//                         onChange={(e) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].title = e.target.value;
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className={styles.label}>Video Url</label>
//                       <input
//                         type="text"
//                         placeholder="sdder"
//                         className={`${styles.input}`}
//                         value={item.videoUrl}
//                         onChange={(e) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].videoUrl = e.target.value;
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className={styles.label}>Video Length (in minutes)</label>
//                       <input
//                         type="number"
//                         placeholder="20"
//                         className={`${styles.input}`}
//                         value={item.videoLength}
//                         onChange={(e) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].videoLength = e.target.value;
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                     </div>
                    

//                     <div className="mb-3">
//                       <label className={styles.label}>Video Description</label>
//                       <textarea
//                         rows={8}
//                         cols={30}
//                         placeholder="sdder"
//                         className={`${styles.input} !h-min py-2`}
//                         value={item.description}
//                         onChange={(e) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].description = e.target.value;
//                           setCourseContentData(updatedData);
//                         }}
//                       />
//                       <br />
//                     </div>
//                     {item?.links.map((link: any, linkIndex: number) => (
//                       <div className="mb-3 block" key={linkIndex}>
//                         <div className="w-full flex items-center justify-between">
//                           <label className={styles.label}>
//                             Link {linkIndex + 1}
//                           </label>
//                           <AiOutlineDelete
//                             className={`${
//                               linkIndex === 0
//                                 ? "cursor-no-drop"
//                                 : "cursor-pointer"
//                             } text-black dark:text-white text-[20px]`}
//                             onClick={() =>
//                               linkIndex === 0
//                                 ? null
//                                 : handleRemoveLink(index, linkIndex)
//                             }
//                           />
//                         </div>
//                         <input
//                           type="text"
//                           placeholder="Source Code... (Link title)"
//                           className={`${styles.input}`}
//                           value={link.title}
//                           onChange={(e) => {
//                             const updatedData = [...courseContentData];
//                             updatedData[index].links[linkIndex].title =
//                               e.target.value;
//                             setCourseContentData(updatedData);
//                           }}
//                         />
//                         <input
//                           type="url"
//                           placeholder="Source Code Url... (Link URL)"
//                           className={`${styles.input} mt-6`}
//                           value={link.url}
//                           onChange={(e) => {
//                             const updatedData = [...courseContentData];
//                             updatedData[index].links[linkIndex].url =
//                               e.target.value;
//                             setCourseContentData(updatedData);
//                           }}
//                         />
//                       </div>
//                     ))}
//                     <br />
//                     {/* add link button */}
//                     <div className="inline-block mb-4">
//                       <p
//                         className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
//                         onClick={() => handleAddLink(index)}
//                       >
//                         <BsLink45Deg className="mr-2" /> Add Link
//                       </p>
//                     </div>
//                   </>
//                 )}
//                 <br />
//                 {/* add new content */}
//                 {index === courseContentData.length - 1 && (
//                   <div>
//                     <p
//                       className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
//                       onClick={(e: any) => newContentHandler(item)}
//                     >
//                       <AiOutlinePlusCircle className="mr-2" /> Add New Content
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </>
//           );
//         })}
//         <br />
//         <div
//           className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
//           onClick={() => addNewSection()}
//         >
//           <AiOutlinePlusCircle className="mr-2" /> Add new Section
//         </div>
//       </form>
//       <br />
//       <div className="w-full flex gap-3 items-center justify-between">
//         <div
//           className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => prevButton()}
//         >
//           Prev
//         </div>
//         <div
//           className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => handleOptions()}
//         >
//           Next
//         </div>
//       </div>
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// };

// export default CourseContent;




















// // app/components/Admin/Course/CourseContent.tsx
// 'use client'

// import React, { FC, useEffect, useState } from "react";
// import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { BiSolidPencil } from "react-icons/bi";
// import { BsLink45Deg } from "react-icons/bs";
// import toast from "react-hot-toast";
// import { useTheme } from "next-themes";
// import { styles } from "@/app/styles/style";

// type LinkItem = {
//   title: string;
//   url: string;
// };

// type ContentItem = {
//   videoUrl: string;
//   title: string;
//   description: string;
//   videoSection: string;
//   links: LinkItem[];
//   suggestion?: string;
// };

// type Props = {
//   active: number;
//   setActive: (active: number) => void;
//   courseContentData: ContentItem[];
//   setCourseContentData: React.Dispatch<React.SetStateAction<ContentItem[]>>;
//   handleSubmit: () => void;
// };

// const CourseContent: FC<Props> = ({
//   courseContentData,
//   setCourseContentData,
//   handleSubmit: handleCourseSubmit,
//   active,
//   setActive,
// }) => {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
//     Array(courseContentData.length).fill(false)
//   );
//   const [activeSection, setActiveSection] = useState(1);

//   useEffect(() => {
//     setIsCollapsed(Array(courseContentData.length).fill(false));
//   }, [courseContentData.length]);

//   const isLastSectionValid = () => {
//     const last = courseContentData[courseContentData.length - 1];
//     if (!last) return false;
//     if (!last.title || !last.description || !last.videoUrl) return false;
//     if (!Array.isArray(last.links)) return false;
//     return last.links.every((link) => link.title && link.url);
//   };

//   const prevButton = () => {
//     setActive(active - 1);
//   };

//   const handleOptions = () => {
//     if (!isLastSectionValid()) {
//       toast.error("Section can't be empty!");
//       return;
//     }
//     setActive(active + 1);
//     handleCourseSubmit();
//   };

//   // Immutable updaters
//   const updateVideoSection = (index: number, value: string) => {
//     setCourseContentData((prev) =>
//       prev.map((item, i) => (i === index ? { ...item, videoSection: value } : item))
//     );
//   };

//   const updateTitle = (index: number, value: string) => {
//     setCourseContentData((prev) =>
//       prev.map((item, i) => (i === index ? { ...item, title: value } : item))
//     );
//   };

//   const updateVideoUrl = (index: number, value: string) => {
//     setCourseContentData((prev) =>
//       prev.map((item, i) => (i === index ? { ...item, videoUrl: value } : item))
//     );
//   };

//   const updateDescription = (index: number, value: string) => {
//     setCourseContentData((prev) =>
//       prev.map((item, i) => (i === index ? { ...item, description: value } : item))
//     );
//   };

//   const updateLinkTitle = (index: number, linkIndex: number, value: string) => {
//     setCourseContentData((prev) =>
//       prev.map((item, i) => {
//         if (i !== index) return item;
//         return {
//           ...item,
//           links: item.links.map((link, j) =>
//             j === linkIndex ? { ...link, title: value } : link
//           ),
//         };
//       })
//     );
//   };

//   const updateLinkUrl = (index: number, linkIndex: number, value: string) => {
//     setCourseContentData((prev) =>
//       prev.map((item, i) => {
//         if (i !== index) return item;
//         return {
//           ...item,
//           links: item.links.map((link, j) =>
//             j === linkIndex ? { ...link, url: value } : link
//           ),
//         };
//       })
//     );
//   };

//   const handleAddLink = (index: number) => {
//     setCourseContentData((prev) =>
//       prev.map((item, i) =>
//         i === index
//           ? { ...item, links: [...item.links, { title: "", url: "" }] }
//           : item
//       )
//     );
//   };

//   const handleRemoveLink = (index: number, linkIndex: number) => {
//     setCourseContentData((prev) =>
//       prev.map((item, i) => {
//         if (i !== index) return item;
//         return {
//           ...item,
//           links: item.links.filter((_, j) => j !== linkIndex),
//         };
//       })
//     );
//   };

//   const newContentHandler = (item: ContentItem) => {
//     if (
//       !item.title ||
//       !item.description ||
//       !item.videoUrl ||
//       item.links.some((link) => !link.title || !link.url)
//     ) {
//       toast.error("Please fill all the fields first!");
//       return;
//     }
//     setCourseContentData((prev) => [
//       ...prev,
//       {
//         videoUrl: "",
//         title: "",
//         description: "",
//         videoSection: item.videoSection || `Untitled Section ${activeSection}`,
//         links: [{ title: "", url: "" }],
//       },
//     ]);
//   };

//   const addNewSession = () => {
//     if (!isLastSectionValid()) {
//       toast.error("Please fill all the fields first!");
//       return;
//     }
//     setCourseContentData((prev) => [
//       ...prev,
//       {
//         videoUrl: "",
//         title: "",
//         description: "",
//         videoSection: `Untitled Section ${activeSection}`,
//         links: [{ title: "", url: "" }],
//       },
//     ]);
//     setActiveSection((s) => s + 1);
//   };

//   const toggleCollapse = (index: number) => {
//     setIsCollapsed((prev) =>
//       prev.map((c, i) => (i === index ? !c : c))
//     );
//   };

//   return (
//     <div
//       className={`w-[80%] m-auto mt-24 p-3 ${
//         isDark ? "bg-black text-white" : "bg-white text-black"
//       }`}
//     >
//       <form onSubmit={(e) => e.preventDefault()}>
//         {courseContentData?.map((item, index) => {
//           const showSectionInput =
//             index === 0 ||
//             item.videoSection !== courseContentData[index - 1]?.videoSection;

//           return (
//             <div key={index}>
//               <div
//                 className={`w-full bg-[#65636317] p-4 ${
//                   isDark ? "bg-black text-white" : "bg-white text-black"
//                 } ${showSectionInput ? "mt-10" : "mb-0"}`}
//               >
//                 {showSectionInput && (
//                   <div
//                     className={`flex w-full items-center ${
//                       isDark ? "bg-black text-white" : "bg-white text-black"
//                     }`}
//                   >
//                     <input
//                       type="text"
//                       className={`text-[20px] ${
//                         isDark ? "bg-black text-white" : "bg-white text-black"
//                       } ${
//                         item.videoSection === "Unlimited Section"
//                           ? "w-[170px]"
//                           : "w-min"
//                       } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
//                       value={item.videoSection}
//                       onChange={(e) =>
//                         updateVideoSection(index, e.target.value)
//                       }
//                     />
//                     <BiSolidPencil
//                       className={`cursor-pointer ${
//                         isDark ? "dark:text-white" : "text-black"
//                       }`}
//                     />
//                   </div>
//                 )}

//                 <div className="flex w-full items-center justify-between my-0">
//                   {isCollapsed[index] ? (
//                     item.title ? (
//                       <p className="font-Poppins dark:text-white text-black">
//                         {index + 1}. {item.title}
//                       </p>
//                     ) : null
//                   ) : (
//                     <div />
//                   )}

//                   <div className="flex items-center">
//                     <AiOutlineDelete
//                       className={`text-[20px] m-2 ${
//                         index > 0
//                           ? "cursor-pointer"
//                           : "cursor-no-drop opacity-50"
//                       }`}
//                       onClick={() => {
//                         if (index > 0) {
//                           setCourseContentData((prev) =>
//                             prev.filter((_, i) => i !== index)
//                           );
//                         }
//                       }}
//                     />
//                     <MdOutlineKeyboardArrowDown
//                       fontSize="large"
//                       className={`${
//                         isDark ? "dark:text-white" : "text-black"
//                       }`}
//                       style={{
//                         transform: isCollapsed[index]
//                           ? "rotate(180deg)"
//                           : "rotate(0deg)",
//                       }}
//                       onClick={() => toggleCollapse(index)}
//                     />
//                   </div>
//                 </div>

//                 {isCollapsed[index] && (
//                   <>
//                     <div className="my-3">
//                       <label className={`${styles.label}`}>Video Title</label>
//                       <input
//                         type="text"
//                         placeholder="Project plan..."
//                         className={`${styles.input}`}
//                         value={item.title}
//                         onChange={(e) => updateTitle(index, e.target.value)}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className={`${styles.label}`}>Video Url</label>
//                       <input
//                         type="text"
//                         placeholder="sdder"
//                         className={`${styles.input}`}
//                         value={item.videoUrl}
//                         onChange={(e) =>
//                           updateVideoUrl(index, e.target.value)
//                         }
//                       />
//                     </div>

//                      <div className="mb-3">
//                       <label className={`${styles.label}`}>Video Length (in minutes)</label>
//                       <input
//                         type="number"
//                         placeholder="20"
//                         className={`${styles.input}`}
//                         value={item.videoLength}
//                         onChange={(e) => {
//                           const updatedData = [...courseContentData];
//                           updatedData[index].videoLength = e.target.value;
//                           setCourseContentData(updatedData)
//                         }
//                         }
//                       />
//                     </div>

//                     <div className="mb-3">
//                       <label className={`${styles.label}`}>
//                         Video Description
//                       </label>
//                       <textarea
//                         rows={5}
//                         cols={20}
//                         placeholder="sdder"
//                         className={`${styles.input} !h-min py-2`}
//                         value={item.description}
//                         onChange={(e) =>
//                           updateDescription(index, e.target.value)
//                         }
//                       />
//                     </div>

//                     {item.links.map((link, linkIndex) => (
//                       <div className="mb-3 block" key={linkIndex}>
//                         <div className="w-full flex items-center justify-between">
//                           <label className={`${styles.input}`}>
//                             Link {linkIndex + 1}
//                           </label>
//                           <AiOutlineDelete
//                             className={`${
//                               linkIndex === 0
//                                 ? "cursor-no-drop opacity-50"
//                                 : "cursor-pointer"
//                             } text-[20px]`}
//                             onClick={() =>
//                               linkIndex !== 0 &&
//                               handleRemoveLink(index, linkIndex)
//                             }
//                           />
//                         </div>
//                         <input
//                           type="text"
//                           placeholder="Source Code ...(Link Title)"
//                           className={`${styles.input}`}
//                           value={link.title}
//                           onChange={(e) =>
//                             updateLinkTitle(index, linkIndex, e.target.value)
//                           }
//                         />
//                         <input
//                           type="text"
//                           placeholder="Source Code Url... (Link URL)"
//                           className={`${styles.input}`}
//                           value={link.url}
//                           onChange={(e) =>
//                             updateLinkUrl(index, linkIndex, e.target.value)
//                           }
//                         />
//                       </div>
//                     ))}

//                     <div className="inline-block mb-4">
//                       <p
//                         className="flex items-center text-[18px] cursor-pointer"
//                         onClick={() => handleAddLink(index)}
//                       >
//                         <BsLink45Deg className="mr-2" />
//                         Add Link
//                       </p>
//                     </div>
//                   </>
//                 )}

//                 {index === courseContentData.length - 1 && (
//                   <div className="mt-2">
//                     <p
//                       className="flex items-center text-[18px] cursor-pointer"
//                       onClick={() => newContentHandler(item)}
//                     >
//                       <AiOutlinePlusCircle className="mr-2" /> Add New Content
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}

//         <div
//           className={`flex items-center text-[20px] cursor-pointer mt-4 ${
//             isDark ? "text-white" : "text-black"
//           }`}
//           onClick={addNewSession}
//         >
//           <AiOutlinePlusCircle className="mr-2" />
//           Add new Section
//         </div>

//         <div className="w-full flex gap-4 items-center justify-between mt-8">
//           <div
//             className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer"
//             onClick={prevButton}
//           >
//             Prev
//           </div>
//           <div
//             className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer"
//             onClick={handleOptions}
//           >
//             Next
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CourseContent;



// import React, { FC, useState } from "react";

// import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { styles } from "@/app/styles/style";
// import { BiSolidPencil } from "react-icons/bi";
// import { BsLink45Deg } from "react-icons/bs";
// import toast from "react-hot-toast";
// import { useTheme } from "next-themes";


// type Props = {
//   active: number;
//   setActive: (active: number) => void;
//   courseContentData: any;
//   setCourseContentData: (setCourseContentData: any) => void;
//   handleSubmit: any
// };

// const CourseContent: FC<Props> = ({ 
//     courseContentData,
//     setCourseContentData,
//     handleSubmit: handleCourseSumbit,
//     active,
//     setActive
//  }: Props) => {
//     const { theme } = useTheme();
//   const isDark = theme === "dark";
// const [isCollapsed, setIsCollapsed] = useState(
//     Array(courseContentData.length).fill(false) );
//     const [activeSection,setActiveSection] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [route, setRoute] = useState('Login')

//   const [activeVideo, setActiveVideo] = useState(0);

// // Validate last course section
// const isLastSectionValid = () => {
//   const last = courseContentData[courseContentData.length - 1];
//   if (!last.title || !last.description || !last.videoUrl) return false;
//   return last.links.every(link => link.title && link.url);
// };

// // Form submit handler
// const handleSubmit = (e: any) => {
//   e.preventDefault();
// };

// // Collapse toggle handler
// const handleCollapseToggle = (index: number) => {
//   const updatedCollapsed = [...isCollapsed];
//   updatedCollapsed[index] = !updatedCollapsed[index];
//   setIsCollapsed(updatedCollapsed);
// };

// // Remove a specific link
// const handleRemoveLink = (index: number, linkIndex: number) => {
//   const updatedData = [...courseContentData];
//   updatedData[index].links.splice(linkIndex, 1); // ✅ fixed: remove just one link
//   setCourseContentData(updatedData);
// };

// // Add new link
// const handleAddLink = (index: number) => {
//   const updatedData = [...courseContentData];
//   updatedData[index].links.push({ title: "", url: "" });
//   setCourseContentData(updatedData);
// };

// // Add a new content block
// const newContentHandler = (item: any) => {
//   if (!item.title || !item.description || !item.videoUrl || item.links.some(link => !link.title || !link.url)) {
//     toast.error("Please fill all the fields first!");
//   } else {
//     const lastSection = courseContentData[courseContentData.length - 1];
//     const newVideoSection = lastSection?.videoSection || `Untitled Section ${activeSection}`;

//     const newContent = {
//       videoUrl: "",
//       title: "",
//       description: "",
//       videoSection: newVideoSection,
//       links: [{ title: "", url: "" }],
//     };

//     setCourseContentData([...courseContentData, newContent]);
//   }
// };

// // Add new session (section)
// const addnewSession = () => {
//   if (!isLastSectionValid()) {
//     toast.error("Please fill all the fields first!");
//   } else {
//     const newContent = {
//       videoUrl: "",
//       title: "",
//       description: "",
//       videoSection: `Untitled Section ${activeSection}`,
//       links: [{ title: "", url: "" }],
//     };
//     setActiveSection(activeSection + 1);
//     setCourseContentData([...courseContentData, newContent]);
//   }
// };

// // Go to previous step
// const prevButton = () => {
//   setActive(active - 1);
// };

// // Handle "Next" button in wizard
// const handleOptions = () => {
//   if (!isLastSectionValid()) {
//     toast.error("Section can't be empty!");
//   } else {
//     setActive(active + 1);
//     handleCourseSumbit();
//   }
// };


// return (  
//   <div className={`w-[80%] m-auto mt-24 p-3 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//     <form onSubmit={handleSubmit}>
//       {courseContentData?.map((item: any, index: number) => {
//         const showSectionInput =
//           index === 0 ||
//           item.videoSection !== courseContentData[index - 1].videoSection;

//         return (
//           <div key={index}>
//             <div
//               className={`w-full bg-[#65636317] p-4 ${isDark ? "bg-black text-white" : "bg-white text-black"} ${
//                 showSectionInput ? "mt-10" : "mb-0"
//               }`}
//             >
//                 {
//                     showSectionInput && (
//                         <>
//                        <div className={`flex w-full items-center${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//                         <input
//                         type="text"
//                         className={`text-[20px] ${isDark ? "bg-black text-white" : "bg-white text-black"} ${item.videoSection === "Unlimited Section" ? "w-[170px] " : "w-min"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
//                         value={item.videoSection}
//                         onChange={(e) => {
//                             const updatedData = [...courseContentData];
//                             updatedData[index].videoSection = e.target.value;
//                             setCourseContentData(updatedData);
//                         }}
//                         />
//                         <BiSolidPencil className={`cursor-pointer dark:text-white text-black${isDark ? "bg-black text-white" : "bg-white text-black"}`} />
//                         </div>
//                         </>
//                     )
//                 }
//               <div className={`flex w-full items-center justify-between my-0 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//                 {isCollapsed[index] ? (
//                   <>
//                     {item.title ? (
//                       <p className={`font-Poppins dark:text-white text-black ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//                         {index + 1}. {item.title}
//                       </p>
//                     ) : <></> }
//                   </>
//                 ) : (
//                   <div>

//                   </div>
//                 ) }

//                {/* arrow fuction fo colaspped vedio content */}
//                <div className={`flex item-center ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//                 <AiOutlineDelete 
//                 className={`dark:text-white text-[20px] m-2 text-black ${isDark ? "bg-black text-white" : "bg-white text-black"} ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
//                 onClick={() => {
//                     if (index > 0) {
//                         const updatedData = [...courseContentData];
//                         updatedData.splice(index,1);
//                         setCourseContentData(updatedData);
//                     }
//                 }}
//                 />

//                 <MdOutlineKeyboardArrowDown
//                 fontSize="large"
//                 className={`dark:text-white text-black ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//                 style={{
//                     transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)",
//                 }}
//                 onClick={() => handleCollapseToggle(index)}
//                 />
//                </div>
//               </div>
//               {isCollapsed[index] && (
//                 <>
//                 <div className={`my-3 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//                     <label className={`${isDark ? "bg-black text-white" : "bg-white text-black"} ${styles.label} `}>Vedio Title</label>
//                     <input 
//                     type="text"
//                     placeholder="Project plan..."
//                     className={`${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//                     value={item.title}
//                     onChange={(e) => {
//                           const updatedData = [...courseContentData];
//                         updatedData[index].title = e.target.value;
//                         setCourseContentData(updatedData);
//                     }}
//                     />
//                 </div>
//                   <div className={`mb-3 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//                     <label className={`${styles.label} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>Vedio Url</label>
//                     <input 
//                     type="text"
//                     placeholder="sdder"
//                     className={`${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//                     value={item.videoUrl}
//                     onChange={(e) => {
//                           const updatedData = [...courseContentData];
//                         updatedData[index].videoUrl = e.target.value;
//                         setCourseContentData(updatedData);
//                     }}
//                     />
//                 </div>
//                  <div className={`mb-3 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//                     <label className={`${styles.label} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>Video Descripion</label>
//                     <textarea 
//                     rows={5}
//                     cols={20}
//                     placeholder="sdder"
//                     className={`${styles.input} !h-min py-2 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//                   value={item.description}
//                      onChange={(e) => {
//                     const updatedData = [...courseContentData];
//                    updatedData[index].description = e.target.value;
//                    setCourseContentData(updatedData);
//                 }}

//                     />
//                     <br />
//                 </div>
//                {item?.links.map((link: any, linkIndex: number) => (
//   <div className={`mb-3 block ${isDark ? "bg-black text-white" : "bg-white text-black"}`} key={linkIndex}>
//     <div className={`w-full flex items-center justify-between ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//       <label className={`${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//         Link {linkIndex + 1}
//       </label>
//       <AiOutlineDelete
//         className={`${
//           linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"
//         } ${isDark ? "bg-black text-white" : "bg-white text-black"} text-black dark:text-white text-[20px]`}
//         onClick={() =>
//           linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)
//         }
//       />
//     </div>
//     <input
//       type="text"
//       placeholder="Sourse Code ...(Link Title)"
//       className={`${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//       value={link.title}
//       onChange={(e) => {
//         const updatedData = [...courseContentData];
//         updatedData[index].links[linkIndex].title = e.target.value;
//         setCourseContentData(updatedData);
//       }}
//     />
//     <input
//       type="text"
//       placeholder="Sourse Code Url... (Link URL)"
//       className={`${styles.input} ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//       value={link.url}
//       onChange={(e) => {
//         const updatedData = [...courseContentData];
//         updatedData[index].links[linkIndex].url = e.target.value;
//         setCourseContentData(updatedData);
//       }}
//     />
//   </div>
// ))}

//                 <br />
//                 {/* add link button */}
//                 <div className={`inline-block mb-4 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//                   <p className={`flex items-center text-[18px] dark:text-white text-black cursor-pointer ${isDark ? "bg-black text-white" : "bg-white text-black"}`} onClick={() => handleAddLink(index)}>
//                     <BsLink45Deg className="mr-2" />
//                     Add Link
//                   </p>
//                 </div>

//                 </>
//               )}
//               <br />
//               {/* add new contentadd new content */}

//               {index === courseContentData.length - 1 && (
//                 <div>
//                   <p className={`flex items-center text-[18px] dark:text-white text-black cursor-pointer ${isDark ? "bg-black text-white" : "bg-white text-black"}`} onClick={(e: any) => newContentHandler(item)}>
//                     <AiOutlinePlusCircle className="mr-2" /> Add New  Content
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}

//       <br />
//       <div className={`felx items-center text-[20px] dark:text-white text-black cursor-pointer ${isDark ? "bg-black text-white" : "bg-white text-black"}`} onClick={() => addnewSession()}>
//         <AiOutlinePlusCircle className={`mr-2 ${isDark ? "bg-black text-white" : "bg-white text-black"}`} />Add new Section
//       </div>
//     </form>
//     <br />
//       <div className={`w-full flex gap-4 items-center justify-between ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//       <div
//           className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => prevButton()}
//         >
//           Prev
//         </div>
//         <div
//           className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => handleOptions()}
//         >
//           Next
//         </div>
//       </div>
//       <br />
//       <br />
    
//   </div>
// );

// };

// export default CourseContent;

