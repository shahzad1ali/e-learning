"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/courses/coursesApi";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

// Define interfaces
interface CourseVideo {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  videoLength: string;
  links: { title: string; url: string }[];
  suggestion?: string;
}

interface CourseItem {
  title: string;
}

interface CourseData {
  name: string;
  price: number;
  estimatedPrice: number;
  courseData: CourseVideo[];
  benefits: CourseItem[];
  prerequisites: CourseItem[];
  description: string;
  categories: string;
  tags: string;
  thumbnail: string;
  level: string;
  demoUrl: string;
}

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  console.log("Course ID:", id); // Debug the id
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  const { data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const editCourseData = data && data.courses.find((i: any) => i._id === id);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated successfully");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price.toString(),
        estimatedPrice: editCourseData?.estimatedPrice?.toString() || "",
        tags: editCourseData.tags,
        level: editCourseData.level,
        categories: editCourseData.categories,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url || "",
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  const [courseInfo, setCourseInfo] = useState<any>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState<CourseVideo[]>([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState<CourseData>({
    name: "",
    price: 0,
    estimatedPrice: 0,
    courseData: [],
    benefits: [],
    prerequisites: [],
    description: "",
    categories: "",
    tags: "",
    thumbnail: "",
    level: "",
    demoUrl: "",
  });

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    const formattedCourseContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      videoLength: courseContent.videoLength,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion || "",
    }));

    const data: CourseData = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories || "Default Category",
      price: parseFloat(courseInfo.price) || 0,
      estimatedPrice: parseFloat(courseInfo.estimatedPrice) || 0,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async () => {
    if (!id) {
      toast.error("Course ID is missing");
      return;
    }
    const data = courseData;
    console.log("Sending data to editCourse:", { id, data });
    await editCourse({ id, data });
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;




















// "use client";
// import React, { FC, useEffect, useState } from "react";
// import CourseInformation from "./CourseInformation";
// import CourseOptions from "./CourseOptions";
// import CourseData from "./CourseData";
// import CourseContent from "./CourseContent";
// import CoursePreview from "./CoursePreview";
// import {
//     useEditCourseMutation,
//   useGetAllCoursesQuery,
// } from "../../../../redux/features/courses/coursesApi";
// import { toast } from "react-hot-toast";
// import { redirect } from "next/navigation";

// type Props = {
//   id: string;
// };

// const EditCourse: FC<Props> = ({ id }) => {
//   const [editCourse, { isSuccess, error }] = useEditCourseMutation();
//   const { data, refetch } = useGetAllCoursesQuery(
//     {},
//     { refetchOnMountOrArgChange: true }
//   );

//   const editCourseData = data && data.courses.find((i: any) => i._id === id);

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Course Updated successfully");
//       redirect("/admin/courses");
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorMessage = error as any;
//         toast.error(errorMessage.data.message);
//       }
//     }
//   }, [isSuccess, error]);

//   const [active, setActive] = useState(0);

//   useEffect(() => {
//     if (editCourseData) {
//       setCourseInfo({
//         name: editCourseData.name,
//         description: editCourseData.description,
//         price: editCourseData.price,
//         estimatedPrice: editCourseData?.estimatedPrice,
//         tags: editCourseData.tags,
//         level: editCourseData.level,
//         categories: editCourseData.categories,
//         demoUrl: editCourseData.demoUrl,
//         thumbnail: editCourseData?.thumbnail?.url,
//       });
//       setBenefits(editCourseData.benefits);
//       setPrerequisites(editCourseData.prerequisites);
//       setCourseContentData(editCourseData.courseData);
//     }
//   }, [editCourseData]);

//   const [courseInfo, setCourseInfo] = useState<any>({
//     name: "",
//     description: "",
//     price: "",
//     estimatedPrice: "",
//     tags: "",
//     level: "",
//     categories: "",
//     demoUrl: "",
//     thumbnail: "",
//   });
//   const [benefits, setBenefits] = useState([{ title: "" }]);
//   const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
//   const [courseContentData, setCourseContentData] = useState([
//     {
//       videoUrl: "",
//       title: "",
//       description: "",
//       videoSection: "Untitled Section",
//       videoLength: "",
//       links: [
//         {
//           title: "",
//           url: "",
//         },
//       ],
//       suggestion: "",
//     },
//   ]);

//   const [courseData, setCourseData] = useState({});

//   const handleSubmit = async () => {
//     // Format benefits array
//     const formattedBenefits = benefits.map((benefit) => ({
//       title: benefit.title,
//     }));
//     // Format prerequisites array
//     const formattedPrerequisites = prerequisites.map((prerequisite) => ({
//       title: prerequisite.title,
//     }));

//     // Format course content array
//     const formattedCourseContentData = courseContentData.map(
//       (courseContent) => ({
//         videoUrl: courseContent.videoUrl,
//         title: courseContent.title,
//         description: courseContent.description,
//         videoSection: courseContent.videoSection,
//         videoLength: courseContent.videoLength,
//         links: courseContent.links.map((link) => ({
//           title: link.title,
//           url: link.url,
//         })),
//         suggestion: courseContent.suggestion,
//       })
//     );

//     //   prepare our data object
//     const data = {
//       name: courseInfo.name,
//       description: courseInfo.description,
//       categories: courseInfo.categories,
//       price: courseInfo.price,
//       estimatedPrice: courseInfo.estimatedPrice,
//       tags: courseInfo.tags,
//       thumbnail: courseInfo.thumbnail,
//       level: courseInfo.level,
//       demoUrl: courseInfo.demoUrl,
//       benefits: formattedBenefits,
//       prerequisites: formattedPrerequisites,
//       courseData: formattedCourseContentData,
//     };

//     setCourseData(data);
//   };

//   const handleCourseCreate = async (e: any) => {
//     const data = courseData;
//     console.log(data);
//     // await editCourse(data);
//         await editCourse(data);

//   };

//   return (
//     <div className="w-full flex min-h-screen">
//       <div className="w-[80%]">
//         {active === 0 && (
//           <CourseInformation
//             courseInfo={courseInfo}
//             setCourseInfo={setCourseInfo}
//             active={active}
//             setActive={setActive}
//           />
//         )}

//         {active === 1 && (
//           <CourseData
//             benefits={benefits}
//             setBenefits={setBenefits}
//             prerequisites={prerequisites}
//             setPrerequisites={setPrerequisites}
//             active={active}
//             setActive={setActive}
//           />
//         )}

//         {active === 2 && (
//           <CourseContent
//             active={active}
//             setActive={setActive}
//             courseContentData={courseContentData}
//             setCourseContentData={setCourseContentData}
//             handleSubmit={handleSubmit}
//           />
//         )}

//         {active === 3 && (
//           <CoursePreview
//             active={active}
//             setActive={setActive}
//             courseData={courseData}
//             handleCourseCreate={handleCourseCreate}
//             isEdit={true}
//           />
//         )}
//       </div>
//       <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
//         <CourseOptions active={active} setActive={setActive} />
//       </div>
//     </div>
//   );
// };

// export default EditCourse;