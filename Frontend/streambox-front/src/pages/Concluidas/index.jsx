import React, { useState, useEffect } from "react";
import Card from "../../componets/card";
import api from "../../services/api";
import "../../assets/css/estilogeral.css";

export default function Concluido() {


  const [Concluida, setConcluida] = useState([]);


  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("@streambox-user"));
    const fetchConcluida= async () => {
      try {
        const response = await api.get(`/usuario/listeserie?email=${user.email}&senha=${user.senha}`);
        if (response.data.success) {
          const concluidoList = response.data.result.filter(item => item.concluido === 1);
          setConcluida(concluidoList);
          console.log(concluidoList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchConcluida();
  }, []);

  return (
    <div className="container">
      {Concluida.length === 0 ? (
        <>
          <p>"Uma lista vazia é como um episódio piloto esperando para ser descoberto. Dê o primeiro passo e adicione uma série para iniciar essa história."</p>
          <a href="/Series">Adicionar</a>
        </>
      ) : (
        <div className="container-card">
          {Concluida.map((item, index) => (
            <div key={index}>
              <Card id={item.serie.id_serie} nome={item.serie.nome} imagem={item.serie.imagem} tela="concluida" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
