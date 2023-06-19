import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/Form.css";
import api from "../../services/api";

export default function PlataformaAtualizar() {
  const { id } = useParams();
  const [serieData, setSerieData] = useState(null);
  const user = JSON.parse(window.localStorage.getItem("@streambox-user"));

  useEffect(() => {
    const fetchSerieData = async (id) => {
      try {
        const response = await api.get(`/plataforma/${id}?email=${user.email}&senha=${user.senha}`);
        setSerieData(response.data.result);
      } catch (error) {
        console.log("Erro ao buscar os dados da Plataforma:", error);
      }
    };

    fetchSerieData(id);
  }, [id, user.email, user.senha]);

  const Formplataforma = React.lazy(() => import("../../componets/Formplataforma"));

  return (
    <>
      <div className="container">
        <h1>Atualização de Série</h1>
        {serieData && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Formplataforma buttonText="Atualizar" data={serieData} />
          </React.Suspense>
        )}
      </div>
    </>
  );
}
