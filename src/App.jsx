import "./App.css";
import Button from "./componentes/button";
import Form from "./componentes/form";
import Nav from "./componentes/nav";
import React, { useEffect, useState } from "react";

import { FaInstagram, FaRegMap, FaWhatsapp, FaX } from "react-icons/fa6";

function App() {
  const [janelaUp, janelaDisplay] = useState(false);

  const MudarDisplay = () => {
    janelaDisplay(!janelaUp);
  };

  const atalhoBt = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div id="form" style={{ display: janelaUp ? "flex" : "none" }}>
        <FaX className="iconForm" onClick={MudarDisplay} />
        <Form />
      </div>
      <div className="centro">
        <Nav />
        <div className="bv-txt">
          <h1>Bem-vinda ao nosso estúdio!</h1>
          <p>
            Onde suas mãos recebem o cuidado e a elegância que merecem!
            Deixe-nos transformar cada detalhe em uma obra de arte, garantindo
            beleza e bem-estar em cada toque. Você merece esse momento especial!
          </p>
          <Button
            text={"AGENDAR"}
            classS={"bt-agendar"}
            onclick={MudarDisplay}
          />
        </div>
        <div className="bt-bottom">
          <button className="bt-contato" type="button" onClick={() => atalhoBt("https://www.instagram.com/yasmimfreitas_studio?igsh=bW96dTR1MmRvbG5y")}>
            <FaInstagram className="icon" />
          </button>
          <button className="bt-contato" type="button" onClick={() => atalhoBt("https://wa.me/558898072612?text=Olá! Estou interessada nos procedimentos e gostaria de mais informações.")}>
            <FaWhatsapp className="icon" />
          </button>
          <button className="bt-contato" type="button" onClick={() => atalhoBt("https://maps.app.goo.gl/nx74S7AYVJuhBSvL9")}>
            <FaRegMap className="icon" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
