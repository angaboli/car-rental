const SelectField = ({ label, name, options, onChange, className, defaultValue, Icon } :any) => {
  return (
    <div className={`${className}`}>
      <label className="text-gray-400 mb-2">{label}</label>
      <div className={`main-search rounded-lg shadow-md focus:shadow-lg pr-5 w-full flex items-center space-x-6 border border-gray-200 border-opacity-75`}>
        <select
          name={name}
          onChange={onChange}
          className="select bg-transparent focus:outline-none w-full"
          defaultValue={defaultValue}
        >
          <option disabled value="">{label}</option>
          {options.map((option:any, index:any) => (
            <option key={index} value={option.value}>{option.value}</option>
          ))}
        </select>
      {Icon && <Icon />}
    </div>
    </div>
  );
};

export default SelectField