import { SideBar } from "./_components/sidebar";
import { getAllProjectsPrisma } from "@/app/(api)/apiProjects";

const DashboardLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { userId: string };
}) => {
	const userId = params.userId;
	const projects = await getAllProjectsPrisma(userId);
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
