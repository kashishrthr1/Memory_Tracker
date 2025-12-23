function InputField({ label, type }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type={type} />
    </div>
  );
}

export default InputField;
