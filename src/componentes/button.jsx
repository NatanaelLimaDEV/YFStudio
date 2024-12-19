import "./button.css";

function Button({ text, classS, onclick }) {
  return (
    <button className={classS} type="button" onClick={onclick}>
      {text}
    </button>
  );
}

export default Button;
