import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/sobre.css";
import api from "../../services/api";
import img from "../../assets/img/mr.robot.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Sobre() {
  const [loading, setLoading] = useState(false);
  const [serie, setSerie] = useState({});
  const { id } = useParams();
  const user = JSON.parse(window.localStorage.getItem("@streambox-user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSerie = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/serie/${id}?email=${user.email}&senha=${user.senha}`
        );
        setSerie(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchSerie();
  }, [id, user.email, user.senha]);

  const salvarQueroAssistir = async (status) => {
    try {
      const userCopy = { ...user };
  
      const response = await api.put(
        `usuario/serie/${id}?email=${user.email}&senha=${user.senha}`,
        {
          quero_assistir: status,
        }
      );
  
      if (response.status === 200) {
        toast('Status da série atualizado!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast('Falha ao atualizar o status da série!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
  
      navigate(0)
    } catch (error) {
      console.error(error);
    }
  };
  const alterStatus = async (index,status) => {
    try {
      const response = await api.put(
        `usuario/serie/${id}?email=${user.email}&senha=${user.senha}`,
        {
          [index]: status,
        }
      );
  
      if (response.status === 200) {
        toast('Status da série atualizado!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast('Falha ao atualizar o status da série!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
  
      navigate(0)
    } catch (error) {
      console.error(error);
    }
  };
  let imageSrc = img;
  if (serie.imagem) {
    imageSrc = require(`../../assets/img/${serie.imagem}`);
  }

  return (
    <>
      {loading ? (
        <h1 className="text-center">Carregando...</h1>
      ) : (
        <>
          <ToastContainer />
          <section className="container">
            <section className="container-sobre">
              <div className="capa">
                <img src={imageSrc} alt="" />
              </div>
              <div className="info">
                <h1>{serie.nome}</h1>
                <div className="dados">
                  <p>Lançamento:</p>
                  <p>{serie.lancamento}</p>
                </div>
                <div className="dados">
                  <p>País de Origem:</p>
                  <p>{serie.pais_origem}</p>
                </div>
                <div className="dados">
                  <p>Temporadas:</p>
                  <p>{serie.temporadas}</p>
                </div>
                <div className="dados">
                  <p>Episódios:</p>
                  <p>{serie.episodios}</p>
                </div>
                <div className="dados">
                  <p>Status:</p>
                  <p>{serie.status}</p>
                </div>
                <div className="dados">
                  <p>Disponível em:</p>
                  {serie.disponivel && Array.isArray(serie.disponivel) ? (
                    serie.disponivel.map((item) => (
                      <p key={item.id}>
                        <img
                          src={require(`../../assets/img/${item.imagem}`)}
                          alt=""
                        />
                      </p>
                    ))
                  ) : (
                    <p>Não disponível</p>
                  )}
                </div>
                <div class="status">
                  <div>
                    <div class="circulo">
                      <i class="bi bi-chevron-down" onClick={()=>{alterStatus('concluido',true)}}></i>
                    </div>
                    <p>Concluída</p>
                  </div>
                  <div>
                    <div class="circulo">
                      <i class="bi bi-eye" onClick={()=>{alterStatus('assistindo',true)}}></i>
                    </div>
                    <p>Assistindo</p>
                  </div>
                  <div>
                    <div class="circulo">
                      <i class="bi bi-bookmark-heart-fill"
                      onClick={(e)=>salvarQueroAssistir(true)}></i>
                    </div>
                    <p>Quero Assistir</p>
                  </div>
                </div>
              </div>
            </section>
            <div className="sobre">
              <h2>Sobre:</h2>
              <p>{serie.sobre}</p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
