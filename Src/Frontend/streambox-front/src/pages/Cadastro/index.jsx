import "./styles.css";
import logo from "../../assets/img/logo.png";
import {Button} from "react-bootstrap";
import {useState} from "react";
import {ToastContainer, toast} from "react-toastify";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (senha !== confSenha) {
      alert("Senha não condiz com a confirmação");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
      }),
    };
    const response = await fetch(
      `http://localhost:3001/usuario/`,
      requestOptions
    );
    const jsonData = await response.json();
    if (jsonData.success) {
      toast.success("Cadastrado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setNome("");
      setEmail("");
      setSenha("");
      setConfSenha("");
    }
    setLoading(false);
  }

  return (
    <>
      <ToastContainer />
      <section className="container-login">
        <div className="login-logo">
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="form-login">
          <h2>CADASTRE-SE</h2>
          <form id="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome:</label>
            <input
              required
              type="nome"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />

            <label htmlFor="email">email:</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <label htmlFor="senha">Senha:</label>
            <input
              required
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            />

            <label htmlFor="conf_senha">confirmar Senha:</label>
            <input
              required
              type="password"
              id="conf_senha"
              name="conf_senha"
              value={confSenha}
              onChange={(e) => {
                setConfSenha(e.target.value);
              }}
            />
            {loading ? (
              <Button disabled variant="danger" className="button-login">
                Carregando...
              </Button>
            ) : (
              <Button type="submit" variant="danger" className="button-login">
                CADASTRAR
              </Button>
            )}
          </form>
          <p className="not-conter">
            Já tenho conta? <a href="/login">ACESSAR</a>
          </p>
        </div>
      </section>
    </>
  );
}
