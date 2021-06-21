import React from 'react';

const Title = ({title, titleSpan}) =>{
    return(
        <div className="title">
            {title} <span>{titleSpan}</span>
        </div>        
    )
}

export default Title;