
function RawMaterialsTable() {
    
  
    return (
        <div className='rawMaterialsTable'>
        <p className='rawMaterialsTable-Name'>Variable data</p>
        <table>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>$</th>
            <th>Unit</th>
          </tr>
          <tr>
            <th>WIRE</th>
            <td>[RM:Wire]</td>
            <td>0.63</td>
            <td>LB</td>
          </tr>
        </table>
        <button className='rawMaterialsTable-Button'>Save</button>
      </div>
    )
  }
  
  export default RawMaterialsTable
  