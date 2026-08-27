import { FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { CiBoxList, CiUser } from "react-icons/ci";
import { TbKeyframe } from "react-icons/tb";
import { GrStatusGoodSmall } from "react-icons/gr";
import { LuBookOpen } from "react-icons/lu";



function ModuleDetail() {
    return (
        <div className="flex flex-col">
            {/* header */}
            <div className="flex flex-col md:flex-row gap-2 border border-transparent rounded-xl p-4 bg-white justify-between shadow-md">
                <div className="flex flex-col md:flex-row items-center gap-4">
                <h1 className="font-bold text-xl">Select Your Module:</h1>
                {/* still needs work to be done, it should be dynamic */}
                <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-2xl shadow-md hover:border-gray-600 transition-all duration-100 cursor-pointer focus:outline-none focus:border-blue-500 font-medium">
                    <option value="dbs402">DBS402 Database Systems</option>
                    <option value="wpr201">WPR201 Web Programming</option>
                    <option value="sta331">STA331 Statistical Analysis</option>

                    {/* ma */}
                </select>

                </div>
                <div className="flex flex-row gap-2 justify-center">
                    <button className="rounded-2xl p-2 bg-blue-500 hover:bg-blue-700 transition-all duration-200 cursor-pointer flex flex-row items-center gap-2 justify-center">
                        <FiPlus size={24} color="white"/>
                        <h1 className="text-white font-bold">Add Module</h1>
                    </button>
                    <button className="rounded-2xl p-2 bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-200 cursor-pointer flex flex-row items-center gap-2 justify-center">
                        <MdDeleteOutline size={24} color="red"/>
                        <h1 className="font-bold">Remove Module</h1>
                    </button>
                </div>   
            </div>

            {/* module metadata */}
            <div className="grid md:grid-cols-[1fr_auto] gap-4 my-4 items-center">
                <div className="border border-transparent rounded-xl shadow-xm bg-white p-2">
                    <div className="flex flex-row items-center gap-2 font-bold text-xl my-2">
                        <h1>Module Overview: </h1>
                        <p>Computer Science 311 (Operating Systems)</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-row items-center gap-1.5 text-gray-700">
                            <CiUser size={22} className="text-gray-400" />
                            <h1 className="font-semibold">Created By:</h1>
                            <p className="text-gray-900 font-medium">Dr Ashley Boyzen 323</p>
                        </div>

                        <div className="flex flex-row items-center gap-1.5 text-gray-700">
                            <TbKeyframe size={22} className="text-gray-400"/>
                            <h1>Credits:</h1>
                            <p className="font-bold">30</p>
                        </div>
                        <div className="flex flex-row items-center gap-1.5 text-gray-700">
                            <GrStatusGoodSmall size={22} color="green"/>
                            <h1>Status</h1>
                            <p className="border rounded-xl p-0.5 text-white bg-green-500 font-bold">Active</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-2 mt-8 items-center">
                            <LuBookOpen size={18}/>
                            <h1 className="text-xl">Module Description</h1>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi voluptates perspiciatis consequatur voluptatibus nobis, aliquam dicta sed delectus recusandae! Saepe illum quis sapiente odit quidem hic voluptates nostrum, corrupti quod.</p>
                    </div>
                </div>
                <div className="border border-transparent rounded-2xl p-2 bg-white">
                    <h1 className="font-bold text-xl">Quick Links and Status</h1>
                    <h1>Credits: <spam className="font-bold">20</spam></h1>
                    <h1>Final Exam Date:</h1>
                    <h1 className="font-bold">July 15, 2026</h1>
                    <p></p>
                </div>
            </div>

            <div className="rounded-2xl p-2 bg-white">
                <h1 className="font-bold my-2">Continuous Assessment Model (CAM) Calculations</h1>
                <div className="flex flex-col md:flex-row justify-between">
                    <div>
                        <h1>Assignments</h1>
                    </div>
                    <div>
                        <h1>Calculated Score: <span></span></h1>
                    </div>
                </div>
                <div className="flex flex-row justify-between font-bold text-xl my-6">
                    <h1>Project Final Cam Score</h1>
                    <div>
                        <h1>71.4%</h1>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModuleDetail;