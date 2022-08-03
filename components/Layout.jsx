import Head from "next/head"
import Link from 'next/link';

const Description = "Brief description"

export default function Layout(
    { children, title, description,
        home, muestras, morfologia, morfometriaIzquierdas, pesoMandibulas }
) {
    return (
        <div >
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{title}</title>
                <meta
                    content={description}
                >
                </meta>
            </Head>

            <h1>{title}</h1>

            <header >
                {home ? (
                    <>
                        <h6 >{Description}</h6>
                    </>
                ) : (
                    <>
                        
                        {/* <Link href="/">
                            <a>
                            </a>
                        </Link> */}
                        {/* <h2 >
                            <Link href="/">
                                <a >Home</a>
                            </Link>
                        </h2> */}
                    </>
                )}
            </header>

            <ul className="nav nav-tabs">
                {home ?
                    <Link href="/" className="nav-item">
                        <a className="nav-link active">Inicio  </a>
                    </Link>
                    :
                    <Link href="/" className="nav-item">
                        <a className="nav-link">Inicio  </a>
                    </Link>
                }
                {muestras ?
                    <Link href="/muestras" className="nav-item">
                        <a className="nav-link active">Muestras </a>
                    </Link>
                    :
                    <Link href="/muestras" className="nav-item">
                        <a className="nav-link">Muestras </a>
                    </Link>
                }
                {morfologia ?
                    <Link href="/morfologiaMandibulas" className="nav-item">
                        <a className="nav-link active">Morfologia mandibulas  </a>
                    </Link>
                    :
                    <Link href="/morfologiaMandibulas" className="nav-item">
                        <a className="nav-link" >Morfologia mandibulas  </a>
                    </Link>
                }
                {morfometriaIzquierdas ?
                    <Link href="/morfometriaIzquierdas" className="nav-item">
                        <a className="nav-link active">Morfometria izquierda  </a>
                    </Link>
                    :
                    <Link href="/morfometriaIzquierdas" className="nav-item">
                        <a className="nav-link">Morfometria izquierda  </a>
                    </Link>
                }
                {pesoMandibulas ?
                    <Link href="/pesoMandibulas" className="nav-item">
                        <a className="nav-link active">Peso mandibulas</a>
                    </Link>
                    :
                    <Link href="/pesoMandibulas" className="nav-item">
                        <a className="nav-link">Peso mandibulas</a>
                    </Link>
                }
            </ul>

            <main>
                {children}
            </main>

            {
                !home && (
                    <div >
                        <Link href="/">
                            <a>← Regresar a inicio</a>
                        </Link>
                    </div>
                )
            }
        </div >
    )
}

Layout.defaultProps = {
    title: "Next.js | sitio web",
    description: "Descripción genérica"
}