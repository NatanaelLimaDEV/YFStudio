import "./input.css";

function Input({ type, value, onChange }) {
  return <input className="input-form" type={type} value={value} onChange={onChange}/>;
}

export default Input;
