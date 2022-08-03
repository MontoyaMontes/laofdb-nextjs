import Layout from "../../components/Layout"
import Link from "next/dist/client/link"
import Prueba from "../../pages/components/Prueba"

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