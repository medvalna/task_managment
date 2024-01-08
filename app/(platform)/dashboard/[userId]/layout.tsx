import { SideBar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="mx-auto">
        <div className="flex">
          <div className="w-64 shrink-0 hidden md:block">
             <SideBar/>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
