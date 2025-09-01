import { styles } from "../../../styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/features/layout/layoutApi";
import React, { FC, useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { useTheme } from "next-themes";

type Props = {};

const EditHero: FC<Props> = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading, isSuccess, error, isError }] =
    useEditLayoutMutation();

  useEffect(() => {
    if (data?.layout?.banner) {
      setTitle(data.layout.banner.title || "");
      setSubTitle(data.layout.banner.subTitle || "");
      setImage(data.layout.banner.image?.url || "");
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
  }, [isSuccess, refetch]);

  useEffect(() => {
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errAny = error as any;
      const msg =
        errAny?.data?.message || errAny?.error || "Failed to update hero.";
      toast.error(msg);
    }
  }, [isError, error]);

  const isDirty = useMemo(() => {
    const fetched = data?.layout?.banner;
    return (
      fetched?.title !== title ||
      fetched?.subTitle !== subTitle ||
      fetched?.image?.url !== image
    );
  }, [data, title, subTitle, image]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      if (reader.readyState === 2) {
        setImage(ev.target?.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = async () => {
    if (!isDirty) return;
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  
  return (
    <div
      className={`w-full flex flex-col lg:flex-row pl-5 gap-2 items-start relative ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      } transition duration-300`} >
      {/* Left: small circular background + image */}
  {/* Left: rounded image with circular background + camera icon overlay */}
<div className="flex justify-start items-center z-10">
  <div className="relative w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] xl:w-[500px] xl:h-[500px]">
    {/* circular background */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#39c1f3] to-[#0f121f]" />

    {/* image */}
    <div className="relative z-10 w-full h-full rounded-full overflow-hidden flex items-center justify-center">
      <img
        src={image || "/placeholder.png"}
        alt="Hero"
        className="object-cover"
      />
    </div>

    {/* hidden file input */}
    <input
      type="file"
      id="banner"
      accept="image/*"
      onChange={handleUpdate}
      className="hidden"
    />

    {/* camera icon label */}
    <label
      htmlFor="banner"
      className="absolute right-3 mt-2 mr-24 lg:mt-[-70px] z-30 flex items-center justify-center rounded-full shadow cursor-pointer"
      aria-label="Change hero image"
    >
      <AiOutlineCamera size={22} className="" />
    </label>
  </div>
</div>



      {/* Right: text inputs + save button */}
      <div className="lg:w-[50%] flex flex-col justify-between relative">
        <div className="flex-grow">
          <textarea
            className="text-[40px] pt-9 px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-[600] font-Josefin 1000px:leading-[75px] outline-none bg-transparent block"
            placeholder="Improve Your Online Learning Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={3}
          />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
            className="pl-4 font-serif font-[500] text-[16px] lg:text-[18px] mt-4 text-opacity-90"
            rows={3}
            cols={35}
          />
        </div>

        <div className="flex justify-end mt-16 pr-4 ">
          <button
            type="button"
            onClick={handleEdit}
            disabled={!isDirty || isLoading}
            className={`
              ${styles.button} flex items-center justify-center gap-2 !w-[120px] !min-h-[40px] !h-[40px] font-semibold rounded 
              transition
              ${
                isDirty
                  ? "cursor-pointer !bg-[#42d383]"
                  : "cursor-not-allowed bg-[#cccccc34]"
              }
              relative
            `}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHero;
