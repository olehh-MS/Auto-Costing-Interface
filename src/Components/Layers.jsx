import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Layers({ loadLayers, layers, setLayers, setLoadLayers, activeLayer, setActiveLayer, selected, oldValues, setOldValues}) {

  
  
//add condition
  useEffect(() => {
    if(selected[0] !== undefined){
      axios.get('https://localhost:7002/GetLayers/' 
        + selected[0].activeLayer + '/' + selected[0].width + '/' + selected[0].height, {
              headers: {},
          }).then(function (response) {
            setLayers(response.data)
            
            if(activeLayer)
              setLoadLayers(false)
          })
    }
  })

  function canEdit(e,layerName) {
    document.querySelectorAll('.active-layer').forEach((element) => {
        element.classList.remove('active-layer')
      })
    e.target.classList.add("active-layer")
    e.target.parentNode.parentNode.classList.add("active-layer")
  }

    const inputHandler = (e) => {
        document.querySelectorAll(".active").forEach((i) => {
            if(oldValues.find((k) => k.el === i && k.lay === activeLayer) === undefined)
              setOldValues([...oldValues, { lay: activeLayer, el:i, val:i.innerHTML }])
            i.innerHTML = e.target.value
        })
    }
    
  return (
    <div className='right-content'>
      <div className="layers">
        <div className="layer">
          <h2
            onClick={(e) => {
              document.querySelectorAll('.active-layer').forEach((element) => {
                element.classList.remove('active-layer')
              })
            }}
          >
            {activeLayer?.name}
          </h2>
        </div>
        {layers.map((l, index) => (
          <div className=''>
            <div className="layer" key={index}>
              <h3
                onClick={(e) => {
                  canEdit(e,l.name)
                }}
              >
                {l.name}
              </h3>
              <span className="cost">{l.value}</span>
            </div>
            {l.subLayers ? l.subLayers.map((s, i) => (
              <div className="layer subLayer" key={index}>
                <h3
                  onClick={(e) => {
                    canEdit(e,s.name)
                  }}
                >
                  {s.name}
                </h3>
                <span className="cost">{s.value}</span>
              </div>
            )) : ""}
          </div>
        ))}
      </div>
      <div className="footer">
    
        <input className='changecostinput' onChange={(e)=>{inputHandler(e)}} placeholder='Enter new value'/>
       
      </div>
    </div>
  )
}

export default Layers
