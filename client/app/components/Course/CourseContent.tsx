import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";
import { useTheme } from "next-themes";

type Props = {
  id: string;
  user:any;
};

const CourseContent = ({ id,user }: Props) => {
  const { data: contentData, isLoading,refetch } = useGetCourseContentQuery(id,{refetchOnMountOrArgChange:true});
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login')
  const data = contentData?.content;

  const [activeVideo, setActiveVideo] = useState(0);
const { theme } = useTheme();
    const isDark = theme === 'dark'
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
          <div className={`w-full grid 800px:grid-cols-10 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keyword={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className={`hidden 800px:block 800px:col-span-3 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      } transition duration-300`}>
            <CourseContentList
              setActiveVideo={setActiveVideo}
              data={data}
              activeVideo={activeVideo}
            />
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;