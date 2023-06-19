import React, { useState, startTransition } from "react";
import "../assets/css/estilogeral.css";
import api from "../services/api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function CardStream(props) {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("@streambox-user"));


  const salvar = async (status) => {
    try {
      const userCopy = { ...user };

      const response = await api.put(
        `usuario/serie/${props.id}?email=${userCopy.email}&senha=${userCopy.senha}`,
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

  const alterStatus = async (index, status, id) => {
    try {
      const userCopy = { ...user };

      const response = await api.put(
        `usuario/serie/${id}?email=${userCopy.email}&senha=${userCopy.senha}`,
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
  //Redireciona para pagina de edição
  const handleEdit = (id) => {
    startTransition(() => {
      navigate(`/AtulizarSerie/${id}`);
    });

  };

  //função de excluir Série 
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

  const handleConfirmDelete = (id) => {
    handleDelete(id);
    hideDeleteModal();
  };

  const imagem = require(`../assets/img/${props.imagem}`);

  //limita a quantidade de letras do card
  function limitName(name) {
    const MAX_NAME_LENGTH = 10;
    if (name.length <= MAX_NAME_LENGTH) {
      return name;
    } else {
      return name.substring(0, MAX_NAME_LENGTH) + "..";
    }

  }
  // Redirecionar para a Sobre do Perfil adequado
  const handleSobreClick = () => {
    startTransition(() => {
      if (user && user.tipo === "A") {
        navigate(`/sobreadmin/${props.id}`);
      } else {
        navigate(`/sobre/${props.id}`);
      }
    });
  };


  return (
    <div className="container">
      <div className="card-filme">
        <ToastContainer />
        <img onClick={handleSobreClick} src={imagem} alt={props.nome} />
        <div className="info-filme">
          <h3 onClick={handleSobreClick}>{limitName(props.nome)}</h3>
          <div>
            <i
              data-tooltip="Sobre"
              className="bi bi-tv sobre"
              onClick={handleSobreClick}
            ></i>
            {props.tela === "todos" ? (
              <>
                <i
                  data-tooltip="Salvar"
                  className="bi bi-bookmark"
                  onClick={(e) => salvar(true, props.id)}
                ></i>
              </>
            ) : props.tela === "minhalista" ? (
              <i
                data-tooltip="Remover" class="bi bi-bookmark-x-fill remove-todo"
                onClick={(e) => salvar(false, props.id)}
              ></i>
            ) : props.tela === "assistindo" ? (
              <i
                data-tooltip="Terminada"
                className="bi bi-check-square-fill"
                onClick={() => {
                  alterStatus('concluido', true, props.id)
                }}
              ></i>
            ) : props.tela === "concluida" ? (
              <i
                data-tooltip="Terminada"
                className="bi bi-check-square-fill concluida"
              ></i>
            ) : props.tela === "admin" ? (
              <>
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
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showModal} onHide={hideDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir a série?
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
