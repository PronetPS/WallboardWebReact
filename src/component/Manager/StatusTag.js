import React from 'react';


const StatuTag = ({ data: { title, icon, status, color } }) => {
    return (
        <div className="row-tag" style={{ backgroundColor: color }}>
            <div className='row-tag-icon'
                style={{ border: `2px solid ${color}` }}>{icon}
            </div>

            <div>
                <div className="row-tag-status">
                    {status}
                </div>
                <div className="row-tag-title" >
                    {title}
                </div>
            </div>

        </div>
    )
}

export default StatuTag;