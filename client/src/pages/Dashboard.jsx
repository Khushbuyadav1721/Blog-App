import DashPosts from "../components/DashPosts";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import { useLocation } from "react-router-dom";
import DashboardComp from "../components/DashboardComp";

function Dashboard() {
  const location = useLocation(); 
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab");

  return (
    <div className="flex w-full">
      <DashSidebar />
      <div className="flex-grow">
        {tab === "profile" && <DashProfile />}
        {/* Add other tabs if needed */}
        {tab === 'posts' && <DashPosts/>}
        {tab === 'users' && <DashUsers/>}
        {tab === 'comments' && <DashComments />}
        {tab === 'dash' && <DashboardComp/>}

      </div>
    </div>
  );
}

export default Dashboard;
