
const InputDateTime = ({ label, nameDate, nameTime, valueDate, valueTime, onChange, className, errors }:any) => {
  return (
    <div className="w-1/2">
      <label className="text-gray-700 font-light mt-5">{label}</label>
      <div className={`main-search rounded-lg shadow-md focus:shadow-lg mt-5 px-5 py-2 w-full flex items-center space-x-6 border border-gray-200 border-opacity-75 ${className}`}>
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