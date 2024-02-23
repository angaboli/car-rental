
const InputField = ({ label, name, type, placeholder, onChange, className, value, errors }:any) => {
  return (
    <div className={`relative main-search rounded-lg shadow-md focus:shadow-lg  w-full flex items-center space-x-6 border border-gray-200 border-opacity-75 ${className}`}>
      <input
        type={type}
        name={name}
        placeholder=""
        value={value}
        onChange={onChange}
        className={`peer block input rounded-md border-none bg-transparent outline-none focus:outline-none w-full max-w-lg`}
      />
      <label className="absolute top-4 px-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary-black peer-focus:dark:text-primary-black">
        {placeholder}
      </label>
      {/* {errors[name] && <span className="error_message">{errors[name]}</span>} */}
    </div>
  );
};

export default InputField