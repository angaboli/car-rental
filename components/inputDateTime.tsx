
const InputDateTime = ({ label, nameDate, nameTime, valueDate, valueTime, onChange, className }:any) => {
  return (
    <div>
      <label className="text-gray-400 mb-2">{label}</label>
      <div className={`main-search rounded-lg shadow-md focus:shadow-lg px-6 py-3 w-full flex items-center space-x-6 border border-gray-200 border-opacity-75 ${className}`}>
        <input
          type="date"
          name={nameDate}
          id={nameDate}
          value={valueDate}
          className="w-3/5 rounded-md border-none bg-transparent  text-base font-sm text-primary-black outline-none focus:outline-none "
          onChange={onChange}
          required
        />
        <input
          type="time"
          name={nameTime}
          id={nameTime}
          className="w-2/5 rounded-md border-none bg-transparent  text-base font-sm text-primary-black outline-none focus:outline-none "
          value={valueTime}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default InputDateTime