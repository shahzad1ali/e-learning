import React from 'react'
import { styles } from '../styles/style';
import { useTheme } from 'next-themes';

type Props = {}

const Policy = (props: Props) => {
      const {theme} = useTheme();
       const isDark = theme === 'dark'
  return (
    <div>
      <div className="w-[95%] 800px:w-[92%] mt-6 lg:mt-16 m-auto py-2 px-3">
        <h1 className={`${styles.title} !text-start pt-6 font-bold`}>
          Platform Terms and Condition
        </h1>

        <ul style={{ listStyle: "unset", marginLeft: "15px" }} className='text-[18px]'>
          <p className="py-2 ml-[-15px] font-Poppins leading-8 whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facere
            blanditiis architecto quasi impedit in dicta nisi, asperiores
            voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
            accusantium quod numquam dolores! Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Facere blanditiis architecto quasi
            impedit in dicta nisi, asperiores voluptatum eos alias facilis
            assumenda ex beatae, culpa dignissimos accusantium quod numquam
            dolores!
          </p>
          <br />
          <p className="py-2 ml-[-15px] font-Poppins leading-8 whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facere
            blanditiis architecto quasi impedit in dicta nisi, asperiores
            voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
            accusantium quod numquam dolores! Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Facere blanditiis architecto quasi
            impedit in dicta nisi, asperiores voluptatum eos alias facilis
            assumenda ex beatae, culpa dignissimos accusantium quod numquam
            dolores!
          </p>
          <br />
             <p className="py-2 ml-[-15px] font-Poppins leading-8 whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facere
            blanditiis architecto quasi impedit in dicta nisi, asperiores
            voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
            accusantium quod numquam dolores! Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Facere blanditiis architecto quasi
            impedit in dicta nisi, asperiores voluptatum eos alias facilis
            assumenda ex beatae, culpa dignissimos accusantium quod numquam
            dolores!
          </p>
          <br />
             <p className="py-2 ml-[-15px] font-Poppins leading-8 whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facere
            blanditiis architecto quasi impedit in dicta nisi, asperiores
            voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
            accusantium quod numquam dolores! Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Facere blanditiis architecto quasi
            impedit in dicta nisi, asperiores voluptatum eos alias facilis
            assumenda ex beatae, culpa dignissimos accusantium quod numquam
            dolores!
          </p>
          <br />
             <p className="py-2 ml-[-15px] font-Poppins leading-8 whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facere
            blanditiis architecto quasi impedit in dicta nisi, asperiores
            voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
            accusantium quod numquam dolores! Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Facere blanditiis architecto quasi
            impedit in dicta nisi, asperiores voluptatum eos alias facilis
            assumenda ex beatae, culpa dignissimos accusantium quod numquam
            dolores!
          </p>
          <br />
             <p className="py-2 ml-[-15px] font-Poppins leading-8 whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facere
            blanditiis architecto quasi impedit in dicta nisi, asperiores
            voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
            accusantium quod numquam dolores! Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Facere blanditiis architecto quasi
            impedit in dicta nisi, asperiores voluptatum eos alias facilis
            assumenda ex beatae, culpa dignissimos accusantium quod numquam
            dolores!
          </p>
          <br />
        </ul>
      </div>
    </div>
  );
};


export default Policy