'use client'
import React, { useState } from 'react'
import Header from '../components/Header';
import Heading from '../utils/Heading';
import Footer from '../components/Footer';
import { useTheme } from 'next-themes';
import FAQ from '../components/Route/FAQ';


type Props = {}

const Page = (props: Props) => {
        const {theme} = useTheme();
           const isDark = theme === 'dark'
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState('Login');

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <Heading
          title={`FAQ - Elearning`}
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
        <div className="mt-7 lg:mt-16 pt-8">
           <FAQ />
        </div>
        <Footer />
    </div>
  );
};

export default Page;


