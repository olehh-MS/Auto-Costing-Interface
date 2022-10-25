import React, { } from "react";



function Dropdown({ roots, setRoot, setActiveLayer }) {
    return (
        <div>
            <select onChange={(event) => {setRoot(event.target.value); setActiveLayer(event.target.value)}}>
               {roots.map((e,i) =>{
                    return(
                        <option value={e.name}>{e.name}</option>
                    )
               })}
            </select>
        </div>
    )
}

export default Dropdown;