
import { packaging, width, height, SD_FRAME_EXTR_PPTD, GALV_SHT_ST_0_027, WIRE, GALV_SHT_ST_0_016, DD_FRAME_EXTR_PPTD, laborN7, laborGSA20 } from './Db'

function subtractValueNum(num) {
  return Math.round(num * 100) / 100
}

function PackagingCost(w, h) {
  var wI = width.indexOf(w)
  var hI = height.indexOf(h)

  return packaging[hI][wI] // packaging
}

function FIN_LENGTH_FT(w){
  return w/12;
}

function FINS_QTY(h){
  var hI = height.indexOf(h)
  const data = [5,6,8,11,14,17,20,23,26,29,32,35,38,41,44]
  return data[hI]
}

/* N7 */

function LaborCostN7(w, h) {
  var wI = width.indexOf(w)
  var hI = height.indexOf(h)
  return laborN7[hI][wI] 
}

const MaterialCostN7 = (W, H) => {
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
      value: MaterialCostN7(W, H),
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
      value: LaborCostN7(W, H),
      subLayers: [],
    },
  ]
}

function getCostN7(W, H) {
  var lab = LaborCostN7(W, H)
  var mat = MaterialCostN7(W, H)
  return subtractValueNum(mat + lab)
}


/* GSA20 */

function LaborCostGSA20(w, h) {
  var wI = width.indexOf(w)
  var hI = height.indexOf(h)
  return laborGSA20[hI][wI] 
}

function getCostPaintedSt(W,H){
  return FINS_QTY(H) * FIN_LENGTH_FT(W) * (0.085 * GALV_SHT_ST_0_016 + 0.023 * WIRE + 0.005)
}

function MaterialCostGSA20(W,H){
  if(W<20 && H<20){
    //FINS COST /DEFL. X 2 + (W +H+4”)COST OF PAINTED 2”L. FRAME + W X H X 0.004 P.SQ.IN.
    return getCostPaintedSt(W,H) * 2 + (W + H + 4) * 2 * DD_FRAME_EXTR_PPTD / 12 + W * H * 0.004
  }
  else if(W<20 && H>=20){
    return getCostPaintedSt(W,H) * 2 + W  * 0.04 + (W + H + 4) * 2 * DD_FRAME_EXTR_PPTD / 12 + W * H * 0.004
  }
  else if(W>=20 && H<20){
    return getCostPaintedSt(W,H) * 2 + H * 0.04 + (W + H + 4) * 2 * DD_FRAME_EXTR_PPTD / 12 + W * H * 0.004
  }
  else{
    return getCostPaintedSt(W,H) * 2 + (W + H)  * 0.04 + (W + H + 4) * 2 * DD_FRAME_EXTR_PPTD / 12 + W * H * 0.004
  }
}

function getCostGSA20(W, H){
  if(LaborCostGSA20(W,H) === "" || MaterialCostGSA20(W,H) === "" || PackagingCost(W,H) === "")
    return ""
  return subtractValueNum(LaborCostGSA20(W,H) + MaterialCostGSA20(W,H) + PackagingCost(W,H))
}


/* GA20 */

function getCostPaintedAl(W,H){
  if (W <= 12)
    return FIN_LENGTH_FT(W) * FINS_QTY(H) * 0.083
  else if (W <= 18)
    return FIN_LENGTH_FT(W) * FINS_QTY(H) * 0.183
  else if (W <= 28)
    return FIN_LENGTH_FT(W) * FINS_QTY(H) * 0.183 + H * 0.015
  else
    return FIN_LENGTH_FT(W) * FINS_QTY(H) * 0.083 + H * 0.015 * 2
}

function MaterialCostGA20(W,H){
  //FORMULA = FINS COST /DEFL. X 2 + (W+H+4”)COST OF PAINTED 2”L. FRAME+ W X H X 0.004P.SQ.IN.X2//
  return getCostPaintedAl(W, H) * 2 + (W + H + 4) * 2 / 12 * DD_FRAME_EXTR_PPTD + W * H * 0.004 * 2
}

function getCostGA20(W,H){
  if(LaborCostGSA20(W,H) === "" || MaterialCostGA20(W,H) === "" || PackagingCost(W,H) === "")
    return ""
  return subtractValueNum(LaborCostGSA20(W,H) + MaterialCostGA20(W,H) + PackagingCost(W,H))
}



/* GSA27 */

function getCostGSA27(W,H){
  if(getCostN7(W,H) === "" || getCostGSA20(W,H) === "")
    return ""
  return subtractValueNum(getCostN7(W,H) + getCostGSA20(W,H))
}


/* GSA10 */

function MaterialCostGSA10(W,H){
  // FORMULA: FINS COST /DEFL. +Nh Xcost of 1 in. of mullion+ (W +H+4")COST OF PAINTED 2"L. FRAME+ W X H X 0.004 P.SQ.IN.//
  if (W < 20)
    return getCostPaintedSt(W,H) + (H + W + 4) * 2 * SD_FRAME_EXTR_PPTD / 12 + H * W * 0.004
  else
    return getCostPaintedSt(W,H) + H * 0.04 + (H + W + 4) * 2 * SD_FRAME_EXTR_PPTD / 12 + H * W * 0.004
}

function getCostGSA10(W,H){
  if(LaborCostGSA20(W,H) === "" || MaterialCostGSA10(W,H) === "" || PackagingCost(W,H) === "")
    return ""
  return subtractValueNum(LaborCostGSA20(W,H) * 0.85 + MaterialCostGSA10(W,H) + PackagingCost(W,H) * 0.85) 
}


/* GA10 */

function MaterialCostGA10(W,H){
  //FORMULA: FINS COST /DEFL. + (W +H+4")COST OF PAINTED 2"L. FRAME+ W X H X 0.004 P.SQ.IN.X1//
  
  return getCostPaintedAl(W,H) + (W + H + 4) * 2 / 12 * SD_FRAME_EXTR_PPTD + W * H * 0.004
}

function getCostGA10(W,H){
  if(LaborCostGSA20(W,H) === "" || MaterialCostGA10(W,H) === "" || PackagingCost(W,H) === "")
    return ""
  return subtractValueNum(LaborCostGSA20(W,H) * 0.85 + MaterialCostGA10(W,H) + PackagingCost(W,H) * 0.85) 
}





function createTable(height, width, value) {
  let material = []
  height.forEach((e1, i1) => {
    material.push(new Array())
    width.forEach((e2, i2) => {
      switch (value) {
        case 'Material':
          return material[i1].push(MaterialCostN7(e2, e1))
        case 'Packaging':
          return material[i1].push(PackagingCost(e2, e1))
        case 'Labor':
          return material[i1].push(LaborCostN7(e2, e1))
        default:
          return material[i1].push(getCostN7(e2, e1))
      }
    })
  })

  return material
}

export { MaterialCostN7, LaborCostN7, getCostN7, getLayersN7, createTable }
