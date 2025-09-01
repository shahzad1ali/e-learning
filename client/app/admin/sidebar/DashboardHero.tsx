import React, { useState } from 'react';
import DashboardHeader from "./DashboardHeader"
import { useTheme } from 'next-themes';
import DashboardWidgets from "../../components/Admin/Widgets/DashboardWidgets"

type Props = {
  isDashboard?: boolean;
}

const DashboardHero = ({isDashboard}: Props) => {
    const [open,setOpen] = useState(false);
    const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className={`ml-4 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
        <DashboardHeader open={open} setOpen={setOpen} />
        {
          isDashboard && (
            <DashboardWidgets open={open} />
          )
        }
    </div>
  )
}

export default DashboardHero