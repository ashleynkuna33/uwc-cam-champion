import { useState } from "react";
// icons
import { LuFileText, LuPlus, LuPencil, LuCircleHelp, LuSettings } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const MenuIcon = ({ name: Icon, size, title, onPress, disableHover = false, isActive = false }) => {
    return (
        <div
            onClick={onPress}
            className={`cursor-pointer p-2 rounded-xl transition-all
                ${isActive ? "bg-black/10 text-black" : "text-gray-400"}
                ${!disableHover && "hover:bg-black/10 hover:text-black"}`}
        >
            <Icon size={size} title={title}/>
        </div>
    );
};

const SearchBar = ({placeholder = "Search Module"}) => {
    return (
        <div className="flex flex-row items-center border border-gray-400 rounded-2xl px-3 py-1 w-80">
            <input 
                placeholder={placeholder} 
                className="bg-transparent outline-none border-none text-sm text-black w-full text-xl"
            />
            <div className="bg-black/20 rounded-2xl p-1.5 flex items-center justify-center">
                <MenuIcon name={CiSearch} size={20} disableHover />
            </div>
        </div>
    )
};

const UserHeader = ({ name = "Unknown", surname = "Unknown", isLogged = true }) => {

    const handleLogin = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleLogOut = () => {}

    return (
        <div className="flex flex-row gap-2 items-center justify-center border border-transparent rounded-3xl px-2 bg-black/20 cursor-pointer" onClick={() => !isLogged && handleLogin()}>
            <MenuIcon name={FaRegUserCircle} size={22} disableHover />
            {isLogged ? (
                <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-col">
                        <h1 className="text-sm font-bold">{name}</h1>
                        <h1 className="text-sm font-bold">{surname}</h1>
                    </div>
                    <MenuIcon name={IoIosArrowDown} size={22} />
                </div>
            ) : (
                <h1 className="text-sm font-bold">Log In</h1>
            )}
        </div>
    );
};

function Tasks() {
    const [tab, setTab] = useState("View All");

    const handleSettings = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-200 via-slate-200 to-orange-200">
            
            {/* header */}
            <div className="bg-white/70 backdrop-blur-sm flex items-center justify-between px-2 border-b border-gray-200">
                <h1 className="font-bold text-3xl text-gray-900">Modules</h1>
                <SearchBar />
                <UserHeader />
            </div>

            <div className="grid grid-cols-[auto_1fr] flex-1">
                {/* the menu section */}
                <div className="bg-white/70 border border-gray-200 rounded-2xl m-2 px-2 py-4 flex flex-col items-center justify-between w-14">
                    
                    {/* first icons group */}
                    <div className="flex flex-col gap-2">
                        <MenuIcon name={LuFileText} size={24} title={"View All"} isActive={tab === "View All"} onPress={() => setTab("View All")}/>
                        <MenuIcon name={LuPlus} size={24} title={"Add Modules"} isActive={tab === "Add Modules"} onPress={() => setTab("Add Modules")}/>
                        <MenuIcon name={LuPencil} size={24} title={"Edit Modules"} isActive={tab === "Edit Modules"} onPress={() => setTab("Edit Modules")}/>
                        <MenuIcon name={MdDelete} size={24} title={"Delete Modules"} isActive={tab === "Delete Modules"} onPress={() => setTab("Delete Modules")}/>
                    </div>

                    {/* last group */}
                    <div className="flex flex-col gap-2">
                        <MenuIcon name={LuCircleHelp} size={24} title={"Help"} isActive={tab === "Help"} onPress={() => setTab("Help")}/>
                        <MenuIcon name={LuSettings} size={24} title={"Settings"} onPress={handleSettings}/>
                    </div>
                </div>

                {/* view section */}
                <div className="bg-white/70 border border-gray-200 rounded-2xl p-6 m-2">
                    <h1 className="text-gray-900">{tab}</h1>
                </div>
            </div>
        </div>
    )
};

export default Tasks;