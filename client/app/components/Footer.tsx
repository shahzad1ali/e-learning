import { useTheme } from 'next-themes';
import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
      const {theme} = useTheme();
       const isDark = theme === 'dark'
  return (
    <footer>
        <div className={`border border-[#0000000e] dark:border-[#ffffff1e]  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <br />
            <div className={`w-[95%] 800p:w-full 800px:mx-w-[85%] mx-auto px-2 sm:px-6 lg:px-8  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className={`grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <div className={`space-y-3  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        <h3 className={`text-[20px] font-[600] text-black dark:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>About</h3>
                        <ul className={`space-y-4  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                         <li>
                            <Link href="/about"
                            className={`text-base text-black dark:text-gray-300 dark:hover:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>Our Story</Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy"
                            className={`text-base text-black dark:text-gray-300 dark:hover:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="/faq"
                            className={`text-base text-black dark:text-gray-300 dark:hover:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>FAQ</Link>
                        </li>
                        </ul>
                    </div>
                     <div className={`space-y-3  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        <h3 className={`text-[20px] font-[600] text-black dark:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>Quick Links</h3>
                        <ul className={`space-y-4  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                         <li>
                            <Link href="/courses"
                            className={`text-base text-black dark:text-gray-300 dark:hover:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>Courses</Link>
                        </li>
                        <li>
                            <Link href="/profile"
                            className= {`text-base text-black dark:text-gray-300 dark:hover:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}> My Account</Link>
                        </li>
                        <li>
                            <Link href="/course-dashboard"
                            className={`text-base text-black dark:text-gray-300 dark:hover:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>Course Dashboard</Link>
                        </li>
                        </ul>
                    </div>
                     <div className={`space-y-3  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        <h3 className={`text-[20px] font-[600] text-black dark:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>Quick Links</h3>
                        <ul className={`space-y-4  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            <li>
                                <Link href='https://www.youtube.com/@Shahzad-ali62' className={`text-base text-black dark:text-gray-300 dark:hover:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} >
                                Youtube
                                </Link>
                            </li>
                            <li>
                                <Link href='https://www.youtube.com/@Shahzad-ali62' className={`text-base text-black dark:text-gray-300 dark:hover:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} >
                                Instagram
                                </Link>
                            </li>
                            <li>
                                <Link href='https://github.com/shahzad1ali' className={`text-base text-black dark:text-gray-300 dark:hover:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} >
                                Github
                                </Link>
                            </li>
                        </ul>
                     </div>
                     <div className="">
                        <h3 className={`text-[20px] font-[600] text-black dark:text-white pb-3  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>Contact Info</h3>
                        <p className={`text-base text-black dark:text-gray-300 dark:hover:text-white pb-2  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>Call Us : 92,3001595619</p>
                     </div>
                     </div>
                     <br />
                     <p className={`text-center text-black dark:text-white  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        Copyright @ 2025 Elearning | All Right Reserved 
                     </p>
            </div>
        </div>
        <br />
    </footer>
  )
}

export default Footer
