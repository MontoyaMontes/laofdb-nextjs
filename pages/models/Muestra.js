import mongoose from "mongoose";

const MuestraSchema = new mongoose.Schema({
  marcaTemporal: {
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
  numeroMandibula: {
    type: String,
    requiere: [true, "Campo requerido"],
  },
  linkRecursos :{
    type: String,
    requiere: [true, "Campo requerido"],
  }
});

export default mongoose.models.Muestra ||
  mongoose.model("Muestra", MuestraSchema);