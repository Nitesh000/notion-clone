"use client";

import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams, usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./user-item";
import { Item } from "./item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { Navbar } from "./navbar";

export const Navigation = () => {
  const search = useSearch();
  const settings = useSettings();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapseFunction();
    } else {
      resetWidth();
    }
    // eslint-disable-next-line
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapseFunction();
    }
  }, [pathname, isMobile]);

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

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)",
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
    }
    setTimeout(() => setIsResetting(false), 300); // This should match the transition duration
  };

  // NOTE: collapse funcitn
  const collapseFunction = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note!",
    });
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
          onClick={collapseFunction}
          role="button"
          className={cn(
            "absolute right-2 top-3 w-6 h-6 rounded-sm opacity-0 transition text-muted-foreground dark:hover:bg-neutral-600 group-hover/sidebar:opacity-100 hover:bg-neutral-300",
            isMobile && "opacity-100",
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Setings" icon={Settings} onClick={settings.onOpen} />
          <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "bottom" : "right"}
              className="p-0 w-72"
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
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
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="py-2 px-3 w-full bg-transparent">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="w-6 h-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
