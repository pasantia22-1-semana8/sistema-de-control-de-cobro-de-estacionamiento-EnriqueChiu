import React, { useEffect, useState } from 'react'
import api from '../services/Api'

function ShowDataTable(props) {
  const [data, setdata] = useState([])

  const key = Object.keys(props.values);
  key.unshift("NO.");

  useEffect(() => {
    

    (async () => {
      const res = await api.getData.getAll(props.url)
      setdata(res)
    })();

  }, [])
  
  if (props.update){
    update()
  }
  const deletes = async (id) =>{
    const res = await api.deleteData.tupla(id, props.url)
    alert(res.message)
    update()
  }

  const update = async () =>{
    const up = await api.getData.getAll(props.url)
    setdata(up)
  }

  return (
    <>
      <h1 className='text-white'>Lista de {props.title}</h1>
      <table className='table table-dark table-hover'>
        <thead>
          <tr>
            {key.map((item, index)=>(
              <th scope="col" key={index}>{item}</th>
              ))}
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
            {data.map((items, index)=>(
              <>
              <tr key={items['id'] + index}>
              {
                Object.values(items).map((item, index2)=>(
                  <td>
                    {
                      index2 == 0 
                      ? index+1 
                      : 
                        <>
                          { typeof item == 'boolean'
                          ?
                            <>{item ? <p>Activo</p> : <p>No activo</p>}</>
                          :
                            item.toString()
                          }
                        </>
                    }
                  </td>
                ))
              }
              <td>
                <button className='btn btn-danger' onClick={() => deletes(items['id'])}>Eliminar</button>
              </td>
              </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default ShowDataTable