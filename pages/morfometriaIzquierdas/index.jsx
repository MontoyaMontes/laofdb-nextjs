import Layout from "../../components/Layout"
import Datos from "../../components/Datos"

export default function index({ data }) {
    return (
        <div style={{ margin: '2rem' }}>
            <Layout
                title="Morfometria izquierdas"
                description="mi"
                morfometriaIzquierdas
            >

                <Datos collection={"morfometriasizquierdas"}></Datos>
            </Layout>
        </div>
    )
}