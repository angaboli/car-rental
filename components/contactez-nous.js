import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traiter les données du formulaire
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      message: ''
    });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-100 bg-gradient-to-b from-stone-200 via-stone-50 to-stone-200">
      <div className="p-10 rounded shadow-sm bg-stone-50 max-w-lg w-2/3">
        <div className="mb-2 p-10 bg-white -m-10">
          <h2 className="head_text uppercase ">Contactez-nous</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <InputField name="nom" label="Nom" instructions=" " handleChange={handleChange} value={formData.nom} />
            <InputField name="prenom" label="Prénom" instructions=" " handleChange={handleChange} value={formData.prenom} />
          </div>
          <InputField name="email" label="Email" type="email" instructions=" " handleChange={handleChange} value={formData.email} />
          <InputField name="telephone" label="Téléphone" instructions=" " handleChange={handleChange} value={formData.telephone} />
          <TextAreaField name="message" label="Message" instructions=" " handleChange={handleChange} value={formData.message} />

          <div className="mt-6 flex gap-6">
            <button type="submit" className="btn_base rounded-md uppercase py-4 px-10 bg-orange text-light-gray shadow hover:bg-primary-black">Envoyez</button>
            <button type="button" onClick={handleReset} className="btn_base uppercase rounded-md py-4 px-10 bg-transparent text-light-orange border border-light-orange hover:border-orange hover:text-orange">Réinitialiser</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ name, label, type = "text", instructions, handleChange, value }) => (
  <div className="flex flex-col mb-4">
    <label>
      {label}
      <span className="block text-xs font-light text-stone-400">{instructions}</span>
    </label>
    <input type={type} name={name} placeholder={`Votre ${label.toLowerCase()}`} className="mt-2 px-4 py-2 shadow rounded focus:border-blue-green focus-visible:outline-bleu-green" onChange={handleChange} value={value} />
  </div>
);

const TextAreaField = ({ name, label, instructions, handleChange, value }) => (
  <div className="flex flex-col mb-4">
    <label>
      {label}
      <span className="block text-xs font-light text-stone-400">{instructions}</span>
    </label>
    <textarea rows="5" name={name} placeholder={`Votre ${label.toLowerCase()} en plus de 50 mots`} className="mt-2 px-6 py-2 shadow rounded" onChange={handleChange} value={value}></textarea>
  </div>
);

export default ContactForm;
