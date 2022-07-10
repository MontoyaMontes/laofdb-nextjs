import { useState, useEffect } from "react";
import axios from "axios";

export default function Data() {

    const [prueba, setPrueba] = useState([]);
    const [limit, setLimit] = useState(25)
    
    //let px = 'http://localhost:3000'
    let px = "https://laofdb-unam.vercel.app"

    const params = {
      collection: "morfologiamandibulas",
      limit: 40,
    }
  
    useEffect(() => {
      const fecthData = () => {
           axios.get(`${px}/api/muestras`, { params } )
              .then(res => {
                setPrueba(res.data.message);
                console.log(res.data.message)
              })
      };
      fecthData();
  }, []);

  return (

  <div>

  {prueba.map(
  ({
    _id,
    marcaTemporal,
    evaluador,
    nombre,
    numeroMandibula,
    idCodigoMandibula,
  }) => (
    <div className="card mb-2" key={_id}>
      <div className="card-body">
        <div className="h4">ID: {numeroMandibula} - {idCodigoMandibula}</div>
        <p>Marca temporal: {marcaTemporal}</p>
        <p>Evaluador: {evaluador}</p>
        <p>Nombre: {nombre}</p>
        </div>
      </div>
      )
  )}
  </div>
  )
}