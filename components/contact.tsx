import React, { FC, useState } from "react";
import { BsSend } from "react-icons/bs";
import { useForm } from 'react-hook-form';
import { sendEmail } from "@/services/sendEmail";
import ToastMessage from '@/components/ToastMessage';

export type FormData = {
  name: string
  email: string
  message: string
};

const Contact: FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [toastMessage, setToastMessage] = useState<string | null >(null);

  async function onSubmit(data: FormData) {
    const responseMessage = await sendEmail(data);
    setToastMessage(responseMessage);
    if (responseMessage === 'E-mail envoyé avec succès') {
      reset();
    }
    setTimeout(() => setToastMessage(null), 5000);
  }

  return (
    <div id="contact" className="flex min-h-screen items-center justify-start bg-light-gray bg-gradient-to-r from-gray-200 to-slate-300">
      <div className="mx-auto w-5/6 md:w-full max-w-lg">
        <h2 className="head_text uppercase mb-3">Contactez-nous</h2>
        <p className="mt-3">Envoyez-nous un e-mail sur <a href="mailto:contact@cocogo.cloud">contact@cocogo.cloud</a> ou envoyez-nous un message ici&nbsp;:</p>

        <form id="contactForm" method="POST" onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <InputField
              placeholder="Votre nom"
              {...register('name', { required: true })}
            />
            <InputField
              placeholder="Votre email"
              type="email"
              {...register('email', { required: true })}
            />
            <TextAreaField
              placeholder="Votre message"
              {...register('message', { required: true })}
            />
          </div>
          <button type="submit" className="group overflow-hidden btn_base mt-5 mr-2 py-2 px-6 rounded  items-center flex gap-2 bg-gradient-to-r from-gold to-tacha  text-light-gray hover:text-primary-black hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
            <BsSend className="z-40 transition-all duration-300 group-hover:translate-x-1" />
            <span className="z-40">Envoyer</span>
            <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
            </div>
          </button>
        </form>
        {toastMessage && (
          <ToastMessage alert={toastMessage === "E-mail envoyé avec succès" ? "success" : "error"} message={toastMessage} />
        )}
      </div>
    </div>
  );
};

const InputField = React.forwardRef<HTMLInputElement, { placeholder: string; type?: string }>(({ placeholder, type = 'text', ...rest }, ref) => (
  <div className="relative z-0">
    <input ref={ref} {...rest} className="peer block w-full  appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-dark-gray focus:gold focus:outline-none focus:ring-0" placeholder={``} />
    <label className="absolute top-3 px-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-gold peer-focus:dark:text-gold">{placeholder}</label>
  </div>
));

const TextAreaField = React.forwardRef<HTMLTextAreaElement, { placeholder: string }>(({ placeholder, ...rest }, ref) => (
  <div className="relative z-0 col-span-2">
    <textarea ref={ref} {...rest} rows={5} className="peer block w-full  appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-dark-gray focus:gold focus:outline-none focus:ring-0" placeholder={``}></textarea>
    <label className="absolute top-3 px-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-gold peer-focus:dark:text-gold">{placeholder}</label>
  </div>
));

export default Contact;