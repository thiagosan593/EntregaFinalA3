import "./styles.css";
import logo from "../../assets/img/logo.png";
import {Button} from "react-bootstrap";
import {useState} from "react";
import api from "../../services/api";
import {ToastContainer, toast} from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    api
      .get(`login?email=${email}&senha=${senha}`)
      .then((response) => {
        const data = response.data;
        if (data.success) {
          window.localStorage.setItem(
            "@streambox-user",
            JSON.stringify(data.result)
          );
          if (data.result.tipo == "A") {
            window.location.href = "/paineladmin";
          } else {
            window.location.href = "/Series";
          }
        }
      })
      .catch((error) => {
        const data = error.response;
        if (data.status == "401") {
          toast.error("Email ou senha incorreta", {
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
      });
  }

  return (
    <>
      <ToastContainer />
      <section className="container-login" id="login">
        <div className="login-logo">
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="form-login">
          <h2>LOGIN</h2>
          <form id="loginForm">
            <label htmlFor="email">Email:</label>
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
            <Button
              variant="danger"
              className="button-login"
              onClick={handleLogin}
            >
              Entrar
            </Button>

            <p>
              <a className="reset-password" href="/">
                Esqueceu sua senha?
              </a>
            </p>
          </form>
          <p className="not-conter">
            Não tem conta? <a href="cadastrar">CADASTRE-SE</a>
          </p>
        </div>
      </section>
    </>
  );
}
