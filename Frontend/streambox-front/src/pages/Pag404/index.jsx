import "./styles.css";
import img404 from '../../assets/img/404.png';

export default function Pag404() {
  return (
    <div className="container-erro">
      <h1>
        <img src={img404} alt="" />
      </h1>
      <p>
        "Parece que o Demogorgon comeu a página que você está procurando. Tente voltar para o mundo real e recarregar a página!"
      </p>
      <button id="voltar" onClick={() => window.history.back()}>Voltar</button>

    </div>
  );
}