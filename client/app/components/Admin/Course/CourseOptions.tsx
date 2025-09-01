import { useTheme } from 'next-themes';
import React, { FC } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const options = [
    'Course Information',
    'Course Options',
    'Course Content',
    'Course Preview',
  ];

  return (
    <div className={`space-y-4 pr-7 rounded-xl ${isDark ? 'bg-black' : 'bg-white'} shadow-md`}>
      {options.map((option: any, index: number) => {
        const isActive = active === index;
        const isCompleted = active >= index;

        return (
          <div key={index} className="flex items-start space-x-3 relative">
            {/* Icon circle */}
            <div className="relative">
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center
                  ${isCompleted ? 'bg-blue-500' : isDark ? 'bg-[#333]' : 'bg-gray-300'}
                  ${isDark ? 'text-white' : 'text-black'}
                `}
              >
                <IoMdCheckmark className="text-xs sm:text-sm" />
              </div>

              {/* Vertical line */}
              {index !== options.length - 1 && (
                <div
                  className={`absolute left-1/2 top-full transform -translate-x-1/2 w-[2px] h-6 sm:h-7
                    ${isCompleted ? 'bg-blue-500' : isDark ? 'bg-[#444]' : 'bg-gray-300'}
                  `}
                />
              )}
            </div>

            {/* Step label */}
            <h5
              className={`text-sm sm:text-base font-medium leading-6 ${
                isActive
                  ? isDark
                    ? 'text-white'
                    : 'text-black'
                  : isDark
                  ? 'text-gray-300'
                  : 'text-gray-600'
              }`}
            >
              {option}
            </h5>
          </div>
        );
      })}
    </div>
  );
};

export default CourseOptions;
