import React from "react";
import Layout from "../../components/Layout"
import Datos from "../../components/Datos"

export default function Index() {

    return (
        <div style={{ margin: '2rem' }}>
            {/* El layout nos da las pestañas superiores */}
            <Layout
                title="Morfologías"
                description="Búsqueda"
                morfologia
            >
                {/* Datos recibe 'collection' que renderiza las cartas básicas */}
                <Datos collection={"morfologiamandibulas"} />

            </Layout>
        </div>
    )
}