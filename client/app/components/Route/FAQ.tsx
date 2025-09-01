import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {};

const FAQ = (props: Props) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const themeClasses = isDark ? 'bg-black text-white' : 'bg-white text-black';

    const { data } = useGetHeroDataQuery('FAQ', {});
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setQuestions(data.layout.faq);
        }
    }, [data]);

    const toggleQuestion = (id: any) => {
        setActiveQuestion(activeQuestion === id ? null : id);
    };

    return (
        <div>
            <div className={`w-[90%] 800px:w-[80%] m-auto ${themeClasses}`}>
                <h1 className={`${styles.title} 800px:text-[40px] ${themeClasses}`}>
                    Frequently Asked Questions
                </h1>
                <div className={`mt-12 ${themeClasses}`}>
                    <dl className={`space-y-8 ${themeClasses}`}>
                        {questions.map((q) => (
                            <div
                                key={q._id}
                                className={`${themeClasses} ${
                                    q._id !== questions[0]?._id && 'border-t'
                                } border-gray-200 pt-6`}
                            >
                                <dt className={`text-lg ${themeClasses}`}>
                                    <button
                                        className={`flex items-start justify-between w-full text-left focus:outline-none ${themeClasses}`}
                                        onClick={() => toggleQuestion(q._id)}
                                    >
                                        <span className={`font-medium ${themeClasses}`}>
                                            {q.question}
                                        </span>
                                        <span className={`ml-6 flex-shrink-0 ${themeClasses}`}>
                                            {activeQuestion === q._id ? (
                                                <HiMinus className={`h-6 w-6 ${themeClasses}`} />
                                            ) : (
                                                <HiPlus className={`h-6 w-6 ${themeClasses}`} />
                                            )}
                                        </span>
                                    </button>
                                </dt>
                                {activeQuestion === q._id && (
                                    <dd className={`mt-2 pr-12 ${themeClasses}`}>
                                        <p className={`text-base font-Poppins ${themeClasses}`}>
                                            {q.answer}
                                        </p>
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                </div>
                <br />
                <br />
                <br />
            </div>
        </div>
    );
};

export default FAQ;
























// import { styles } from '@/app/styles/style';
// import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
// import { useTheme } from 'next-themes';
// import React, { useEffect, useState } from 'react'
// import { HiMinus, HiPlus } from 'react-icons/hi';

// type Props = {}

// const FAQ = (props: Props) => {

//     const {theme} = useTheme();
//       const isDark = theme === 'dark'

//     const {data} = useGetHeroDataQuery("FAQ", {
//     });
//     const [activeQuestion,setActiveQuestion] = useState(null);
//     const [questions,setQuestions] = useState<any[]>([]);
//     useEffect(() => {
//         if (data) {
//            setQuestions(data.layout.faq); 
//         }
//     }, [data]);

//     const toggleQuestion = (id: any) => {
//         setActiveQuestion(activeQuestion === id ? null : id);
//     };

//   return (
//     <div>
//         <div className={`w-[90%] 800px:w-[80%] m-auto ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//             <h1 className={`${styles.title} ${isDark ? 'bg-black text-white' : 'bg-white text-black'} 800px:text-[40px]`}>
//                 Frequently Asked Questions
//             </h1>
//             <div className={`mt-12 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                 <dl className={`space-y-8 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                     {questions.map((q) => (
//                         <div key={q.id} className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} ${q._id !== questions[0]?._id && "border-t"} border-gray-200 pt-6`}>
//                             <dt className={`text-lg ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                                 <button className={`flex items-start justify-between w-full text-left focus:outline-none ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} onClick={() => toggleQuestion(q._id)}>
//                          <span className={`font-medium text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>{q.question} </span>
//                       <span className={`ml-6 flex-shrink-0 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>{activeQuestion === q._id ? (
//                         <HiMinus className={`h-6 w-6 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} />
//                       ) : (
//                      <HiPlus className={`h-6 w-6 text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`} />

//                       ) }
//                        </span>
//                                 </button>
//                             </dt>
//                             {activeQuestion === q._id && (
//                                 <dd className={`mt-2 pr-12 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
//                                     <p className={`text-base font-Poppins text-black dark:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>{q.answer} </p>
//                                 </dd>
//                             )}
//                         </div>
//                     ))}
//                 </dl>
//             </div>
//             <br />
//             <br />
//             <br />
//         </div>
//     </div>
//   )
// }

// export default FAQ