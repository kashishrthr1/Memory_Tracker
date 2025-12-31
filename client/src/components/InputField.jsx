function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}          // 🔥 important
        value={value}        // 🔥 important
        onChange={onChange}  // 🔥 important
        required
      />
    </div>
  );
}

export default InputField;

