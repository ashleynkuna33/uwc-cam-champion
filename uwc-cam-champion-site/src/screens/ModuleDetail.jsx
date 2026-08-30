import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { FaBook } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import { LuBookOpen } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { TbKeyframe } from "react-icons/tb";
import AddModuleModal from "../components/AddModuleModal";
import { useUser } from "../context/UserContext";


function ModuleDetail() {
    

    const { modules } = useUser();

    const [selectedModuleId, setSelectedModuleId] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const selectedModule = modules.find(
        (module) => module.id === Number(selectedModuleId)
    );

    return (
        <div className="flex flex-col">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row gap-2 border border-transparent rounded-xl p-4 bg-white justify-between shadow-md">

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <h1 className="font-bold text-xl">Select Your Module:</h1>
                    <select
                        value={selectedModuleId}
                        onChange={(e) => setSelectedModuleId(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-2xl shadow-md cursor-pointer focus:outline-none focus:border-blue-500 font-medium"
                    >

                        <option value="">
                            {modules.length === 0
                                ? "No modules available"
                                : "Select a module"}
                        </option>

                        {modules.map((module) => (
                            <option
                                key={module.id}
                                value={module.id}
                            >
                                {module.moduleCode} {module.moduleName}
                            </option>
                        ))}

                    </select>
                </div>

                <div className="flex flex-row gap-2 justify-center">

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="rounded-2xl p-2 bg-blue-500 hover:bg-blue-700 transition-all duration-200 cursor-pointer flex flex-row items-center gap-2 justify-center"
                    >
                        <FiPlus size={24} color="white" />

                        <h1 className="text-white font-bold">
                            Add Module
                        </h1>
                    </button>

                    <button
                        className="rounded-2xl p-2 bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-200 cursor-pointer flex flex-row items-center gap-2 justify-center"
                    >
                        <MdDeleteOutline size={24} color="red" />
                        <h1 className="font-semibold text-white">Remove Module</h1>
                    </button>

                </div>

            </div>


            {/* MODULE DETAILS */}

            {modules.length === 0 ? (

                // EMPTY STATE
                <div className="border border-transparent rounded-xl shadow-md bg-white p-10 my-4 text-center">

                    <h1 className="text-2xl font-bold mb-2">
                        No Modules Added
                    </h1>

                    <p className="text-gray-600">
                        You have not added any modules yet.
                    </p>

                    <p className="text-gray-600">
                        Click "Add Module" to add your first module.
                    </p>

                </div>

            ) : !selectedModule ? (

                // NOTHING SELECTED
                <div className="border border-transparent rounded-xl shadow-md bg-white p-10 my-4 text-center">

                    <h1 className="text-xl font-bold">
                        Select a module
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Select a module above to view its details.
                    </p>

                </div>

            ) : (

                // SELECTED MODULE
                <>

                    {/* MODULE OVERVIEW */}

                    <div className="grid md:grid-cols-[1fr_auto] gap-4 my-4 items-center">

                        <div className="border border-transparent rounded-xl shadow-md bg-white p-4">

                            <div className="flex flex-row items-center gap-2 font-bold text-xl my-2">

                                <h1>
                                    Module Overview:
                                </h1>

                                <p>
                                    {selectedModule.moduleCode}{" "}
                                    {selectedModule.moduleName}
                                </p>

                            </div>


                            <div className="flex flex-col md:flex-row gap-4">

                                {/* LECTURER */}

                                <div className="flex flex-row items-center gap-1.5 text-gray-700">

                                    <CiUser
                                        size={22}
                                        className="text-gray-400"
                                    />

                                    <h1 className="font-semibold">
                                        Created By:
                                    </h1>

                                    <p className="text-gray-900 font-medium">
                                        {selectedModule.lecturer || "Not provided"}
                                    </p>

                                </div>


                                {/* CREDITS */}

                                <div className="flex flex-row items-center gap-1.5 text-gray-700">

                                    <TbKeyframe
                                        size={22}
                                        className="text-gray-400"
                                    />

                                    <h1>
                                        Credits:
                                    </h1>

                                    <p className="font-bold">
                                        {selectedModule.credits || 0}
                                    </p>

                                </div>


                                {/* STATUS */}

                                <div className="flex flex-row items-center gap-1.5 text-gray-700">

                                    <GrStatusGoodSmall
                                        size={22}
                                        color="green"
                                    />

                                    <h1>
                                        Status
                                    </h1>

                                    <p className="border rounded-xl p-0.5 text-white bg-green-500 font-bold">
                                        {selectedModule.status || "Not set"}
                                    </p>

                                </div>

                            </div>


                            {/* DESCRIPTION */}

                            <div>

                                <div className="flex flex-row gap-2 mt-8 items-center">

                                    <LuBookOpen size={18} />

                                    <h1 className="text-xl">
                                        Module Description
                                    </h1>

                                </div>

                                <p>
                                    {selectedModule.description ||
                                        "No description has been added yet."}
                                </p>

                            </div>

                        </div>


                        {/* QUICK LINKS */}

                        <div className="border border-transparent rounded-2xl p-4 bg-white">

                            <h1 className="font-bold text-xl">
                                Quick Links and Status
                            </h1>

                            <h1>
                                Credits:{" "}
                                <span className="font-bold">
                                    {selectedModule.credits || 0}
                                </span>
                            </h1>

                            <h1>
                                Final Exam Date:
                            </h1>

                            <h1 className="font-bold">
                                {selectedModule.finalExamDate ||
                                    "Not provided"}
                            </h1>

                        </div>

                    </div>


                    {/* CAM */}

                    <div className="rounded-2xl p-4 bg-white">

                        <h1 className="font-bold my-2">
                            Continuous Assessment Model (CAM) Calculations
                        </h1>

                        <div className="flex flex-col md:flex-row justify-between">

                            <div>
                                <h1>
                                    Assignments
                                </h1>
                            </div>

                            <div>
                                <h1>
                                    Calculated Score:
                                </h1>
                            </div>

                        </div>

                        <div className="flex flex-row justify-between font-bold text-xl my-6">

                            <h1>
                                Project Final CAM Score
                            </h1>

                            <div>
                                <h1>
                                    {selectedModule.camScore || "0"}%
                                </h1>
                            </div>

                        </div>

                    </div>

                </>

            )}
            <AddModuleModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
            

        </div>
    );
}

export default ModuleDetail;
