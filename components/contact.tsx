"use client";
import { useState } from "react";
import { BsSend } from "react-icons/bs";

const Contact = () => {
  // Remplacer YOUR_ACCESS_KEY_HERE par votre clé d'accès de Web3Forms
  const accessKey = "YOUR_ACCESS_KEY_HERE";


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Vous pouvez ajouter la logique de soumission du formulaire ici
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Traitement des données du formulaire
  };

  return (
    <div id="contact" className="flex min-h-screen items-center justify-start bg-light-gray bg-gradient-to-r from-gray-200 to-slate-300">
      <div className="mx-auto w-full max-w-lg">
        <h2 className="head_text uppercase mb-3">Contactez-nous</h2>
        <p className="mt-3">Envoyez-nous un e-mail à contact@ivoirewheels.com ou envoyez-nous un message ici&nbsp;:</p>

        <form action="https://api.web3forms.com/submit" method="POST" className="mt-10">
          <input type="hidden" name="access_key" value={accessKey} />
          <div className="grid gap-6 sm:grid-cols-2">
            <InputField name="name" placeholder="Votre nom" value={formData.name} handleChange={handleChange} />
            <InputField name="email" placeholder="Votre email" type="email" value={formData.email} handleChange={handleChange} />
            <TextAreaField name="message" placeholder="Votre message" value={formData.message} handleChange={handleChange} />
          </div>
          <button type="submit" className="group overflow-hidden btn_base mt-5 mr-2 py-1 px-3 rounded  items-center flex gap-2 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
            <BsSend className="z-40 transition-all duration-300 group-hover:translate-x-1" />
            <span className="z-40">Envoyer</span>
              <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
	            </div>
          </button>
        </form>
      </div>
    </div>
  );
};


const InputField = ({ name, placeholder, type = "text", value, handleChange }: any) => (
  <div className="relative z-0">
    <input type={type} name={name} value={value} onChange={handleChange} className="peer block w-full  appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-dark-gray focus:blue-green focus:outline-none focus:ring-0" placeholder=" " />
    <label className="absolute top-3 px-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-green peer-focus:dark:text-blue-green">{placeholder}</label>
  </div>
);

const TextAreaField = ({ name, placeholder, value, handleChange }: any) => (
  <div className="relative z-0 col-span-2">
    <textarea name={name} rows={5} value={value} onChange={handleChange} className="peer block w-full  appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-dark-gray focus:blue-green focus:outline-none focus:ring-0" placeholder=" "></textarea>
    <label className="absolute top-3 px-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-green peer-focus:dark:text-blue-green">{placeholder}</label>
  </div>
);

export default Contact;