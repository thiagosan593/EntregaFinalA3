import "./styles.css";
import image from "../../assets/img/telas in.png";
import logo from "../../assets/img/logo.png";
import "../../assets/css/estilogeral.css";


export default function Home() {
  return (
    <>
  <section className="navegacao-index">
      <div className="logo">
        <a href="/"><img src={logo} alt="" srcSet="" /></a>
      </div>
    </section>

      <section className="container" id="home">

        <div className="home-area">
          <div>
            <h2>
              Organize seus filmes e séries em um só lugar, de forma gratuita.
            </h2>
            <h3>
              Nunca foi tão fácil gerenciar sua lista de entretenimento.
              Experimente agora!
            </h3>
            <div className="botoes">
              <a href="/login" className="btn">
                Já tem conta? faça Login
              </a>
              <p>ou</p>
              <a href="/cadastrar" className="btn">
                Não tem conta? Cadastre-se
              </a>
            </div>
          </div>
          <div>
            <img src={image} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
