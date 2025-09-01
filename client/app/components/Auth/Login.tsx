'use client';

import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yub from 'yup';
import { styles } from '../../styles/style';
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { signIn } from 'next-auth/react'; // ✅ Corrected import

type Props = {
  setRoute?: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yub.object().shape({
  email: Yub.string().email('Invalid email!').required('Please enter your email!'),
  password: Yub.string().required('Please enter your password!').min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login successfully');
      setOpen(false);
    }
    if (error && 'data' in error) {
      const err = error as any;
      toast.error(err.data.message);
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  if (!mounted) return null;

  return (
    <div
      className={`w-full rounded-[12px] p-2 ${isDark ? 'text-white bg-slate-900' : 'text-black bg-white'}`}
    >
      <h1 className="text-[25px] font-Poppins text-center font-[500] p-3">Login With ELearning</h1>

      <form onSubmit={handleSubmit}>
        <label className={`${styles.label} ${isDark ? 'text-white' : 'text-black'}`} htmlFor="email">
          Enter your Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="email"
          className={`${errors.email && touched.email ? 'border-red-500' : ''} ${styles.input} ${
            isDark ? 'bg-[#374151] text-white' : 'bg-white text-black'
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label} ${isDark ? 'text-white' : 'text-black'}`} htmlFor="password">
            Enter your Password
          </label>
          <input
            type={show ? 'text' : 'password'}
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
            className="absolute right-2 top-[53px] cursor-pointer text-gray-700 dark:text-gray-300"
            onClick={() => setShow(!show)}
          >
            {show ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
          </div>
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}

        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>

        <br />
        <h5 className={`text-center font-Poppins text-[16px] ${isDark ? 'text-white' : 'text-black'}`}>
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" onClick={() => signIn('google')} />
          <AiFillGithub size={30} className="cursor-pointer ml-2" onClick={() => signIn('github')} />
        </div>

        {setRoute && (
          <h5 className="text-center font-Poppins text-[15px]">
            Not have any account?
            <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => setRoute('Sign-Up')}>
              Sign up
            </span>
          </h5>
        )}
      </form>
    </div>
  );
};

export default Login;
