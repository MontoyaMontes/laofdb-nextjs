import Link from "next/link";
import React, { useState, useEffect } from "react";

// Colecciones disponibles:
//  morfologiamandibulas
// morfometriasizquierdas
// muestras <- General, aún trabajandola
// pesomandibulas

export default function Data(props) {

  const [responseData, setResponseData] = useState([])
  const [cargaDatos, setCargaDatos] = useState(false);
  const [limitData, setLimitData] = useState(1)
  const [totalDatos, setTotalDatos] = useState(0)
  const [collectionName, setCollectionName] = useState("")

  useEffect(() => {
    if (props.collection) {
      setCollectionName(props.collection)
    }
  }, [props.collection])

  useEffect(() => {
    async function getData() {
      let dev = process.env.NODE_ENV !== 'production';

      // Cambiar para tener las variables en env
      //const DEV_URL = process.env.DEV_URL;
      //const PROD_URL = process.env.PROD_URL;

      let DEV_URL = "http://localhost:3001"
      let PROD_URL = "https://laofdb.vercel.app/"

      // Crear nuevo endpoint para buscar por ID
      let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/muestras`, { headers: { collection: collectionName, limit: limitData } })

      let data = await response.json()
      setResponseData(data.message)
    }

    if (cargaDatos) {
      getData()
      !cargaDatos
      setTotalDatos(responseData.length)
    }

  }, [cargaDatos, collectionName, limitData, responseData.length])

  useEffect(() => {
    console.log("1->", setResponseData, "<-1")
    console.log("2->", responseData, "<-2")
  }, [responseData])

  const handleLoadData = () => {
    setCargaDatos(!cargaDatos)
  }

  return (

    <div>
      <div>
        <div>
          <label>Total de datos:</label>
          <input
            className="form-control"
            type='number'
            id="morfo"
            min='0'
            value={limitData}
            onChange={e => setLimitData(e.target.value)}
          >
          </input>
          <label >Búscar por ID:</label>
          <input
            className="form-control"
            value={"Aún no disponible"}
            disabled
            //value={limitData}
            onChange={e => setLimitData(e.target.value)}
          >
          </input>
        </div>

        <button className="btn btn-primary" onClick={handleLoadData}>
          Mostrar Datos
        </button>
      </div>

      <h2>Datos</h2>
      <h2>Total datos: {totalDatos}</h2>
      {console.log("+++", responseData, "+++")}

      {collectionName === "morfologiamandibulas" &&

        responseData.map(
          ({
            _id,
            marcaTemporal,
            evaluador,
            nombre,
            numeroMandibula,
            idCodigoMandibula,
            impresionTotalIzquierda,
            mentonIzquierda,
            anguloMandibularIzquierda,
            anguloMandibularDerecha,
            eversionGonialIzquierda,
            eversionGonialDerecha,
            margenInferiorIzquierda,
            cuerpoMandibularIzquierda,
            ramaMandibularIzquierda,
            ramaMandibularDerecha,
            incisuraMandibularEscotaduraSigmoideaIzquierda,
            incisuraMandibularEscotaduraSigmoideaDerecha,
            procesoCondilarIzquierda,
            procesoCondilarDerecha,
            procesoCoronoideIzquierda,
            procesoCoronoideDerecha,
            archoDentalIzquierda,
            dientesNumero,
            comentarios,
            dienteIzquierda,
          }) => (
            <div className="card mb-2" key={_id}>
              <div className="card-body">
                <div className="h4"> ID: {idCodigoMandibula} |</div>
                <button className="btn btn-seconday">
                  <Link href={`/morfologiaMandibulas/${_id}`} as={`/morfologiaMandibulas/${_id}`}>
                    <a>{_id}</a>
                  </Link>
                </button>

                <div>Código: {numeroMandibula} </div>
                <p>Marca temporal: {marcaTemporal}</p>
                <p>Evaluador: {evaluador}</p>
                <p>Nombre: {nombre}</p>
                <p>Impresion Total Izquierda: {impresionTotalIzquierda}</p>
                <p>Menton Izquierda: {mentonIzquierda}</p>
                <p>anguloMandibularIzquierda: {anguloMandibularIzquierda}</p>
                <p>anguloMandibularDerecha: {anguloMandibularDerecha}</p>
                <p>eversionGonialDerecha: {eversionGonialDerecha}</p>
                <p>anguloMandibularDerecha: {anguloMandibularDerecha}</p>
                <p>comentarios: {comentarios}</p>
              </div>
            </div>
          )
        )
      }

      {/* Base de datos pesos */}

      {
        collectionName === "pesomandibulas" &&
        responseData?.map(
          ({
            _id,
            marcaTemporal,
            evaluador,
            nombre,
            numeroMandibula,
            idCodigoMandibula,
            pesoMiligramos,
            observacionesRelacionadasAPeso,
            dientes,
            cuantos,
            cuales48,
            cuales47,
            cuales46,
            cuales45,
            cuales44,
            cuales43,
            cuales42,
            cuales41,
            cuales38,
            cuales37,
            cuales36,
            cuales35,
            cuales34,
            cuales33,
            cuales32,
            cuales31,
            comentarios,
          }) => (
            <div className="card mb-2" key={_id}>
              <div className="card-body">
                <div className="h4">ID: {numeroMandibula} - {idCodigoMandibula}</div>
                <p>Marca temporal: {marcaTemporal}</p>
                <p>Evaluador: {evaluador}</p>
                <p>Nombre: {nombre}</p>
                <p>pesoMiligramos: {pesoMiligramos}</p>
                <p>observacionesRelacionadasAPeso: {observacionesRelacionadasAPeso}</p>
                <p>dientes: {dientes}</p>
                <p>cuantos: {cuantos}</p>
                <p>cuales48: {cuales48}</p>
                <p>cuales47: {cuales47}</p>
                <p>cuales46: {cuales46}</p>
              </div>
            </div>
          )
        )
      }
    </div >
  )
}

// {
//   data.map(({ id, title, body }) => (
//     <div key={id}>
//       <h3>
//         <Link href={`/morfologiamandibulas/${id}`}>
//           <a>{id}-{title}</a>
//         </Link>
//       </h3>
//       <p>{body}</p>
//     </div>
//   ))
// } 