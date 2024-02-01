import { getUserId } from "@/app/(api)/apiUser";
import { SideBar } from "./_components/sidebar";
import { getAllProjectsPrisma } from "@/app/(api)/apiProjects";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const userId = await getUserId();
	const projects = await getAllProjectsPrisma();
	return (
		<div>
			<main className="mx-auto">
				<div className="flex">
					<div className="bg-violet-50 md:block">
						<SideBar userId={userId} projects={projects} />
					</div>
					{children}
				</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
