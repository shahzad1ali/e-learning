'use client';
import React, { FC, useEffect, useState } from 'react';
import avatarIcon from "../../../public/assets/avatar.png";
import { AiOutlineCamera } from 'react-icons/ai';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';


type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [name, setName] = useState(user?.name);
  const [updateAvatar, {isSuccess, error}] = useUpdateAvatarMutation();
  const [editProfile, {isSuccess:success,error:updateError}] = useEditProfileMutation();
  const [loadUser,setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, {skip: loadUser ? false : true});

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(
          avatar,
        );
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true)
    }
    if(error || updateError) {
      console.log(error);
      
    }
    if (success) {
      toast.success("Profile updated successfully!");
    }
  }, [isSuccess, error, success, updateError])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (  
    <div
      className={`w-full flex justify-center px-4 py-10 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="w-full max-w-4xl relative">
        <div className="flex justify-center">
          <div className="relative w-[120px] h-[120px]">
            <Image
              src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
              alt="avatar"
              width={120}
              height={120}
              className="object-cover rounded-full border-[3px] border-[#37a39a] cursor-pointer"
            />

            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png,image/jpg,image/jpeg,image/webp"
            />

            <label htmlFor="avatar">
              <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-0 right-0 flex items-center justify-center cursor-pointer">
                <AiOutlineCamera size={20} className="text-white" />
              </div>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-[80%] mt-8 lg:pl-35">
          <div className="w-full mb-4">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              className={`w-full px-3 py-2 rounded-md border ${
                isDark
                  ? 'bg-[#1f1f1f] text-white placeholder-gray-400 border-gray-600'
                  : 'bg-white text-black placeholder-gray-500 border-gray-300'
              }`}
              required
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="w-full mb-6">
            <label className="block pb-2">Email Address</label>
            <input
              type="text"
              className={`w-full px-3 py-2 rounded-md border ${
                isDark
                  ? 'bg-[#1f1f1f] text-white placeholder-gray-400 border-gray-600'
                  : 'bg-white text-black placeholder-gray-500 border-gray-300'
              }`}
              required
              value={user?.email}
              readOnly
            />
          </div>

          <input
            type="submit"
            value="Update"
            className="w-full md:w-[250px] h-[45px] border border-[#ffc107] rounded-md mt-4 cursor-pointer bg-[#37a39a] text-white hover:opacity-90 transition"
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
