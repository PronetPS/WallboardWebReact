// import React from "react";
// import { gTime } from "../utils/base";

// const USERDATATABLE = ({ data }) => {

//     const columns = [
//         { name: "AGENT NAME" },
//         { name: "SUR NAME" },
//         { name: "AGENT ID" },
//         { name: "AGENT STATE DURATION" },
//         { name: "AGENT SUPERVISOR" },
//         { name: "AGENT STATE" },
//         { name: "Location"}
//     ];

//     return (
//         <div className="u-s-table-container">
//             <div className="table-container">
//                 {data ? `Total: ${data?.length}` : ""}
//                 <div className="table-header-row">
//                     {columns.map((item, ind) => (<div className="item" key={ind}>{item.name}</div>))}
//                 </div>


//                 {data?.map((item, ind) => {

//                     const timeZ = item.Timestamp.split("Z")[0];

//                     const AgentTime = new Date(timeZ).getTime(); //backend
//                     const currentTime = new Date().getTime();    // current times

//                     return <div key={ind} className="table-row">
//                         <div className="item">{item.AgentGivenName}</div>
//                         <div className="item">{item.AgentSurName}</div>
//                         <div className="item">{item.AgentLogin}</div>
//                         <div className="item">{item.Duration === 0 ? "-" :
//                             (gTime((currentTime - AgentTime) / 1000).split('.')[0])
//                         }</div>
//                         <div className="item">{"SUPERVIOSRS"}</div>
//                         <div className="item">
//                             <div className="agent-status-box"
//                                 style={{
//                                     backgroundColor: item.EventType === "RY" ? "#38ab8e" :
//                                         item.EventType === "NR" ? "#2979ff" : item.EventType === "LO" ? "#ff1f1f" :
//                                             item.EventType === "LI" ? "#ffa82f" : ""
//                                 }}>
//                                 {item.EventType === "RY" ? "Ready" :
//                                     item.EventType === "NR" ? "Not Ready" : item.EventType === "LO" ? "Logout" :
//                                         item.EventType === "LI" ? "Login" : ""
//                                 }
//                             </div>
//                         </div>
//                         <div className="item">{"KARACHI"}</div>
//                     </div>
//                 })}

//             </div>
//         </div>
//     )
// }

// export default USERDATATABLE;

import React from "react";
import { gTime } from "../utils/base";

const USERDATATABLE = ({ data }) => {

    return (
        <div className="u-s-table-container">
            <div className="table-container">
                {data ? `Total: ${data?.length}` : ""}
                <div className="table-header-row">
                    <div className="item" >AGENT</div>
                    <div className="item" >DURATION</div>
                    <div className="item" >SUPERVISOR</div>
                    <div className="item" >AGENT STATE</div>
                    <div className="item" >Location</div>

                </div>
                {data?.map((item, ind) => {
                    return <div key={ind} className="table-row">
                        <div className="item">
                            <div style={{ width: "274px" }}> {item.AGENT_ID}</div>
                        </div>
                        <div className="item" >
                            {gTime(item.TIME_IN_STATE)}
                        </div>
                        <div className="item">
                            <div style={{ width: "350px", textAlign: 'start' }}>
                                {item.SupervisorName}
                            </div>
                        </div>
                        <div className="item">
                            <div className="agent-status-box"
                                style={{
                                    backgroundColor: item.STATE === "IDLE " ? "#62b6ff" :
                                        item.STATE === "NOTRDY " ? "#ff9d0b" : item.STATE === "Logout" ? "#ff1f1f" : ""
                                }}>
                                {item.STATE === "IDLE " ? "Ready" :
                                    item.STATE === "NOTRDY " ? "Not Ready" : item.STATE === "Logout" ? "Logout" : ""}
                            </div>
                        </div>
                        <div className="item">{item.Department}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default USERDATATABLE;