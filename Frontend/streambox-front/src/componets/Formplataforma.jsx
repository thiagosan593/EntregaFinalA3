import { ToastContainer, toast } from "react-toastify";
import api from "../../src/services/api";
import IMFG from "../assets/img/IMFG.png";
import { useNavigate } from 'react-router-dom';
import React, { useState, startTransition } from "react";

export default function FormPlataforma(props) {
  const user = JSON.parse(window.localStorage.getItem("@streambox-user"));
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [formValues, setFormValues] = useState({
    imagem: "",
    nome: props.data?.nome ?? "",
  });

  // Redirecionar para a página de Plataformas
  const handleCancelarClick = () => {
    startTransition(() => {
      navigate('/Plataformas')
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Verifica se um arquivo foi selecionado
    if (file) {
      // Exibe a imagem selecionada
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Obtém o nome do arquivo
      const fileName = file.name;
      setImageName(fileName);

      // Atualize o nome da imagem
      setFormValues((prevValues) => ({
        ...prevValues,
        imagem: fileName,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se a imagem e o nome estão preenchidos
    if (!formValues.imagem || !formValues.nome) {
      toast.error("Por favor, preencha a imagem e o nome.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      if (props.data?.id_plataforma) {
        // Atualizar plataforma existente
        const response = await api.put(`/plataforma/${props.data.id_plataforma}?email=${user.email}&senha=${user.senha}`, formValues);
        console.log(response.data);

        if (response.data.success) {
          toast.success("Plataforma atualizada com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate('/Plataformas');
        } else {
          toast.error("Falha na atualização da plataforma. Por favor, tente novamente.", {
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
      } else {
        // Cadastrar nova plataforma
        const response = await api.post(`/plataforma?email=${user.email}&senha=${user.senha}`, formValues);
        console.log(response.data);

        if (response.data.success) {
          toast.success("Cadastro realizado com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setFormValues({
            imagem: "",
            nome: "",
          });
          setImageName("");
          setImagePreview("");
        } else {
          toast.error("Falha no cadastro. Por favor, tente novamente.", {
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(props.data.id_plataforma)

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} id="cadserie">
        <div className="cadastro-serie">
          <div className="img-logo">
            <img src={imagePreview || IMFG} alt="" id="preview-image" />
            <label htmlFor="imagem">Logo da Plataforma:</label>
            <input
              type="file"
              id="imagem"
              name="imagem"
              value={formValues.imageName}
              onChange={handleImageChange}
            />
            <p>Nome da imagem: {imageName}</p>
          </div>
          <div className="form-register">
            <label htmlFor="nome">Nome da Plataforma:</label>
            <input
              required
              id="nome"
              type="text"
              name="nome"
              value={formValues.nome}
              onChange={(e) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  nome: e.target.value,
                }))
              }
            />

            <div className="form-botoes">
              <button type="submit" className="salvar">
                {props.buttonText || "Salvar"}
              </button>
              <button
                type="button"
                className="cancelar"
                onClick={handleCancelarClick}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
