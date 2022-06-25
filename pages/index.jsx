import Head from "next/head";

import connectDB from "../lib/dbConnect";
import Muestra from "./models/Muestra";
import MorfologiaMandibula from "./models/MorfologiaMandibula";

export default function Home({ muestras, morfologiasMandibulas }) {
  console.log(muestras);
  return (
    <div>
      <Head>
        <title>DB</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1>LAOF DataBase APP</h1>
        <h2>Muestras</h2>
        {muestras.map(
          ({
            _id,
            marcaTemporal,
            evaluador,
            nombre,
            numeroMandibula,
            linkRecursos,
          }) => (
            <div className="card mb-2" key={_id}>
              <div className="card-body">
                <div className="h4">ID: {numeroMandibula}</div>
                <p>Nombre: {nombre}</p>
                <p>Evaluador: {evaluador}</p>
                <p>Marca temporal: {marcaTemporal}</p>
                <p>Recursos: {linkRecursos}</p>
              </div>
            </div>
          )
        )}
        <h2>Morfologías</h2>
        {morfologiasMandibulas.map(
          ({
            _id,
            marcaTemporal,
            evaluador,
            nombre,
            numeroMandibula,
            idCodigoMandibula,
            impresionTotalIzquierda,
            mentonIzquierda,
            anguloMandibularIzquierda,
            anguloMandibularDerecha,
            eversionGonialIzquierda,
            eversionGonialDerecha,
            margenInferiorIzquierda,
            cuerpoMandibularIzquierda,
            ramaMandibularIzquierda,
            ramaMandibularDerecha,
            incisuraMandibularEscotaduraSigmoideaIzquierda,
            incisuraMandibularEscotaduraSigmoideaDerecha,
            procesoCondilarIzquierda,
            procesoCondilarDerecha,
            procesoCoronoideIzquierda,
            procesoCoronoideDerecha,
            archoDentalIzquierda,
            dientesNumero,
            comentarios,
            dienteIzquierda,
          }) => (
            <div className="card mb-2" key={_id}>
              <div className="card-body">
                <div className="h4">ID: {numeroMandibula} - {idCodigoMandibula}</div>
                <p>Marca temporal: {marcaTemporal}</p>
                <p>Evaluador: {evaluador}</p>
                <p>Nombre: {nombre}</p>
                <p>Impresion Total Izquierda: {impresionTotalIzquierda}</p>
                <p>Menton Izquierda: {mentonIzquierda}</p>
                <p>anguloMandibularIzquierda: {anguloMandibularIzquierda}</p>
                <p>anguloMandibularDerecha: {anguloMandibularDerecha}</p>
                <p>eversionGonialDerecha: {eversionGonialDerecha}</p>
                <p>anguloMandibularDerecha: {anguloMandibularDerecha}</p>
                <p>comentarios: {comentarios}</p>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  await connectDB();

  const res = await Muestra.find({});

  // console.log("Response:", res);

  const muestras = res.map((doc) => {
    const muestra = doc.toObject();
    muestra._id = `${muestra._id}`;
    return muestra;
  });

  // console.log("Response:", res);

  const res2 = await MorfologiaMandibula.find({});

  const morfologiasMandibulas = res2.map((doc) => {
    const morfologia = doc.toObject();
    morfologia._id = `${morfologia._id}`;
    return morfologia;
  });

  // console.log("---", res2, "---");

  const res3 = await MorfologiaMandibula.aggregate([
    {
      $lookup: {
        from: "muestras",
        localField: "numeroMandibula",
        foreignField: "numeroMandibula",
        as: "info",
      },
    },
  ]);

   console.log("---", res3, "---");

  const morfologiasMandibulasP = res3.map((doc) => {
    //const muestra = doc.toObject();
    //muestra._id = `${muestra._id}`;
    //return muestra;
    console.log("DOC: ", doc);
    //return muestra
  });

  return { props: { muestras, morfologiasMandibulas: JSON.parse(JSON.stringify(morfologiasMandibulas))  || [], fallback: false } };
}
