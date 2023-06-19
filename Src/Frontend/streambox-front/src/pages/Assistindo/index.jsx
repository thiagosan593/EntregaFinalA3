import "../../assets/css/estilogeral.css";
import Card from "../../componets/card";
import api from "../../services/api";
import React, { useState, useEffect } from "react";

export default function Assistindo() {

  const [Assistindo, setAssistindo] = useState([]);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("@streambox-user"));
    const fetchAssistindo = async () => {
      try {
        const response = await api.get(`/usuario/listeserie?email=${user.email}&senha=${user.senha}`);
        if (response.data.success) {
          const assistindoList = response.data.result.filter(item => item.assistindo === 1);
          setAssistindo(assistindoList);
          console.log(assistindoList);
        }
      } catch (error) {
        console.error(error);
      }
    };


    fetchAssistindo();
  }, []);

  return (
    <div className="container">
      {Assistindo.length === 0 ? (
        <>
          <p>"Uma lista vazia é como um episódio piloto esperando para ser descoberto. Dê o primeiro passo e adicione uma série para iniciar essa história."</p>
          <a href="/Series">Adicionar</a>
        </>
      ) : (
        <div className="container-card">
          {Assistindo.map((item, index) => (
            <div key={index}>
              <Card id={item.serie.id_serie} nome={item.serie.nome} imagem={item.serie.imagem} tela="assistindo" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
