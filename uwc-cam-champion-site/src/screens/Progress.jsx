import "../components/Progress.css";
import SimulationPanel from "../components/SimulationPanel";
import { useRef, useState } from "react";

function Progress() {

 let totalCam=78;
 let statusResults ="merit";
  const barRef= useRef(null);
  const [cam, setcam] = useState(0);

  const barRefExam= useRef(null);
  const [exam,setexam] =useState(0);


  const camMark =(event)=>{

    const bar =barRef.current.getBoundingClientRect();
    const clickX = event.clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setcam(Math.round(percent));
   }

     const camMarkExam =(event)=>{

    const bar =barRef.current.getBoundingClientRect();
    const clickX = event.clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setexam(Math.round(percent));
   }


const [isDragging, setIsDragging] = useState(false);
const [isDraggingExam, setIsDraggingExam] = useState(false);

const startDrag =()=>{

    setIsDragging(true);
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);

};
const startDragExam =()=>{

    setIsDraggingExam(true);
    window.addEventListener('mousemove', onDragExam);
    window.addEventListener('mouseup', stopDragExam);

};

const onDrag=(event) =>{

    const bar =barRef.current.getBoundingClientRect();
    const clickX = event.clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setcam(Math.round(percent));
};
const onDragExam=(event) =>{

    const bar =barRef.current.getBoundingClientRect();
    const clickX = event.clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setexam(Math.round(percent));
};

const stopDrag =()=>{
    setIsDragging(false);
    window.removeEventListener('mousemove',onDrag);
    window.removeEventListener('mouseup',stopDrag);

};

const stopDragExam =()=>{
    setIsDraggingExam(false);
    window.removeEventListener('mousemove',onDragExam);
    window.removeEventListener('mouseup',stopDragExam);

};



    return (
        <>

      <div  className=" min-h-screen w-full flex flex-col">

        <div className="top-nav  flex items-center justify-between">

            <div className="left">
              <div className="heading">2026 calender year</div>
            </div>

            

            <div className="drop-down-menu" >
                    <button className="drop-down-btn">Modules</button>

                      <div className="drop-down-content">
                         <a href="#">module1</a>
                         <a href="#">module2</a>
                         <a href="#">module3</a>
                      </div>
             
            </div>

            

       </div>


    <div className="global-container flex flex-col md:flex-row gap-4" >

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




 <div className="cards-container flex flex-col md:flex-row gap-4">

  <div className="left-card">

    <div className="left-card-header">

        <p className="left-card-header-text"><span>PROJECTION SLIDER</span></p>
        <span className="left-card-activities">pending 2</span>

    </div>

    <div className="left-card-progress-bar">
        <div className="process-bar-header">

            <div className="bar-header">

                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>

                    <h5>ASSIGNMENT 2</h5>
                    <span className="sl-wt">10% WEIGHT</span>

                </div>

                <span className="sl-num">{cam}%</span>
            </div>
            

            <div className="left-bar-line" ref={barRef} onClick={camMark}>
                <span style={{ width: `${cam}%` }}></span>
                <div
                    className="left-line-thumb"
                    style={{ left: `${cam}%` }}
                    onMouseDown={startDrag}
                ></div>
            </div>

        </div>

        <div className="under-line-measurement">
            <span style={{ left: '0%', transform: 'translateX(0%)' }}>0%</span>
            <span style={{ left: '50%' }}>Pass 50%</span>
            <span style={{ left: '75%' }}>Dist 75%</span>
            <span style={{ left: '100%', transform: 'translateX(-100%)' }}>100%</span>
        </div>
    </div>


     <div className="left-card-progress-bar">
        <div className="process-bar-header">

            <div className="bar-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <h5>FINAL EXAM</h5>
                    <span className="sl-wt">30% WEIGHT</span>
                </div>
                <span className="sl-num">{exam}%</span>
            </div>

            <div className="left-bar-line" ref={barRefExam} onClick={camMarkExam}>
                <span style={{ width: `${exam}%` }}></span>
                <div
                    className="left-line-thumb"
                    style={{ left: `${exam}%` }}
                    onMouseDown={startDragExam}
                ></div>
            </div>

        </div>

              <div className="under-line-measurement">
                 <span style={{ left: '0%', transform: 'translateX(0%)' }}>0%</span>
                  <span style={{ left: '50%' }}>Pass 50%</span>
                  <span style={{ left: '75%' }}>Dist 75%</span>
                  <span style={{ left: '100%', transform: 'translateX(-100%)' }}>100%</span>
                </div>
         </div>


         
        <div className="bottom-section">

            <div className="bottom-status">

              <div>
                <p>CURRENT</p>
                <input type="text" value={`${totalCam}%`} readOnly />
              </div>

              
              <div>
                <p>PROJECTED</p>
                <input type="text" value={`${totalCam}%`}  readOnly/>
              </div>

              
              <div>
                <p>STATUS</p>
                <input type="text" value={`${statusResults}`}  readOnly/>
              </div>

               

            

            <div className="right-card">
                <SimulationPanel />

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