import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";


function Dashboard() {
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab");

  return (
    <div className="flex w-full">
      <DashSidebar />
      <div className="flex-grow">
        {tab === "profile" && <DashProfile />}
        {/* Add other tabs if needed */}
      </div>
    </div>
  );
}

export default Dashboard;
