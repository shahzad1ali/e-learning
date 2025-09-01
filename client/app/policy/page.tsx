'use client'
import React, { useState } from 'react'
import Header from '../components/Header';
import Heading from '../utils/Heading';
import Policy from "./Policy"
import Footer from '../components/Footer';
import { useTheme } from 'next-themes';


type Props = {}

const Page = (props: Props) => {
        const {theme} = useTheme();
           const isDark = theme === 'dark'
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState('Login');

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <Heading
          title={`Policy - Elearning`}
          description="ELearning is a platform for students to learn and get help from programmers"
          keyword="Programing,Redux,MERN,Machine Language"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Policy />
        <Footer />
    </div>
  );
};

export default Page;


