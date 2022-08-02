import { useState, useEffect } from "react";

import Layout from "../../components/Layout"
import Link from "next/dist/client/link"
import Prueba from "../../pages/components/Prueba"

export default function Index({ data }) {
    // Reciclar lo de abajo, usado para hacer pruebas
    const [pesomandibulas, setPesomandibulas] = useState([])
    const [cargaDatos, setCargaDatos] = useState(false);
    const [limitPesos, setLimitPesos] = useState(2)

    useEffect(() => {
        async function getData() {
            let dev = process.env.NODE_ENV !== 'production';
            // Cambiar para tener las variables en env
            //const DEV_URL = process.env.DEV_URL;
            //const PROD_URL = process.env.PROD_URL;

            let DEV_URL = "http://localhost:3001"
            let PROD_URL = "https://laofdb.vercel.app/"

            let response2 = await fetch(`${dev ? DEV_URL : PROD_URL}/api/muestras`, { headers: { collection: "pesomandibulas", limit: limitPesos } })
            let data2 = await response2.json()
            //console.log("--",data2.message,"--")
            setPesomandibulas(data2.message)
        }

        if (cargaDatos)
            getData()
    }, [cargaDatos, limitPesos])

    useEffect(() => {
        console.log("2->", typeof morfologiamandibulas, typeof pesomandibulas, "<-2")
        //morfologiamandibulas.map(e => { console.log(e) })
    }, [pesomandibulas])

    const handleLoadData = () => {
        setCargaDatos(!cargaDatos)
    }

    return (
        <div>
            <Layout
                title="Pesos mandibulas"
                description="uno"
            >

                <div>
                    <label>Total de datos:</label>
                    <input
                        className="form-control"
                        type='number'
                        id="morfo"
                        min='0'
                        value={limitPesos}
                        onChange={e => setLimitPesos(e.target.value)}
                    >
                    </input>
                    <label >Búscar por ID:</label>
                    <input
                        className="form-control"
                        value={limitPesos}
                        disabled
                        onChange={e => setLimitPesos(e.target.value)}
                    >
                    </input>
                </div>

                <button className="btn btn-primary" onClick={handleLoadData}>
                    Cargar BD
                </button>

                <div className="container">
                    {cargaDatos ?
                        <Prueba dataPesomandibulas={pesomandibulas}></Prueba>
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