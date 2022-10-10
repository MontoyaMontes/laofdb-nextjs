import React, { useState, useEffect } from "react";
import { CollapseCard } from "../CollapseCard/CollapseCard";

import { useRouter } from 'next/router'

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';

// Colecciones disponibles:
//  morfologiamandibulas
// morfometriasizquierdas
// muestras <- General, aún trabajandola
// pesomandibulas

export default function Data(props) {
  const router = useRouter()

  const [collectionName, setCollectionName] = useState("")

  const [responseData, setResponseData] = useState([])
  const [cargaDatos, setCargaDatos] = useState(false);
  const [limitData, setLimitData] = useState(1)
  const [totalDatos, setTotalDatos] = useState(0)
  const [idCodigo, setIdCodigo] = useState()

  const [open, setOpen] = useState(false);

  // Funciones de carga
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

      let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/muestras`, { headers: { collection: collectionName, limit: limitData, idCodigo: idCodigo } })

      let data = await response.json()
      setResponseData(data.message)
    }

    if (cargaDatos) {
      getData()
      !cargaDatos
      setTotalDatos(responseData.length)
    }

  }, [cargaDatos, collectionName, idCodigo, limitData, responseData.length])

  // Para el desarrollador este hook
  useEffect(() => {
    console.log("1->", setResponseData, "<-1")
    console.log("2->", responseData, "<-2")
  }, [responseData])

  // Handlers

  const handleLoadData = () => {
    setCargaDatos(!cargaDatos)
  }

  const handleNewRegister = () => {
    // console.log("aaaaa", router.asPath)
    // Se usa router.asPath para tomar la ruta actual
    router.push('/' + router.asPath + '/agregar')
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
            value={idCodigo}
            onChange={e => setIdCodigo(e.target.value)}
          >
          </input>
        </div>

        <Collapse in={open}>
          <Alert
            severity="info"
            action={
              <button
                aria-label="close"
                className="btn btn-danger"
                onClick={() => {
                  setOpen(false);
                }}
              >
                X
              </button>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>Carga activa</AlertTitle>
            Los datos se están cargando continuamente, ingresa un valor
          </Alert>
        </Collapse>

        <div className="d-flex justify-content-around">
          {
            cargaDatos ?
              <button type="button" className="btn btn-light" onClick={() => {
                setOpen(true)
              }}>
                Carga continua
              </button>
              :
              <button type="button" className="btn btn-primary" onClick={handleLoadData}>
                Cargar datos
              </button>
          }

          <button type="button" className="btn btn-success" onClick={handleNewRegister}>
            Agregar Registro
          </button>
        </div>


      </div>

      <h1>Resultados</h1>
      <h2>Datos encontrados: {totalDatos}</h2>

      {/* {console.log("+++", responseData, "+++")} */}

      {
        responseData.map(
          ({
            _id,
            marcaTemporal,
            evaluador,
            nombre,
            numeroMandibula,
            idCodigoMandibula,
          }) => (
            // Key={_id} es importante para que el programa corra correctamente
            <div className="card mb-2" key={_id}>
              <CollapseCard item={
                [_id,
                  marcaTemporal,
                  evaluador,
                  nombre,
                  numeroMandibula,
                  idCodigoMandibula]
              }
              />
            </div>
          )
        )
      }

    </div >
  )
}