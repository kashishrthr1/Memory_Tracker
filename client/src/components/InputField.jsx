function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}      // Multiple inputs handle karne ke liye zaroori hai
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default InputField;

