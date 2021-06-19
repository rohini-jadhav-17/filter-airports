import React from 'react';

const Table = ({headers,currentData}) =>{
    return(
        <table>
        <thead>
            <tr>
                 {headers.map(head => (<th className="Addpadding" key={head.key}>{head.name}</th>))}
            </tr>
        </thead>
        <tbody>
            {currentData.map(data =>(
                <tr key={data.id}>
                    <td data-label="Name">{data.name}</td>
                    <td data-label="ICAO">{data.icao}</td>
                    <td data-label="IATA">{data.iata}</td>
                    <td data-label="Elev.">{data.elevation}</td>
                    <td data-label="Lat.">{data.latitude}</td>
                    <td data-label="Long.">{data.longitude}</td>
                    <td data-label="Type">{data.type}</td>
                </tr>
            ))}
        </tbody>
        </table>
    )
}

export default Table;