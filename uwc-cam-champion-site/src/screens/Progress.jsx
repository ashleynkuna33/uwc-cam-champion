
import "../components/Progress.css";




function Progress() {


    return (
        <>

      <div  className="min-h-screen w-full">

        <div className="top-nav">

            <div className="left">
              <div className="heading">Semester one</div>
            </div>

            <div>

                <div className="drop-down-menu" >
                    <button className="drop-down-btn">Modules</button>
                      <div className="drop-down-content">
                         <a href="#">module1</a>
                         <a href="#">module2</a>
                         <a href="#">module3</a>
                      </div>
             
                </div>
            </div>

       </div>


    <div className="global-container">

     <div className="left">

        <div className="progress-bar-container">

            <div className="progress-bar-heading">
                <p>CURRENT CAM</p>
                <span>63%</span>
            </div>
            <div className="bar-line" data-percent="90%">
                <span style={{width:"90%"}}  className="bar-fill"></span>
            </div>
        </div>
        
    

       

        <div className="progress-bar-container">

            <div className="progress-bar-heading">
                <p>PROJECTED FINAL</p>
                <span>79%</span>
            </div>
            <div className="bar-line" data-percent="79%">
                <span style={{width:"79%"}}  className="bar-fill"></span>
            </div>


        </div>

        </div>
        

        
     <div className="right">
        <div className="progress-bar-container">

            <div className="progress-bar-heading">
                <p>REMAINING WEIGHT</p>
                <span>30%</span>
            </div>
            <div className="bar-line" data-percent="30%">
                <span style={{width:"30%"}}  className="bar-fill"></span>
            </div>


        </div>


        <div className="progress-bar-container">

            <div className="progress-bar-heading">
                <p>NEED FOR DINSTINCTION</p>
                <span>80%</span>
            </div>
            <div className="bar-line" data-percent="80%">
                <span style={{width:"80%"}}  className="bar-fill"></span>
            </div>


        </div>

        </div>

    </div>




        <div className="cards-container">

            <div className="left-card">

            </div>



            

            <div className="right-card">


            </div>
        </div>
        

    </div>
        </>   
    );
}



export default Progress;