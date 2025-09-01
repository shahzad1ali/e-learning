"use client";

import React, { FC, useEffect, useRef } from "react";

type Props = {
  otp: string;
  playbackInfo: string;
  theme: "dark" | "light";
};

const Player: FC<Props> = ({ otp, playbackInfo, theme }) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!otp || !playbackInfo) return;

    const script = document.createElement("script");
    script.src = "https://player.vdocipher.com/playerAssets/1.7.19/vdo.js";
    script.async = true;

    script.onload = () => {
      if (window.VdoPlayer) {
        new window.VdoPlayer({
          otp,
          playbackInfo,
          theme,
          container: playerRef.current,
        });
      }
    };

    playerRef.current?.appendChild(script);

    // Cleanup script and player
    return () => {
      playerRef.current?.replaceChildren();
    };
  }, [otp, playbackInfo, theme]);

  return (
    <div
      ref={playerRef}
      className="w-full h-[60vh] rounded-lg overflow-hidden bg-black"
    />
  );
};

export default Player;
