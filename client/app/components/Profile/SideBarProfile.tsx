// Updated SideBarProfile
'use client';
import React, { FC } from 'react';
import avatarDefault from '../../../public/assets/avatar.png';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({ user, setActive, avatar, active, logOutHandler }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const iconColor = isDark ? '#fff' : '#000';

  return (
    <div className="w-full rounded-2xl">
      {/* My Account */}
      <div
        className={`flex gap-3 items-center px-3 py-4 cursor-pointer transition ${
          active === 1 ? (isDark ? 'bg-slate-800' : 'bg-white') : 'bg-transparent'
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
          alt="avatar"
          width={30}
          height={30}
          className="rounded-full"
        />
        <h5 className={`font-Poppins text-sm md:text-base ${isDark ? 'text-white' : 'text-black'} hidden md:block`}>
          My Account
        </h5>
      </div>

      {/* Change Password */}
      <div
        className={`flex gap-3 items-center px-3 py-4 cursor-pointer transition ${
          active === 2 ? (isDark ? 'bg-slate-800' : 'bg-white') : 'bg-transparent'
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} color={iconColor} />
        <h5 className={`font-Poppins text-sm md:text-base ${isDark ? 'text-white' : 'text-black'} hidden md:block`}>
          Change Password
        </h5>
      </div>

      {/* Enrolled Courses */}
      <div
        className={`flex gap-3 items-center px-3 py-4 cursor-pointer transition ${
          active === 3 ? (isDark ? 'bg-slate-800' : 'bg-white') : 'bg-transparent'
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} color={iconColor} />
        <h5 className={`font-Poppins text-sm md:text-base ${isDark ? 'text-white' : 'text-black'} hidden md:block`}>
          Enrolled Courses
        </h5>
      </div>

         {
          user.role === "admin" && (
             <Link
        className={`flex gap-3 items-center px-3 py-4 cursor-pointer transition ${
          active === 6 ? (isDark ? 'bg-slate-800' : 'bg-white') : 'bg-transparent'
        }`}
        href={"/admin"}
      >
        <MdOutlineAdminPanelSettings size={20} color={iconColor} />
        <h5 className={`font-Poppins text-sm md:text-base ${isDark ? 'text-white' : 'text-black'} hidden md:block`}>
          Admin Dashboard
        </h5>
      </Link>
          )
         }
      {/* Log Out */}
      <div
        className={`flex gap-3 items-center px-3 py-4 cursor-pointer transition ${
          active === 4 ? (isDark ? 'bg-slate-800' : 'bg-white') : 'bg-transparent'
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} color={iconColor} />
        <h5 className={`font-Poppins text-sm md:text-base ${isDark ? 'text-white' : 'text-black'} hidden md:block`}>
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
