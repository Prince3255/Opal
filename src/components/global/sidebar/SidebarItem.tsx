"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  icon: React.ReactNode;
  title: string;
  href: string;
  selected: boolean;
  notification?: number;
};

const SidebarItem = ({ icon, href, title, selected, notification }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pathname === href) {
      setIsLoading(false);
    }
  }, [pathname, href]);

  const handleClick = (e: React.MouseEvent) => {
    if (selected || isLoading) return;

    setIsLoading(true);
    router.push(href);
  };

  return (
    <li className="cursor-pointer my-[3px]">
      <div
        onClick={handleClick}
        className={cn(
          "flex items-center justify-between group rounded-lg hover:bg-[#1D1D1D] transition-all",
          selected ? "bg-[#1D1D1D]" : "",
          isLoading ? "opacity-70" : ""
        )}
      >
        <div className="flex items-center gap-2 transition-all p-[5px] cursor-pointer">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#9D9D9D]" />
          ) : (
            icon
          )}
          <span
            className={cn(
              "font-medium group-hover:text-[#9D9D9D] transition-all truncate w-32",
              selected ? "text-[#9D9D9D]" : "text-[#545454]"
            )}
          >
            {title}
          </span>
        </div>
        {notification && notification > 0 && title === "Notifications" ? (
          <div className="flex items-center justify-center w-5 h-5 text-slate-500 text-xs rounded-full mr-2">
            {notification}
          </div>
        ) : (
          ""
        )}
      </div>
    </li>
  );
};

export default SidebarItem;
