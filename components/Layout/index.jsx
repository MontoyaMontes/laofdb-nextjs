import Head from "next/head"
import Link from 'next/link';
import { Fragment } from "react";
import ScrollButton from "../ScrollButton";

const Description = "Brief description about this app"

// Layout que maneja la cabecera
export default function Layout(
    // Props, si hay una nueva poner para ser renderizado en 'tabs' junto a su <Link>
    {
        children,
        title,
        description,
        home,
        muestras,
        morfologia,
        morfometriaIzquierdas,
        pesoMandibulas,
        adding
    }
) {
    return (
        <div >
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{title}</title>
                <meta content={Description}>
                </meta>
            </Head>

            <h1>{title}</h1>

            <header >
                {true && (
                    <Fragment>
                        <h6 >{description}</h6>
                    </Fragment>
                )}
            </header>

            <ul className="nav nav-tabs">
                {/* Si es <opción> la pestaña actual, le pone la clase activa */}

                <Link href="/" className="nav-item">
                    <a className={home ? "nav-link active" : "nav-link"}>Inicio  </a>
                </Link>

                <Link href="/muestras" className="nav-item">
                    <a className={muestras ? "nav-link active" : "nav-link"}>Muestras </a>
                </Link>

                <Link href="/morfologiaMandibulas" className="nav-item">
                    <a className={morfologia ? "nav-link active" : "nav-link"}>Morfologia mandibulas  </a>
                </Link>

                <Link href="/morfometriaIzquierdas" className="nav-item">
                    <a className={morfometriaIzquierdas ? "nav-link active" : "nav-link"}>Morfometria izquierda  </a>
                </Link>

                <Link href="/pesoMandibulas" className="nav-item">
                    <a className={pesoMandibulas ? "nav-link active" : "nav-link"}>Peso mandibulas</a>
                </Link>
                {/* Nuevas opciones aquí */}
            </ul>

            <main>
                {children}
            </main>

            <div className="fixed-bottom">
                <ScrollButton/>
            </div>

        </div >
    )
}
// Props por defecto
Layout.defaultProps = {
    title: "",
    description: ""
}