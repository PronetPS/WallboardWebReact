import React from "react";
import { gTime } from "../utils/base";

const USERDATATABLE = ({ data }) => {

    const columns = [{ name: "AGENT NAME" }, { name: "SUR NAME" }, { name: "AGENT ID" }, { name: "AGENT STATE DURATION" },
    { name: "AGENT STATE" }];

    return (
        <div className="u-s-table-container">
            <div className="table-container">
                {data ? `Total: ${data?.length}` : ""}
                <div className="table-header-row">
                    {columns.map((item, ind) => (<div className="item" key={ind}>{item.name}</div>))}
                </div>


                {data?.map((item, ind) => {
                    // const timeZ = item.Timestamp.split("Z")[0];
                    // const AgentTime = new Date(timeZ).getMilliseconds();
                    // const currentTime = new Date().getMilliseconds();

                    const timeZ = item.Timestamp.split("Z")[0];

                    const AgentTime = new Date(timeZ).getTime(); //backend
                    const currentTime = new Date().getTime();    // current times

                    return <div key={ind} className="table-row">
                        <div className="item">{item.AgentGivenName}</div>
                        <div className="item">{item.AgentSurName}</div>
                        <div className="item">{item.AgentLogin}</div>
                        <div className="item">{item.Duration === 0 ? "-" :
                           (gTime((currentTime - AgentTime)/ 1000).split('.')[0])
                        }</div>

                        <div className="item">
                            <div className="agent-status-box"
                                style={{
                                    backgroundColor: item.EventType === "RY" ? "#38ab8e" :
                                        item.EventType === "NR" ? "#2979ff" : item.EventType === "LO" ? "#ff1f1f" :
                                            item.EventType === "LI" ? "#ffa82f" : ""
                                }}>
                                {item.EventType === "RY" ? "Ready" :
                                    item.EventType === "NR" ? "Not Ready" : item.EventType === "LO" ? "Logout" :
                                        item.EventType === "LI" ? "Login" : ""
                                }
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}

export default USERDATATABLE;
