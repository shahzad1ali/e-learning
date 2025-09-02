import { styles } from '@/app/styles/style'
import Image from 'next/image'
import React from 'react'
import ReviewCard from "../Review/ReviewCard"
import { useTheme } from 'next-themes'
import img1 from "../../../public/assets/review/1 (1).jpg";

type Props = {}


export const reviews = [
  {
    name: "Gene Bates",
    avatar: "img1.jpg",
    profession: "Student | Cambridge university",
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "computer systems engineering student | Zimbabwe",
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full stack web developer | Algeria",
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full stack web developer | Algeria",
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];


const Reviews = (props: Props) => {
    const {theme} = useTheme();
  const isDark = theme === 'dark'
  return (
    <div className={`w-[90%] 800px:w-[85%] m-auto ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className={`w-full 800px:flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className={`800px:w-[50%] w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <Image
                src={require("../../../public/assets/business-img.png")}
                alt='buisness'
                width={700}
                height={700}
                />
            </div>
            <div className={`800px:w-[50%] w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <h3 className={`${styles.title} ${isDark ? 'bg-black text-white' : 'bg-white text-black'} 800px:!text-[40px] text-[35px] font-[700]`}>
                    Our Students Are <span className='bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-500 hover:from-purple-600 hover:to-blue-500'>Our Strength</span>{" "}
                    <br /> What Thay Say About Us 
                </h3>
                <br />
                <p className={`${styles.label} ${isDark ? 'bg-black text-white' : 'bg-white text-black'} text-[18px]`}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem quis atque laborum, dolorum quisquam sunt quos, velit molestiae asperiores tenetur voluptatibus necessitatibus consequuntur soluta expedita, provident recusandae eos. Saepe doloribus itaque voluptatibus earum, aut architecto voluptates ducimus dignissimos quia tempora!
                </p>
            </div>
            <br />
            <br />
        <br />
        </div>
         <div className={`grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px]  md:[&>*:nth-child(6)]:!mt-[40px] ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {reviews && 
            reviews.map((i,index) => <ReviewCard item={i} key={index} />) }
        </div>
    </div>
  )
}

export default Reviews