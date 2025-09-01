import React, { FC } from "react";
import { Box, CircularProgress } from "@mui/material";

type MetricCardProps = {
  icon: React.ReactNode;
  title: string;
  currentValue?: number;
  percentChange?: number;
  isDark: boolean;
  open?: boolean;
};

const CircularProgressWithLabel: FC<{ open?: boolean; value?: number }> = ({
  open,
  value,
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value ?? 0}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const MetricCard: FC<MetricCardProps> = ({
  icon,
  title,
  currentValue,
  percentChange,
  isDark,
  open,
}) => {
  const formattedChange =
    percentChange != null
      ? `${percentChange > 0 ? "+" : "-"}${Math.abs(percentChange).toFixed(
          2
        )} %`
      : "--";

  return (
    <div
      className="w-full rounded-sm shadow"
      style={{ background: isDark ? "#111C43" : "#fff" }}
    >
      <div className="flex items-center p-5 justify-between">
        <div>
          <div className="flex items-center gap-2">
            {React.cloneElement(icon as any, {
              className: "text-[30px]",
              style: { color: isDark ? "#45CBA0" : "#000" },
            })}
          </div>
          <h5
            className={`pt-2 font-Poppins text-[20px] font-medium ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {currentValue != null ? currentValue : "--"}
          </h5>
          <h5
            className={`py-2 font-Poppins text-[20px] font-[400] ${
              isDark ? "text-[#45CBA0]" : "text-gray-700"
            }`}
          >
            {title}
          </h5>
        </div>
        <div className="text-center">
          <CircularProgressWithLabel
            value={percentChange != null && percentChange > 0 ? 100 : 0}
            open={open}
          />
          <h5
            className={`pt-4 font-Poppins text-[14px] ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {formattedChange}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
