import React from 'react';

const Filter = ({checkType}) =>{
    return(
        <div className="container">
            <div className="filterByCheck">
            <span>Type</span>
                {checkType.map(type=>(
                    <div>
                        <input 
                            key={type.key}
                            type="checkbox" 
                            placeholder="Search"
                        />
                        <label>{type.name}</label>
                    </div>
                ))}
                
            </div>
            <div className="filterBySearch"> 
                <label>Filter by search</label>
                <input 
                    type="text" 
                    placeholder="Search"
                />
            </div>
        </div>
    )
}

export default Filter;