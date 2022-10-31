import React, { useState, useEffect } from 'react'
import axios from 'axios'

function BuildTable({ loadTable, setLoadTable, selected, setSelected, activeLayer, oldValues }) {
  const [load, setLoad] = useState(true)
  const [widthes, setWidthes] = useState()
  const [heightes, setHeightes] = useState()
  const [table, setTable] = useState()

  useEffect(() => {
    if(load){
      axios.get('https://localhost:7002/GetWidthHeight', {
              headers: {},
          }).then(function (response) {
            setWidthes(response.data.width)
            setHeightes(response.data.height)
            setLoad(false)
          })
    }
    if(loadTable){
      axios.get('https://localhost:7002/CreateTable/' + activeLayer?.name, {
              headers: {},
          }).then(function (response) {
            setTable(response.data)
            if(activeLayer)
              setLoadTable(false)
          })
    }
  })

  const clickHandler = (e, selected, setSelected) => {
    
    var cell = {
      activeLayer: activeLayer.id,
      width: e.target.getAttribute("id").split('-')[0],
      height: e.target.getAttribute("id").split('-')[1],
    }

    if (e.ctrlKey) {
      setSelected([...selected, cell])
      e.target.classList.toggle('active')
    } else {
      setSelected([cell])
      document.querySelectorAll('.active').forEach((element) => element.classList.remove('active'))
      e.target.classList.toggle('active')
    }
  }

  return (
    <table>
      <thead>
        <tr className="height">
          <td>Inch</td>
          {widthes?.map((e, i) => (
            <td key={i}>{e}</td>
          ))}
        </tr>
        {heightes?.map((e, i) => (
          <tr key={i}>
            <td>{heightes[i]}</td>
            {table[i].map((j, k) => (
              <td key={k} id={widthes[k]+"-"+heightes[i]} onClick={(e) => clickHandler(e, selected, setSelected)}>{j}</td>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        
      </tbody>
    </table>
  )
}
export default BuildTable
