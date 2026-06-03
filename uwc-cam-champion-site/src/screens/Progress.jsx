
import "../components/Progress.css";


import { useRef, useState } from "react";

function Progress() {


  const barRef= useRef(null);
  const [cam, setcam] = useState(65);

  const camMark =(event)=>{

    const bar =barRef.current.getBoundingClientRect();
    const clickX = e.clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setCam(Math.round(percent));
   

  }


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

                <div className="left-card-header">
                    <p className="left-card-header-text"><span>PROJECTION SLIDER</span></p>
                    <span className="left-card-activities">pending 2</span>
                </div>

                <div className="left-card-progress-bar">
                    <div className="process-bar-header">

                        <div className="bar-header">
                            <h5>ASSIGNMENT</h5>
                            <p>10% WEIGHT</p>
                        </div>

                        <div className="left-bar-line" ref={barRef} onClick={camMark}>
                           <span style={{width:`${cam}%`}}></span>
                            <div className="left-line-thumb" style={{left: `${cam}%`}}></div>
                        </div>

                        
                    </div>

                    <div className="under-line-measurement">
                        <span style={{left:'0%'}}>0%</span>
                        <span style={{left:'50%'}}>50%</span>
                        <span style={{left:'75%'}}>75%</span>
                        <span style={{left:'100%'}}>100%</span>
                    </div>
                </div>

            </div>





            <div className="right-card">


            </div>
        </div>
        

    </div>
        </>   
    );
}



export default Progress;