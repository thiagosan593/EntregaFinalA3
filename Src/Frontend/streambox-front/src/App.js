import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./componets/Header";
// import Footer from "./componets/Footer";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./assets/css/estilogeral.css";
import "react-toastify/dist/ReactToastify.css";
import {lazy} from "react";


//Careega o componente somente qunado é chamando

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Cadastro = lazy(() => import("./pages/Cadastro"));
const Pag404 = lazy(() => import("./pages/Pag404"));
const CadastroSerie = lazy(() => import("./pages/CadastroSerie"));
const AtualizarSerie = lazy(() => import("./pages/AtualizarSerie"));
const PainelAdmin = lazy(() => import("./pages/PainelAdmin"));
const Series = lazy(() => import("./pages/Series"));
const MinhaLista = lazy(() => import("./pages/MinhaLista"));
const Assistindo = lazy(() => import("./pages/Assistindo"));
const Concluidas = lazy(() => import("./pages/Concluidas"));
const Sobre = lazy(() => import("./pages/Sobre"));
const SobreAdmn = lazy(() => import("./pages/SobreAdm"));
const Plataformas = lazy(() => import("./pages/Plataformas"));
const PlataformasCadastro = lazy(() => import("./pages/PlataformaCadastro"));
const PlataformaAtualizar = lazy(() => import("./pages/PlataformaAtualizar"));
const SobreAdmin = lazy(() => import("./pages/SobreAdm"));



function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastroserie" element={<CadastroSerie />} />
          <Route path="/AtulizarSerie/:id" element={<AtualizarSerie />} />
          <Route path="paineladmin" element={<PainelAdmin />} />
          <Route path="/MinhaLista" element={<MinhaLista />} />
          <Route path="/Assistindo" element={<Assistindo />} />
          <Route path="/Concluidas" element={<Concluidas />} />
          <Route path="/Series" element={<Series />} />
          <Route path="/cadastrar" element={<Cadastro />} />
          <Route path="/sobreedit" element={<SobreAdmn />} />
          <Route path="/Plataformas" element={<Plataformas />} />
          <Route path="/plataformascad" element={<PlataformasCadastro />} />
          <Route path="/PlataformaAtualizar/:id" element={<PlataformaAtualizar />} />
          <Route path="/sobreadmin/:id" element={<SobreAdmin/>} />
          <Route path="/sobre/:id" element={<Sobre/>} />
          <Route path="*" element={<Pag404 />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
