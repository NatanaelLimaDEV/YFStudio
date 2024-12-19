import "./nav.css";

import logoNome from "../assets/logoYF-nomes.svg";
import logoLetras from "../assets/logoYF-letras.svg";

function Nav() {
  return (
    <div className="nav">
      <img src={logoLetras} alt="" />
      <img src={logoNome} alt="" />
    </div>
  );
}

export default Nav;
