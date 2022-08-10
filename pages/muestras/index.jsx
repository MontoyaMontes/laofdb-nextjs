import Layout from "../../components/Layout"
import Link from "next/dist/client/link"
import Datos from "../../components/Datos"

export default function index({ data }) {
    return (
        <div style={{ margin: '2rem' }}>
            <Layout
                title="Muestras"
                description="mi"
                muestras
            >

                Muestras

            </Layout>
        </div>
    )
}