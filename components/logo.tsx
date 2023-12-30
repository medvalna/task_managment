import Link from "next/link";
import Image from "next/image";
import { Chicle } from "next/font/google";

import { cn } from "@/lib/utils";
const headingFont = Chicle({
  subsets: ["latin"],
  weight: ["400"],
});
export const Logo = () => {
  return (
    <Link href="/">
        
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="Logo" height={40} width={40} />
        <p
          className={cn("text-lg text-neutral-700 pb-1 ", headingFont.className)}
        >
          Task Manager
        </p>
      </div>
    </Link>
  );
};
