'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useTheme } from 'next-themes'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import Loader from '../Loader/Loader'
import { useRouter } from 'next/navigation'
import banner from "../../../public/assets/banner-img-1.png"

const Hero: FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark'
  const [mounted, setMounted] = useState(false)
  const { data, isLoading, isError, refetch } = useGetHeroDataQuery("Banner", {});
  const [search,setSearch] = useState("");
  const router =  useRouter();

  const handleSearch = () => {
  if (search === "") {
    return
  } else{
    router.push(`/courses?title=${search}`);
  }
  }


  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent hydration mismatch

  
  // const imageUrl = data?.layout?.banner?.image?.url ?? null

  return (
     <>
     {
      isLoading ? (
        <Loader />
      ) : (
         <div
      className={`w-full flex flex-col lg:flex-row items-center justify-between px-4 lg:px-16 pt-[100px] gap-10 lg:gap-20 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      } transition duration-300`}
    >
      {/* Left Side - Hero Image in Blue Circle */}
      <div className="relative w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[500px] xl:h-[500px] rounded-full bg-[#39c1f3] flex items-center justify-center z-0">
        {banner ? (
          <div className="relative w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]">
            <Image
              src={banner}
              alt="Hero Banner"
              fill
              className="object-contain z-10"
              sizes="(min-width:1024px) 500px, (min-width:768px) 450px, 250px"
              priority
              // You can add a placeholder if you configure blurDataURL on the backend
            />
          </div>
        ) : (
          <div className="relative w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] bg-gray-200 flex items-center justify-center rounded">
            {isLoading ? (
              <span className="text-sm">Loading image...</span>
            ) : isError ? (
              <span className="text-sm">Failed to load image</span>
            ) : (
              <span className="text-sm">No image available</span>
            )}
          </div>
        )}
      </div>

      {/* Right Side - Text Content */}
      <div className="w-full lg:w-[60%] flex justify-center lg:justify-start">
        <div className="w-full max-w-[500px] flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-[26px] lg:text-[48px] font-[600] font-Josefin leading-snug lg:leading-[60px]">
            {data?.layout?.banner?.title}
          </h2>

          <p className="font-serif font-[500] text-[16px] lg:text-[18px] mt-4 text-opacity-90">
            {data?.layout?.banner?.subTitle}
          </p>

          {/* Search Box */}
          <div className="w-full h-[50px] bg-transparent relative mt-6">
            <input
              type="search"
              placeholder="Search Courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`bg-transparent border ${
                isDark
                  ? 'border-white placeholder-white text-white'
                  : 'border-black placeholder-black text-black'
              } px-3 w-full h-full outline-none rounded-[5px] text-base`}
            />
            <div className="absolute flex items-center justify-center w-[50px] h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] cursor-pointer" onClick={handleSearch}>
              <BiSearch className="text-white" size={26} />
            </div>
          </div>

          {/* Clients Images */}
          <div className="flex items-center mt-6 w-full">
            <img
              src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg"
              alt="client-3"
              className="rounded-full w-10 h-10"
            />
            <img
              src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg"
              alt="client-1"
              className="rounded-full w-10 h-10 ml-[-10px]"
            />
            <img
              src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg"
              alt="client-2"
              className="rounded-full w-10 h-10 ml-[-10px]"
            />
            <p className="font-Josefin pl-3 text-[16px] font-[500]">
              500K+ people already trusted us.
              <Link href="/courses" className="ml-2 text-[crimson] dark:text-[#4cce5b]">
                View Courses
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
      )
     }
     </>
  )
}

export default Hero
