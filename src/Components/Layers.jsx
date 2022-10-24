import React from 'react'

function Layers({ root, layers, oldValues, setOldValues, activeLayer, setActiveLayer, setEdit }) {
  function canEdit(e,layerName) {
    setActiveLayer(layerName)
    setEdit(true)
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
              setActiveLayer(root)
              setEdit(false)
            }}
          >
            {root}
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
    
        <input className='changecostinput' onChange={(e)=>{inputHandler(e)}} type="hidden" name="" id="" placeholder='Enter new value'/>
       
      </div>
    </div>
  )
}

export default Layers
