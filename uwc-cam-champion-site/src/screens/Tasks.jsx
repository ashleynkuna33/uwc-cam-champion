import { useState } from "react";
// icons
import { LuFileText, LuPlus, LuPencil, LuFolder, LuCircleHelp, LuSettings } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const searchBar = () => {}

const userHeader = () => {}

const MenuIcon = ({ name: Icon, size, title, onPress }) => {
    return (
        <div onClick={onPress} className="cursor-pointer hover:text-white/70 transition-colors">
            <Icon size={size} title={title}/>
        </div>
    );
}

function Tasks() {
    const [tab, setTab] = useState("View All");

    return (
        <div className="min-h-screen w-full bg-black/10 flex flex-col">
            <div className="bg-blue-500 py-6 flex items-center justify-between">
                <h1 className="font-bold text-3xl pl-2">Modules</h1>
                {/* will hold the search bar and user header */}
                <div className="flex grid-cols-2 gap-8 pr-4">
                    <div>
                        <h1>search bar</h1>
                    </div>
                    <div>
                        <h1>User header</h1>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] flex-1">
                {/* the menu section */}
                <div className="bg-red-400 border rounded-2xl p-6 m-2 flex flex-col gap-8 items-center justify-between">
                    <MenuIcon name={LuFileText} size={32} title={"View All"} onPress={() => setTab("View All")}/>
                    <MenuIcon name={LuPlus} size={28} title={"Add Modules"} onPress={() => setTab("Add Modules")}/>
                    <MenuIcon name={LuPencil} size={28} title={"Edit Modules"} onPress={() => setTab("Edit Modules")}/>
                    <MenuIcon name={MdDelete} size={28} title={"Delete Modules"} onPress={() => setTab("Delete Modules")}/>
                    <MenuIcon name={LuCircleHelp} size={28} title={"Help"} onPress={() => setTab("Help")}/>
                    <MenuIcon name={LuSettings} size={28} title={"Settings"} onPress={() => setTab("Settings")}/>
                </div>

                {/* view section */}
                <div className="bg-red-400 border rounded-2xl p-6 m-2">
                    <h1>{tab}</h1>
                </div>
            </div>
        </div>
    )
}

export default Tasks;