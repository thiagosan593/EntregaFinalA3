import React, { useState, startTransition } from "react";
import "../assets/css/CardPlataforma.css";
import api from "../services/api";
 import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

export default function CardPlataforma(props) {
  const [showModal, setShowModal] = useState(false);

   const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("@streambox-user"));


  const handleEdit =  (id) => {
    startTransition(() => {
      // Redirecionar para a página desejada
       navigate(`/PlataformaAtualizar/${id}`);
    });
   
  };

  async function handleDelete(id_plataforma) {
    try {
      const response = await api.delete(
        `/plataforma/${id_plataforma}?email=${user.email}&senha=${user.senha}`

      );
      if (response.status === 200) {
        toast('Plataforma Excluida!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload()
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
  };

  const handleConfirmDelete = (id_plataforma) => {
    handleDelete(id_plataforma);
    hideDeleteModal();
  };

  const imagem = require(`../assets/img/${props.imagem}`);

  const MAX_NAME_LENGTH = 10;
  function limitName(name) {
    if (name.length <= MAX_NAME_LENGTH) {
      return name;
    } else {
      return name.substring(0, MAX_NAME_LENGTH) + "..";
    }
  }

  return (
    <div className="container">
      <div className="card-plataforma">
        <ToastContainer />
        <img  onClick={() => handleEdit(props.id)} src={imagem} alt={limitName(props.nome)}/>
        <div className="info-filme">
          <h3 o onClick={() => handleEdit(props.id)}>{limitName(props.nome)}</h3>
          <div>


            <i
              data-tooltip="Editar"
              className="bi bi-pencil-square"
              onClick={() => handleEdit(props.id)}
            ></i>
            <i
              data-tooltip="Apagar"
              className="bi bi-trash"
              onClick={showDeleteModal}
            ></i>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showModal} onHide={hideDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir a plataforma?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleConfirmDelete(props.id)}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
