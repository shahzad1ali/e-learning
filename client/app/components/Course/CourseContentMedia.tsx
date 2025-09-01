
import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import { format } from "timeago.js";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import { useTheme } from "next-themes";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const course = courseData?.course;
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();
  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  // Track emitted notifications to prevent duplicates
  const lastEmitted = useRef<{ [key: string]: number }>({});

  // Socket setup and listener
  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    // Join user-specific room
    socket.emit("join", user._id);

    // Listen for connection
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    // Listen for new notifications
    socket.on("newNotification", (notificationData) => {
      console.log("Received notification:", notificationData);
      if (notificationData.courseId === id) {
        refetch();
        courseRefetch();
        toast.success(notificationData.message);
      }
    });

    // Handle connection errors
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      toast.error("Failed to connect to real-time updates");
    });

    // Cleanup on unmount
    return () => {
      socket.off("newNotification");
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [user._id, id, refetch, courseRefetch]);

  // Handle mutation success and errors
  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    const emitNotification = (key: string, title: string, message: string, userId: string) => {
      const now = Date.now();
      // Prevent duplicate emissions within 1 second
      if (lastEmitted.current[key] && now - lastEmitted.current[key] < 1000) {
        console.log(`Skipped duplicate notification: ${key}`);
        return;
      }
      lastEmitted.current[key] = now;
      console.log(`Emitting ${key} notification to userId:`, userId);
      socket.emit("notification", {
        title,
        message,
        userId,
        courseId: id,
      });
    };

    if (isSuccess) {
      setQuestion("");
      refetch();
      emitNotification(
        "question",
        "New Question Received",
        `You have a new question in ${data[activeVideo]?.title}`,
        course?.createdBy?._id || "admin-user-id"
      );
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      const question = data[activeVideo]?.questions.find(
        (q: any) => q._id === questionId
      );
      emitNotification(
        "answer",
        "New Reply Received",
        `You have a new reply in ${data[activeVideo]?.title}`,
        question?.user?._id
      );
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      emitNotification(
        "review",
        "New Review Received",
        `You have a new review in ${data[activeVideo]?.title}`,
        course?.createdBy?._id || "admin-user-id"
      );
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
      const review = course?.reviews.find((r: any) => r._id === reviewId);
      emitNotification(
        "reply",
        "New Reply to Review Received",
        `You have a new reply to your review in ${data[activeVideo]?.title}`,
        review?.user?._id
      );
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message || "An error occurred while adding the question");
      } else {
        toast.error("An unexpected error occurred while adding the question");
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message || "An error occurred while adding the answer");
      } else {
        toast.error("An unexpected error occurred while adding the answer");
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message || "An error occurred while adding the review");
      } else {
        toast.error("An unexpected error occurred while adding the review");
      }
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage.data.message || "An error occurred while adding the reply");
      } else {
        toast.error("An unexpected error occurred while adding the reply");
      }
    }

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
    refetch,
    courseRefetch,
    course,
    questionId,
    reviewId,
    data,
    activeVideo,
    id,
  ]);

  const handleQuestion = () => {
    const contentId = data[activeVideo]?._id?.toString();
    console.log("Sending question with:", { question, courseId: id, contentId });
    console.log("data[activeVideo]:", data[activeVideo]);
    console.log("Full data:", data);
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else if (!contentId || !/^[0-9a-fA-F]{24}$/.test(contentId)) {
      toast.error(`Invalid content ID: ${contentId}`);
    } else {
      addNewQuestion({ question, courseId: id, contentId });
    }
  };

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    const reviewIdStr = reviewId?.toString();
    console.log("Sending reply with reviewId:", reviewIdStr);
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else if (!reviewIdStr || !/^[0-9a-fA-F]{24}$/.test(reviewIdStr)) {
        toast.error("Invalid review ID");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId: reviewIdStr });
      }
    }
  };

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`w-[95%] 800px:w-[86%] pb-6 py-4 m-auto ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          } ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${styles.button} !w-[unset] text-white !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          } ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={() =>
            setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className={`pt-2 text-[25px] font-[600] ${isDark ? "text-white" : "text-black"}`}>
        {data[activeVideo].title}
      </h1>
      <br />
      <div
        className={`w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index ? "text-red-500" : isDark ? "text-white" : "text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className={`text-[18px] whitespace-pre-line mb-3 ${isDark ? "text-white" : "text-black"}`}>
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className={`mb-5 ${isDark ? "bg-black text-white" : "bg-white text-black"}`} key={index}>
              <h2 className={`800px:text-[20px] 800px:inline-block ${isDark ? "text-white" : "text-black"}`}>
                {item.title && item.title + " :"}
              </h2>
              <a className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2" href={item.url}>
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className={`outline-none bg-transparent ml-3 border ${
                isDark ? "text-white border-[#ffffff57]" : "text-black border-[#0000001d]"
              } 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins`}
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              } ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className={`w-full h-[1px] ${isDark ? "bg-[#ffffff3b]" : "bg-[#0000003b]"}`}></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className={`pl-3 text-[20px] font-[500] ${isDark ? "text-white" : "text-black"}`}>
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className={`outline-none bg-transparent 800px:ml-3 border ${
                        isDark ? "text-white border-[#ffffff57]" : "text-black border-[#00000027]"
                      } w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins`}
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                      reviewCreationLoading && "cursor-no-drop"
                    } ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
                    onClick={reviewCreationLoading ? () => {} : handleReviewSubmit}
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className={`w-full h-[1px] ${isDark ? "bg-[#ffffff3b]" : "bg-[#0000003b]"}`}></div>
            <div className="w-full">
              {(course?.reviews && [...course.reviews].reverse())?.map((item: any, index: number) => {
                return (
                  <div className={`w-full my-5 ${isDark ? "text-white" : "text-black"}`} key={index}>
                    <div className="w-full flex">
                      <div>
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px]">{item?.user.name}</h1>
                        <Ratings rating={item.rating} />
                        <p>{item.comment}</p>
                        <small className={`${isDark ? "text-[#ffffff83]" : "text-[#0000009e]"}`}>
                          {format(item.createdAt)} •
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" && item.commentReplies.length === 0 && (
                      <span
                        className={`${styles.label} !ml-10 cursor-pointer ${
                          isDark ? "bg-black text-white" : "bg-white text-black"
                        }`}
                        onClick={() => {
                          setIsReviewReply(true);
                          setReviewId(item._id);
                        }}
                      >
                        Add Reply
                      </span>
                    )}
                    {isReviewReply && reviewId === item._id && (
                      <div className="w-full flex relative">
                        <input
                          type="text"
                          placeholder="Enter your reply..."
                          value={reply}
                          onChange={(e: any) => setReply(e.target.value)}
                          className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b p-[5px] w-[95%] ${
                            isDark ? "text-white border-[#fff]" : "text-black border-[#000]"
                          }`}
                        />
                        <button
                          type="submit"
                          className="absolute right-0 bottom-1"
                          onClick={handleReviewReplySubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex 800px:ml-16 my-5" key={index}>
                        <div className="w-[50px] h-[50px]">
                          <Image
                            src={
                              i.user.avatar
                                ? i.user.avatar.url
                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{i.user.name}</h5>{" "}
                            <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                          </div>
                          <p>{i.comment}</p>
                          <small className={`${isDark ? "text-[#ffffff83]" : "text-[#00000083]"}`}>
                            {format(i.createdAt)} •
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  questionId,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <>
      <div className={`w-full my-3 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            questionId={questionId}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  questionId,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={
                item.user.avatar
                  ? item.user.avatar.url
                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className={`pl-3 ${isDark ? "text-white" : "text-black"}`}>
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className={`${isDark ? "text-[#ffffff83]" : "text-[#000000b8]"}`}>
              {!item.createdAt ? "" : format(item?.createdAt)} •
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className={`800px:pl-16 cursor-pointer mr-2 ${isDark ? "text-[#ffffff83]" : "text-[#000000b8]"}`}
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className={`cursor-pointer ${isDark ? "text-[#ffffff83]" : "text-[#000000b8]"}`}
          />
          <span className={`pl-1 mt-[-4px] cursor-pointer ${isDark ? "text-[#ffffff83]" : "text-[#000000b8]"}`}>
            {item.questionReplies.length}
          </span>
        </div>

        {replyActive && questionId === item._id && (
          <>
            {item.questionReplies.map((item: any) => (
              <div className={`w-full flex 800px:ml-16 my-5 ${isDark ? "text-white" : "text-black"}`} key={item._id}>
                <div>
                  <Image
                    src={
                      item.user.avatar
                        ? item.user.avatar.url
                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item.user.name}</h5>{" "}
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{item.answer}</p>
                  <small className={`${isDark ? "text-[#ffffff83]" : "text-[#00000083]"}`}>
                    {format(item.createdAt)} •
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className={`w-full flex relative ${isDark ? "text-white" : "text-black"}`}>
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b p-[5px] w-[95%] ${
                    isDark ? "text-white border-[#fff]" : "text-black border-[#00000027]"
                  } ${answer === "" || (answerCreationLoading && "cursor-not-allowed")}`}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1 cursor-pointer"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;




















// import { styles } from "@/app/styles/style";
// import CoursePlayer from "@/app/utils/CoursePlayer";
// import {
//   useAddAnswerInQuestionMutation,
//   useAddNewQuestionMutation,
//   useAddReplyInReviewMutation,
//   useAddReviewInCourseMutation,
//   useGetCourseDetailsQuery,
// } from "@/redux/features/courses/coursesApi";
// import Image from "next/image";
// import { format } from "timeago.js";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import {
//   AiFillStar,
//   AiOutlineArrowLeft,
//   AiOutlineArrowRight,
//   AiOutlineStar,
// } from "react-icons/ai";
// import { BiMessage } from "react-icons/bi";
// import { VscVerifiedFilled } from "react-icons/vsc";
// import Ratings from "@/app/utils/Ratings";
// import { useTheme } from "next-themes";
// import socketIO from "socket.io-client";

// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';

// type Props = {
//   data: any;
//   id: string;
//   activeVideo: number;
//   setActiveVideo: (activeVideo: number) => void;
//   user: any;
//   refetch: any;
// };

// const CourseContentMedia = ({
//   data,
//   id,
//   activeVideo,
//   setActiveVideo,
//   user,
//   refetch,
// }: Props) => {
//   const [activeBar, setActiveBar] = useState(0);
//   const [question, setQuestion] = useState("");
//   const [review, setReview] = useState("");
//   const [rating, setRating] = useState(1);
//   const [answer, setAnswer] = useState("");
//   const [questionId, setQuestionId] = useState("");
//   const [reply, setReply] = useState("");
//   const [reviewId, setReviewId] = useState("");
//   const [isReviewReply, setIsReviewReply] = useState(false);

//   const [
//     addNewQuestion,
//     { isSuccess, error, isLoading: questionCreationLoading },
//   ] = useAddNewQuestionMutation();
//   const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
//     id,
//     { refetchOnMountOrArgChange: true }
//   );
//   const [
//     addAnswerInQuestion,
//     {
//       isSuccess: answerSuccess,
//       error: answerError,
//       isLoading: answerCreationLoading,
//     },
//   ] = useAddAnswerInQuestionMutation();
//   const course = courseData?.course;
//   const [
//     addReviewInCourse,
//     {
//       isSuccess: reviewSuccess,
//       error: reviewError,
//       isLoading: reviewCreationLoading,
//     },
//   ] = useAddReviewInCourseMutation();
//   const [
//     addReplyInReview,
//     {
//       isSuccess: replySuccess,
//       error: replyError,
//       isLoading: replyCreationLoading,
//     },
//   ] = useAddReplyInReviewMutation();

//   const isReviewExists = course?.reviews?.find(
//     (item: any) => item.user._id === user._id
//   );

//   // Socket setup and listener
//   useEffect(() => {
//     const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

//     // Join user-specific room
//     socket.emit("join", user._id);

//     // Listen for connection
//     socket.on("connect", () => {
//       console.log("Connected to socket server");
//     });

//     // Listen for new notifications
//     socket.on("newNotification", (notificationData) => {
//       console.log("Received notification:", notificationData);
//       if (notificationData.courseId === id) {
//         refetch();
//         courseRefetch();
//         toast.success(notificationData.message);
//       }
//     });

//     // Handle connection errors
//     socket.on("connect_error", (err) => {
//       console.error("Socket connection error:", err);
//       toast.error("Failed to connect to real-time updates");
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off("newNotification");
//       socket.off("connect");
//       socket.off("connect_error");
//       socket.disconnect();
//     };
//   }, [refetch, courseRefetch, id, user._id]);

//   // Handle mutation success and errors
//   useEffect(() => {
//     const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

//     if (isSuccess) {
//       setQuestion("");
//       refetch();
//       socket.emit("notification", {
//         title: `New Question Received`,
//         message: `You have a new question in ${data[activeVideo]?.title}`,
//         userId: course?.createdBy?._id || "admin-user-id", // Notify course owner
//         courseId: id,
//       });
//     }
//     if (answerSuccess) {
//       setAnswer("");
//       refetch();
//       const question = data[activeVideo]?.questions.find(
//         (q: any) => q._id === questionId
//       );
//       socket.emit("notification", {
//         title: `New Reply Received`,
//         message: `You have a new reply in ${data[activeVideo]?.title}`,
//         userId: question?.user?._id, // Notify question asker
//         courseId: id,
//       });
//     }
//     if (reviewSuccess) {
//       setReview("");
//       setRating(1);
//       courseRefetch();
//       socket.emit("notification", {
//         title: `New Review Received`,
//         message: `You have a new review in ${data[activeVideo]?.title}`,
//         userId: course?.createdBy?._id || "admin-user-id", // Notify course owner
//         courseId: id,
//       });
//     }
//     if (replySuccess) {
//       setReply("");
//       courseRefetch();
//       const review = course?.reviews.find((r: any) => r._id === reviewId);
//       socket.emit("notification", {
//         title: `New Reply to Review Received`,
//         message: `You have a new reply to your review in ${data[activeVideo]?.title}`,
//         userId: review?.user?._id, // Notify review author
//         courseId: id,
//       });
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorMessage = error as any;
//         toast.error(errorMessage.data.message || "An error occurred while adding the question");
//       } else {
//         toast.error("An unexpected error occurred while adding the question");
//       }
//     }
//     if (answerError) {
//       if ("data" in answerError) {
//         const errorMessage = answerError as any;
//         toast.error(errorMessage.data.message || "An error occurred while adding the answer");
//       } else {
//         toast.error("An unexpected error occurred while adding the answer");
//       }
//     }
//     if (reviewError) {
//       if ("data" in reviewError) {
//         const errorMessage = reviewError as any;
//         toast.error(errorMessage.data.message || "An error occurred while adding the review");
//       } else {
//         toast.error("An unexpected error occurred while adding the review");
//       }
//     }
//     if (replyError) {
//       if ("data" in replyError) {
//         const errorMessage = replyError as any;
//         toast.error(errorMessage.data.message || "An error occurred while adding the reply");
//       } else {
//         toast.error("An unexpected error occurred while adding the reply");
//       }
//     }
//   }, [
//     isSuccess,
//     error,
//     answerSuccess,
//     answerError,
//     reviewSuccess,
//     reviewError,
//     replySuccess,
//     replyError,
//     refetch,
//     courseRefetch,
//     user._id,
//     course,
//     questionId,
//     reviewId,
//     data,
//     activeVideo,
//     id,
//   ]);

//   const handleQuestion = () => {
//     const contentId = data[activeVideo]?._id?.toString();
//     console.log("Sending question with:", { question, courseId: id, contentId });
//     console.log("data[activeVideo]:", data[activeVideo]);
//     console.log("Full data:", data);
//     if (question.length === 0) {
//       toast.error("Question can't be empty");
//     } else if (!contentId || !/^[0-9a-fA-F]{24}$/.test(contentId)) {
//       toast.error(`Invalid content ID: ${contentId}`);
//     } else {
//       addNewQuestion({ question, courseId: id, contentId });
//     }
//   };

//   const handleAnswerSubmit = () => {
//     addAnswerInQuestion({
//       answer,
//       courseId: id,
//       contentId: data[activeVideo]._id,
//       questionId: questionId,
//     });
//   };

//   const handleReviewSubmit = async () => {
//     if (review.length === 0) {
//       toast.error("Review can't be empty");
//     } else {
//       addReviewInCourse({ review, rating, courseId: id });
//     }
//   };

//   const handleReviewReplySubmit = () => {
//     const reviewIdStr = reviewId?.toString();
//     console.log("Sending reply with reviewId:", reviewIdStr);
//     if (!replyCreationLoading) {
//       if (reply === "") {
//         toast.error("Reply can't be empty");
//       } else if (!reviewIdStr || !/^[0-9a-fA-F]{24}$/.test(reviewIdStr)) {
//         toast.error("Invalid review ID");
//       } else {
//         addReplyInReview({ comment: reply, courseId: id, reviewId: reviewIdStr });
//       }
//     }
//   };

//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   return (
//     <div className={`w-[95%] 800px:w-[86%] pb-6 py-4 m-auto ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//       <CoursePlayer
//         title={data[activeVideo]?.title}
//         videoUrl={data[activeVideo]?.videoUrl}
//       />
//       <div className="w-full flex items-center justify-between my-3">
//         <div
//           className={`${styles.button} text-white !w-[unset] !min-h-[40px] !py-[unset] ${
//             activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
//           } ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//           onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
//         >
//           <AiOutlineArrowLeft className="mr-2" />
//           Prev Lesson
//         </div>
//         <div
//           className={`${styles.button} !w-[unset] text-white !min-h-[40px] !py-[unset] ${
//             data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
//           } ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//           onClick={() =>
//             setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)
//           }
//         >
//           Next Lesson
//           <AiOutlineArrowRight className="ml-2" />
//         </div>
//       </div>
//       <h1 className={`pt-2 text-[25px] font-[600] ${isDark ? "text-white" : "text-black"}`}>
//         {data[activeVideo].title}
//       </h1>
//       <br />
//       <div
//         className={`w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner ${
//           isDark ? "bg-black text-white" : "bg-white text-black"
//         }`}
//       >
//         {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
//           <h5
//             key={index}
//             className={`800px:text-[20px] cursor-pointer ${
//               activeBar === index ? "text-red-500" : isDark ? "text-white" : "text-black"
//             }`}
//             onClick={() => setActiveBar(index)}
//           >
//             {text}
//           </h5>
//         ))}
//       </div>
//       <br />
//       {activeBar === 0 && (
//         <p className={`text-[18px] whitespace-pre-line mb-3 ${isDark ? "text-white" : "text-black"}`}>
//           {data[activeVideo]?.description}
//         </p>
//       )}

//       {activeBar === 1 && (
//         <div>
//           {data[activeVideo]?.links.map((item: any, index: number) => (
//             <div className={`mb-5 ${isDark ? "bg-black text-white" : "bg-white text-black"}`} key={index}>
//               <h2 className={`800px:text-[20px] 800px:inline-block ${isDark ? "text-white" : "text-black"}`}>
//                 {item.title && item.title + " :"}
//               </h2>
//               <a className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2" href={item.url}>
//                 {item.url}
//               </a>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeBar === 2 && (
//         <>
//           <div className="flex w-full">
//             <Image
//               src={
//                 user.avatar
//                   ? user.avatar.url
//                   : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//               }
//               width={50}
//               height={50}
//               alt=""
//               className="w-[50px] h-[50px] rounded-full object-cover"
//             />
//             <textarea
//               name=""
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               id=""
//               cols={40}
//               rows={5}
//               placeholder="Write your question..."
//               className={`outline-none bg-transparent ml-3 border ${
//                 isDark ? "text-white border-[#ffffff57]" : "text-black border-[#0000001d]"
//               } 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins`}
//             ></textarea>
//           </div>
//           <div className="w-full flex justify-end">
//             <div
//               className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${
//                 questionCreationLoading && "cursor-not-allowed"
//               } ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//               onClick={questionCreationLoading ? () => {} : handleQuestion}
//             >
//               Submit
//             </div>
//           </div>
//           <br />
//           <br />
//           <div className={`w-full h-[1px] ${isDark ? "bg-[#ffffff3b]" : "bg-[#0000003b]"}`}></div>
//           <div>
//             <CommentReply
//               data={data}
//               activeVideo={activeVideo}
//               answer={answer}
//               setAnswer={setAnswer}
//               handleAnswerSubmit={handleAnswerSubmit}
//               user={user}
//               questionId={questionId}
//               setQuestionId={setQuestionId}
//               answerCreationLoading={answerCreationLoading}
//             />
//           </div>
//         </>
//       )}

//       {activeBar === 3 && (
//         <div className="w-full">
//           <>
//             {!isReviewExists && (
//               <>
//                 <div className="flex w-full">
//                   <Image
//                     src={
//                       user.avatar
//                         ? user.avatar.url
//                         : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                     }
//                     width={50}
//                     height={50}
//                     alt=""
//                     className="w-[50px] h-[50px] rounded-full object-cover"
//                   />
//                   <div className="w-full">
//                     <h5 className={`pl-3 text-[20px] font-[500] ${isDark ? "text-white" : "text-black"}`}>
//                       Give a Rating <span className="text-red-500">*</span>
//                     </h5>
//                     <div className="flex w-full ml-2 pb-3">
//                       {[1, 2, 3, 4, 5].map((i) =>
//                         rating >= i ? (
//                           <AiFillStar
//                             key={i}
//                             className="mr-1 cursor-pointer"
//                             color="rgb(246,186,0)"
//                             size={25}
//                             onClick={() => setRating(i)}
//                           />
//                         ) : (
//                           <AiOutlineStar
//                             key={i}
//                             className="mr-1 cursor-pointer"
//                             color="rgb(246,186,0)"
//                             size={25}
//                             onClick={() => setRating(i)}
//                           />
//                         )
//                       )}
//                     </div>
//                     <textarea
//                       name=""
//                       value={review}
//                       onChange={(e) => setReview(e.target.value)}
//                       id=""
//                       cols={40}
//                       rows={5}
//                       placeholder="Write your comment..."
//                       className={`outline-none bg-transparent 800px:ml-3 border ${
//                         isDark ? "text-white border-[#ffffff57]" : "text-black border-[#00000027]"
//                       } w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins`}
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div className="w-full flex justify-end">
//                   <div
//                     className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
//                       reviewCreationLoading && "cursor-no-drop"
//                     } ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
//                     onClick={reviewCreationLoading ? () => {} : handleReviewSubmit}
//                   >
//                     Submit
//                   </div>
//                 </div>
//               </>
//             )}
//             <br />
//             <div className={`w-full h-[1px] ${isDark ? "bg-[#ffffff3b]" : "bg-[#0000003b]"}`}></div>
//             <div className="w-full">
//               {(course?.reviews && [...course.reviews].reverse())?.map((item: any, index: number) => {
//                 return (
//                   <div className={`w-full my-5 ${isDark ? "text-white" : "text-black"}`} key={index}>
//                     <div className="w-full flex">
//                       <div>
//                         <Image
//                           src={
//                             item.user.avatar
//                               ? item.user.avatar.url
//                               : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                           }
//                           width={50}
//                           height={50}
//                           alt=""
//                           className="w-[50px] h-[50px] rounded-full object-cover"
//                         />
//                       </div>
//                       <div className="ml-2">
//                         <h1 className="text-[18px]">{item?.user.name}</h1>
//                         <Ratings rating={item.rating} />
//                         <p>{item.comment}</p>
//                         <small className={`${isDark ? "text-[#ffffff83]" : "text-[#0000009e]"}`}>
//                           {format(item.createdAt)} •
//                         </small>
//                       </div>
//                     </div>
//                     {user.role === "admin" && item.commentReplies.length === 0 && (
//                       <span
//                         className={`${styles.label} !ml-10 cursor-pointer ${
//                           isDark ? "bg-black text-white" : "bg-white text-black"
//                         }`}
//                         onClick={() => {
//                           setIsReviewReply(true);
//                           setReviewId(item._id);
//                         }}
//                       >
//                         Add Reply
//                       </span>
//                     )}
//                     {isReviewReply && reviewId === item._id && (
//                       <div className="w-full flex relative">
//                         <input
//                           type="text"
//                           placeholder="Enter your reply..."
//                           value={reply}
//                           onChange={(e: any) => setReply(e.target.value)}
//                           className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b p-[5px] w-[95%] ${
//                             isDark ? "text-white border-[#fff]" : "text-black border-[#000]"
//                           }`}
//                         />
//                         <button
//                           type="submit"
//                           className="absolute right-0 bottom-1"
//                           onClick={handleReviewReplySubmit}
//                         >
//                           Submit
//                         </button>
//                       </div>
//                     )}
//                     {item.commentReplies.map((i: any, index: number) => (
//                       <div className="w-full flex 800px:ml-16 my-5" key={index}>
//                         <div className="w-[50px] h-[50px]">
//                           <Image
//                             src={
//                               i.user.avatar
//                                 ? i.user.avatar.url
//                                 : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                             }
//                             width={50}
//                             height={50}
//                             alt=""
//                             className="w-[50px] h-[50px] rounded-full object-cover"
//                           />
//                         </div>
//                         <div className="pl-2">
//                           <div className="flex items-center">
//                             <h5 className="text-[20px]">{i.user.name}</h5>{" "}
//                             <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
//                           </div>
//                           <p>{i.comment}</p>
//                           <small className={`${isDark ? "text-[#ffffff83]" : "text-[#00000083]"}`}>
//                             {format(i.createdAt)} •
//                           </small>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         </div>
//       )}
//     </div>
//   );
// };

// const CommentReply = ({
//   data,
//   activeVideo,
//   answer,
//   setAnswer,
//   handleAnswerSubmit,
//   questionId,
//   setQuestionId,
//   answerCreationLoading,
// }: any) => {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";
//   return (
//     <>
//       <div className={`w-full my-3 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
//         {data[activeVideo].questions.map((item: any, index: any) => (
//           <CommentItem
//             key={index}
//             data={data}
//             activeVideo={activeVideo}
//             item={item}
//             index={index}
//             answer={answer}
//             setAnswer={setAnswer}
//             questionId={questionId}
//             setQuestionId={setQuestionId}
//             handleAnswerSubmit={handleAnswerSubmit}
//             answerCreationLoading={answerCreationLoading}
//           />
//         ))}
//       </div>
//     </>
//   );
// };

// const CommentItem = ({
//   questionId,
//   setQuestionId,
//   item,
//   answer,
//   setAnswer,
//   handleAnswerSubmit,
//   answerCreationLoading,
// }: any) => {
//   const [replyActive, setReplyActive] = useState(false);
//   const { theme } = useTheme();
//   const isDark = theme === "dark";
//   return (
//     <>
//       <div className="my-4">
//         <div className="flex mb-2">
//           <div>
//             <Image
//               src={
//                 item.user.avatar
//                   ? item.user.avatar.url
//                   : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//               }
//               width={50}
//               height={50}
//               alt=""
//               className="w-[50px] h-[50px] rounded-full object-cover"
//             />
//           </div>
//           <div className={`pl-3 ${isDark ? "text-white" : "text-black"}`}>
//             <h5 className="text-[20px]">{item?.user.name}</h5>
//             <p>{item?.question}</p>
//             <small className={`${isDark ? "text-[#ffffff83]" : "text-[#000000b8]"}`}>
//               {!item.createdAt ? "" : format(item?.createdAt)} •
//             </small>
//           </div>
//         </div>
//         <div className="w-full flex">
//           <span
//             className={`800px:pl-16 cursor-pointer mr-2 ${isDark ? "text-[#ffffff83]" : "text-[#000000b8]"}`}
//             onClick={() => {
//               setReplyActive(!replyActive);
//               setQuestionId(item._id);
//             }}
//           >
//             {!replyActive
//               ? item.questionReplies.length !== 0
//                 ? "All Replies"
//                 : "Add Reply"
//               : "Hide Replies"}
//           </span>
//           <BiMessage
//             size={20}
//             className={`cursor-pointer ${isDark ? "text-[#ffffff83]" : "text-[#000000b8]"}`}
//           />
//           <span className={`pl-1 mt-[-4px] cursor-pointer ${isDark ? "text-[#ffffff83]" : "text-[#000000b8]"}`}>
//             {item.questionReplies.length}
//           </span>
//         </div>

//         {replyActive && questionId === item._id && (
//           <>
//             {item.questionReplies.map((item: any) => (
//               <div className={`w-full flex 800px:ml-16 my-5 ${isDark ? "text-white" : "text-black"}`} key={item._id}>
//                 <div>
//                   <Image
//                     src={
//                       item.user.avatar
//                         ? item.user.avatar.url
//                         : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                     }
//                     width={50}
//                     height={50}
//                     alt=""
//                     className="w-[50px] h-[50px] rounded-full object-cover"
//                   />
//                 </div>
//                 <div className="pl-3">
//                   <div className="flex items-center">
//                     <h5 className="text-[20px]">{item.user.name}</h5>{" "}
//                     {item.user.role === "admin" && (
//                       <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
//                     )}
//                   </div>
//                   <p>{item.answer}</p>
//                   <small className={`${isDark ? "text-[#ffffff83]" : "text-[#00000083]"}`}>
//                     {format(item.createdAt)} •
//                   </small>
//                 </div>
//               </div>
//             ))}
//             <>
//               <div className={`w-full flex relative ${isDark ? "text-white" : "text-black"}`}>
//                 <input
//                   type="text"
//                   placeholder="Enter your answer..."
//                   value={answer}
//                   onChange={(e: any) => setAnswer(e.target.value)}
//                   className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b p-[5px] w-[95%] ${
//                     isDark ? "text-white border-[#fff]" : "text-black border-[#00000027]"
//                   } ${answer === "" || (answerCreationLoading && "cursor-not-allowed")}`}
//                 />
//                 <button
//                   type="submit"
//                   className="absolute right-0 bottom-1 cursor-pointer"
//                   onClick={handleAnswerSubmit}
//                   disabled={answer === "" || answerCreationLoading}
//                 >
//                   Submit
//                 </button>
//               </div>
//               <br />
//             </>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default CourseContentMedia;





















// import { styles } from "@/app/styles/style";
// import CoursePlayer from "@/app/utils/CoursePlayer";
// import {
//   useAddAnswerInQuestionMutation,
//   useAddNewQuestionMutation,
//   useAddReplyInReviewMutation,
//   useAddReviewInCourseMutation,
//   useGetCourseDetailsQuery,
// } from "@/redux/features/courses/coursesApi";
// import Image from "next/image";
// import { format } from "timeago.js";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import {
//   AiFillStar,
//   AiOutlineArrowLeft,
//   AiOutlineArrowRight,
//   AiOutlineStar,
// } from "react-icons/ai";
// import { BiMessage } from "react-icons/bi";
// import { VscVerifiedFilled } from "react-icons/vsc";
// import Ratings from "@/app/utils/Ratings";
// import socketIO from "socket.io-client";
// import { useTheme } from "next-themes";
// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
// const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

// type Props = {
//   data: any;
//   id: string;
//   activeVideo: number;
//   setActiveVideo: (activeVideo: number) => void;
//   user: any;
//   refetch: any;
// };

// const CourseContentMedia = ({
//   data,
//   id,
//   activeVideo,
//   setActiveVideo,
//   user,
//   refetch,
// }: Props) => {
//   const [activeBar, setactiveBar] = useState(0);
//   const [question, setQuestion] = useState("");
//   const [review, setReview] = useState("");
//   const [rating, setRating] = useState(1);
//   const [answer, setAnswer] = useState("");
//   const [questionId, setQuestionId] = useState("");
//   const [reply, setReply] = useState("");
//   const [reviewId, setReviewId] = useState("");
//   const [isReviewReply, setIsReviewReply] = useState(false);

//   const [
//     addNewQuestion,
//     { isSuccess, error, isLoading: questionCreationLoading },
//   ] = useAddNewQuestionMutation();
//   const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
//     id,
//     { refetchOnMountOrArgChange: true }
//   );
//   const [
//     addAnswerInQuestion,
//     {
//       isSuccess: answerSuccess,
//       error: answerError,
//       isLoading: answerCreationLoading,
//     },
//   ] = useAddAnswerInQuestionMutation();
//   const course = courseData?.course;
//   const [
//     addReviewInCourse,
//     {
//       isSuccess: reviewSuccess,
//       error: reviewError,
//       isLoading: reviewCreationLoading,
//     },
//   ] = useAddReviewInCourseMutation();

//   const [
//     addReplyInReview,
//     {
//       isSuccess: replySuccess,
//       error: replyError,
//       isLoading: replyCreationLoading,
//     },
//   ] = useAddReplyInReviewMutation();

//   const isReviewExists = course?.reviews?.find(
//     (item: any) => item.user._id === user._id
//   );

//  const handleQuestion = () => {
//   const contentId = data[activeVideo]?._id?.toString();
//   console.log("Sending question with:", { question, courseId: id, contentId });
//   console.log("data[activeVideo]:", data[activeVideo]);
//   console.log("Full data:", data);
//   if (question.length === 0) {
//     toast.error("Question can't be empty");
//   } else if (!contentId || !/^[0-9a-fA-F]{24}$/.test(contentId)) {
//     toast.error(`Invalid content ID: ${contentId}`);
//   } else {
//     addNewQuestion({ question, courseId: id, contentId });
//   }
// };

//   useEffect(() => {
//     if (isSuccess) {
//       setQuestion("");
//       refetch();
//       socketId.emit("notification", {
//         title: `New Question Received`,
//         message: `You have a new question in ${data[activeVideo].title}`,
//         userId: user._id,
//       });
//     }
//     if (answerSuccess) {
//       setAnswer("");
//       refetch();
//       if (user.role !== "admin") {
//         socketId.emit("notification", {
//           title: `New Reply Received`,
//           message: `You have a new question in ${data[activeVideo].title}`,
//           userId: user._id,
//         });
//       }
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorMessage = error as any;
//         toast.error(errorMessage.data.message);
//       }
//     }
//     if (answerError) {
//       if ("data" in answerError) {
//         const errorMessage = error as any;
//         toast.error(errorMessage.data.message);
//       }
//     }
//     if (reviewSuccess) {
//       setReview("");
//       setRating(1);
//       courseRefetch();
//       socketId.emit("notification", {
//         title: `New Question Received`,
//         message: `You have a new question in ${data[activeVideo].title}`,
//         userId: user._id,
//       });
//     }
//     if (reviewError) {
//       if ("data" in reviewError) {
//         const errorMessage = error as any;
//         toast.error(errorMessage.data.message);
//       }
//     }
//     if (replySuccess) {
//       setReply("");
//       courseRefetch();
//     }
//     if (replyError) {
//       if ("data" in replyError) {
//         const errorMessage = error as any;
//         toast.error(errorMessage.data.message);
//       }
//     }
//   }, [
//     isSuccess,
//     error,
//     answerSuccess,
//     answerError,
//     reviewSuccess,
//     reviewError,
//     replySuccess,
//     replyError,
//   ]);

//   const handleAnswerSubmit = () => {
//     addAnswerInQuestion({
//       answer,
//       courseId: id,
//       contentId: data[activeVideo]._id,
//       questionId: questionId,
//     });
//   };

//   const handleReviewSubmit = async () => {
//     if (review.length === 0) {
//       toast.error("Review can't be empty");
//     } else {
//       addReviewInCourse({ review, rating, courseId: id });
//     }
//   };

// const handleReviewReplySubmit = () => {
//   const reviewIdStr = reviewId?.toString();  // Ensure string
//   console.log("Sending reply with reviewId:", reviewIdStr);
//   if (!replyCreationLoading) {
//     if (reply === "") {
//       toast.error("Reply can't be empty");
//     } else if (!reviewIdStr || !/^[0-9a-fA-F]{24}$/.test(reviewIdStr)) {
//       toast.error("Invalid review ID");
//     } else {
//       addReplyInReview({ comment: reply, courseId: id, reviewId: reviewIdStr });
//     }
//   }
// };

//   console.log("user data is", user);
//   const { theme } = useTheme();
//     const isDark = theme === 'dark'
  

//   return (
//     <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
//       <CoursePlayer
//         title={data[activeVideo]?.title}
//         videoUrl={data[activeVideo]?.videoUrl}
//       />
//       <div className="w-full flex items-center justify-between my-3">
//         <div
//           className={`${
//             styles.button
//           } text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
//             activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
//           }`}
//           onClick={() =>
//             setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
//           }
//         >
//           <AiOutlineArrowLeft className="mr-2" />
//           Prev Lesson
//         </div>
//         <div
//           className={`${
//             styles.button
//           } !w-[unset] text-white  !min-h-[40px] !py-[unset] ${
//             data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
//           }`}
//           onClick={() =>
//             setActiveVideo(
//               data && data.length - 1 === activeVideo
//                 ? activeVideo
//                 : activeVideo + 1
//             )
//           }
//         >
//           Next Lesson
//           <AiOutlineArrowRight className="ml-2" />
//         </div>
//       </div>
//       <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black ">
//         {data[activeVideo].title}
//       </h1>
//       <br />
//       <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
//         {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
//           <h5
//             key={index}
//             className={`800px:text-[20px] cursor-pointer ${
//               activeBar === index
//                 ? "text-red-500"
//                 : "dark:text-white text-black"
//             }`}
//             onClick={() => setactiveBar(index)}
//           >
//             {text}
//           </h5>
//         ))}
//       </div>
//       <br />
//       {activeBar === 0 && (
//         <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
//           {data[activeVideo]?.description}
//         </p>
//       )}

//       {activeBar === 1 && (
//         <div>
//           {data[activeVideo]?.links.map((item: any, index: number) => (
//             <div className="mb-5" key={index}>
//               <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
//                 {item.title && item.title + " :"}
//               </h2>
//               <a
//                 className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
//                 href={item.url}
//               >
//                 {item.url}
//               </a>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeBar === 2 && (
//         <>
//           <div className="flex w-full">
//             <Image
//               src={
//                 user.avatar
//                   ? user.avatar.url
//                   : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//               }
//               width={50}
//               height={50}
//               alt=""
//               className="w-[50px] h-[50px] rounded-full object-cover"
//             />
//             <textarea
//               name=""
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               id=""
//               cols={40}
//               rows={5}
//               placeholder="Write your question..."
//               className="outline-none bg-transparent ml-3 border dark:text-white text-black border-[#0000001d] dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
//             ></textarea>
//           </div>
//           <div className="w-full flex justify-end">
//             <div
//               className={`${
//                 styles.button
//               } !w-[120px] !h-[40px] text-[18px] mt-5 ${
//                 questionCreationLoading && "cursor-not-allowed"
//               }`}
//               onClick={questionCreationLoading ? () => {} : handleQuestion}
//             >
//               Submit
//             </div>
//           </div>
//           <br />
//           <br />
//           <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
//           <div>
//             <CommentReply
//               data={data}
//               activeVideo={activeVideo}
//               answer={answer}
//               setAnswer={setAnswer}
//               handleAnswerSubmit={handleAnswerSubmit}
//               user={user}
//               questionId={questionId}
//               setQuestionId={setQuestionId}
//               answerCreationLoading={answerCreationLoading}
//             />
//           </div>
//         </>
//       )}

//       {activeBar === 3 && (
//         <div className="w-full">
//           <>
//             {!isReviewExists && (
//               <>
//                 <div className="flex w-full">
//                   <Image
//                     src={
//                       user.avatar
//                         ? user.avatar.url
//                         : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                     }
//                     width={50}
//                     height={50}
//                     alt=""
//                     className="w-[50px] h-[50px] rounded-full object-cover"
//                   />
//                   <div className="w-full">
//                     <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black ">
//                       Give a Rating <span className="text-red-500">*</span>
//                     </h5>
//                     <div className="flex w-full ml-2 pb-3">
//                       {[1, 2, 3, 4, 5].map((i) =>
//                         rating >= i ? (
//                           <AiFillStar
//                             key={i}
//                             className="mr-1 cursor-pointer"
//                             color="rgb(246,186,0)"
//                             size={25}
//                             onClick={() => setRating(i)}
//                           />
//                         ) : (
//                           <AiOutlineStar
//                             key={i}
//                             className="mr-1 cursor-pointer"
//                             color="rgb(246,186,0)"
//                             size={25}
//                             onClick={() => setRating(i)}
//                           />
//                         )
//                       )}
//                     </div>
//                     <textarea
//                       name=""
//                       value={review}
//                       onChange={(e) => setReview(e.target.value)}
//                       id=""
//                       cols={40}
//                       rows={5}
//                       placeholder="Write your comment..."
//                       className="outline-none bg-transparent 800px:ml-3 dark:text-white text-black border border-[#00000027] dark:border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div className="w-full flex justify-end">
//                   <div
//                     className={`${
//                       styles.button
//                     } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
//                       reviewCreationLoading && "cursor-no-drop"
//                     }`}
//                     onClick={
//                       reviewCreationLoading ? () => {} : handleReviewSubmit
//                     }
//                   >
//                     Submit
//                   </div>
//                 </div>
//               </>
//             )}
//             <br />
//             <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
//             <div className="w-full">
//               {(course?.reviews && [...course.reviews].reverse())?.map(
//                 (item: any, index: number) => {
                  
//                   return (
//                     <div className="w-full my-5 dark:text-white text-black" key={index}>
//                       <div className="w-full flex">
//                         <div>
//                           <Image
//                             src={
//                               item.user.avatar
//                                 ? item.user.avatar.url
//                                 : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                             }
//                             width={50}
//                             height={50}
//                             alt=""
//                             className="w-[50px] h-[50px] rounded-full object-cover"
//                           />
//                         </div>
//                         <div className="ml-2">
//                           <h1 className="text-[18px]">{item?.user.name}</h1>
//                           <Ratings rating={item.rating} />
//                           <p>{item.comment}</p>
//                           <small className="text-[#0000009e] dark:text-[#ffffff83]">
//                             {format(item.createdAt)} •
//                           </small>
//                         </div>
//                       </div>
//                       {user.role === "admin" && item.commentReplies.length === 0 && (
//                         <span
//                           className={`${styles.label} !ml-10 cursor-pointer`}
//                           onClick={() => {
//                             setIsReviewReply(true);
//                             setReviewId(item._id);
//                           }}
//                         >
//                           Add Reply
//                         </span>
//                       )}

//                       {isReviewReply && reviewId === item._id && (
//                         <div className="w-full flex relative">
//                           <input
//                             type="text"
//                             placeholder="Enter your reply..."
//                             value={reply}
//                             onChange={(e: any) => setReply(e.target.value)}
//                             className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%]"
//                           />
//                           <button
//                             type="submit"
//                             className="absolute right-0 bottom-1"
//                             onClick={handleReviewReplySubmit}
//                           >
//                             Submit
//                           </button>
//                         </div>
//                       )}

//                       {item.commentReplies.map((i: any, index: number) => (
//                         <div className="w-full flex 800px:ml-16 my-5" key={index}>
//                           <div className="w-[50px] h-[50px]">
//                             <Image
//                               src={
//                                 i.user.avatar
//                                   ? i.user.avatar.url
//                                   : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                               }
//                               width={50}
//                               height={50}
//                               alt=""
//                               className="w-[50px] h-[50px] rounded-full object-cover"
//                             />
//                           </div>
//                           <div className="pl-2">
//                             <div className="flex items-center">
//                               <h5 className="text-[20px]">{i.user.name}</h5>{" "}
//                               <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
//                             </div>
//                             <p>{i.comment}</p>
//                             <small className="text-[#ffffff83]">
//                               {format(i.createdAt)} •
//                             </small>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   );
//                 }
//               )}
//             </div>
//           </>
//         </div>
//       )}
//     </div>
//   );
// };

// const CommentReply = ({
//   data,
//   activeVideo,
//   answer,
//   setAnswer,
//   handleAnswerSubmit,
//   questionId,
//   setQuestionId,
//   answerCreationLoading,
// }: any) => {
//   return (
//     <>
//       <div className="w-full my-3">
//         {data[activeVideo].questions.map((item: any, index: any) => (
//           <CommentItem
//             key={index}
//             data={data}
//             activeVideo={activeVideo}
//             item={item}
//             index={index}
//             answer={answer}
//             setAnswer={setAnswer}
//             questionId={questionId}
//             setQuestionId={setQuestionId}
//             handleAnswerSubmit={handleAnswerSubmit}
//             answerCreationLoading={answerCreationLoading}
//           />
//         ))}
//       </div>
//     </>
//   );
// };

// const CommentItem = ({
//   questionId,
//   setQuestionId,
//   item,
//   answer,
//   setAnswer,
//   handleAnswerSubmit,
//   answerCreationLoading,
// }: any) => {
//   const [replyActive, setreplyActive] = useState(false);
//   return (
//     <>
//       <div className="my-4">
//         <div className="flex mb-2">
//           <div>
//             <Image
//               src={
//                 item.user.avatar
//                   ? item.user.avatar.url
//                   : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//               }
//               width={50}
//               height={50}
//               alt=""
//               className="w-[50px] h-[50px] rounded-full object-cover"
//             />
//           </div>
//           <div className="pl-3 dark:text-white text-black">
//             <h5 className="text-[20px]">{item?.user.name}</h5>
//             <p>{item?.question}</p>
//             <small className="text-[#000000b8] dark:text-[#ffffff83]">
//               {!item.createdAt ? "" : format(item?.createdAt)} •
//             </small>
//           </div>
//         </div>
//         <div className="w-full flex">
//           <span
//             className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2"
//             onClick={() => {
//               setreplyActive(!replyActive);
//               setQuestionId(item._id);
//             }}
//           >
//             {!replyActive
//               ? item.questionReplies.length !== 0
//                 ? "All Replies"
//                 : "Add Reply"
//               : "Hide Replies"}
//           </span>
//           <BiMessage
//             size={20}
//             className="dark:text-[#ffffff83] cursor-pointer text-[#000000b8]"
//           />
//           <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
//             {item.questionReplies.length}
//           </span>
//         </div>

//         {replyActive && questionId === item._id &&  (
//           <>
//             {item.questionReplies.map((item: any) => (
//               <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white" key={item._id}>
//                 <div>
//                   <Image
//                     src={
//                       item.user.avatar
//                         ? item.user.avatar.url
//                         : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                     }
//                     width={50}
//                     height={50}
//                     alt=""
//                     className="w-[50px] h-[50px] rounded-full object-cover"
//                   />
//                 </div>
//                 <div className="pl-3">
//                   <div className="flex items-center">
//                     <h5 className="text-[20px]">{item.user.name}</h5>{" "}
//                     {item.user.role === "admin" && (
//                       <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
//                     )}
//                   </div>
//                   <p>{item.answer}</p>
//                   <small className="text-[#ffffff83]">
//                     {format(item.createdAt)} •
//                   </small>
//                 </div>
//               </div>
//             ))}
//             <>
//               <div className="w-full flex relative dark:text-white text-black">
//                 <input
//                   type="text"
//                   placeholder="Enter your answer..."
//                   value={answer}
//                   onChange={(e: any) => setAnswer(e.target.value)}
//                   className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[95%] ${
//                     answer === "" ||
//                     (answerCreationLoading && "cursor-not-allowed")
//                   }`}
//                 />
//                 <button
//                   type="submit"
//                   className="absolute right-0 bottom-1"
//                   onClick={handleAnswerSubmit}
//                   disabled={answer === "" || answerCreationLoading}
//                 >
//                   Submit
//                 </button>
//               </div>
//               <br />
//             </>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default CourseContentMedia;