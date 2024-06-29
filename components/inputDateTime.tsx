import React, { useState, useEffect } from 'react';

interface InputDateTimeProps {
  label: string;
  nameDate: string;
  nameTime: string;
  valueDate: string;
  valueTime: string;
  onChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  errors?: string;
}

const InputDateTime: React.FC<InputDateTimeProps> = ({
  label,
  nameDate,
  nameTime,
  valueDate,
  valueTime,
  onChangeDate,
  onChangeTime,
  className,
  errors,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const [localErrors, setLocalErrors] = useState<string | null>(errors || null);

  const validateDate = (date: string) => {
    const pickUpDate = new Date(date);
    return pickUpDate >= new Date(today) ? null : "La date de récupération doit être aujourd'hui ou dans le futur.";
  };

  const validateTime = (time: string, date: string) => {
    const now = new Date();
    const pickUpDateTime = new Date(`${date}T${time}`);
    return pickUpDateTime > now ? null : "L'heure de récupération doit être dans le futur.";
  };

  useEffect(() => {
    const dateError = validateDate(valueDate);
    const timeError = validateTime(valueTime, valueDate);
    setLocalErrors(dateError || timeError);
  }, [valueDate, valueTime]);

  return (
    <div className="w-full md:w-1/2">
      <label className="text-gray-700 font-light mt-5">{label}</label>
      <div className={`main-search rounded-lg shadow-md focus:shadow-lg mt-3 px-5 py-2 w-full flex items-center space-x-6 border border-gray-200 border-opacity-75 ${className}`}>
        <input
          type="date"
          name={nameDate}
          id={nameDate}
          value={valueDate}
          className="w-3/5 rounded-md border-none bg-transparent  text-base font-sm text-primary-black outline-none focus:outline-none"
          onChange={(e) => {
            onChangeDate(e);
            const dateError = validateDate(e.target.value);
            setLocalErrors(dateError || validateTime(valueTime, e.target.value));
          }}
          required
          min={today}
        />
        <input
          type="time"
          name={nameTime}
          id={nameTime}
          className="w-2/5 rounded-md border-none bg-transparent  text-base font-sm text-primary-black outline-none focus:outline-none"
          value={valueTime}
          onChange={(e) => {
            onChangeTime(e);
            const timeError = validateTime(e.target.value, valueDate);
            setLocalErrors(validateDate(valueDate) || timeError);
          }}
          required
        />
      </div>
      {localErrors && <p className="mt-1 text-xs text-alert-error">{localErrors}</p>}
    </div>
  );
};

export default InputDateTime;