import { useState } from "react";

// icons
import { LuFileText, LuPlus, LuPencil, LuFolder, LuCircleHelp, LuSettings } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const searchBar = () => {}

const userHeader = () => {}

const MenuIcon = ({ name: Icon, size, title }) => {
    return (
        <Icon size={size} className="cursor-pointer hover:text-white/70 transition-colors" title={title}/>
    );
}

function Tasks() {
    return (
        <div className="min-h-screen w-full bg-black/10 ">
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
            <div className="grid grid-cols-[auto_1fr]">
                {/* the menu section */}
                <div className="bg-red-400 rounded-2xl border p-6 m-2 flex flex-col gap-8">
                    <MenuIcon name={LuFileText} size={32} title={"View All"}/>
                    <MenuIcon name={LuPlus} size={28} title={"Add Modules"}/>
                    <MenuIcon name={LuPencil} size={28} title={"Edit Modules"}/>
                    <MenuIcon name={MdDelete} size={28} title={"Delete Modules"}/>
                    <MenuIcon name={LuCircleHelp} size={28} title={"Help"}/>
                    <MenuIcon name={LuSettings} size={28} title={"Settings"}/>
                </div>

                {/* view section */}
                <div className="bg-blue-500">
                    <h1>view</h1>
                </div>
            </div>
        </div>
    )
}

export default Tasks;