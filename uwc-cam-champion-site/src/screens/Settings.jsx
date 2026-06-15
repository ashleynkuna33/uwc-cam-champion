import { useState } from "react";
import "../components/Settings.css";
import { Background1 } from "../assets";



const EditProfile =()=>{
      
    return(<>

        <div className="flex flex-col">

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
                    <label htmlFor="text">Institution</label> <br />
                    <input type="text" />
                </div>

                <div>
                    <label htmlFor="text">City</label> <br />
                    <input type="text" placeholder="New York" />
                </div>
               
                <div>
                    <label htmlFor="text">Calender Year</label> <br />
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
    </>
    );
            
}

const Preference =()=>{
      
    return(<>

        <div className="flex flex-col">

            


        </div>
    </>
    );
            
}

const Security =()=>{
      
    return(<>

        <div className="flex flex-col">
    <h1>Welcome to security page</h1>
        </div>
    </>
    );
            
}

const DataPrivacy =()=>{
      
    return(<>

        <div className="flex flex-col">

      <h1>Welcome to data privacy page</h1>
            
        </div>
    </>
    );
            
}
function Settings() {

    const [active, setActive] = useState("EditProfile");
    
        

   
    return (
        <div className="flex flex-col">
            <div className="border border-transparent bg-white rounded-2xl p-4 shadow-md">
                <h1 className="font-bold text-xl">Settings</h1>

                
            <div className="card-content">

                <button className="setting-btn" onClick={()=>setActive("EditProfile") }>Edit Profile</button>
                <button className="setting-btn"  onClick={()=>setActive("Preference")}>Preferences</button>
                <button className="setting-btn"  onClick={()=>setActive("Security")}>Security</button>
                <button className="setting-btn"  onClick={()=>setActive("DataPrivacy")}>Data Privacy</button>

            </div>

            </div>




            <div>
                {active === "EditProfile" && <EditProfile/>}
                {active ==="Preference" && <Preference/>},
                {active ==="Security" && <Security/>},
                {active ==="DataPrivacy" && <DataPrivacy/>}
            </div>
            
            

        </div>
    )
}

export default Settings;