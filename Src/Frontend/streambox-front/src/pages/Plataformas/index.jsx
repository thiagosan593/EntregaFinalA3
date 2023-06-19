import "../../assets/css/plataforma.css";
import CardPlataforma from "../../componets/CardPlataforma";
import api from "../../services/api";
import { useNavigate } from "react-router-dom"; 
import React, { useState, useEffect, startTransition } from "react";

export default function Plataformas() {
   const user = JSON.parse(window.localStorage.getItem("@streambox-user"));
  const [plataformas, setPlataformas] = useState([]);
  const navigate = useNavigate();


  function handleCadastrarClick() {
    startTransition(() => {
      navigate("/plataformascad");
    });
  }


  useEffect(() => {
    const fetchPlataformas = async () => {
      try {
        const response = await api.get(`plataforma?email=${user.email}&senha=${user.senha}`);
        setPlataformas(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlataformas();
  }, [user.email,user.senha]);

  return (
    <>
      <div className="container">
        <div className="edit-botoes">
          <button className="btn-novaPlataforma" onClick={handleCadastrarClick}>
            Cadastrar Nova Plataforma
          </button>
        </div>
        <div className="container-card">
          {plataformas.map((plataforma, index) => (
            <div key={index}>
              <CardPlataforma
                id={plataforma.id_plataforma}
                nome={plataforma.nome}
                imagem={plataforma.imagem}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
