import React from "react";
import { styles } from "../styles/style";
import { useTheme } from "next-themes";
import Link from "next/link";

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`text-black dark:text-white mt-7 lg:mt-16 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <br />
      <h1
        className={`${styles.title} ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        } 800px:text-[45px] font-bold`}
      >
        What is <span className="text-[#0a2c98] text-gradient">Becodemy?</span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          Are you ready to take your programming skills to the next level? Look
          no further than Becodemy, the premier programming community dedicated
          to helping new programmers achieve their goals and reach their full
          potential.
          <br />
          <br />
          As the founder and CEO of Becodemy, I know firsthand the challenges
          that come with learning and growing in the programming industry.
          That&apos;s why I created Becodemy to provide new programmers with the
          resources and support they need to succeed.
          <br />
          <br />
          Our YouTube channel is a treasure trove of informative videos on
          everything from programming basics to advanced techniques. But that&apos;s
          just the beginning. Our affordable courses are designed to give you
          the high-quality education you need to succeed in the industry,
          without breaking the bank.
          <br />
          <br />
          At Becodemy, we believe that price should never be a barrier to
          achieving your dreams. That&apos;s why our courses are priced low so that
          anyone, regardless of their financial situation, can access the tools
          and knowledge they need to succeed.
          <br />
          <br />
          <br />
          With Becodemy by your side, there&apos;s nothing standing between you and
          your dream job. Our courses and community will provide you with the
          guidance, support, and motivation you need to unleash your full
          potential and become a skilled programmer.
          <br />
          <br />
          So what are you waiting for? Join the Becodemy family today and let&apos;s
          conquer the programming industry together! With our affordable
          courses, informative videos, and supportive community, the sky&apos;s the
          limit.
        </p>
        <br />
        <span className="font-Cursive text-[22px] items-center justify-center text-[#0a2c98]">
          Shahzad Ali
        </span>
        <Link href={`https://www.youtube.com/channel/UCEMw_lSU6NjJjM50lZJmQSA`}>
          <h5 className="text-[18px] text-[#0a2c98] font-Poppins">
            Founder and CEO of Becodemy
          </h5>
        </Link>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;

















// import React from "react";
// import { styles } from "../styles/style";
// import { useTheme } from "next-themes";
// import Link from "next/link";

// const About = () => {
//      const {theme} = useTheme();
//    const isDark = theme === 'dark'
//   return (
//     <div className={`text-black dark:text-white mt-7 lg:mt-16 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//       <br />
//       <h1 className={`${styles.title} ${isDark ? 'bg-black text-white' : 'bg-white text-black'} 800px:text-[45px] font-bold`}>
//         What is <span className=" text-[#0a2c98] text-gradient">Becodemy?</span>
//       </h1>
//       <br />
//       <div className="w-[95%] 800px:w-[85%] m-auto">
//         <p className="text-[18px] font-Poppins">
//           Are you ready to take your programming skills to the next level? Look
//           no further than Becodemy, the premier programming community dedicated
//           to helping new programmers achieve their goals and reach their full
//           potential.
//           <br />
//           <br />
//           As the founder and CEO of Becodemy, I know firsthand the challenges
//           that come with learning and growing in the programming industry.
//           That's why I created Becodemy to provide new programmers with the
//           resources and support they need to succeed.
//           <br />
//           <br />
//           Our YouTube channel is a treasure trove of informative videos on
//           everything from programming basics to advanced techniques. But that's
//           just the beginning. Our affordable courses are designed to give you
//           the high-quality education you need to succeed in the industry,
//           without breaking the bank.
//           <br />
//           <br />
//           At Becodemy, we believe that price should never be a barrier to
//           achieving your dreams. That's why our courses are priced low so that
//           anyone, regardless of their financial situation, can access the tools
//           and knowledge they need to succeed.
//           <br />
//           <br />
//           <br />
// With Becodemy by your side, there's nothing standing between you and
// your dream job. Our courses and community will provide you with the
// guidance, support, and motivation you need to unleash your full
// potential and become a skilled programmer.
// <br />
// <br />
// So what are you waiting for? Join the Becodemy family today and let's
// conquer the programming industry together! With our affordable
// courses, informative videos, and supportive community, the sky's the
// limit.
// </p>
// <br />
// <span className="font-Cursive text-[22px] items-center justify-center text-[#0a2c98]">Shahzad Ali</span>
// <Link href={`https://www.youtube.com/channel/UCEMw_lSU6NjJjM50lZJmQSA`}>
// <h5 className="text-[18px] text-[#0a2c98] font-Poppins">
//   Founder and CEO of Becodemy
// </h5>
// </Link>
// <br />
// <br />
// <br />
        
//       </div>
//     </div>
//   );
// };

// export default About;
