import React from 'react'
import { useSelector } from 'react-redux';

function CallStatusTable() {
    const { getTableKHILHR, getTableKHI, AHTData, getMainStatsV2 } = useSelector(state => state?.ManagerdSlice); //redux toolkit store
    const cusStyle = { width: "350px", margin: "5px 3px", textAlign: "center", fontWeight: 500 }
    let data = [
        { name: "Landed", kcc: "250", lcc: "362", total: "6512" },
        { name: "Answered", kcc: "621", lcc: "691", total: "6512" },
        { name: "Answer Per Agent", kcc: "250", lcc: "362", total: "6512" },
        // { name: "A.H.T", kcc: "250", lcc: "362", total: "6512" }
    ]

    console.log(getTableKHI && getTableKHI[0]?.KHI_ANSWERED);
    console.log(getMainStatsV2 && getMainStatsV2[0].KHITotalAgent);
    console.log(getTableKHI && (parseInt(getTableKHI[0]?.KHI_ANSWERED) / parseInt(getMainStatsV2 && getMainStatsV2[0].KHITotalAgent)));

    return (
        <div style={{ display: "flex", margin: "5px 30px 3px 30px", flexDirection: "column" }}>
            <div className="" style={{ display: "flex", width: "inherit", justifyContent: "space-between" }}>
                <div style={{ width: "350px", flex: 1 }}></div>
                <div style={{
                    width: "350px", backgroundColor: "#5a4183", margin: "5px 3px", textAlign: "center", color: "#fff",
                    fontWeight: "bold", padding: "3px 0px"
                }}>KCC</div>
                <div style={{
                    width: "350px", backgroundColor: "#01a283", margin: "5px 3px", textAlign: "center", color: "#fff",
                    fontWeight: "bold", padding: "3px 0px"
                }}>LCC</div>
                <div style={{
                    width: "350px", backgroundColor: "#384757", margin: "5px 3px", textAlign: "center", color: "#fff",
                    fontWeight: "bold", padding: "3px 0px"
                }}>TOTAL</div>
            </div>

            <div className="col-data-row" style={{ display: "flex", width: "inherit", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "350px", flex: 1, fontWeight: "bold" }}>Landed</div>
                <div style={cusStyle}>{getTableKHI ? getTableKHI[0]?.KHI_OFFERED : "00"}</div>
                <div style={cusStyle}>{getTableKHILHR ? getTableKHILHR[0]?.LHR_OFFERED : "00"}</div>
                <div style={cusStyle}>{getTableKHI && getTableKHILHR ? parseInt(getTableKHI[0]?.KHI_OFFERED) + parseInt(getTableKHILHR[0]?.LHR_OFFERED) : "00"}</div>
            </div>
            <div className="col-data-row" style={{ display: "flex", width: "inherit", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "350px", flex: 1, fontWeight: "bold" }}>Answered</div>
                <div style={cusStyle}>{getTableKHI ? getTableKHI[0]?.KHI_ANSWERED : "00"}</div>
                <div style={cusStyle}>{getTableKHILHR ? getTableKHILHR[0]?.LHR_ANSWERED : "00"}</div>
                <div style={cusStyle}>{getTableKHI && getTableKHILHR ? parseInt(getTableKHI[0]?.KHI_ANSWERED) + parseInt(getTableKHILHR[0]?.LHR_ANSWERED) : "00"}</div>
            </div>
            <div className="col-data-row" style={{ display: "flex", width: "inherit", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "350px", flex: 1, fontWeight: "bold" }}>Answer Per Agent</div>
                <div style={cusStyle}>{getTableKHI ? (parseInt(getTableKHI[0]?.KHI_ANSWERED) / parseInt(getMainStatsV2 && getMainStatsV2[0].KHITotalAgent)).toFixed(2) : "00"}</div>
                <div style={cusStyle}>{getTableKHILHR ? (parseInt(getTableKHILHR[0]?.LHR_ANSWERED) / parseInt(getMainStatsV2 && getMainStatsV2[0].LHRTotalAgent)).toFixed(2) : "00"}</div>
                <div style={cusStyle}>{getTableKHI && getTableKHILHR ? (parseInt(getTableKHILHR[0]?.LHR_ANSWERED) / parseInt(getMainStatsV2 && getMainStatsV2[0].LHRTotalAgent) + parseInt(getTableKHI[0]?.KHI_ANSWERED) / parseInt(getMainStatsV2 && getMainStatsV2[0].KHITotalAgent)).toFixed(2) : "00"}</div>
            </div>
            {/* <div className="col-data-row" style={{ display: "flex", width: "inherit", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "350px", flex: 1, fontWeight: "bold" }}>AHT</div>
                <div style={{ width: "350px", margin: "5px 3px", textAlign: "center", fontWeight: 500 }}>{AHTData && AHTData ? AHTData[0]?.AHT : "00"}</div>
                <div style={{ width: "350px", margin: "5px 3px", textAlign: "center", fontWeight: 500 }}>{AHTData && AHTData ? AHTData[1]?.AHT : "00"}</div>
                <div style={{ width: "350px", margin: "5px 3px", textAlign: "center", fontWeight: 500 }}>{AHTData && AHTData ? (AHTData[0]?.AHT + AHTData[1].AHT) : "00"}</div>

            </div> */}

        </div>
    )
}

export default CallStatusTable
