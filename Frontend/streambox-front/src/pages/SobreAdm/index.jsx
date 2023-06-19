import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/sobre.css";
import { useNavigate } from "react-router-dom";
import  { startTransition } from "react";
import api from "../../services/api";
import img from "../../assets/img/mr.robot.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

export default function SobreAdminEdit() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoaging] = useState(false);
  const navigate = useNavigate();
  const [serie, setSerie] = useState({});
  const { id } = useParams();
  const user = JSON.parse(window.localStorage.getItem("@streambox-user"));

  useEffect(() => {
    const fetchSerie = async () => {
      setLoaging(true)
      try {
        const response = await api.get(`/serie/${id}?email=${user.email}&senha=${user.senha}`);
        setSerie(response.data.result); 
        console.log(response.data.result); 
      } catch (error) {
        console.error(error);
      }
      setLoaging(false)
    };

    fetchSerie();
  }, [id, user.email, user.senha]);

  let imageSrc = img;
  if (serie.imagem) {
    imageSrc = require(`../../assets/img/${serie.imagem}`);
  }


  const handleEdit = (id) => {
    startTransition(() => {
      navigate(`/AtulizarSerie/${id}`);
    });

  };

  async function handleDelete(id) {
    try {
      const response = await api.delete(
        `/serie/${id}?email=${user.email}&senha=${user.senha}`

      );
      if (response.status === 200) {
        toast('Série Excluida!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        startTransition(() => {
          navigate(`/PainelAdmin`);
        });
      } else {
        toast('Falha ao Excluir!', {
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
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  const showDeleteModal = () => {
    setShowModal(true);
  };

  const hideDeleteModal = () => {
    setShowModal(false);
    toast.info('Exclusão Cancelada', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const handleConfirmDelete = (id) => {
    handleDelete(id);
    hideDeleteModal();
  };
  return (
    <>
    {loading ? (
        <h1 className="text-center">Carregadando...</h1>
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
              <div className="edit-botoes">
                <button  onClick={() => handleEdit(serie.id)} className="btn-atualizar">
                  <i className="bi bi-pencil-square"></i> Atualizar
                </button>
                <button  onClick={showDeleteModal} className="btn-del">
                  <i className="bi bi-trash"></i> Excluir
                </button>
              </div>
            </div>
          </section>
          <div className="sobre">
            <h2>Sobre:</h2>
            <p>{serie.sobre}</p>
          </div>
        </section>
  
  
         {/* Modal de Confirmação de Exclusão */}
         <Modal show={showModal} onHide={hideDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza de que deseja excluir a série?
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-cancel" variant="secondary" onClick={hideDeleteModal}>
              Cancelar
            </Button>
            <Button className="btn-del" variant="danger" onClick={() => handleConfirmDelete(serie.id)}>
            <i className="bi bi-trash"></i>Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )

    }
    </>
  );
}
