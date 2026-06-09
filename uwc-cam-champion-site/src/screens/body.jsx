import { useState } from 'react';

// screens
import DashBoard from './Dashboard';
import ModuleDetail from './ModuleDetail';
import Progress from './Progress';
import Reminders from './Reminders';
import Settings from './Settings';
import Tasks from './Tasks';

// icons only imports
import { FaPlus, FaChartLine, FaRegBell } from 'react-icons/fa6';
import { LuBookOpen } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { CiGrid42 } from "react-icons/ci";
import { FaUserGraduate } from "react-icons/fa";
import { CiLogin as Login } from "react-icons/ci";
import { CiLogout as Logout } from "react-icons/ci";

const MenuTab = ({ Icon, IconSize, Description, isActive, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex flex-row gap-2 items-center p-4 mb-4 rounded-xl cursor-pointer border border-transparent transition-all duration-100
        ${isActive 
          ? 'bg-blue-500/10 text-blue-500' 
          : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
    >
      <Icon size={IconSize} />
      <span className="font-bold">
        {Description}
      </span>
    </button>
  );
};

function Screen() {

    const [menuExpanded, setMenuExpand] = useState(true);
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [isLogged, setLogin] = useState(false);
    const size_of_icons = 22;

    const handleLogin = () => {};

    return (
        <div className="min-h-screen w-full grid grid-cols-[auto_1fr] flex-1 bg-gradient-to-tr from-[#EBF1FA] to-[#F7FAFC]">
            {/* menu session */}
            <div className="bg-white p-4 m-4 border border-transparent rounded-2xl flex flex-col justify-between">
                {/* logo */}
                <div>
                    <h1>Logo</h1>
                </div>

                {/* tabs */}
                <div>
                    <MenuTab Icon={CiGrid42} IconSize={size_of_icons} Description={"Dashboard"} isActive={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")}/>
                    <MenuTab Icon={LuBookOpen} IconSize={size_of_icons} Description={"Module Detail"} isActive={activeTab === "Module Detail"} onClick={() => setActiveTab("Module Detail")}/>
                    <MenuTab Icon={FaPlus} IconSize={size_of_icons} Description={"Assessments"} isActive={activeTab === "Assessments"} onClick={() => setActiveTab("Assessments")}/>
                    <MenuTab Icon={FaChartLine} IconSize={size_of_icons} Description={"Progress & Projections"} isActive={activeTab === "Progress & Projections"} onClick={() => setActiveTab("Progress & Projections")}/>
                    <MenuTab Icon={FaRegBell} IconSize={size_of_icons} Description={"Reminders"} isActive={activeTab === "Reminders"}
                    onClick={() => setActiveTab("Reminders")}/>
                    <MenuTab Icon={IoSettingsOutline} IconSize={size_of_icons} Description={"Settings"} isActive={activeTab === "Settings"} onClick={() => setActiveTab("Settings")}/>
                </div>

                {/* user profile */}
                <div className='flex flex-row justify-between cursor-pointer transition-all duration-100 hover:bg-black/10 p-2 border border-transparent rounded-2xl'>
                    <div className='flex flex-row gap-2'>
                        <FaUserGraduate size={size_of_icons}/>
                        <h1 className='font-bold'>Login</h1>
                    </div>
                    <div>
                        { isLogged ? 
                        <Logout size={size_of_icons}/> 
                        :
                        <Login size={size_of_icons}/>}
                    </div>

                </div>
                
            </div>

            {/* body */}
            <div className='m-4 h-[calc(100vh-2rem)] overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-black/20 hover:scrollbar-thumb-black/40 scrollbar-track-transparent'>
                {activeTab == "Dashboard" && <DashBoard />}
                {activeTab == "Module Detail" && <ModuleDetail />}
                {activeTab == "Progress & Projections" && <Progress />}
                {activeTab == "Assessments" && <Tasks />}
                {activeTab == "Settings" && <Settings />}
                {activeTab == "Reminders" && <Reminders />}
            </div>
        </div>
    )
}

export default Screen;