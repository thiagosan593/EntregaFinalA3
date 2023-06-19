import React, { useState, useEffect } from "react";
import "../../assets/css/estilogeral.css";
import Card from "../../componets/card";
import api from "../../services/api";

export default function Series() {
  const [series, setSeries] = useState([]);
  const user = JSON.parse(window.localStorage.getItem("@streambox-user"));

  useEffect(() => {
    const fetchSeries = async (callback) => {
      try {
        // const response = (await api.get(`serie?email=${user.email}&senha=${user.senha}`)).data;
        const response = (await api.get(`serie`)).data;
        const assitirList = await callback();
        const idsAssitirList = [];
        assitirList.forEach(element => {
          idsAssitirList.push(element.serie.id_serie)
        });

        setSeries(response.result.filter(item => !idsAssitirList.includes(item.id)));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMinhaLista = async () => {
      try {
        const response = await api.get(`/usuario/listeserie?email=${user.email}&senha=${user.senha}`);
        if (response.data.success) {
          const assitirList = response.data.result.filter(item => item.quero_assistir === 1);
          return assitirList
        }
      } catch (error) {
        console.error(error);
      }
    };
//19-06
    fetchSeries(fetchMinhaLista);
  }, [user.email, user.senha]);

  return (
    <>
      <div className="container">
        <div className="container-card">
          {series.map((serie, index) => (
            <div key={index}>
              <Card
                id={serie.id} 
                nome={serie.nome}
                imagem={serie.imagem}
                tela="todos"
              />
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
