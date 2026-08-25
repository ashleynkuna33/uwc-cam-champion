import { useState } from 'react';
import { useUser } from '../context/UserContext';

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
import { IoSettingsOutline, IoClose } from "react-icons/io5";
import { CiGrid42 } from "react-icons/ci";
import { FaUserGraduate } from "react-icons/fa";
import { CiLogin as Login, CiLogout as Logout } from "react-icons/ci";
import { MdOutlineMenuOpen } from "react-icons/md";




// menu tab
const MenuTab = ({ Icon, IconSize, Description = null, isActive, onClick }) => {
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
      { Description
      ?
      <span className="font-bold">
        {Description}
      </span>
      : null
    }
      
    </button>
  );
};

function Screen() {

    const { user, loading, isLoggedIn } = useUser();

    const [menuExpanded, setMenuExpand] = useState(false);
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [isLogged, setLogin] = useState(false);
    const size_of_icons = 22;

    const handleLogin = () => {};

    return (
        isLoggedIn ?
        (<div className="min-h-screen w-full grid grid-cols-[auto_1fr] flex-1 bg-linear-to-tr from-[#EBF1FA] to-[#F7FAFC]">
            {/* menu session */}
            <div className={`bg-white p-4 ${menuExpanded ? "p-4" : "p-2" } m-4 border border-transparent rounded-2xl flex flex-col justify-between transition-all duration-300`}>
                {/* button */}
                <div className={`flex flex-row ${menuExpanded ? "justify-end" : "justify-center"}`}>
                    <button className='flex items-center border cursor-pointer border-transparent rounded-3xl p-1.5 hover:bg-black/5 transition-all duration-400' onClick={() => setMenuExpand(prev => !prev)}>
                        {menuExpanded ? <IoClose size={26} /> : <MdOutlineMenuOpen size={26}/>}
                        
                    </button>
                </div>
                {/* logo */}
                {menuExpanded  ? <div className='flex justify-center'><h1 className='font-bold text-xl'>UWC CAM CHAMPION</h1> </div> : null }
                

                {/* tabs */}
                <div>

                    <MenuTab Icon={CiGrid42} IconSize={size_of_icons} Description={menuExpanded ? "Dashboard" : null} isActive={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")}/>
                    <MenuTab Icon={LuBookOpen} IconSize={size_of_icons} Description={menuExpanded ?"Module Detail" : null} isActive={activeTab === "Module Detail"} onClick={() => setActiveTab("Module Detail")}/>
                    <MenuTab Icon={FaPlus} IconSize={size_of_icons} Description={menuExpanded ? "Assessments" : null} isActive={activeTab === "Assessments"} onClick={() => setActiveTab("Assessments")}/>
                    <MenuTab Icon={FaChartLine} IconSize={size_of_icons} Description={menuExpanded ? "Progress & Projections" : null} isActive={activeTab === "Progress & Projections"} onClick={() => setActiveTab("Progress & Projections")}/>
                        
                    <div className={``}> 
                        <MenuTab Icon={FaRegBell} IconSize={size_of_icons} Description={menuExpanded ? "Reminders" : null} isActive={activeTab === "Reminders"}
                        onClick={() => setActiveTab("Reminders")}/>
                        <MenuTab Icon={IoSettingsOutline} IconSize={size_of_icons} Description={menuExpanded ? "Settings" : null} isActive={activeTab === "Settings"} onClick={() => setActiveTab("Settings")}/>
                    </div>
                </div>

                {/* user profile */}
                {menuExpanded ? 
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

                </div> : <div></div>
            }
                
                
            </div>

            {/* body */}
            <div className='m-4 h-[calc(100vh-2rem)] overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-black/20 hover:scrollbar-thumb-black/40 scrollbar-track-transparent'>
                
                {activeTab === "Dashboard" && (
                    <DashBoard onSomeAction={setActiveTab} />
                )}
                
                {activeTab === "Module Detail" && <ModuleDetail />}
                {activeTab === "Progress & Projections" && <Progress />}
                {activeTab === "Assessments" && <Tasks />}
                {activeTab === "Settings" && <Settings />}
                {activeTab === "Reminders" && <Reminders />}
            </div>
        </div>) : null
    )
}

export default Screen;