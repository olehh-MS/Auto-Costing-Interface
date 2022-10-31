import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from './Dropdown'
import BuildTable from './BuildTable'
import Layers from './Layers'

function CostesTables() {

  const [roots, setRoots] = useState([{}])
  const [layers, setLayers] = useState([{}])
  const [activeLayer, setActiveLayer] = useState()
  const [oldValues, setOldValues] = useState([])
  const [selected, setSelected] = useState([])

  const [load, setLoad] = useState(true)
  const [loadTable, setLoadTable] = useState(true)
  const [loadLayers, setLoadLayers] = useState(true)

  useEffect(() => {
    if(load){
      axios.get('https://localhost:7002/GetTables', {
              headers: {},
          }).then(function (response) {
            setRoots(response.data)
            setActiveLayer(response.data[0])
            setLoad(false)
          })
    }
  })
  


  return (
    <>
      <button onClick={() => console.log(oldValues)}/>
      <div className="header">
        <Dropdown roots={roots} setActiveLayer={setActiveLayer} setLoadTable={setLoadTable}
          setLoadLayers={setLoadLayers}/>
        <h3>{activeLayer?.description}</h3>
      </div>
      <div className="container">
        <BuildTable loadTable={loadTable} setLoadTable={setLoadTable} activeLayer={activeLayer} 
          selected={selected} setSelected={setSelected} oldValues={oldValues} setLayers={setLayers}/>
        <Layers loadLayers={loadLayers} setLoadLayers={setLoadLayers} selected={selected} setSelected={setSelected}
          activeLayer={activeLayer} setActiveLayer={setActiveLayer} oldValues={oldValues} 
          layers={layers} setLayers={setLayers} setOldValues={setOldValues}/>
      </div>
    </>
  )
}

export default CostesTables
