import mongoose from "mongoose";

const MuestraSchema = new mongoose.Schema({
  marca_temporal: {
    type: String,
    requiere: [true, "Campo requerido"],
  },
  evaluador: {
    type: String,
    requiere: [true, "Campo requerido"],
  },
  nombre: {
    type: String,
    requiere: [true, "Campo requerido"],
  },
  numero_mandibula: {
    type: String,
    requiere: [true, "Campo requerido"],
  },
});

export default mongoose.models.Muestra ||
  mongoose.model("Muestra", MuestraSchema);