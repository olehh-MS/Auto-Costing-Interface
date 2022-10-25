import React, { useState } from 'react'
import Dropdown from './Dropdown'
import Layers from './Layers'
import BuildTable from './BuildTable'
import { roots } from './Db'

function File() {

  const [root, setRoot] = useState('N7')
  const [description, setDescription] = useState("STEEL OBD DAMPER")
  const [activeLayer, setActiveLayer] = useState('N7')
  const [layers, setLayers] = useState([{}])
  const [edit, setEdit] = useState(false)
  const [oldValues, setOldValues] = useState([])

  return (
    <>
      <button onClick={() => console.log(oldValues)}/>
      <div className="header">
        <Dropdown roots={roots} setLayers={setLayers} setRoot={setRoot} setDescription={setDescription} setActiveLayer={setActiveLayer}/>
        <h3>{description}</h3>
      </div>
      <div className="container">
        <BuildTable setLayers={setLayers} root={root} activeLayer={activeLayer} oldValues={oldValues} />
        <Layers activeLayer={activeLayer} root={root} layers={layers} oldValues={oldValues} setOldValues={setOldValues} setActiveLayer={setActiveLayer} setEdit={setEdit} />
      </div>
    </>
  )
}

export default File
