
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

      </div>
        </>   
    );
}



export default Progress;