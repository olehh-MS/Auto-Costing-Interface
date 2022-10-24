
import { packagingN7, width, height, GALV_SHT_ST_0_027, laborN7 } from './Db'

function subtractValueNum(num) {
  if (num.toString().length > 5) {
    num = Math.round(num * 1e12) / 1e12
    return num
  }
  return num
}

function PackagingCost(w, h) {
  var wI = width.indexOf(w)
  var hI = height.indexOf(h)

  return packagingN7[hI][wI] // packaging
}

function LaborCost(w, h) {
  var wI = width.indexOf(w)
  var hI = height.indexOf(h)
  return laborN7[hI][wI] //labor
}

const MaterialCost = (W, H) => {
  // =(5*W+4*$EX32+1.5*FJ$31*$EX32)/144*1.125*'COST DATA'!$AG$10+60%*DK119
  
  var formula =
    ((5 * W + 4 * H + 1.5 * W * H) / 144) * 1.125 * GALV_SHT_ST_0_027 +
    0.6 * PackagingCost(W, H)

  var res = Math.round(formula * 100) / 100 // material

  return res
}

function getLayersN7(W, H) {
  return [
    {
      name: 'Material',
      value: MaterialCost(W, H),
      subLayers: [
        {
          name: 'Packaging',
          value: PackagingCost(W, H),
          subLayers: [],
        },
      ],
    },
    {
      name: 'Labor',
      value: LaborCost(W, H),
      subLayers: [],
    },
  ]
}

function getCostN7(W, H) {
  var lab = LaborCost(W, H)
  var mat = MaterialCost(W, H)
  return subtractValueNum(mat + lab)
}

function createTable(height, width, value) {
  let material = []
  height.forEach((e1, i1) => {
    material.push(new Array())
    width.forEach((e2, i2) => {
      switch (value) {
        case 'Material':
          return material[i1].push(MaterialCost(e2, e1))
        case 'Packaging':
          return material[i1].push(PackagingCost(e2, e1))
        case 'Labor':
          return material[i1].push(LaborCost(e2, e1))
        default:
          return material[i1].push(getCostN7(e2, e1))
      }
    })
  })

  return material
}

export { MaterialCost, LaborCost, getCostN7, getLayersN7, createTable }
