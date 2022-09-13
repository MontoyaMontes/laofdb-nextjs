import { Collapse, FormControlLabel, Switch } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";


// Componente que dado un item
export function CollapseCard({item}) {
  // !Cambiar
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Collapse in={checked} collapsedSize={65}>

      <div className="card-body">
        <div className="h4">
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Mostrar más"
          />
          <button type="button" className="btn btn-info">
            <Link href={`/morfologiaMandibulas/${item[0]}`} as={`/morfologiaMandibulas/${item[0]}`}>
              <a style={{ color: "white", textDecoration: "none" }}>Información detallada</a>
              {/* {_id} */}
            </Link>
          </button>
          ID: {item[4]}

        </div>
        <p>Código: {item[5]} </p>
        <p>Marca temporal: {item[1]}</p>
        <p>Evaluador: {item[2]}</p>
        <p>Nombre: {item[3]}</p>
      </div>
    </Collapse>
  )
}