import "../assets/css/Form.css";
import IMFG from "../assets/img/IMFG.png";
import api from "../../src/services/api";
import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function FormSerie(props) {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState('');
  const [imageName, setImageName] = useState('');
  const [Plataforma, setPlataforma] = useState([]);
  const [formValues, setFormValues] = useState({
    nome: props.data?.nome ?? "",
    imagem: props.data?.imagem ?? "",
    pais_origem: props.data?.pais_origem ?? "",
    temporadas: props.data?.temporadas ?? "",
    episodios: props.data?.episodios ?? "",
    lancamento: props.data?.lancamento ?? "",
    status: props.data?.status ?? "",
    disponivelEm: props.data?.disponivel ?? [],
    sobre: props.data?.sobre ?? "",
  });

  const [invalidInputs, setInvalidInputs] = useState([]);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    if (Array.isArray(formValues[name])) {
      if (checked) {
        setFormValues((prevState) => ({
          ...prevState,
          [name]: [...prevState[name], value],
        }));
      } else {
        setFormValues((prevState) => ({
          ...prevState,
          [name]: prevState[name].filter((item) => item !== value),
        }));
      }
    } else if (typeof formValues[name] === "object") {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          [value]: checked,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se todos os campos obrigatórios estão preenchidos
    const requiredFields = ["nome", "pais_origem", "temporadas", "episodios", "lancamento", "status", "sobre"];
    const invalidInputs = requiredFields.filter((field) => formValues[field] === "");

    if (invalidInputs.length > 0) {
      setInvalidInputs(invalidInputs);
      return;
    }

    try {
      let response;
      if (props.id_serie) {
        // Update existing serie
        response = await api.put(
          `/serie/${props.id_serie}?email=${user.email}&senha=${user.senha}`,
          formValues
        );
      } else {
        // Create new serie
        response = await api.post(
          `/serie?email=${user.email}&senha=${user.senha}`,
          formValues
        );
      }

      console.log(response.data);

      if (response.data.success) {
        const serieId = response.data.result.id;
        console.log(serieId);

        formValues.disponivelEm.forEach(async (plataformaId) => {
          try {
            await api.put(`/serie/${serieId}/plataforma?email=${user.email}&senha=${user.senha}`, {
              id_plataforma: plataformaId,
            });
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        });

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
          nome: "",
          imagem: "",
          pais_origem: "",
          temporadas: "",
          episodios: "",
          lancamento: "",
          status: "",
          disponivelEm: [],
          sobre: "",
        });
        setImageName("");
        setImagePreview(null);

        if (props.id_serie) {
          navigate('/PainelAdmin');
        }
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
    } catch (error) {
      console.error(error);
    }
  };

  const user = JSON.parse(window.localStorage.getItem("@streambox-user"));

  useEffect(() => {
    const fetchPlataformas = async () => {
      try {
        const response = await api.get(
          `/plataforma?email=${user.email}&senha=${user.senha}`
        );
        setPlataforma(response.data.result);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlataformas();
  }, [user.email, user.senha]);

  const showCheckBoX2 = () => {
    let checkbox = document.getElementById("checkboxes");
    let select = document.querySelector(".selectBox select");
    if (checkbox.style.display === "none") {
      checkbox.style.display = "block";
      select.style.borderBottomLeftRadius = "0";
      select.style.borderBottomRightRadius = "0";
    } else {
      checkbox.style.display = "none";
      select.style.borderBottomLeftRadius = ".5rem";
      select.style.borderBottomRightRadius = ".5rem";
    }
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

      // Update the form values with the image name
      setFormValues((prevValues) => ({
        ...prevValues,
        imagem: fileName
      }));
    }
  };

  const handleCancelarClick = () => {
    // Redirecionar para a página desejada
    navigate('/PainelAdmin');
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} id="cadserie" ref={formRef}>
        <div className="cadastro-serie">
          <div className="img-logo">
            <img src={imagePreview || IMFG} alt="" id="preview-image" />
            <label htmlFor="imagem">Capa:</label>
            <input
              required={!props.id_serie}
              type="file"
              id="imagem"
              name="imagem"
              onChange={handleImageChange}
            />
            <p>Nome da imagem: {imageName}</p>
          </div>
          <div className="form-register">
            <label htmlFor="nome">Título</label>
            <input
              required
              id="nome"
              type="text"
              name="nome"
              value={formValues.nome}
              onChange={handleInputChange}
              className={invalidInputs.includes("nome") ? "invalid-input" : ""}
            />
            <label htmlFor="pais_origem">Pais de origem:</label>
            <input
              required
              id="pais_origem"
              type="text"
              name="pais_origem"
              value={formValues.pais_origem}
              onChange={handleInputChange}
              className={invalidInputs.includes("pais_origem") ? "invalid-input" : ""}
            />
            <div className="form-grid">
              <div>
                <label htmlFor="temporadas">Temporadas:</label>
                <input
                  required
                  id="temporadas"
                  type="number"
                  name="temporadas"
                  value={formValues.temporadas}
                  onChange={handleInputChange}
                  className={invalidInputs.includes("temporadas") ? "invalid-input" : ""}
                />
              </div>
              <div>
                <label htmlFor="num-episodios">Nº de Ep:</label>
                <input
                  required
                  id="num-episodios"
                  type="text"
                  name="episodios"
                  value={formValues.episodios}
                  onChange={handleInputChange}
                  className={invalidInputs.includes("episodios") ? "invalid-input" : ""}
                />
              </div>
              <div>
                <label htmlFor="lancamento">Lançamento:</label>
                <input
                  required
                  id="lancamento"
                  type="text"
                  name="lancamento"
                  value={formValues.lancamento}
                  onChange={handleInputChange}
                  className={invalidInputs.includes("lancamento") ? "invalid-input" : ""}
                />
              </div>
            </div>
            <label htmlFor="status">Status:</label>
            <select
              className={`mutiselect mutiselectS ${invalidInputs.includes("status") ? "invalid-input" : ""}`}
              id="status"
              name="status"
              value={formValues.status}
              onChange={handleInputChange}
            >
              <option value="">Selecione o status</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Em Produção">Em Produção</option>
              <option value="Em andamento">Em andamento</option>
            </select>

            <label>Disponível em:</label>
            <div className="mutiselect">
              <div className="selectBox" onClick={showCheckBoX2}>
                <select name="disponivelEm">
                  <option>Selecione as opções</option>
                  {Plataforma.map((platform) => (
                    <option
                      key={platform.id_plataforma}
                      value={platform.id_plataforma}
                    >
                      {platform.nome}
                    </option>
                  ))}
                </select>
                <div className="overSelect"></div>
              </div>
              <div id="checkboxes">
                {Plataforma.map((plataforma) => {
                  
                  const checked = formValues.disponivelEm.find(i => {
                    if(i.nome){
                      return i.nome === plataforma.nome

                    }else{
                      return i == plataforma.id_plataforma
                    }

                  })
                
                return (
                  <label key={plataforma.id_plataforma}>
                    {plataforma.nome}
                    <input
                      type="checkbox"
                      value={plataforma.id_plataforma}
                      checked={checked ? true : false}
                      name="disponivelEm"
                      onChange={handleCheckboxChange}
                    />
                  </label>
                
                )})}
              </div>
            </div>
            <label htmlFor="sobre">Sobre:</label>
            <textarea
              required
              rows={10}
              id="sobre"
              name="sobre"
              value={formValues.sobre}
              onChange={handleInputChange}
              className={invalidInputs.includes("sobre") ? "invalid-input" : ""}
            ></textarea>
            <div className="form-botoes">
              <button type="submit" className="salvar">
                {props.buttonText}
              </button>
              <button type="button" className="cancelar" onClick={handleCancelarClick}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
