import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout"
import Link from "next/dist/client/link"
import Prueba from "../../pages/components/Prueba"

export default function Index() {

    const [responseData, setResponseData] = useState([])
    const [cargaDatos, setCargaDatos] = useState(false);
    const [limitData, setLimitData] = useState(0)

    useEffect(() => {
        async function getData() {
            let dev = process.env.NODE_ENV !== 'production';
            // Cambiar para tener las variables en env
            //const DEV_URL = process.env.DEV_URL;
            //const PROD_URL = process.env.PROD_URL;

            let DEV_URL = "http://localhost:3000"
            let PROD_URL = "https://laofdb.vercel.app/"

            // Cada uno se puede cargar por separado, poniendo en headers el nombre de la collección
            // Crear nuevo endpoint para buscar por ID
            let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/muestras`, { headers: { collection: "morfologiamandibulas", limit: limitData} })
            //let response2 = await fetch(`${dev ? DEV_URL : PROD_URL}/api/muestras`, { headers: { collection: "pesomandibulas", limit: limitPesos} })

            let data = await response.json()

            setResponseData(data.message)
        }

        if (cargaDatos){
            getData()
            !cargaDatos
        }

    }, [cargaDatos, limitData])

    useEffect(() => {
        console.log("1->", setResponseData, "<-1")
        responseData.map(e => { console.log(e) })
    }, [responseData])

    const handleLoadData = () => {
        setCargaDatos(!cargaDatos)
    }

    return (
        <div style={{ margin: '2rem' }}>
            <Layout
                title="Morfologías"
                description="uno"
                morfologia
            >
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
                    Cargar BD
                </button>

                <div className="container">
                    {cargaDatos ?
                        <Prueba morfologiasMandibulas={responseData}></Prueba>
                        :
                        <h1>Pulsa <b>Cargar BD</b> para ver resultados</h1>
                    }

                </div>
                {/* 

                {
                    data.map(({ id, title, body }) => (
                        <div key={id}>
                            <h3>
                                <Link href={`/blog/${id}`}>
                                    <a>{id}-{title}</a>
                                </Link>
                            </h3>
                            <p>{body}</p>
                        </div>
                    ))
                } */}
            </Layout>
        </div>
    )
}