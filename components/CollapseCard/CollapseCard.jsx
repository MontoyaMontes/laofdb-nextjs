import { Collapse, FormControlLabel, Switch } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

// Componente que dado un item hace la carta desplegable
export function CollapseCard({ item }) {

  const [showData, setShowData] = useState(false);

  const handleChange = () => {
    setShowData((prev) => !prev);
  };

  return (
    <Collapse in={showData} collapsedSize={60}>

      <div className="card-body">
        <div className="h4 d-flex justify-content-between">

          <FormControlLabel
            control={<Switch checked={showData} onChange={handleChange} />}
            label="Mostrar más"
          />
          ID: {item[4]}

          <button type="button" className="btn btn-info">
            <Link href={`/morfologiaMandibulas/${item[0]}`} as={`/morfologiaMandibulas/${item[0]}`}>
              <a style={{ color: "white", textDecoration: "none" }}>Más</a>
              {/* {_id} */}
            </Link>
          </button>

        </div>
        <p>Código: {item[5]} </p>
        <p>Marca temporal: {item[1]}</p>
        <p>Evaluador: {item[2]}</p>
        <p>Nombre: {item[3]}</p>
      </div>
    </Collapse>
  )
}