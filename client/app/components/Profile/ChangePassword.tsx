import { styles } from '@/app/styles/style';
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import { useTheme } from 'next-themes';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {};

const ChangePassword: FC<Props> = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        toast.error("Password does not matched")
    } else {
        await updatePassword({ oldPassword,newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
        toast.success("Password changed successfully");
    }
    if (error) {
        if ("data" in error) {
            const errorData = error as any;
            toast.error(errorData.data.message);
        }
    }
  }, [isSuccess,error])

  return (
    <div
      className={`w-full flex justify-center ml-2 py-10 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className={`w-full max-w-2xl ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <h1 className="block text-[24px] ld:text-[30px] font-Poppins text-center font-[500] pb-2">
          Change Password
        </h1>
        <div className="w-full">
          <form
            aria-required
            onSubmit={passwordChangeHandler}
            className="flex flex-col items-center"
          >
            {/* Old Password Field */}
            <div className="w-[100%] md:w-[80%] mt-5 ">
              <label className={`block pb-2 text-black dark:text-white ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
                Enter your old password
              </label>
              <input
                type="password"
                className={`${styles.input} w-full mb-4 text-black dark:text-white ${
                isDark
                  ? 'bg-[#1f1f1f] text-white placeholder-gray-400 border-gray-600'
                  : 'bg-white text-black placeholder-gray-500 border-gray-300'
              }`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            {/* New Password Field */}
            <div className="w-[100%] md:w-[80%]">
              <label className={`block pb-2 text-black dark:text-white ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
                Enter your new password
              </label>
              <input
                type="password"
                className={`${styles.input} w-full mb-4 text-black dark:text-white ${
                isDark
                  ? 'bg-[#1f1f1f] text-white placeholder-gray-400 border-gray-600'
                  : 'bg-white text-black placeholder-gray-500 border-gray-300'
              }`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="w-[100%] md:w-[80%]">
              <label className={`block pb-2 text-black dark:text-white ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
                Enter your confirm password
              </label>
              <input
                type="password"
                className={`${styles.input} w-full mb-4 text-black dark:text-white ${
                isDark
                  ? 'bg-[#1f1f1f] text-white placeholder-gray-400 border-gray-600'
                  : 'bg-white text-black placeholder-gray-500 border-gray-300'
              }`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input
                type="submit"
                value="Update"
                className="w-full md:w-[250px] h-[40px] border border-[#ffc107] text-center rounded-[5px] mt-5 cursor-pointer text-black bg-[#37a39a] hover:opacity-90 transition"
              />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;