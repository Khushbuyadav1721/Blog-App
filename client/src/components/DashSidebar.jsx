import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../assets/redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = () => {
    dispatch(signoutSuccess());
    localStorage.removeItem("currentUser");
    navigate("/sign-in");
  };

  return (
    <Sidebar className="w-full md:w-56 min-h-screen bg-white dark:bg-gray-900">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
           
          {currentUser?.isAdmin && (
            <Link to="/dashboard?tab=dash">
             <Sidebar.Item
               active={tab === 'dash' || !tab}
               icon={HiChartPie}
               as="div"
               >
               Dashboard
             </Sidebar.Item>
            </Link>
           )}

          {/* Profile Tab */}
          <Sidebar.Item
            icon={HiUser}
            active={tab === "profile"}
            className="cursor-pointer relative rounded-md shadow-md bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-900"
            onClick={() => navigate("/dashboard?tab=profile")}
            as="div"
          >
            <span className="flex justify-between items-center w-full">
              Profile
              <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-0.5 rounded-md ml-2">
                {currentUser?.isAdmin ? "Admin" : "User"}
              </span>
            </span>
          </Sidebar.Item>

          {/* Posts Tab */}
          <Sidebar.Item
            icon={HiDocumentText}
            active={tab === "posts"}
            className="cursor-pointer dark:text-white text-gray-900"
            onClick={() => navigate("/dashboard?tab=posts")}
            as="div"
          >
            Posts
          </Sidebar.Item>

          {/* Users Tab */}
          <Sidebar.Item
            icon={HiOutlineUserGroup}
            active={tab === "users"}
            className="cursor-pointer dark:text-white text-gray-900"
            onClick={() => navigate("/dashboard?tab=users")}
            as="div"
          >
            Users
          </Sidebar.Item>

          {/* Comments Tab */}
          <Sidebar.Item
            icon={HiAnnotation}
            active={tab === "comments"}
            className="cursor-pointer dark:text-white text-gray-900"
            onClick={() => navigate("/dashboard?tab=comments")}
            as="div"
          >
            Comments
          </Sidebar.Item>

          {/* Sign Out */}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer dark:text-white text-gray-900"
            onClick={handleSignout}
            as="div"
          >
            Sign Out
          </Sidebar.Item>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
