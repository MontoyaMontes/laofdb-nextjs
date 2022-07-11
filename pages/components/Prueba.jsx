import { useState, useEffect } from "react";

export default function Data(props) {  
 
  return (

<div>
  <h1>Base de datos Morfologías</h1>
  {
      props.morfologiasMandibulas?.map(
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
        
  <h1>Base de datos pesos</h1>

        {  props.dataPesomandibulas?.map(
        ({
          _id,
          marcaTemporal,
          evaluador,
          nombre,
          numeroMandibula,
          idCodigoMandibula,
          pesoMiligramos,
          observacionesRelacionadasAPeso,
          dientes,
          cuantos,
          cuales48,
          cuales47,
          cuales46,
          cuales45,
          cuales44,
          cuales43,
          cuales42,
          cuales41,
          cuales38,
          cuales37,
          cuales36,
          cuales35,
          cuales34,
          cuales33,
          cuales32,
          cuales31,
          comentarios,
        }) => (
          <div className="card mb-2" key={_id}>
            <div className="card-body">
              <div className="h4">ID: {numeroMandibula} - {idCodigoMandibula}</div>
              <p>Marca temporal: {marcaTemporal}</p>
              <p>Evaluador: {evaluador}</p>
              <p>Nombre: {nombre}</p>
              <p>pesoMiligramos: {pesoMiligramos}</p>
              <p>observacionesRelacionadasAPeso: {observacionesRelacionadasAPeso}</p>
              <p>dientes: {dientes}</p>
              <p>cuantos: {cuantos}</p>
              <p>cuales48: {cuales48}</p>
              <p>cuales47: {cuales47}</p>
              <p>cuales46: {cuales46}</p>
            </div>
          </div>
        )
      )
  }
</div>
  )
}

