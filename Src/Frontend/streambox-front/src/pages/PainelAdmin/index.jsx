import React, { useState, useEffect, startTransition } from "react";
import "../../assets/css/estilogeral.css";
import Card from "../../componets/card";
import api from "../../services/api";
import "../../assets/css/plataforma.css";
import { useNavigate } from "react-router-dom";

export default function Series() {
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();

  function handleCadastrarClick() {
    startTransition(() => {
      navigate("/cadastroserie");
    });
  }

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await api.get("serie");
        setSeries(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <>
      <div className="container">
        <div className="edit-botoes">
          <button className="btn-novaPlataforma" onClick={handleCadastrarClick}>
            Cadastrar Nova Série
          </button>
        </div>
        <div className="container-card">
          {series.map((serie, index) => (
            <div key={index}>
              <Card id={serie.id} nome={serie.nome} imagem={serie.imagem} tela="admin" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
