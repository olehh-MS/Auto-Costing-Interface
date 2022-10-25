import React, { } from "react";

function switchHandler(e, setRoot, setActiveLayer, setLayers){
    setRoot(e.target.value) 
    setActiveLayer(e.target.value)
    setLayers([])
    document.querySelectorAll('.active').forEach((element) => element.classList.remove('active'))
}

function Dropdown({ roots, setRoot, setActiveLayer, setLayers }) {
    return (
        <div>
            <select onChange={(e) => switchHandler(e, setRoot, setActiveLayer, setLayers)}>
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