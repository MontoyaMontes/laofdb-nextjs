import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout"
import { useRouter } from "next/router";

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";

export default function Page(props) {
    const router = useRouter()

    const { query, isReady } = useRouter();
    const [id, setId] = useState("")

    const [responseData, setResponseData] = useState([])

    useEffect(() => {

        async function getData() {
            let dev = process.env.NODE_ENV !== 'production';

            let DEV_URL = "http://localhost:3001"
            let PROD_URL = "https://laofdb.vercel.app/"
            // Obtiene el id pedido
            let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/muestras`, { headers: { collection: "morfologiamandibulas", limit: 1, idCodigo: id } })
            // Hacer response de información general del usuario
            let data = await response.json()
            setResponseData(data.message)
        }

        if (!isReady) {
            return
        } else {
            setId(query.id)
            getData()
        }

    }, [id, isReady, query.id])

    useEffect(() => {
        console.log("3->", setResponseData, "<-3")
        console.log("4->", responseData, "<-4")
    }, [responseData])

    return (
        <div style={{ margin: '2rem' }}>

            <Layout
                title="Detalles de: Morfologías"
                description="Detalles"
                morfologia
            >
                <Breadcrumbs aria-label="breadcrumb">
                    <span color="inherit" href='..' onClick={() => router.push({ pathname: '/' })} style={{ cursor: "pointer" }}>
                        Inicio
                    </span>
                    <span color="inherit" href='...' onClick={() => router.back()} style={{ cursor: "pointer" }}>
                        Busqueda
                    </span>
                    <Typography color="textPrimary">
                        Muestra: {id}
                    </Typography>
                </Breadcrumbs>

                {
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
                                    <div className="h4"> ID: {idCodigoMandibula} | id:{_id}</div>
                                    <p>Código: {numeroMandibula} </p>
                                    <p>Marca temporal: {marcaTemporal}</p>
                                    <p>Evaluador: {evaluador}</p>
                                    <p>Nombre: {nombre}</p>
                                    <p>Impresion Total Izquierda: {impresionTotalIzquierda}</p>
                                    <p>Menton Izquierda: {mentonIzquierda}</p>
                                    <p>anguloMandibularIzquierda: {anguloMandibularIzquierda}</p>
                                    <p>anguloMandibularDerecha: {anguloMandibularDerecha}</p>
                                    <p>eversionGonialIzquierda: {eversionGonialIzquierda}</p>
                                    <p>eversionGonialDerecha: {eversionGonialDerecha}</p>
                                    <p>anguloMandibularDerecha: {anguloMandibularDerecha}</p>
                                    <p>comentarios: {comentarios}</p>
                                    <p>margenInferiorIzquierda: {margenInferiorIzquierda}</p>
                                    <p>cuerpoMandibularIzquierda: {cuerpoMandibularIzquierda}</p>
                                    <p>ramaMandibularIzquierda: {ramaMandibularIzquierda}</p>
                                    <p>ramaMandibularDerecha: {ramaMandibularDerecha}</p>
                                    <p>incisuraMandibularEscotaduraSigmoideaIzquierda: {incisuraMandibularEscotaduraSigmoideaIzquierda}</p>
                                    <p>incisuraMandibularEscotaduraSigmoideaDerecha: {incisuraMandibularEscotaduraSigmoideaDerecha}</p>
                                    <p>procesoCondilarIzquierda: {procesoCondilarIzquierda}</p>
                                    <p>procesoCondilarDerecha: {procesoCondilarDerecha}</p>
                                    <p>procesoCoronoideIzquierda: {procesoCoronoideIzquierda}</p>
                                    <p>procesoCoronoideDerecha: {procesoCoronoideDerecha}</p>
                                    <p>archoDentalIzquierda: {archoDentalIzquierda}</p>
                                    <p>dientesNumero: {dientesNumero}</p>
                                    <p>comentarios: {comentarios}</p>
                                    <p>dienteIzquierda: {dienteIzquierda}</p>
                                </div>
                            </div>
                        )
                    )
                }

            </Layout >
        </div>
    )
}