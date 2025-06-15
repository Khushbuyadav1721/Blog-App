import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56 min-h-screen bg-white dark:bg-gray-900">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="mt-[-1px]">
          <Sidebar.Item
            icon={HiUser}
            active={tab === "profile"}
            className="cursor-pointer relative rounded-md shadow-md bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900"
            onClick={() => navigate("/dashboard?tab=profile")}
          >
            <span className="flex justify-between items-center w-full">
              Profile
              <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-0.5 rounded-md ml-2">
                User
              </span>
            </span>
          </Sidebar.Item>

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer dark:text-white text-gray-900"
            onClick={() => alert("Sign out clicked")}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
