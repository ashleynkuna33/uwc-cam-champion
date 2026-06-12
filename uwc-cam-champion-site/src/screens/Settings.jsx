
import "../components/Settings.css";
function Settings() {
    return (
        <div className="flex flex-col">
            <div className="border border-transparent bg-white rounded-2xl p-4 shadow-md">
                <h1 className="font-bold text-xl">Settings</h1>
            </div>



            <div className="card-content bg-white">

                <button className="setting-btn">Edit Profile</button>
                <button className="setting-btn">Preferences</button>
                <button className="setting-btn">Security</button>
                <button className="setting-btn">Data Privacy</button>

            </div>

            <div className="bottom-card bg-white">

                <h5>Personal Information</h5>

                <form action="" className="setting-form-content">

                <div>
                    <label htmlFor="text">First Name</label> <br />
                    <input type="text" placeholder="Enter First Name"/>
                </div>

                <div>
                    <label htmlFor="text">Last Name</label> <br />
                    <input type="text" placeholder="Enter Last Name" />
                </div>

                <div>
                    <label htmlFor="text">Email Address</label> <br />
                    <input type="email" placeholder="Enter email address" className="" />
                </div>

                
                <div>
                    <label htmlFor="text">Email Address</label> <br />
                    <input type="email" placeholder="Enter email address" className="" />
                </div>


                 <h5>Personal Address</h5> 
            <div> 
                <div>
                    <label htmlFor="text">First Name</label> <br />
                    <input type="text" placeholder="Enter First Name"/>
                </div>

                <div>
                    <label htmlFor="text">Last Name</label> <br />
                    <input type="text" placeholder="Enter Last Name" />
                </div>

                <div>
                    <label htmlFor="text">Email Address</label> <br />
                    <input type="email" placeholder="Enter email address" className="" />
                </div>

                
                <div>
                    <label htmlFor="text">Email Address</label> <br />
                    <input type="email" placeholder="Enter email address" className="" />
                </div>

            </div>

                </form>

            </div>
        </div>
    )
}

export default Settings;