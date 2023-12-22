import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="hidden gap-x-2 items-center md:flex">
      <Image src="/logo.svg" height="40" width="40" alt="Jotion"  className="dark:hidden"/>
      <Image src="/logo-dark.svg" height="40" width="40" alt="Jotion"  className="hidden dark:block"/>
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
};
