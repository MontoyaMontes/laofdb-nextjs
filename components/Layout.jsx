import Head from "next/head"
// import styles from '../styles/Layout.module.css'
// import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Description = "Brief description"

export default function Layout({ children, title, description, home }) {
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
                        <Link href="/">
                            <a>
                               
                            </a>
                        </Link>
                        <h2 >
                            <Link href="/">
                                <a >Home</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>

            <nav>
                <Link href="/">
                    <a>Inicio | </a>
                </Link>
                <Link href="/muestras">
                    <a>muestras | </a>
                </Link>
                <Link href="/morfologiaMandibulas">
                    <a>morfologia mandibulas | </a>
                </Link>
                <Link href="/morfometriaIzquierdas">
                    <a>morfometria izquiefas | </a>
                </Link>
                <Link href="/pesoMandibulas">
                    <a>peso mandibulas</a>
                </Link>
            </nav>

            <main>
                {children}
            </main>

            {!home && (
                <div >
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}

Layout.defaultProps = {
    title: "Next.js | sitio web",
    description: "Descripción genérica"
}