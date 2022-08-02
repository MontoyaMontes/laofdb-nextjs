import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout"
import Link from "next/dist/client/link"
import Prueba from "../../pages/components/Prueba"

export default function Index() {

    const [morfologiamandibulas, setMorfologiamandibulas] = useState([])
    const [pesomandibulas, setPesomandibulas] = useState([])
    const [cargaDatos, setCargaDatos] = useState(false);
    const [limitMorfo, setLimitMorfo] = useState(2)

    useEffect(() => {
        async function getData() {
            let dev = process.env.NODE_ENV !== 'production';
            // Cambiar para tener las variables en env
            //const DEV_URL = process.env.DEV_URL;
            //const PROD_URL = process.env.PROD_URL;

            let DEV_URL = "http://localhost:3001"
            let PROD_URL = "https://laofdb.vercel.app/"

            // Cada uno se puede cargar por separado, poniendo en headers el nombre de la collección
            let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/muestras`, { headers: { collection: "morfologiamandibulas", limit: limitMorfo } })
            let data = await response.json()
            //console.log("--",data.message,"--")

            setMorfologiamandibulas(data.message)
            //console.log("--",data,"--")

            let response2 = await fetch(`${dev ? DEV_URL : PROD_URL}/api/muestras`, { headers: { collection: "pesomandibulas", limit: limitPesos } })
            let data2 = await response2.json()
            //console.log("--",data2.message,"--")
            setPesomandibulas(data2.message)
        }

        if (cargaDatos)
            getData()
    }, [cargaDatos, limitMorfo])

    useEffect(() => {
        console.log("1->", morfologiamandibulas, pesomandibulas, "<-1")
        morfologiamandibulas.map(e => { console.log(e) })
    }, [morfologiamandibulas, pesomandibulas])

    const handleLoadData = () => {
        setCargaDatos(!cargaDatos)
    }

    return (
        <div style={{ margin: '2rem' }}>
            <Layout
                title="Morfologías"
                description="uno"
            >
                <div>
                    <label>Total de datos:</label>
                    <input
                        className="form-control"
                        type='number'
                        id="morfo"
                        min='0'
                        value={limitMorfo}
                        onChange={e => setLimitMorfo(e.target.value)}
                    >
                    </input>
                    <label >Búscar por ID:</label>
                    <input
                        className="form-control"
                        value={"Aún no disponible"}
                        disabled
                        //value={limitPesos}
                        onChange={e => setLimitMorfo(e.target.value)}
                    >
                    </input>
                </div>

                <button className="btn btn-primary" onClick={handleLoadData}>
                    Cargar BD
                </button>

                <div className="container">
                    {cargaDatos ?
                        <Prueba morfologiasMandibulas={morfologiamandibulas}></Prueba>
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