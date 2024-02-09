const ToggleCheck = ({ label, name, type, onChange, className }:any) => {
  return (
    <div className={`form-control flex-col basis-1/2 ${className}`}>
      <label className="label cursor-pointer ">
        <span className="label-text gray-400">{label}</span>
        <input name={name} type={type} className="toggle toggle-accent" onChange={onChange} />
      </label>
    </div>
  );
};

export default ToggleCheck