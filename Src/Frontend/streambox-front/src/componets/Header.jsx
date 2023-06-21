import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import logo from "../assets/img/logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(true);
  const user = JSON.parse(window.localStorage.getItem("@streambox-user"));
  const pathname = window.location.pathname;
  if (
    !user &&
    pathname !== "/login" &&
    pathname !== "/home" &&
    pathname !== "/cadastrar"
  ) {
    window.location.href = "/login";
  }

  function clickMenu() {
    setMenuOpen(!menuOpen);
  }

  function handlePerfilClick(eventKey) {
    if (eventKey === "sair") {
      window.localStorage.removeItem("@streambox-user");
      window.location.href = "/login";
      console.log("Sair");
    }
  }

  useEffect(() => {
    function handleWindowResize() {
      if (window.innerWidth < 800) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <header className="navegacao">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="" />
          </a>
          <DropdownButton
            id="perfil-dropdown"
            title={
              <>
                <i className="bi bi-person-fill profile"></i>
                {user?.nome}
              </>
            }
            onSelect={handlePerfilClick}
          >
            <Dropdown.Item eventKey="perfil">Perfil</Dropdown.Item>
            <Dropdown.Item eventKey="config">Configurações</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="sair">Sair</Dropdown.Item>
          </DropdownButton>
        </div>
        <span
          id="burger"
          className={`material-symbols-outlined ${
            menuOpen ? "mobile-menu" : ""
          }`}
          onClick={clickMenu}
        >
          {user?.tipo === "U" ? "menu" : "|||"}
        </span>
        <menu id="itens" style={{ display: menuOpen ? "block" : "none" }}>
          <ul>
            {user?.tipo === "U" ? (
              <>
                <li>
                  <a href="/Series">Séries</a>
                </li>
                <li>
                  <a href="/MinhaLista">Minha Lista</a>
                </li>
                <li>
                  <a href="/Assistindo">Assistindo</a>
                </li>
                <li>
                  <a href="/Concluidas">Concluídas</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/PainelAdmin">Séries</a>
                </li>
                <li>
                  <a href="/cadastroserie">Cadastro Series</a>
                </li>
                <li>
                  <a href="/Plataformas">Plataformas</a>
                </li>
              </>
            )}
          </ul>
        </menu>
      </header>
    </>
  );
}
