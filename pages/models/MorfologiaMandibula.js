import mongoose from "mongoose";

const MorfologiaMandibulaSchema = new mongoose.Schema({
    numeroMuestra: {
        type: String,
        requiere: [true, "Campo requerido"],
      },
    impresionTotalIzquierda: {
        type: String,
      },
    mentonIzquierda: {
        type: String,
      },
    anguloMandibularIzquierda: {
        type: String,
      },
    anguloMandibularDerecha: {
        type: String,
      },
    eversionGonialIzquierda: {
        type: String,
      },
    eversionGonialDerecha: {
        type: String,
      },
    margenInferiorIzquierda: {
        type: String,
      },
    cuerpoMandibularIzquierda: {
        type: String,
      },
    ramaMandibularIzquierda: {
        type: String,
      },
    ramaMandibularDerecha: {
        type: String,
      },
    incisuraMandibularEscotaduraSigmoideaIzquierda: {
        type: String,
      },
    incisuraMandibularEscotaduraSigmoideaDerecha: {
        type: String,
      },
    procesoCondilarIzquierda: {
        type: String,
      },
    procesoCondilarDerecha: {
        type: String,
      },
    procesoCoronoideIzquierda: {
        type: String,
      },
    procesoCoronoideDerecha: {
        type: String,
      },
    archoDentalIzquierda: {
        type: String,
      },
    dientesNumero: {
        type: String,
      },
    comentarios: {
        type: String,
      },
    dienteIzquierda: {
        type: String,
      },
});

export default mongoose.models.MorfologiaMandibula ||
  mongoose.model("MorfologiaMandibula", MorfologiaMandibulaSchema);