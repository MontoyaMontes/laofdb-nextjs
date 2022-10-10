import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (

    <div style={{ margin: '2rem' }}>
      <Head>
        <title>Base de datos LAOF</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        title="Bienvenido"
        description="Inicio"
        home
      >
        <section >
          <h1>Base de Datos de LAOF</h1>
          <h5>Base de datos creada para el registro nacional</h5>

          Aplicación creada con:
          <ul className="list-group list-group-flush">
            <li className="list-group-item">NextJS</li>
            <li className="list-group-item">MongoDB</li>
            <li className="list-group-item">Boostrap 5</li>
            <li className="list-group-item">Material UI 5</li>
            <li className="list-group-item">Mongoose</li>
            <li className="list-group-item">API REST</li>
          </ul>
          <div className="fixed-bottom">
            <p>By: Montoya M </p>
            Contact: montoyamontespi@ciencias.unam.mx
          </div>


        </section>
      </Layout>

    </div>
  );
}
