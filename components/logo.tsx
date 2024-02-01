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
			<div className="flex items-end hover:opacity-75 transition gap-x-2 md:flex">
				<Image src="/logo.svg" alt="Logo" height={40} width={40} />
				<p
					className={cn(
						"translate-y-[7px] text-3xl text-neutral-700",
						headingFont.className,
					)}
				>
					Task Manager
				</p>
			</div>
		</Link>
	);
};
