import React, { useState } from 'react'
import { width, height } from './Db'
import _ from 'lodash'
import {
  getLayersN7,
  createTable,
} from './Calculation'

function CalculateTable({ setLayers, root, activeLayer, edit, oldValues }) {
  const [selected, setSelected] = useState([])

  const selectSingle = (item) => {
    let selectedIds = Object.assign([], selected)

    if (_.findIndex(selectedIds, { id: item.id }) === -1) {
      selectedIds.push(item)
    } else {
      selectedIds.splice(_.findIndex(selectedIds, { id: item.id }), 1)
    }

    setSelected(selectedIds)
  }

  function check(e, height, width, i, j) {
    document.querySelector('.changecostinput').setAttribute('type', 'text')
    document.querySelector('.changecostinput').value = ""


    if (e.ctrlKey) {
      e.target.classList.toggle('active')
      selectSingle({ height: i, width: j })
    } else {
      document.querySelectorAll('.active').forEach((element) => {
        element.classList.remove('active')
      })
      e.target.classList.toggle('active')
      setLayers(getLayersN7(height, width))
    }
  }

  return (
    <table>
      <thead>
        <tr className="height">
          <td>Inch</td>
          {width.map((point, index) => (
            <td>{point}</td>
          ))}
        </tr>
      </thead>

      <tbody>
        {createTable(height, width, activeLayer).map((row, i) => {
          return (
            <tr key={i}>
              <td>{height[i]}</td>
              {row.map((cell, j) => {
                if (typeof cell === 'string') {
                  return <td> </td>
                } else {
                  return (
                    <td id={"cellW"+i+"H"+j}
                      onClick={(e) => check(e, width[j], height[i], i, j)}
                      key={j}
                    >
                      {/*oldValues.find((k) => k.el === document.querySelector("#cell"+i+""+j) && k.lay === activeLayer) ? "red" : "green"*/}
                      {cell}
                    </td>
                  )
                }
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default CalculateTable
