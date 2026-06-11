import { useRef, useState } from "react";
import "../components/Progress.css";
import SimulationPanel from "../components/SimulationPanel";

const ProgressBar = ({ title, percentage }) => {
  const displayPercent = typeof percentage === 'number' ? `${percentage}%` : percentage;

  return (
    <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all hover:bg-indigo-600/10 duration-300 rounded-xl p-5 flex flex-col gap-3 w-full">
      {/* Header  */}
      <div className="flex flex-col md:flex-row items-baseline justify-between w-full">
        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
          {title}
        </p>
        <span className="text-lg font-bold text-indigo-600 tracking-tight">
          {displayPercent}
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div 
          style={{ width: displayPercent }} 
          className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
        ></div>
      </div>
    </div>
  );
};

function Progress() {
  let totalCam = 78;
  let statusResults = "merit";
  const barRef = useRef(null);
  const [cam, setcam] = useState(0);

  const barRefExam = useRef(null);
  const [exam, setexam] = useState(0);

  const camMark = (event) => {
    const bar = barRef.current.getBoundingClientRect();
    const clickX = event.clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setcam(Math.round(percent));
  };

  const progressData = [
    { id: 1, title: 'CURRENT CAM', percentage: '63%', position: 'left' },
    { id: 2, title: 'PROJECTED FINAL', percentage: '79%', position: 'left' },
    { id: 3, title: 'REMAINING WEIGHT', percentage: '30%', position: 'right' },
    { id: 4, title: 'NEED FOR DISTINCTION', percentage: '80%', position: 'right' },
  ];

  {/* The update function */}

const updateMark =(assessmentId,newMark)=>{

  setPendingAssessment(prev => prev.map({...module,assessment: module.assessment.map( a => a.id ===assessmentId ? {...a, mark: newMark} :a)}))


}

  const camMarkExam = (event) => {
    const bar = barRef.current.getBoundingClientRect();
    const clickX = event.clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setexam(Math.round(percent));
  };

  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingExam, setIsDraggingExam] = useState(false);

  const startDrag = () => {
    setIsDragging(true);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  const startDragExam = () => {
    setIsDraggingExam(true);
    window.addEventListener("mousemove", onDragExam);
    window.addEventListener("mouseup", stopDragExam);
  };

  const onDrag = (event) => {
    const bar = barRef.current.getBoundingClientRect();
    const clickX = event.clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setcam(Math.round(percent));
  };

  const onDragExam = (event) => {
    const bar = barRef.current.getBoundingClientRect();
    const clickX = event.clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setexam(Math.round(percent));
  };

  const stopDrag = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", stopDrag);
  };

  const stopDragExam = () => {
    setIsDraggingExam(false);
    window.removeEventListener("mousemove", onDragExam);
    window.removeEventListener("mouseup", stopDragExam);
  };


  const [pendingAssessment ,setPendingAssessment]=useState([{

    id : 1,
    moduleName: "MAT 311",
    assessment:[{id :1, assessmentName:"Assignment 1", weight: 20, assessmentStatus: "completed" ,mark:0},
                {id :2, assessmentName:"Tutorial 1", weight: 20, assessmentStatus: "completed" ,mark:0},
                {id :3, assessmentName:"Assignment 2", weight: 20, assessmentStatus: "pending" ,mark:0},
                {id :4, assessmentName:"Test 1", weight: 20, assessmentStatus: "pending" ,mark:0},
                {id :5, assessmentName:"Tutorial 2", weight: 20,assessmentStatus: "pending" ,mark:0}
    ]

}]);


  const pendingCount=pendingAssessment.flatMap( module=>module.assessment)
                                      .filter(assessment =>assessment.assessmentStatus ==="pending")
                                      .length;
  

  return (
    <>
      <div className="flex flex-col">
        {/* header */}
        <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl bg-white shadow-md px-6 h-24 md:h-18">
          <div className="font-bold text-xl">2026 Calender Year</div>
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-2xl shadow-md hover:border-gray-600 transition-all duration-100 cursor-pointer focus:outline-none focus:border-blue-500 font-medium my-4">
            <option value="">Module 1</option>
            <option value="">Module 2</option>
            <option value="">Module 3</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-6">
          {progressData.map(card => (
            <ProgressBar
            key={card.id} title={card.title} percentage={card.percentage} />
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <div className="bg-white rounded-2xl flex-1 shadow-md">
            <div className="flex flex-row justify-between px-4 py-2">
              <p className="left-card-header-text">
                <span>PROJECTION SLIDER</span>
              </p>
              <span className="left-card-activities">{pendingCount} pending</span>
            </div>

            <div className="left-card-progress-bar">
              <div className="process-bar-header">
                <div className="bar-header">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >
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
                <span style={{ left: "0%", transform: "translateX(0%)" }}>
                  0%
                </span>
                <span style={{ left: "50%" }}>Pass 50%</span>
                <span style={{ left: "75%" }}>Dist 75%</span>
                <span style={{ left: "100%", transform: "translateX(-100%)" }}>
                  100%
                </span>
              </div>
            </div>

            <div className="left-card-progress-bar">
              <div className="process-bar-header">
                <div className="bar-header">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >
                    <h5>FINAL EXAM</h5>
                    <span className="sl-wt">30% WEIGHT</span>
                  </div>
                  <span className="sl-num">{exam}%</span>
                </div>
                <div
                  className="left-bar-line"
                  ref={barRefExam}
                  onClick={camMarkExam}
                >
                  <span style={{ width: `${exam}%` }}></span>
                  <div
                    className="left-line-thumb"
                    style={{ left: `${exam}%` }}
                    onMouseDown={startDragExam}
                  ></div>
                </div>
              </div>
              <div className="under-line-measurement">
                <span style={{ left: "0%", transform: "translateX(0%)" }}>
                  0%
                </span>
                <span style={{ left: "50%" }}>Pass 50%</span>
                <span style={{ left: "75%" }}>Dist 75%</span>
                <span style={{ left: "100%", transform: "translateX(-100%)" }}>
                  100%
                </span>
              </div>
            </div>

            <div className="flex flex-row p-4 bg-gray-200/80 rounded-bl-2xl rounded-br-2xl">
              
                <div  className="bottom-status">
                  <p className="status-label">CURRENT</p>
                  <input type="text" value={`${totalCam}%`} readOnly />
                </div>

                <div  className="bottom-status">
                  <p className="status-label">PROJECTED</p>
                  <input type="text" value={`${totalCam}%`} readOnly />
                </div>

                <div  className="bottom-status">
                  <p className="status-label">STATUS</p>
                  <input type="text" value={`${statusResults}`} readOnly />
                </div>
              
            </div>
          </div>

          <div className="flex-1 shadow-md">
            <SimulationPanel />
          </div>
        </div>
      </div>
    </>
  );
}

export default Progress;
