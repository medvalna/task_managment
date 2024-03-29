import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const headingFont = Inter({
	subsets: ["latin"],
	weight: ["400"],
});
export const Navbar = () => {
	return (
		<div className="fixed top-0 w-full h-20 px-14 border-b shadow-sm bg-white flex items-center">
			<div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
				<Logo />
				<div
					className="space-x-4 block w-auto items-center
          justify-between "
				>
					<Button
						variant="outline"
						className={cn(
							"border-2 border-slate-900 mb-2 mt-2 px-4 py-3 rounded-lg text-md transition-color duration-500 bg-white text_slate-900 hover:bg-violet-300",
							headingFont.className,
						)}
						asChild
					>
						<Link href="/sign-in">Login</Link>
					</Button>
					<Button
						variant="default"
						className={cn(
							"mb-2 mt-2 px-4 py-3 rounded-lg transition-color duration-500 bg-black text-md text-white hover:bg-violet-300 border-2 border-slate-900 hover:text_slate-900",
							headingFont.className,
						)}
						asChild
					>
						<Link href="/sign-up">Get Task Manager for free</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
