import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

const EditCategories = () => {
  const { data, isLoading,refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<Array<{ _id?: string; title: string }>>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
        refetch();
      toast.success("Categories updated successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error,refetch]);

  const handleCategoriesAdd = (id: string, value: string) => {
    setCategories((prevCategory) =>
      prevCategory.map((i) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: Array<{ _id?: string; title: string }>,
    newCategories: Array<{ _id?: string; title: string }>
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: Array<{ _id?: string; title: string }>) => {
    return categories.some((q) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories &&
            categories.map((item, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder="Enter category title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory) =>
                          prevCategory.filter((i) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
            ${
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"
            }
            !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;






















// import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
// import React, { useEffect, useState, useMemo } from 'react';
// import Loader from '../../Loader/Loader';
// import { styles } from '@/app/styles/style';
// import { AiOutlineDelete } from 'react-icons/ai';
// import { IoMdAddCircleOutline } from 'react-icons/io';
// import toast from 'react-hot-toast';
// import { useTheme } from 'next-themes';

// type Category = {
//   _id: string;
//   title: string;
// };

// const generateTempId = () => {
//   if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
//   return String(Date.now()) + Math.random();
// };

// const EditCategories: React.FC = () => {
//   const {theme} = useTheme();
//   const isDark = theme === "dark";

//   const { data, isLoading, refetch, isError } = useGetHeroDataQuery('Categories', {
//     refetchOnMountOrArgChange: true,
//   });

//   const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();

//   const originalCategories: Category[] = useMemo(() => {
//     const raw = data?.layout?.categories || [];
//     return raw.map((c: any) => ({
//       _id: c._id || generateTempId(),
//       title: c.title || '',
//     }));
//   }, [data]);

//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     if (data?.layout?.categories) {
//       setCategories(originalCategories);
//     }

//     if (layoutSuccess) {
//       refetch();
//       toast.success('Categories updated successfully');
//     }

//     if (error) {
//       if ('data' in (error as any)) {
//         const err = error as any;
//         toast.error(err?.data?.message || 'Update failed');
//       } else {
//         toast.error('Update failed');
//       }
//     }
//   }, [data, layoutSuccess, error, refetch, originalCategories]);

//   const handleCategoriesAdd = (id: string, value: string) => {
//     setCategories((prev) =>
//       prev.map((i) => (i._id === id ? { ...i, title: value } : i))
//     );
//   };

//   const newCategoriesHandler = () => {
//     if (categories.length > 0 && categories[categories.length - 1].title.trim() === '') {
//       toast.error('Category title cannot be empty');
//       return;
//     }
//     setCategories((prev) => [
//       ...prev,
//       {
//         _id: generateTempId(),
//         title: '',
//       },
//     ]);
//   };

//   const areCategoriesUnchanged = (orig: Category[], neu: Category[]) => {
//     return JSON.stringify(orig) === JSON.stringify(neu);
//   };

//   const isAnyCategoryTitleEmpty = (cats: Category[]) => {
//     return cats.some((q) => q.title.trim() === '');
//   };

//   const editCategoriesHandler = async () => {
//     if (
//       !areCategoriesUnchanged(originalCategories, categories) &&
//       !isAnyCategoryTitleEmpty(categories)
//     ) {
//       await editLayout({
//         type: 'Categories',
//         categories: categories.map((c) => ({ title: c.title })), // backend expects only title
//       });
//     }
//   };

//   if (isLoading) return <Loader />;
//   if (isError || !data?.layout) {
//     return (
//       <div className="mt-[60px] text-center">
//         <h1 className={`${styles.title}`}>All Categories</h1>
//         <p className="text-red-500">Failed to load categories.</p>
//       </div>
//     );
//   }

//   const saveDisabled =
//     areCategoriesUnchanged(originalCategories, categories) ||
//     isAnyCategoryTitleEmpty(categories);

//   return (
//     <div className={`mt-[20px] p-5 text-center relative ${
//         isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//       <h1 className={`${styles.title}  ${
//         isDark ? "bg-black text-white" : "bg-white text-black"}`}>All Categories</h1>
//       {categories.map((item) => (
//         <div className="p-3" key={item._id}>
//           <div className={`flex items-center w-full justify-center ${
//         isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//             <input
//               className={` ${
//         isDark ? "bg-black text-white" : "bg-white text-black"} ${styles.input} !w-[unset] !border-none !text-[20px]`}
//               value={item.title}
//               onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
//               placeholder="Enter category title..."
//             />
//             <AiOutlineDelete
//               className={`dark:text-white text-black text-[18px] cursor-pointer ${
//         isDark ? "bg-black text-white" : "bg-white text-black"}`}
//               onClick={() =>
//                 setCategories((prev) => prev.filter((i) => i._id !== item._id))
//               }
//             />
//           </div>
//         </div>
//       ))}
//       <div className={`mt-4 flex justify-center ${
//         isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//         <IoMdAddCircleOutline
//           className={`dark:text-white text-black text-[25px] cursor-pointer ${
//         isDark ? "bg-black text-white" : "bg-white text-black"}`}
//           onClick={newCategoriesHandler}
//         />
//       </div>
//       <div
//         className={`  ${
//         isDark ? "bg-black text-white" : "bg-white text-black"}
//           ${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black 
//           ${saveDisabled ? '!cursor-not-allowed !bg-[#cccccc34]' : '!cursor-pointer !bg-[#42d383]'}
//           !rounded absolute bottom-12 right-12
//         `}
//         onClick={saveDisabled ? undefined : editCategoriesHandler}
//       >
//         Save
//       </div>
//     </div>
//   );
// };

// export default EditCategories;
