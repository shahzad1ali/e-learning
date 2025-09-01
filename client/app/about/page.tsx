'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import About from './About';
import Footer from '../components/Footer';

const Page = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title="About us - Elearning"
        description="ELearning is a platform for students to learn and get help from programmers"
        keyword="Programing,Redux,MERN,Machine Language"
      />
      <Header open={open} setOpen={setOpen} activeItem={5} setRoute={setRoute} route={route} />
      <About />
      <Footer />
    </div>
  );
};

export default Page;












// 'use client'
// import React, { useState } from 'react'
// import Header from '../components/Header';
// import Heading from '../utils/Heading';
// import About from "./About"
// import Footer from '../components/Footer';


// type Props = {}

// const Page = (props: Props) => {
//   const [open, setOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState(5);
//   const [route, setRoute] = useState('Login');

//   return (
//     <div>
//         <Heading
//           title={`About us - Elearning`}
//           description="ELearning is a platform for students to learn and get help from programmers"
//           keyword="Programing,Redux,MERN,Machine Language"
//         />
//         <Header
//           open={open}
//           setOpen={setOpen}
//           activeItem={activeItem}
//           setRoute={setRoute}
//           route={route}
//         />
//         <About />
//         <Footer />
//     </div>
//   );
// };

// export default Page;


