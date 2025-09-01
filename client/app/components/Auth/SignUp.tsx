'use client';

import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yub from 'yup';
import { styles } from '../../styles/style';
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FcGoogle } from 'react-icons/fc';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yub.object().shape({
  name: Yub.string().required("Please enter your name!"),
  email: Yub.string().email('Invalid email!').required('Please enter your email!'),
  password: Yub.string().required('Please enter your password!').min(6),
});

const SignUp: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [register,{data,error,isSuccess}] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data.message || 'Registration Successful';
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess,error])

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name, email, password
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div
      className={`w-full rounded-[12px] mt-9 p-4 ${
        isDark ? 'text-white bg-slate-900' : 'text-black bg-white'
      }`}
    >
      <h1 className="text-[25px] font-Poppins text-center font-[500] p-3">
        Join to ELearning
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label className={`${styles.label} ${isDark ? 'text-white' : 'text-black'}`} htmlFor="name">
            Enter your Name
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Shahzad Ali"
            className={`${errors.name && touched.name ? 'border-red-500' : ''} ${styles.input} ${
              isDark ? 'bg-[#374151] text-white' : 'bg-white text-black'
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label className={`${styles.label} ${isDark ? 'text-white' : 'text-black'}`} htmlFor="email">
            Enter your Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="shahzadmobi619@gmail.com"
            className={`${errors.email && touched.email ? 'border-red-500' : ''} ${styles.input} ${
              isDark ? 'bg-[#374151] text-white' : 'bg-white text-black'
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-3 relative">
          <label className={`${styles.label} ${isDark ? 'text-white' : 'text-black'}`} htmlFor="password">
            Enter your Password
          </label>
          <input
            type={!show ? 'password' : 'text'}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${errors.password && touched.password ? 'border-red-500' : ''} ${styles.input} ${
              isDark ? 'bg-[#374151] text-white' : 'bg-white text-black'
            }`}
          />
          <div
            className="absolute right-2 top-[52px] cursor-pointer text-gray-700 dark:text-gray-300"
            onClick={() => setShow(!show)}
          >
            {show ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
          </div>
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full mt-4">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>

        {/* Social Login */}
        <div className="mt-4">
          <h5 className={`text-center font-Poppins text-[16px] ${isDark ? 'text-white' : 'text-black'}`}>
            Or join with
          </h5>
          <div className="flex items-center justify-center my-2">
            <FcGoogle size={30} className="cursor-pointer mr-2" />
            <AiFillGithub size={30} className="cursor-pointer ml-2" />
          </div>
        </div>

        {/* Switch to Sign In */}
        <h5 className="text-center mt-2 font-Poppins text-[15px]">
          Already have an account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute('Login')}
          >
            Sign in
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
