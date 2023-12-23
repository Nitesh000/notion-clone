"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "flex overflow-y-auto relative flex-col w-60 h-full group/sidebar bg-secondary z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0",
        )}
      >
        <div
          role="button"
          className={cn(
            "absolute right-2 top-3 w-6 h-6 rounded-sm opacity-0 transition text-muted-foreground dark:hover:bg-neutral-600 group-hover/sidebar:opacity-100 hover:bg-neutral-300",
            isMobile && "opacity-100",
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>
        <div>
          <p>Action items</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={() => {}}
          className="absolute top-0 right-0 w-1 h-full opacity-0 transition cursor-ew-resize bg-primary/10 group-hover/sidebar:opacity-100"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full",
        )}
      >
        <nav className="py-2 px-3 w-full bg-transparent">
          {isCollapsed && (
            <MenuIcon role="button" className="w-6 h-6 text-muted-foreground" />
          )}
        </nav>
      </div>
    </>
  );
};
