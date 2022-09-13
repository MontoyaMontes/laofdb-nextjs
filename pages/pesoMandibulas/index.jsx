import React from "react";
import Layout from "../../components/Layout"
import Datos from "../../components/Datos"

export default function Index() {

    return (
        <div style={{ margin: '2rem' }}>
            <Layout
                title="Pesos mandibulas"
                description="uno"
                pesoMandibulas
            >

                <Datos collection={"pesomandibulas"} />

            </Layout>
        </div>
    )
}