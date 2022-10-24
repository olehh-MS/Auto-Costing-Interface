import React, { } from "react";



function Dropdown({ roots, setRoot }) {
    return (
        <div>
            <select onChange={(event) => setRoot(event.target.value)}>
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