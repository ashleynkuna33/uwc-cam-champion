import  "../styles/ProjectionCard.css";


function ProjectionCard(){

    const assessmentName= ["Assignment","Test"];
    const assessmentWeight=[10,20];
    const assessmentMark=[65,100];
    const currentCam=56;
    const projectedCam = 79;
    const status = "Dinstinction";
    const percentageSign ="%";


    const  levels={

        mark:0,
        pass:50,
        dinstinction:75,
        merit:100
    }
  
    return(

        <>
        <div className="min-h-screen w-full">

            <div  className="projection-card">

             <h2 className="heading">Projection Sliders</h2>

                <div className="top-section">

                 <h4 className="slider-text">{assessmentName[0]}</h4>
                 <p className="weight-tab">{assessmentWeight[0]+percentageSign +" WEIGHT"}</p>
                 <span className="score">{assessmentMark[0]+percentageSign}</span>

                </div>

             <div>

                <div className="camMark-levels">
                    <span>{levels.mark+percentageSign}</span>
                    <span>{levels.pass +percentageSign}</span>
                    <span>{levels.dinstinction+percentageSign}</span>
                    <span>{levels.merit+percentageSign}</span>

                </div>

                
                <div  className="top-section">

                 <h4 className="slider-text">{assessmentName[1]}</h4>
                 <p className="weight-tab">{assessmentWeight[1]+percentageSign +"WEIGHT"}</p>
                 <span  className="score">{assessmentMark[1]+percentageSign}</span>

                </div>

                <div className="camMark-levels">
                    <span>{levels.mark+percentageSign}</span>
                    <span>{levels.pass+percentageSign}</span>
                    <span>{levels.dinstinction+percentageSign}</span>
                    <span>{levels.merit+percentageSign}</span>

                </div>


                <div className="footer-on-card">
                    <ul className="footer-list">
                        <li>
                            <p className="footer-text">Current Cam</p>
                            <span className="status">{currentCam+percentageSign}</span>
                        </li>
                    </ul>

                    <ul className="footer-list">
                        <li>
                            <p className="footer-text">Projected</p>
                            <span className="status">{projectedCam+percentageSign}</span>
                        </li>
                    </ul>

                    <ul className="footer-list">
                        <li>
                            <p className="footer-text">Status</p>
                            <span className="status">{status}</span>
                        </li>
                    </ul>
                </div>

            </div>


            </div>

        

         

        </div>

        </>

    );
}

export default ProjectionCard