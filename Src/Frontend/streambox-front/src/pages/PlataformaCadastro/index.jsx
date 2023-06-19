import React from "react";
// import axios from "axios";
import "../../assets/css/Form.css"
import FormPlataforma from "../../componets/Formplataforma"

export default function CadastroPlataforma() {


  return (
    <div className="container">
      <h1>Cadastro de Plataforma</h1>
      <FormPlataforma data={{ id_plataforma: null, nome: "" }} />
    </div>
  );
}
