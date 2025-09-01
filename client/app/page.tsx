'use client'

import React, { FC, useState } from "react"
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero"
import Courses from "./components/Route/Courses"
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/Route/FAQ"
import Footer from "./components/Footer"
import { useTheme } from "next-themes";
 
interface Props {
  message?: string;
}

const Page: FC<Props> = (props) => {
  const {theme} = useTheme();
   const isDark = theme === 'dark'
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login");

  return (
    <div className={`min-h-[2000px] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Heading 
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keyword="Programing,Redux,MERN,Machine Language"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
