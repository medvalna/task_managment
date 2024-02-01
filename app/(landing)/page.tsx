import { Check } from "lucide-react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Chicle } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headingFont = Chicle({
	subsets: ["latin"],
	weight: ["400"],
});
const textFont = Inter({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const LandingPage = () => {
	return (
		<div className="flex items-center justify-center flex-col">
			<div className="flex items-center justify-center flex-col">
				<div className="mb-8 flex items-center border-2 border-slate-900 shadow-sm p-4 bg-violet-200 text-slate-900 rounded-lg uppercase">
					<Check
						className={cn(
							"h-6 w-6 mr-2 text-sm text-slate-900",
							textFont.className,
						)}
					/>
					The best task manager
				</div>
				<h1
					className={cn(
						"text-5xl md:text-6xl text-center text- mb-6 text-slate-900",
						headingFont.className,
					)}
				>
					Task manager helps you achieve your goals
				</h1>
			</div>
			<div
				className={cn(
					"text-sm md:text-xl text-gray-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
					textFont.className,
				)}
			>
				We&apos;re excited to introduce <b>Task Manager</b>, the ultimate tool
				for managing tasks and improving productivity. Manage your tasks
				efficiently, prioritize them effectively, and collaborate with your team
				seamlessly!
			</div>

			<Button className="mt-6 h-12 w-64 group relative overflow-hidden rounded-lg transition-color duration-500 bg-slate-900 hover:bg-violet-400 hover:border-2 hover:border-slate-900 -text-lg shadow">
				<span
					className={cn("text-3xl relative text-white ", headingFont.className)}
				>
					<Link href="/sign-up">Get Task Manager!</Link>
				</span>
			</Button>
		</div>
	);
};

export default LandingPage;
