
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

                

 <form action="" className="setting-form-content"> 

    <h5 className="form-titles">Personal Information</h5>

            <div className="form-first-section">

                
                <div>
                    <label htmlFor="text">First Name</label> <br />
                    <input type="text" placeholder="John"/>
                </div>

                <div>
                    <label htmlFor="text">Last Name</label> <br />
                    <input type="text" placeholder="Doe" />
                </div>

           
            </div>

        <div className="form-middle-section">

                <div>
                    <label htmlFor="text">Email Address</label> <br />
                    <input type="email" placeholder="JohnDoe123@gmail.com" className="" />
                </div>

                
                <div>
                    <label htmlFor="text">Phone Number</label> <br />
                    <input type="tel" placeholder="0673445699" className="" />
                </div>

        </div>


    <h5 className="form-titles">Personal Address</h5> 

 <div className="form-bottom-section">

                <div>
                    <label htmlFor="text">Country</label> <br />
                    <input type="text" placeholder="Chile"/>
                </div>

                <div>
                    <label htmlFor="text">City</label> <br />
                    <input type="text" placeholder="New York" />
                </div>
               
                <div>
                    <label htmlFor="text">Address</label> <br />
                    <input type="Address" placeholder="Enter address" className="" />
                </div>

                <div>
                    <label htmlFor="number">Zip Code</label> <br />
                    <input type="email"  className="" />
                </div>
                

            </div>

</form>

            </div>
        </div>
    )
}

export default Settings;