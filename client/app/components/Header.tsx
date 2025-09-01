'use client';

import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import NavItems from '../utils/NavItems';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';
import { useTheme } from 'next-themes';
import CustomModal from '../utils/CustomModal';
import {
  HiOutlineMenuAlt3,
  HiOutlineUserCircle,
} from 'react-icons/hi';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Verification from './Auth/Verification';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import avatar from '../../public/assets/avatar.png';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useLogOutQuery, useSocialAuthMutation } from '@/redux/features/auth/authApi';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem?: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem = 0, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const { theme } = useTheme();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const {data} = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
    const [logout,setLogout] = useState(false);
    const {} = useLogOutQuery(undefined,{
      skip: !logout ? true : false,
    });


useEffect(() => {
  if (!user) {
    if (data) {
      socialAuth({
        email: data.user?.email,
        name: data.user?.name,
        avatar: data.user?.image,
      });
    }
  }
  if (data === null) {
     if (isSuccess){
    toast.success('Login Successfully');
  }
  if (data === null) {
    setLogout(true);
  }
  }
 
}, [data, user]);  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === 'screen') {
      setOpenSidebar(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full relative">
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-[9999] transition duration-300 ${
          active ? 'shadow-xl border-b' : ''
        } ${isDark ? 'bg-black text-white border-white' : 'bg-white text-black border-black'}`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            {/* Logo */}
            <Link href="/" className="text-[25px] font-Poppins font-[500]">
              ELearning
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {user ? (
                <Link href="/profile">
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    alt="avatar"
                    width={30}
                    height={30}
                    className="rounded-full ml-2"
                    style={{border: activeItem === 5 ? "2px solid #ffc107" : "none"}}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className={`cursor-pointer ml-2 ${isDark ? 'text-white' : 'text-black'}`}
                  onClick={() => setOpen(true)}
                />
              )}
            </div>

            {/* Mobile Nav */}
            <div className="flex md:hidden items-center gap-4">
              <ThemeSwitcher />
              <HiOutlineMenuAlt3
                size={25}
                className={`cursor-pointer ${isDark ? 'text-white' : 'text-black'}`}
                onClick={() => setOpenSidebar(true)}
              />
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {openSidebar && (
          <div
            className="fixed top-0 left-0 w-full h-screen bg-black/40 z-[9999]"
            onClick={handleClose}
            id="screen"
          >
            <div
              className={`fixed top-0 left-0 w-[75%] h-screen p-6 z-[10000] flex flex-col items-start text-left transition-transform ${
                isDark ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {/* Logo at top of sidebar */}
              <Link href="/" className="text-[25px] font-Poppins font-[500] mb-6">
                ELearning
              </Link>

              {/* Nav Items */}
              <div className="w-full ml-[-120px]">
                <NavItems activeItem={activeItem} isMobile={true} />
              </div>

              {/* User Icon or Avatar */}
              {user ? (
                <Link href="/profile">
                  <Image
                    src={typeof user.avatar === 'string' && user.avatar.length > 0 ? user.avatar : avatar}
                    alt="avatar"
                    width={30}
                    height={30}
                    className="rounded-full mt-6"
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className={`cursor-pointer mt-6 ${isDark ? 'text-white' : 'text-black'}`}
                  onClick={() => {
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                />
              )}

              {/* Copyright */}
              <p className={`text-[16px] pt-6 ${isDark ? 'text-white' : 'text-black'}`}>
                Copyright © 2023 ELearning
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {route === 'Login' && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}
      {route === 'Sign-Up' && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}
      {route === 'Verification' && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
};

export default Header;
