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

  return (
    <>
      <div id="form" style={{ display: janelaUp ? "flex" : "none" }}>
        <FaX className="iconForm" onClick={MudarDisplay}/>
        <Form />
      </div>
      <div className="centro">
        <Nav />
        <div className="bv-txt">
          <h1>Bem-vinda ao nosso estúdio!</h1>
          <h1>teste</h1>
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
          <button className="bt-contato" type="button">
            <FaInstagram className="icon" />
          </button>
          <button className="bt-contato" type="button">
            <FaWhatsapp className="icon" />
          </button>
          <button className="bt-contato" type="button">
            <FaRegMap className="icon" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
