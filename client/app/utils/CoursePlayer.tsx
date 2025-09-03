import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { server } from "@/redux/store";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  // console.log("🚀 ~ CoursePlayer ~ videoUrl:", videoUrl)
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoUrl || videoUrl.trim() === '') {
      console.log("⚠️ No video URL provided");
      setError("No video URL provided");
      setLoading(false);
      return;
    }
    
    console.log("🎥 Attempting to load video with ID:", videoUrl);
    setLoading(true);
    setError(null);
    
    axios
      .post(`${server}/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        console.log("✅ Video data received:", res.data);
        setVideoData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error loading video:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to load video");
        setLoading(false);
      });
  }, [videoUrl]);

  return (
    <div style={{position:"relative",paddingTop:"56.25%",overflow:"hidden"}}>
      {error ? (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
          color: "#dc3545",
          fontSize: "16px",
          padding: "20px",
          textAlign: "center"
        }}>
          <div style={{fontSize: "24px", marginBottom: "10px"}}>⚠️</div>
          <div style={{fontWeight: "bold", marginBottom: "5px"}}>Video Error</div>
          <div style={{fontSize: "14px"}}>{error}</div>
          {error.includes("region") || error.includes("network") ? (
            <div style={{fontSize: "12px", marginTop: "10px", color: "#666"}}>
              This video may have geographic restrictions. Please contact support.
            </div>
          ) : null}
        </div>
      ) : videoData.otp && videoData.playbackInfo !== "" ? (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=3oUGdRVv0ReaBczA&autoplay=false&controls=true&responsive=true`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0
          }}
          allowFullScreen={true}
          allow="encrypted-media; autoplay; fullscreen"
          title="Course Video Player"
        ></iframe>
      ) : (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          color: "#666",
          fontSize: "16px"
        }}>
          {loading ? "Loading video..." : "No video URL provided"}
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;