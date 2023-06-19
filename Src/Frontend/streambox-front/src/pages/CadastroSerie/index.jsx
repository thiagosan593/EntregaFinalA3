import React from "react";
// import axios from "axios";
import "../../assets/css/Form.css"
import FormSerie from "../../componets/FormSerie"

export default function CadastroSerie() {

  return (
    <div className="container">
      <h1>Cadastro de Série</h1>
      <FormSerie buttonText="Cadastrar" />
    </div>
  );
}
