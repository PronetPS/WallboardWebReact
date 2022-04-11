import React from 'react';

const AgentStatusCard = ({ color, borderColor, title, boxShadow, busyAgent, idle, notReady, totalAgent }) => {
    return (
        <div className="status-row"
            style={{
                borderBottom: `11px solid ${borderColor}`,
                boxShadow: `0px -3px 11px 0px inset ${boxShadow}`,
                backgroundColor: `${color}`
            }}>
            <div className='row-total-agent-con'>
                <div className='count'>{totalAgent || "00"}</div>
                <div className='detail'>{title || "00"}</div>
            </div>

            <div className='row-status-agent-con'>

                <div className="box-tag">
                    <div className="tab-no" style={{ color: color }}>
                        <div className="counter">{idle || "00"}</div>
                    </div>
                    <div className="tab-title">IDLE</div>
                </div>

                <div className="box-tag">
                    <div className="tab-no" style={{ color: color }}>
                        <div
                            className="counter">{busyAgent || "00"}</div>
                    </div>
                    <div className="tab-title" >BUSY</div>
                </div>

                <div className="box-tag">
                    <div className="tab-no" style={{ color: color }}>
                        <div className="counter">{notReady || "00"}</div>
                    </div>
                    <div className="tab-title" >NOT READY</div>
                </div>
            </div>
        </div>
    )
}

export default AgentStatusCard;