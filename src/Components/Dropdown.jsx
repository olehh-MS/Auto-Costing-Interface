import React, { useEffect } from "react";


function switchHandler(e, setActiveLayer, roots, setLoadTable, setLoadLayers){
    document.querySelectorAll('.active').forEach((element) => element.classList.remove('active'))
    setActiveLayer(roots.find(element => element.id === e.target.value))
    setLoadTable(true)
    setLoadLayers(true)

    document.querySelectorAll('.active-layer').forEach((element) => {
        element.classList.remove('active-layer')})
}

function Dropdown({ roots, setActiveLayer, setLoadTable, setLoadLayers }) {

    return (
        <div>{
            <select onChange={(e) => switchHandler(e, setActiveLayer, roots, setLoadTable, setLoadLayers)}>
               {roots.map((e,i) =>{
                    return(
                        <option key={i} value={e.id}>{e.name}</option>
                    )
               })}
            </select> }
        </div>
    )
}

export default Dropdown;