import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/Form.css";
import api from "../../services/api";
import FormSerie from "../../componets/FormSerie"

export default function AtualizarSerie() {
  const { id } = useParams();
  const [serieData, setSerieData] = useState(null);
  const user = JSON.parse(window.localStorage.getItem("@streambox-user"));

  useEffect(() => {
    const fetchSerieData = async (id) => {
      try {
        const response = await api.get(`/serie/${id}?email=${user.email}&senha=${user.senha}`);
        setSerieData(response.data.result);
      } catch (error) {
        console.log("Erro ao buscar os dados da série:", error);
      }
    };

    fetchSerieData(id);
  }, [id, user.email, user.senha]);

  

  return (
    <>
      <div className="container">
        <h1>Atualização de Série</h1>
        {serieData && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <FormSerie buttonText="Atualizar" data={serieData} id_serie={id}/>
          </React.Suspense>
        )}
      </div>
    </>
  );
}
