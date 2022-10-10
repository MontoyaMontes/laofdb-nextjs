import { useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

import { useRouter } from "next/router";

import React from "react";
import Layout from "../../components/Layout"

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Collapse from '@mui/material/Collapse';

export default function AddItem() {

    const router = useRouter()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [openSucces, setOpenSucces] = useState(false);
    const [openFail, setOpenFail] = useState(false);

    const handlePost = async (e) => {
        e.preventDefault();

        // Estructura
        let newMandibula = {
            evaluador: "Prueba de post en muestras",
            title,
            content,
            createdAt: new Date().toISOString(),
        };

        // Usando la api para postear
        // let response = await fetch('/api/posts', {
        //     method: 'POST',
        //     body: JSON.stringify(post),
        // });
        let dev = process.env.NODE_ENV !== 'production';

        let DEV_URL = "http://localhost:3001"
        let PROD_URL = "https://laofdb.vercel.app/"


        let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/muestras`, {
            method: 'POST',
            headers: { collection: "muestras" },
            body: JSON.stringify(newMandibula),
        })

        let data = await response.json();
        console.log("---", data, "---");

        if (data.success) {
            // reset the fields
            // setTitle('');
            // setContent('');
            setOpenSucces(true)
        } else {
            setOpenFail(true);
        }

    };

    return (
        <div style={{ margin: '2rem' }}>
            {/* El layout nos da las pestañas superiores */}
            <Layout
                title="Morfologías"
                description="Agregar"
                morfologia
            >
                <div>

                    <Breadcrumbs aria-label="breadcrumb">
                        <span color="inherit" href='..' onClick={() => router.push({ pathname: '/' })} style={{ cursor: "pointer" }}>
                            Inicio
                        </span>
                        <span color="inherit" href='...' onClick={() => router.back()} style={{ cursor: "pointer" }}>
                            Busqueda
                        </span>
                        <Typography color="textPrimary">
                            Agregar
                        </Typography>
                    </Breadcrumbs>

                </div>

                <Collapse in={openSucces}>
                    <Alert
                        severity="info"
                        action={
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setOpenSucces(false);
                                }}
                            >
                                X
                            </button>
                        }
                    >
                        <AlertTitle>Registrado</AlertTitle>
                        Se han registrado correctamente los datos
                    </Alert>
                </Collapse>


                <Collapse in={openFail}>
                    <Alert
                        severity="error"
                        action={
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setOpenFail(false);
                                }}
                            >
                                X
                            </button>
                        }
                    >
                        <AlertTitle>Error</AlertTitle>
                        Hubo un error, intentar despúes.
                    </Alert>
                </Collapse>


                <form onSubmit={handlePost} >
                    <div>
                        <div>
                            <label>Título</label>
                            <input
                                className="form-control"
                                onChange={(e) => setTitle(e.target.value)}
                            >
                            </input>
                            {!title && <span>Error, se requiere titulo</span>}
                        </div>

                        <div>
                            <label >Nombre:</label>
                            <input
                                className="form-control"
                                onChange={e => setContent(e.target.value)}
                            >
                            </input>
                        </div>
                    </div>

                    <div >
                        <button type="submit" className="btn btn-primary">
                            Agregar registro
                        </button>
                    </div>
                </form>

            </Layout >
        </div >
    )
}