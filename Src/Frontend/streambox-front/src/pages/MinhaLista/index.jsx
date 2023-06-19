import React, { useState, useEffect } from "react";
import Card from "../../componets/card";
import api from "../../services/api";
import "../../assets/css/estilogeral.css";

export default function MinhaLista() {
  const [minhaLista, setMinhaLista] = useState([]);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("@streambox-user"));
    const fetchMinhaLista = async () => {
      try {
        const response = await api.get(`/usuario/listeserie?email=${user.email}&senha=${user.senha}`);
        if (response.data.success) {
          const assitirList = response.data.result.filter(item => item.quero_assistir === 1);
          setMinhaLista(assitirList);
          console.log(assitirList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMinhaLista();
  }, []);

  return (
    <div className="container">
      {minhaLista.length === 0 ? (
        <>
          <p>"Uma lista vazia é como um episódio piloto esperando para ser descoberto. Dê o primeiro passo e adicione uma série para iniciar essa história."</p>
          <a href="/Series">Adicionar</a>
        </>
      ) : (
        <div className="container-card">
          {minhaLista.map((item, index) => (
            <div key={index}>
              <Card id={item.serie.id_serie} nome={item.serie.nome} imagem={item.serie.imagem} tela="minhalista" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
