import React from "react";
import "../styles/estilos3dComponent.css";
import logo from '/logo/LOGO-GATO.webp'

const Title = () => {
  return (
    <>
    <div className="title-container">

    <div className="title">
    <div className="logo-container">
      <img src={logo} alt="AntonyLeonLogo" />
      <h1>Modelos 3D</h1>
    </div>
    </div>


    <div className="p-text">
      <p>Todos los modelos fueron creados por Antony Leon, Puedes descargar los modelos para usarlos directamente en blender o utilizarlos en cualquier proyecto web que necesites descargandolos como gltf + bin en .zip</p>
    </div>
    </div>
    </>
  );
};

export default Title;
