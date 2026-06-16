import { FaKey } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { SiMonkeytie } from "react-icons/si";

export default function Settings () {
    return (
        <div className="flex flex-col">
            {/* header */}
            <div className="flex md:flex-row flex-col justify-between rounded-2xl p-4 bg-white gap-4 shadow-md">
                {/* screen details */}
                <div>
                    <h1 className="font-bold text-2xl">Security & Privacy</h1>
                    <p className="font-bold text-sm text-gray-600">Manage Security & Privacy settings to protect your account</p>
                </div>
                {/* buttons */}
                <div className="flex flex-row gap-4 items-center">
                    {/* cancel button */}
                    <div className="border border-gray-500 p-1 rounded-md transition-all duration-300 hover:bg-gray-500 cursor-pointer">
                        <h1 className="font-bold text-sm">Cancel</h1>
                    </div>
                    {/* save button */}
                    <div className="border p-1 rounded-md bg-black cursor-pointer">
                        <h1 className="font-bold text-sm text-white">Save</h1>
                    </div>
                </div>
            </div>

            {/* body -> consist of 2 grids */}
            <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                <div className="col-span-2">
                    {/* acocunt details */}
                    <div className="border border-gray-400 rounded-xl p-4 mt-4 bg-white">
                        <h1 className="font-bold text-xl">Account Details</h1>
                        <div className="h-px w-full bg-gray-300 my-3"></div>
                        {/* email section */}
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <h1 className="font-bold">Verify Email Address</h1>
                                <p className="font-bold text-gray-500 text-sm">Verify your email address to confirm your credentials</p>
                            </div>
                            {/* status */}
                            <div className="flex bg-green-300/60 p-1 rounded-md w-20 items-center justify-center">
                                <h1 className="font-bold text-sm text-green-500">Verified</h1>
                            </div>
                        </div>

                        <div className="h-px w-full bg-gray-300 my-3"></div>

                        {/* password section */}
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <h1 className="font-bold">Update Password</h1>
                                <p className="font-bold text-sm text-gray-600">Change your password to update & protect your Account</p>
                            </div>
                            <div className="flex border border-gray-500 rounded-md p-1 items-center justify-center transition-all duration-300 hover:bg-gray-500 cursor-pointer">
                                <h1 className="font-bold text-sm">Change Password</h1>
                            </div>
                        </div>
                    </div>

                    {/* recovery section */}
                    <div className="border border-gray-400 rounded-xl p-4 mt-6 bg-white">
                        <h1 className="font-bold text-xl">Recovery Settings</h1>
                        <div className="h-px w-full bg-gray-300 my-2"></div>
                        {/* recovery email address */}
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <h1 className="font-bold">Recovery Email Address</h1>
                                <p className="font-bold text-sm text-gray-500">Setup Recovery Email to Secure your Account</p>
                            </div>
                            <div className="border p-1 rounded-md bg-black">
                                <h1 className="font-bold text-sm text-white cursor-pointer">Save</h1>
                            </div>
                        </div>
                        {/* additional email space */}
                        <div className="my-3 flex flex-col">
                            <h1>Additional Email Address</h1>
                            <div  className="flex">
                                <input type="text" className="border rounded-md" />
                            </div>
                        </div>

                        <div className="h-px w-full bg-gray-300 my-2"></div>
                        {/* recovery phone number */}
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <h1 className="font-bold">Recovery Phone Number</h1>
                                <p className="font-bold text-gray-500 text-sm">Add Phone Number to Setup SMS Recovery for your account</p>
                            </div>

                            <div className="flex items-center justify-center border w-16 p-1 rounded-md transition-all duration-300 hover:bg-gray-500 cursor-pointer">
                                <h1 className="font-bold">Setup</h1>
                            </div>
                        </div>

                        {/* deactivate account section */}
                        <div className="flex flex-row mt-6 items-center justify-between">
                            <div>
                                <h1 className="font-bold">Deactivate Account</h1>
                                <p className="font-bold text-sm text-gray-500">This will shut down your account. And it will reactivate with Signing in</p>
                            </div>
                            <div className="border border-red-500/60 bg-gray-500/30 rounded-md flex items-center justify-center p-1 transition-all duration-300 hover:bg-red-500/50  cursor-pointer">
                                <h1 className="font-bold text-gray-700">Deactivate</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* two-factor authentication grid */}
                <div className="border border-gray-500 rounded-xl p-4 mt-4 bg-white">
                    <h1 className="font-bold text-xl">Two-factor Authentication</h1>
                    <div className="h-px w-full bg-gray-300 my-4"></div>

                    <div>
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="font-bold">Enable Authentication</h1>
                            <button>btn</button>
                        </div>
                        <p className="font-bold text-sm text-gray-500">Enable Two-factor Authentication to enhance the security</p>
                    </div>

                    <div className="h-px w-full bg-gray-300 my-4"></div>
                    <div className="flex flex-row items-center justify-between p-2">
                        <div className="flex flex-row">
                            <div className="p-2 flex bg-gray-500/40 rounded-md mr-2">
                                <SiMonkeytie size={16}/>
                            </div>
                            <h1 className="font-bold">Authentication App</h1>
                        </div>
                        <div className="border border-gray-500 p-1 rounded-xl transition-all duration-200 hover:bg-gray-500 cursor-pointer">
                            <IoMdAdd size={30}/>
                        </div>
                    </div>
                    <div className="h-px w-full bg-gray-300 my-4"></div>

                    <div>
                        <div className="flex flex-row items-center gap-4">
                            <div className="p-2 bg-gray-500/40 rounded-md">
                                <FaKey size={16}/>
                            </div>
                            <h1 className="font-bold">Security Key</h1>
                        </div>
                        <p className="font-bold text-sm text-gray-500 my-1">Use physical security key to protect your account</p>
                        <div className="flex justify-center p-1 pb-2">
                            <div className="border border-gray-500 rounded-md flex items-center justify-center w-[80%] p-1 transition-all duration-300 hover:bg-gray-500 cursor-pointer">
                            <h1 className="font-bold ">Use Security Key</h1>
                        </div>
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}